import React from 'react';
import { Tovar } from "./type";
import globalState from "../global.state";
import { useHookstate } from '@hookstate/core';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { useInfoToolbar } from "../function";
const localisation = {ru: '₽',ua: '₴',br: 'Br'}



export default function BaseContainer() {
    const shopingCart = useHookstate(globalState.shopingCart);

    const onPay =()=> {

    }
    const onDelete =(element: Tovar|'all')=> {
        send('delShopingCart', {product:element}).then((res)=> {
            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else shopingCart.set(res);
        });
    }
    const getTotal =()=> {
        let result = 0;
        shopingCart.get().forEach((elem)=> result += elem.price);

        return result;
    }
    

    return(
        <>
            <DataTable
                value={shopingCart.get()}
                responsiveLayout="scroll"
                header={
                    <span>
                        <i className="pi pi-shopping-cart">
                            {' '+shopingCart.get().length}
                        </i>
                        <i className="pi pi-wallet" style={{marginLeft:'7%'}}>
                            {' '+getTotal()}{localisation[globalState.settings.localisation.get()]}
                        </i>
                    </span>
                }
            >
                <Column body={(data)=> 
                    <img alt="img"
                        height="40"
                        src={`../upload/${data.image}`}
                        onError={(e)=> e.target.src = 'https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'}
                    />
                }/>
                <Column field="name" header="Название" />
                <Column field="price" header="Стоимость" />
                <Column body={(data)=>
                    <Button 
                        className="p-button-outlined p-button-danger" 
                        icon="pi pi-times" 
                        onClick={()=> onDelete(data)}
                    />
                }/>
            </DataTable>
            <span style={{float:'right', margin:'3% 2%'}}>
                <Button
                    disabled={shopingCart.get().length<1 ? true : false}
                    className="p-button-success" 
                    icon="pi pi-check" 
                    label='Оформить'
                    onClick={onPay}
                />
                <Button
                    disabled={shopingCart.get().length<1 ? true : false}
                    className="p-button-warning" 
                    icon="pi pi-times" 
                    label='Удалить все'
                    onClick={()=> onDelete('all')}
                />
            </span>
        </>
    );
}