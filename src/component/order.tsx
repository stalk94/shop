import React from 'react';
import globalState, { flags, user } from "../global.state";
import { useHookstate } from '@hookstate/core';
import ShopingCart from './shopingCart';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useInfoToolbar } from "../function";
import ListOrders from "./ordersList";

/**
 * Оформление текушей корзины:
 * - Доставка
 * - Способ оплаты
 */
const CurentOrderComponent =()=> {
    const [statusPay, setStatusPay] = React.useState();
    const [payMethod, setPayMethod] = React.useState();
    const [telephone, setTelephone] = React.useState(user.telephone.get());

    const fetchCreateOrder =()=> {
        const data = {
            telephone: telephone, 
            payMehod: payMethod,
            payStatus: statusPay
        }

        send('createOrder', data).then((res)=> {

        });
    }


    return(
        <>
            <ShopingCart />
            <Button />
        </>
    );
}



export default function BaseContainer() {
    const [view, setView] = React.useState<'base'|'template'>('bas');


    return(
        <>
            {view==='base' 
                ? <CurentOrderComponent />
                : <ListOrders />
            }
        </>
    );
}