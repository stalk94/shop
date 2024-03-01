import React from 'react';
import { Tovar } from "./type";
import globalState, { flags } from "../global.state";
import { useHookstate } from '@hookstate/core';
import { Sidebar } from 'primereact/sidebar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';



export default function BaseContainer() {
    const state = useHookstate(flags);
    const shopingCart = useHookstate(globalState.shopingCart);
    

    return(
        <Sidebar 
            position="right" 
            visible={state.viewShopingBar.get()} 
            onHide={()=> state.viewShopingBar.set(false)}
        >
            <DataTable
                value={shopingCart.get()}
                responsiveLayout="scroll"
            >
                <Column field="image" header="image" />
                <Column field="name" header="Name" />
                <Column field="price" header="Price" />
                <Column  body={(data)=>
                    <Button 
                        className="p-button-outlined p-button-danger" 
                        icon="pi pi-times" 
                    />
                }/>
            </DataTable>
        </Sidebar>
    );
}