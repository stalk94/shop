import React from 'react';
import { Tovar } from "./type";
import globalState from "../global.state";
import { useHookstate } from '@hookstate/core';



export default function BaseContainer() {
    const shopingCart = useHookstate(globalState.user.shopingCart);
    

    return(
        <>
        </>
    );
}