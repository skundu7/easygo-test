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
  } as const;


const nonExisitingProduct = {
    product: {
        productName: "IPHONE 13 PRO",
        productCategory: "electronics",
        productSubCategory: "mobiles",
        productPrice: 231500,
    
    }
} as const;

const orderPayload = {
    orders: [
        {
            country: "Australia",
            productOrderedId: "676a6619e2b5443b1f004fff"
        }
    ]

} as const;

export {cartPayLoad,nonExisitingProduct,orderPayload}