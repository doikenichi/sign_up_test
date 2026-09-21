import {expect, test} from "../src/fixtures/ui/page-object-fixture.js";

test("visitor can open sign up page from navigation", async ({
                                                                 content,
                                                                 signUpPage,
                                                             }) => {
    await signUpPage.goto();

    await expect(signUpPage.formHeader).toBeVisible();
    await expect(signUpPage.formHeader).toContainText(content.signUp.formHeader);
});
