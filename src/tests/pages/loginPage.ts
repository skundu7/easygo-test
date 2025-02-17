
import { pageFixture } from "../../hooks/pageFixture"


class LoginPage {
    elements = {
        sign_in_link: 'xpath=//a[@data-test="nav-sign-in"]',
        username: '#email',
        password: '#password'
    }

    async clickOnSignInLink() {
        await pageFixture.page.locator(this.elements.sign_in_link).click()
    }

    async UserLoginToApplication(email: string, password: string) {
        await pageFixture.page.locator(this.elements.username).fill(email)
        await pageFixture.page.locator(this.elements.password).fill(password)
        await pageFixture.page.getByLabel('Login').filter({ hasText: 'Login' }).click()
    }



} export default LoginPage