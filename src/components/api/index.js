export const getProductList = () => {
    return {
        productsDetails: [
            {
                productName : 'Solid Green Cotton t-shirt',
                gender: 'Male',
                productPrice: 11,
                discountPercent: 5,
                image: 'T1.jpg',
            },
            {
                productName : 'Pink Rainbow Print Girls Tee',
                gender: 'Female',
                productPrice: 17,
                discountPercent: 2,
                image: 'T2.jpg',
            },
            {
                productName : 'Blue Flower Pattern Shirt',
                gender: 'Male',
                productPrice: 9,
                discountPercent: 10,
                image: 'T3.jpg',
            },
            {
                productName : 'Off White Cotton Pant',
                gender: 'Female',
                productPrice: 13,
                discountPercent: 6,
                image: 'P1.jpg',
            },
        ]
    };
  };
  
export const getDiscountList = () => {
    return  [
        {
            offerCode : 'jf10',
            discountPercent: 7,
        },
        {
            offerCode : 'pb70',
            discountPercent: 2,
        },
        {
            offerCode : 'kl44',
            discountPercent: 10,
        },
    ]
};
