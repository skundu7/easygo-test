import { Given, When, Then } from "@cucumber/cucumber";
import { expect, request } from "@playwright/test";
import apiUtils from "../../hooks/apiUtils";
import { cartPayLoad, nonExisitingProduct, orderPayload } from "../../constants/constants";

let orderNumber;
let response;

Given('User gets the token for the requests', async () => {
    const apiContext = await request.newContext()
    const api = new apiUtils(apiContext)
    await api.getToken()

})

When('User Add an item to the cart', async () => {
    const apiContext = await request.newContext()
    const api = new apiUtils(apiContext)
    response = await api.addToCart(cartPayLoad)
})

When('I create the order', async () => {
    const apiContext = await request.newContext()
    const api = new apiUtils(apiContext)
    orderNumber = await api.createOrder(orderPayload)
})

Then('I can see the order created successfully', async () => {
    const apiContext = await request.newContext()
    const api = new apiUtils(apiContext)
    await api.getOrderDetails(orderNumber)
})

When('User Add an item to the cart without Token', async () => {
    const apiContext = await request.newContext()
    const api = new apiUtils(apiContext)
    response = await api.createOrderWithoutToken(orderPayload)
})

Then('User should see {int} error', (int: number) => {
    expect(response).toBe(int)
})

When('User Add an item to the cart with invalid url', async () => {
    const apiContext = await request.newContext()
    const api = new apiUtils(apiContext)
    response = await api.addTocartInvalid(cartPayLoad)
    console.log(" the order response is " + response)
})

When('User Add an non exisiting product to the cart', async () => {
    const apiContext = await request.newContext()
    const api = new apiUtils(apiContext)
    response = await api.addToCart(nonExisitingProduct)
    console.log(" the order response is " + response)
})





