import React from 'react';
import { Tovar } from "./type";
import globalState, { flags } from "../global.state";
import { useHookstate } from '@hookstate/core';
import { Sidebar } from 'primereact/sidebar';



export default function BaseContainer() {
    const state = useHookstate(flags);
    const shopingCart = useHookstate(globalState.shopingCart);
    

    return(
        <Sidebar 
            position="right" 
            visible={state.viewShopingBar.get()} 
            onHide={()=> state.viewShopingBar.set(false)}
        >
            
        </Sidebar>
    );
}