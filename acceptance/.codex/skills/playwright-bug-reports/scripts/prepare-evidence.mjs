import { cp, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const acceptanceDir = path.resolve(scriptDir, "../../../..");
const reportPath = path.resolve(process.argv[2] ?? path.join(acceptanceDir, "test-results/results.json"));
const findingsDir = path.join(acceptanceDir, "docs/findings");
const workDir = path.join(findingsDir, ".playwright-work");

const report = JSON.parse(await readFile(reportPath, "utf8"));
const runId = new Date().toISOString().replaceAll(/[:.]/g, "-");
const evidenceRoot = path.join(workDir, "evidence", runId);
const tests = [];
const flakyTests = [];

function visitSuite(suite, inheritedFile = "") {
	const file = suite.file ?? inheritedFile;
	for (const spec of suite.specs ?? []) {
		for (const test of spec.tests ?? []) {
			const attempts = test.results ?? [];
			const finalAttempt = attempts.at(-1);
			const expectedStatus = test.expectedStatus ?? "passed";
			const finalStatus = finalAttempt?.status ?? test.status ?? "unknown";
			const record = {
				title: [...(spec.titlePath ?? []), spec.title].filter(Boolean).join(" › "),
				project: test.projectName ?? "Not provided",
				file: spec.file ?? file ?? "Not provided",
				line: spec.line ?? null,
				expectedStatus,
				finalStatus,
				flaky: false,
				attempts: attempts.map((result, retryIndex) => ({
					retry: result.retry ?? retryIndex,
					status: result.status ?? "unknown",
					duration: result.duration ?? null,
					errors: redact(result.errors ?? []),
					attachments: (result.attachments ?? []).map(({ body, ...attachment }) => ({
						...attachment,
						...(body === undefined ? {} : { inlineBodyOmitted: true }),
					})),
				})),
			};
			if (finalStatus === expectedStatus) {
				if (attempts.some((result) => result.status !== expectedStatus)) {
					flakyTests.push({ ...record, flaky: true });
				}
				continue;
			}
			tests.push(record);
		}
	}
	for (const child of suite.suites ?? []) visitSuite(child, file);
}

for (const suite of report.suites ?? []) visitSuite(suite);
await mkdir(evidenceRoot, { recursive: true });

for (let index = 0; index < tests.length; index += 1) {
	const test = tests[index];
	const testDir = path.join(evidenceRoot, `test-${String(index + 1).padStart(3, "0")}`);
	await mkdir(testDir, { recursive: true });
	const references = [];
	const candidates = new Set();

	for (const attempt of test.attempts) {
		for (const attachment of attempt.attachments) {
			const source = attachment.path
				? path.resolve(attachment.path)
				: attachment.name && attachment.path === undefined
					? null
					: null;
			const hasInlineBody = typeof attachment.body === "string";
			references.push({ name: attachment.name ?? "unnamed attachment", contentType: attachment.contentType ?? null, source, inline: hasInlineBody, exists: source ? await isFile(source) : hasInlineBody });
			if (source && await isFile(source)) candidates.add(source);
			if (!source && hasInlineBody) {
				const bodyPath = path.join(testDir, safeName(attachment.name ?? "attachment"));
				const content = Buffer.from(attachment.body, "base64");
				const contentType = attachment.contentType ?? "";
				const sanitized = contentType.startsWith("image/")
					? content
					: sanitizeInline(content, contentType);
				await writeFile(bodyPath, sanitized, { flag: "wx" });
				references.at(-1).staged = path.relative(findingsDir, bodyPath).replaceAll(path.sep, "/");
			}
		}
	}

	const outputDirs = new Set([...candidates].map((file) => path.dirname(file)));
	for (const outputDir of outputDirs) {
		for (const entry of await readdir(outputDir, { withFileTypes: true }).catch(() => [])) {
			if (!entry.isFile() || !/(\.log$|\.png$|\.jpe?g$|api-traffic|network-summary|error-context)/i.test(entry.name)) continue;
			candidates.add(path.join(outputDir, entry.name));
		}
	}

	const staged = [];
	for (const source of candidates) {
		const target = await uniqueTarget(testDir, path.basename(source));
		if (await isFile(source)) {
			if (/\.(json|log|md|txt)$/i.test(source)) {
				const content = await readFile(source);
				const sanitized = source.toLowerCase().endsWith(".json")
					? sanitizeInline(content, "application/json")
					: sanitizeInline(content, "text/plain");
				await writeFile(target, sanitized, { flag: "wx" });
			} else {
				await cp(source, target);
			}
			staged.push({ name: path.basename(source), source, staged: path.relative(findingsDir, target).replaceAll(path.sep, "/"), exists: true });
		}
	}
	test.artifacts = references.map((reference) => ({ ...reference, staged: reference.staged ?? staged.find((item) => item.source === reference.source)?.staged ?? null }));
	test.availableArtifacts = staged;
}

const output = {
	generatedAt: new Date().toISOString(),
		report: path.relative(acceptanceDir, reportPath).replaceAll(path.sep, "/"),
	evidenceDirectory: path.relative(findingsDir, evidenceRoot).replaceAll(path.sep, "/"),
	unexpectedFailureCount: tests.length,
	flakyTestCount: flakyTests.length,
	tests,
	flakyTests,
};
const structuredPath = path.join(workDir, `run-${runId}.json`);
await writeFile(structuredPath, `${JSON.stringify(output, null, 2)}\n`, { flag: "wx" });
console.log(path.relative(acceptanceDir, structuredPath));

async function isFile(file) {
	try {
		return (await stat(file)).isFile();
	} catch {
		return false;
	}
}

async function uniqueTarget(directory, filename) {
	const extension = path.extname(filename);
	const stem = path.basename(filename, extension);
	let target = path.join(directory, filename);
	let suffix = 2;
	while (await isFile(target)) {
		target = path.join(directory, `${stem}-${suffix}${extension}`);
		suffix += 1;
	}
	return target;
}

function safeName(name) {
	return path.basename(name).replaceAll(/[^a-zA-Z0-9._-]/g, "_");
}

function sanitizeInline(content, contentType) {
	if (contentType.includes("json")) {
		try {
			const parsed = JSON.parse(content.toString("utf8"));
			return Buffer.from(`${JSON.stringify(redact(parsed), null, 2)}\n`);
		} catch {
			// Preserve an unparseable attachment for inspection, with common secrets masked.
		}
	}
	return Buffer.from(content.toString("utf8")
		.replace(/([\w.+-]+)@([\w.-]+\.[A-Za-z]{2,})/g, "[redacted-email]")
		.replace(/\b(?:\+?\d[\d ()-]{7,}\d)\b/g, "[redacted-phone]")
		.replace(/("?(?:firstName|lastName|name|email|phone|identityId|userId|accountId|sin)"?\s*:\s*")[^"]*(")/gi, "$1[redacted]$2")
		.replace(/Bearer\s+\S+/gi, "Bearer [redacted]")
		.replace(/(password|token|authorization|cookie|secret)(\s*["']?\s*[:=]\s*["']?)[^\s,"'}]+/gi, "$1$2[redacted]"));
}

function redact(value, key = "") {
	if (/password|token|authorization|cookie|secret|email|phone|firstName|lastName|identity|address|\bsin\b|\bid\b/i.test(key)) return "[redacted]";
	if (Array.isArray(value)) return value.map((item) => redact(item));
	if (value && typeof value === "object") {
		return Object.fromEntries(Object.entries(value).map(([field, item]) => [field, redact(item, field)]));
	}
	if (typeof value === "string") {
		return value
			.replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, "[redacted-email]")
			.replace(/\b(?:\+?\d[\d ()-]{7,}\d)\b/g, "[redacted-phone]")
			.replace(/("?(?:firstName|lastName|name|email|phone|identityId|userId|accountId|sin)"?\s*:\s*")[^"]*(")/gi, "$1[redacted]$2")
			.replace(/Bearer\s+\S+/gi, "Bearer [redacted]");
	}
	return value;
}
