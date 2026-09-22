import { expect, test } from "../src/fixtures/ui/page-object-fixture.js";

test("visitor can open sign up page from header", async ({
	content,
	logger,
	signUpPage,
}) => {
	logger.debug("Opening the sign up page");
	await signUpPage.goto();

	await expect(signUpPage.formHeader).toBeVisible();
	await expect(signUpPage.formHeader).toHaveText(content.signUp.formHeader);
	logger.info("Sign up page header and header checks passed");
});
