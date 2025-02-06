import { Given, When, Then } from "@cucumber/cucumber";
import { expect, request } from "@playwright/test";
import apiUtils from "../../hooks/apiUtils";

let token;
let orderNumber;
let orderResponse;
let response;

const cartPayLoad = {

    _id: "67a45671e2b5443b1f49c04b",
    product: {
        _id: "6581cade9fd99c85e8ee7ff5",
        productName: "IPHONE 13 PRO",
        productCategory: "electronics",
        productSubCategory: "mobiles",
        productPrice: 231500,
        productDescription: "Latest Apple Iphone13 pro with 200mp front camera",
        productImage: "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649561326.jpg",
        productRating: "0",
        productTotalOrders: "0",
        productStatus: true,
        productFor: "men",
        productAddedBy: "admin@gmail.com",
        __v: 0
    }
}


const nonExisitingProduct = {


    product: {
    
        productName: "IPHONE 13 PRO",
        productCategory: "electronics",
        productSubCategory: "mobiles",
        productPrice: 231500,
    
    }
}



const orderPayload = {

    orders: [
        {
            country: "Australia",
            productOrderedId: "6581cade9fd99c85e8ee7ff5"
        }
    ]

}


Given('User gets the token for the requests', async () => {
    const apiContext = await request.newContext()
    const api = new apiUtils(apiContext)
    token = await api.getToken()

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





