import { Given, When, Then } from "@cucumber/cucumber";
import { expect, request } from "@playwright/test";
import apiUtils from "../../hooks/apiUtils";

let orderNumber;
let response;

const cartPayLoad = {
    _id: "67a45671e2b5443b1f49c04b",
    product: {
      _id: "676a6619e2b5443b1f004fff",
      productName: "LG Refrigerator",
      productCategory: "Fride",
      productSubCategory: "Electronics",
      productPrice: 25000,
      productDescription: "Latest Design in 2024",
      productImage: "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1735026201323.png",
      productRating: "0",
      productTotalOrders: "0",
      productStatus: true,
      productFor: "family",
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
            productOrderedId: "676a6619e2b5443b1f004fff"
        }
    ]

}


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





