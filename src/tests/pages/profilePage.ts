
import { expect } from "playwright/test"
import { pageFixture } from "../../hooks/pageFixture"
class ProfilePage {

    elements = {
        first_name: '#first_name',
        last_name: '#last_name'

    }
    async updateField(s: string, text: string) {
        await pageFixture.page.waitForLoadState('networkidle')
        await pageFixture.page.locator('#' + s).fill(text)
    }

    async verifySuccessMessage(s) {
        await expect(pageFixture.page.getByRole('alert').filter({ hasText: s })).toBeVisible()
    }

    async clearField(s: string) {
        await pageFixture.page.waitForLoadState('networkidle')
        await pageFixture.page.locator(s).clear()

    }
    async clickOnUpdateButton() {
        await pageFixture.page.getByRole('button').filter({ hasText: 'Update Profile' }).click()
    }



} export default ProfilePage