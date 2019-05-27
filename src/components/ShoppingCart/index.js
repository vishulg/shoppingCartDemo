import React from 'react';
import styled from 'styled-components';
import { getProductList, getDiscountList } from '../api';

const Wrapper = styled.div`
   max-width: 80%;
   margin: auto;
   font-family: sans-serif;
   input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
    }
    padding-bottom: 150px; 
`;

const Table = styled.table`
    width: 100%;
    border-spacing: 0;
    thead {
        line-height: 40px;
        tr th {
            border-top: 1px solid gainsboro;
            border-bottom: 5px solid gainsboro;
            font-weight: 100;
            font-size: 14px;
            color: #988e8e;
            text-align: left;
            padding: 0 10px;
        }
    } 

    tbody {
        tr {
            
            td {
                padding: 20px 10px;
                border-bottom: 1px solid gainsboro;
                
                img {
                    width: 100px;
                    height: 175px;
                }
            }
            &:last-child {
                td {
                    border-bottom: 5px solid gainsboro;
                }
                
            }
        }
    }
`;

const FirstCol = styled.div`
    display: flex;
`;

const ProductName = styled.p`
    color: #676767;
    font-size: 14px;
`;

const ProductStyle = styled.p`
    color: #988e8e;
    font-size: 12px;
`;

const ProductColor = styled.p`
    color: #988e8e;
    font-size: 12px;
`;

const ProductOptions = styled.p`
    color: #988e8e;
    font-size: 12px;
    position: absolute;
    width: 230px;
    bottom: 10px;   
`;

const EditBtn = styled.span`
    border-right: 1px solid gainsboro;
    padding: 0 7px;
`;

const RemoveBtn = styled.span`
    border-right: 1px solid gainsboro;
    padding: 0 7px;
`;

const SaveBtn = styled.span`
    padding: 0 7px;
`;

const DetailWrapperDiv = styled.div`
    position: relative;
`;

const Size = styled.td`
    color: #988e8e;
    font-size: 14px;
`;

const Qty = styled.td`
    input {
        width: 30px;
        color: #988e8e;
        text-align: center;
        height: 20px;
    }
`;

const BottomWrapper = styled.div`
    display: flex;
    position: relative;
    margin-top: 50px;
`;

const InfoWrapper = styled.div` 
    p, a {
        color: #988e8e;
        display: block;
    }
`;

const PromotionDiv = styled.div`
    color: #988e8e;
    border-bottom: 5px solid gainsboro;
    padding-bottom: 30px;
    span {
        width: 200px;
        display: inline-block;
        font-size: 14px;
        font-weight: 100;
    }

    input {
        height: 25px;
        margin: 0 20px;
        width: 150px;
    }

    button {
        width: 100px;
        height: 30PX;
        background-color: transparent;
        color: #988e8e;
    }
`;

const PromotionWrapper = styled.div`
    position: absolute;
    right: 0;
`;

const PriceDetailWrapper = styled.div`
    padding: 10px 0;
    color: #988e8e;
    .f-right {
        float: right;
    }

    &.total {
        border-top: 1px solid gainsboro;
        border-bottom: 5px solid gainsboro;
        line-height: 30px;
    }
`;

class ShoppingCart extends React.Component {

    constructor() {
        super();
        this.state = {
           data: "",
           subTotal: 0,
           estimatedTotal: 0,
           promotionDiscount: 0,
           promoCode: '####',
           discountData: "",
        }
    }

    componentDidMount() {
        const productsDetails = getProductList();
        const discountData = getDiscountList();
        let subTotal = 0;
        productsDetails.productsDetails.forEach((a) => {
            a.productPrice = a.productPrice - Number(parseFloat((a.discountPercent/100)*(a.productPrice)).toFixed(2));
            subTotal = subTotal + a.productPrice;
            a.qty = 1;
            a.fixedDiscountedPrice = a.productPrice;
        });

        this.setState({
            data: productsDetails,
            subtotal: subTotal,
            estimatedTotal: subTotal - this.state.promotionDiscount,
            discountData: discountData,
        })
    }

    getSubtotal() {
        const { data } = this.state
        let subTotal = 0;

        debugger
        data.productsDetails.forEach((a) => {
            a.productPrice = a.productPrice;
            subTotal = subTotal + a.productPrice;
            subTotal = Number(parseFloat(subTotal).toFixed(2))
        });
        return subTotal
    }

    applyPromo = () => {
        const { discountData, subtotal, data} = this.state;
        let code = document.getElementById('promoId').value;
        discountData.filter((item)=>{
            if(item.offerCode === code){
                let newPromotionDiscount = 0;
                data.productsDetails.forEach((a) => {
                    if(a.gender === "Female") {
                        let discountedAmount = ((item.discountPercent/100)*a.productPrice);
                        newPromotionDiscount = newPromotionDiscount + discountedAmount;
                    }
                });
                newPromotionDiscount = Number(parseFloat(newPromotionDiscount).toFixed(2));
                let newEstimatedTotal = subtotal - newPromotionDiscount;
                this.setState({
                    estimatedTotal: newEstimatedTotal,
                    promotionDiscount: newPromotionDiscount,
                    promoCode: code,
                })
            }
        })
    }

    changeQty = (e, name) => {
        const { data } = this.state;
        const newQty = e.target.value;
        if(newQty >= 0) {
            data.productsDetails.forEach((a, index) => {
                if(a.productName === name) {
                    this.setState(
                        state => (state.data.productsDetails[index].qty = newQty,
                            state.data.productsDetails[index].productPrice = Number(parseFloat(state.data.productsDetails[index].fixedDiscountedPrice*newQty).toFixed(2)),
                            state.subtotal =  this.getSubtotal(),
                            state.estimatedTotal = this.getSubtotal() - state.promotionDiscount,
                            state
    
                        )
                    );
                }
            });
        }
        
     }

    render() {
        const { data, subtotal, estimatedTotal, promotionDiscount, promoCode } = this.state;
        return (
            <Wrapper>
                <h1>Your Shopping Bag</h1>
                <Table>
                    <thead>
                        <tr>
                            <th><b>3</b> ITEMS</th>
                            <th>SIZE</th>
                            <th>QTY</th>
                            <th>PRICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.productsDetails.map((item) => (
                            <tr key={item.productName}>
                            <td>
                                <FirstCol>
                                    <img alt="Product Pic" src={require(`../assets/${item.image}`)} />
                                    <DetailWrapperDiv>
                                        <ProductName>{item.productName}</ProductName>
                                        <ProductStyle>PRODUCT style</ProductStyle>
                                        <ProductColor>PRODUCT color</ProductColor>
                                        <ProductOptions>
                                            <EditBtn>
                                                EDIT
                                            </EditBtn>
                                            <RemoveBtn>
                                                X REMOVE
                                            </RemoveBtn>
                                            <SaveBtn>
                                                SAVE FOR LATER
                                            </SaveBtn>
                                        </ProductOptions>
                                    </DetailWrapperDiv>
                                </FirstCol>
                            </td>
                            <Size>S</Size>
                            <Qty>
                                <input type='number' value={item.qty} onChange={(e) => this.changeQty(e, item.productName)} />
                            </Qty>
                            <td><sup>$</sup>{item.productPrice}</td>
                        </tr>
                        ))

                        }
                    </tbody>
                </Table>
                <BottomWrapper>
                    <InfoWrapper>
                        <p>Need Help or have questions?</p>
                        <p>Call Customer Service at 1-800-555-5555</p>
                        <a href="#">Chat with one of our stylists</a>
                        <a href="#">See return &amp; exchange policies</a>
                    </InfoWrapper>
                    <PromotionWrapper>
                        <PromotionDiv>
                            <span>ENTER PROMOTION CODE OR GIFT CARD</span>
                            <input type="text" id="promoId" />
                            <button onClick={this.applyPromo}>APPLY</button>
                        </PromotionDiv>
                        <PriceDetailWrapper>
                            <span>Subtotal</span>
                            <span className="f-right"><sup>$</sup>{subtotal}</span>
                        </PriceDetailWrapper>
                        {promotionDiscount > 0 &&
                            <PriceDetailWrapper>
                                <span>PROMOTION CODE {promoCode} APPLIED</span>
                                <span className="f-right">-<sup>$</sup>{promotionDiscount}</span>
                            </PriceDetailWrapper>
                        }
                        <PriceDetailWrapper className="total">
                            <span>ESTIMATED TOTAL</span>
                            <span className="f-right"><sup>$</sup>{estimatedTotal}</span>
                        </PriceDetailWrapper>
                    </PromotionWrapper>
                </BottomWrapper>
            </Wrapper>
        )
    }
}

export default ShoppingCart;