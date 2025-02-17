import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../../hooks/pageFixture';
import { expect, request } from '@playwright/test';
import apiUtils from '../../hooks/apiUtils';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import ProfilePage from '../pages/profilePage';
require('dotenv').config()

const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(30 * 1000);

const loginPage = new LoginPage()
const homePage = new HomePage()
const profilePage = new ProfilePage()
const baseUrl = process.env.BASE_URL

Given('user registers for the application', async () => {
    const apiContext = await request.newContext()
    const api = new apiUtils(apiContext)
    await api.registerNewUser();

})

Given('User navigates to the application', async function () {
    console.log(" the base url is "+baseUrl)
    await pageFixture.page.goto(baseUrl);
});

Given('User click on the login link', async function () {
    await loginPage.clickOnSignInLink()
});


Then('Login should be success', async function () {
    console.log("successful")
});

When('User click on the profile link', async function () {
    await homePage.clickOnProfileLink()

});

When('User update the {string} field with {string} text', async function (s: string, text: string) {
    await profilePage.updateField(s, text);

});

When('User try to update the profile without {string}', async (s: string) => {
    await profilePage.clearField(s)
})

Then('User should get message {string}', async (s: string) => {
    await profilePage.verifySuccessMessage(s)
})

When('User login to the application', async () => {
    const apiContext = await request.newContext();
    const api = new apiUtils(apiContext);
    await api.registerNewUser();
    const { email } = api.getUserDetails();
    const { password } = api.getUserDetails();
    await loginPage.UserLoginToApplication(email, password)
})

When('user update the profile', async () => {
    await profilePage.clickOnUpdateButton()
})





