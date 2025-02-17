import { expect } from "@playwright/test"
require('dotenv').config()

class apiUtils {

    public email: string = "";
    public password: string = "";
    apiContext: any
    private static token: string;

    constructor(apiContext) {
        this.apiContext = apiContext
    }

    async getToken() {
        if (apiUtils.token) {
            return apiUtils.token
        }

        const loginPayload = {
            userEmail: process.env.USER1_EMAIL,
            userPassword: process.env.USER1_PASS
        }

        const apiresponse = await this.apiContext.post(process.env.API_BASE_URL+'/auth/login', {
            data: loginPayload
        })

        const loginResponseJson = await apiresponse.json()
        apiUtils.token = loginResponseJson.token
        return apiUtils.token
    }

    async addToCart(cartPayLoad) {

        const token = await this.getToken();
        const addToCartResponse = await this.apiContext.post(process.env.API_BASE_URL+'/user/add-to-cart', {
            data: cartPayLoad,
            headers:
            {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        const status = addToCartResponse.status()
         expect(status).toBe(200)

    }

    async createOrder(orderPayload) {
        const token = await this.getToken();
        const orderResponse = await this.apiContext.post(process.env.API_BASE_URL+'/order/create-order', {
            data: orderPayload,
            headers:
            {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        const status = orderResponse.status()
         expect(status).toBe(201)
         const orderResponseJson = await orderResponse.json()
         console.log("Order created response is "+JSON.stringify(orderResponseJson))
         const orderId = orderResponseJson.orders[0];
         return orderId;

    }

    async createOrderWithoutToken(orderPayload) {


        const orderResponse = await this.apiContext.post(process.env.API_BASE_URL+'/order/create-order', {
            data: orderPayload,
            headers:
            {
                'Authorization': '',
                'Content-Type': 'application/json'
            }
        })
        return orderResponse.status()

    }

    async addTocartInvalid(cartPayLoad) {
        const token = await this.getToken();

        const invlaidResponse = await this.apiContext.post(process.env.API_BASE_URL+'user/add-to-car', {
            data: cartPayLoad,
            headers:
            {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        return invlaidResponse.status()

    }
    async getOrderDetails(orderNumber) {
        const token = await this.getToken();
        const orderDetails = await this.apiContext.get(process.env.API_BASE_URL+'/order/get-orders-details', {
            params: {
                'id': orderNumber
            },
            headers:
            {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        const status = orderDetails.status()
        expect(status).toBe(200)
     

    }

    async registerNewUser() {

        this.email = await this.randomEmail();
        this.password = await this.randomPassword();

        let userData = {
            first_name: "Sunil",
            last_name: "Kundu",
            dob: "1989-04-30",
            address: "22 Abbotswick Cct",
            city: "Williams Landing",
            state: "Victoria",
            country: "IN",
            postcode: "3027",
            phone: "423589349",
            email: await this.email,
            password: await this.password

        }
        const orderDetails = await this.apiContext.post(process.env.UI_REGISTER_API, {
            data: userData,
            headers:
            {
                'Content-Type': 'application/json'
            }
        })

        expect(orderDetails.ok())
        const orderDetailsJson = await orderDetails.body()
        console.log("order details " + orderDetailsJson)
        this.email = userData.email;
        this.password = userData.password;
        console.log("The email is " + this.email)
        console.log("The password is " + userData.password)

    }
    getUserDetails() {
        return { email: this.email, password: this.password };
    }

    async randomEmail() {

        const number = Math.floor(Math.random() * 10001);
        const email = 'sunil.kundu' + number + '@gmail.com'
        return email
    }

    async randomPassword() {
        const number = Math.floor(Math.random() * 10001);
        const password = 'Apgge' + number + '$'
        return password
    }
}
export default (apiUtils)



