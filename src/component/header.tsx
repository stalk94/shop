import React from 'react';
import globalState from "../global.state";
import { useHookstate } from '@hookstate/core';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';

const items = [{
       label: 'File',
       icon: 'pi pi-fw pi-file'
    }
]


export default function Header() {
    const shopingCart = useHookstate(globalState.shopingCart);
    const state = useHookstate(globalState.user);
    const [mainUser, setMainUser] = React.useState();

    const useClickShopingCart =()=> {

    }
    React.useEffect(()=> {
        if(state.login.get()) setMainUser(
            <>
                <Button label="Кабинет" icon="pi pi-power-off"/>
                <Button label="Выход" icon="pi pi-power-off"/>
                {state.permision.get()<2 && <Button label="Управление" icon="pi pi-power-off"/>}
            </>
        );
        else setMainUser(
            <>
                <Button className='p-button-success p-button-text' 
                    icon="pi pi-sign-in"
                    label='Авторизация'
                />
                <Button className="p-button-warning p-button-text" 
                    icon="pi pi-user-plus"
                    label='Регистрация'
                />
            </>
        );
    }, [state]);


    return(
        <>
            <Menubar
                model={items}
                start={
                    <img alt="logo" 
                        src={globalState.logo.get()?globalState.logo.get():'https://www.primefaces.org/primereact-v8/images/primereact-logo-dark.svg'} 
                        height="40" 
                        className="mr-2"
                    />
                }
                end={
                    <>
                        <Button className='p-button-success p-button-text' 
                            icon="pi pi-shopping-cart"
                            label={shopingCart.get().length.toString()}
                            onClick={useClickShopingCart}
                        />
                        <Button className='p-button-secondary p-button-text' 
                            icon="pi pi-user"
                            onClick={useClickShopingCart}
                        />
                    </>
                }
                
            />
        </>
    );
}