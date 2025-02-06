import { expect } from "@playwright/test"

class apiUtils {

    public email: string = "";
    public password: string = "";
    apiContext: any
    private token:string;

    constructor(apiContext) {
        this.apiContext = apiContext
    }

    async getToken() {
        if (this.token) {
            return this.token; 
        }

        const loginPayload = {
            userEmail: "sunil30kundu89@gmail.com",
            userPassword: "Testing1234!"
        }

        const apiresponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: loginPayload
        })

        const loginResponseJson = await apiresponse.json()
        let token = loginResponseJson.token
        return token
    }

    async addToCart(cartPayLoad) {

        const token = await this.getToken();  
        const addToCartResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart', {
            data: cartPayLoad,
            headers:
            {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        expect(addToCartResponse.ok())

    }

    async createOrder(orderPayload) {

        const token = await this.getToken(); 
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers:
            {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        expect(orderResponse.ok())

    }

    async createOrderWithoutToken(orderPayload) {


        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
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

        const invlaidResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/user/add-to-car', {
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
        const orderDetails = await this.apiContext.get('https://rahulshettyacademy.com/api/ecom/order/get-orders-details', {
            params: {
                'id': orderNumber
            },
            headers:
            {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        expect(orderDetails.ok())
        const orderDetailsJson = await orderDetails.json()
       
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
        const orderDetails = await this.apiContext.post('https://api.practicesoftwaretesting.com/users/register', {
            data: userData,
            headers:
            {

                'Content-Type': 'application/json'
            }
        })

        expect(orderDetails.ok())
        const orderDetailsJson = await orderDetails.body()
        console.log("order details " + orderDetailsJson)

        let data = JSON.parse(orderDetailsJson)
        console.log(" Order details are " + data)

        this.email = userData.email;
        this.password = userData.password;


        console.log("The email is " + this.email)
        console.log("The password is " + userData.password)

    }
    getUserDetails() {
        return { email: this.email, password: this.password };
    }




    async randomEmail() {

        const number = Math.floor(Math.random() * 1001);
        const email = 'sunil.kundu' + number + '@gmail.com'
        return email
    }

    async randomPassword() {

        const number = Math.floor(Math.random() * 1001);
        const password = 'Apgge' + number + '$'
        return password
    }



}
export default (apiUtils)



