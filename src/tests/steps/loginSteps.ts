import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../../hooks/pageFixture';
import { expect, request } from '@playwright/test';
import apiUtils from '../../hooks/apiUtils';



const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(30 * 1000);


Given('user registers for the application', async () => {
    const apiContext = await request.newContext()
    const api = new apiUtils(apiContext)
    await api.registerNewUser();

})


Given('User navigates to the application', async function () {
    await pageFixture.page.goto('https://practicesoftwaretesting.com/');
});



Given('User click on the login link', async function () {
    await pageFixture.page.locator('xpath=//a[@data-test="nav-sign-in"]').click()
});


Given('User enter the password as {string}', async function (pass: string) {
    const apiContext = await request.newContext()
    const api = new apiUtils(apiContext)
    await pageFixture.page.getByPlaceholder("Your password").fill(api.password);
});

When('User click on the login button', async function () {
    await pageFixture.page.getByLabel('Login').filter({ hasText: 'Login' }).click()


});

Then('Login should be success', async function () {
    console.log("successful")

});

When('User click on the profile link', async function () {
    await pageFixture.page.getByRole('button').filter({ hasText: 'Profile' }).click()


});

When('User update the last name', async function () {
    await pageFixture.page.waitForLoadState('networkidle')
    await pageFixture.page.locator('#last_name').fill('Updated')
    await pageFixture.page.getByRole('button').filter({ hasText: 'Update Profile' }).click()
});

When('User Name should be updated', async function () {
  const text =  await pageFixture.page.locator('#last_name').innerText()
 console.log("last name is "+text)

});

When('User try to update the profile without First Name', async () => {
    await pageFixture.page.waitForLoadState('networkidle')
    await pageFixture.page.locator('#first_name').clear()
    await pageFixture.page.getByRole('button').filter({ hasText: 'Update Profile' }).click()
})

Then('User should get message {string}', async (s: string) => {
    await expect(pageFixture.page.getByRole('alert').filter({ hasText: s })).toBeVisible()
})

When('User try to update the profile without Last Name', async () => {
    await pageFixture.page.waitForLoadState('networkidle')
    await pageFixture.page.locator('#last_name').clear()
    await pageFixture.page.getByRole('button').filter({ hasText: 'Update Profile' }).click()
})

When('User login to the application', async() => {

    const apiContext = await request.newContext();
    const api = new apiUtils(apiContext);
    await api.registerNewUser();  
    const { email } = api.getUserDetails(); 
    const { password } = api.getUserDetails();
    await pageFixture.page.locator('#email').fill(email)
    await pageFixture.page.locator('#password').fill(password)

  

    
})





