import React from 'react';
import globalState, { flags } from "../global.state";
import { useHookstate } from '@hookstate/core';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Menubar } from 'primereact/menubar';
import ShopingCart from "./shopingCart";

const navigation = [{
       label: 'File',
       icon: 'pi pi-fw pi-file'
    }
];


export default function Header() {
    const state = useHookstate(globalState.user);
    const shopingCart = useHookstate(globalState.shopingCart);
    const [mainUser, setMainUser] = React.useState<JSX.IntrinsicElements>();
    const op = React.useRef(null);
    
    
    React.useEffect(()=> {
        if(state.login.get()) setMainUser(
            <div style={{display:'flex', flexDirection:'column'}}>
                <Button label="Кабинет" icon="pi pi-power-off"/>
                {state.permision.get()<2 && <Button label="Управление" icon="pi pi-power-off"/>}
                <Button label="Выход" icon="pi pi-power-off"/>
            </div>
        );
        else setMainUser(
            <div style={{display:'flex', flexDirection:'column'}}>
                <Button className='p-button-success p-button-text' 
                    icon="pi pi-sign-in"
                    label='Авторизация'
                    onClick={()=> {flags.viewAuthType.set('auth'); flags.viewAuth.set(true)}}
                />
                <Button className="p-button-warning p-button-text" 
                    icon="pi pi-user-plus"
                    label='Регистрация'
                    onClick={()=> {flags.viewAuthType.set('reg'); flags.viewAuth.set(true)}}
                />
            </div>
        );
    }, [state]);


    return(
        <>
            <Menubar
                model={navigation}
                start={
                    <img alt="logo" 
                        src={globalState.logo.get()?globalState.logo.get():'https://www.primefaces.org/primereact-v8/images/primereact-logo-dark.svg'} 
                        height="40" 
                        className="mr-2"
                    />
                }
                end={
                    <React.Fragment>
                        <Button className='p-button-success p-button-text' 
                            icon="pi pi-shopping-cart"
                            label={shopingCart.get().length.toString()}
                            onClick={()=> flags.viewShopingBar.set(true)}
                        />
                        <Button className='p-button-secondary p-button-text' 
                            icon="pi pi-user"
                            onClick={(e)=> op.current.toggle(e)}
                        />
                    </React.Fragment>
                }
            />
            <OverlayPanel ref={op}>
                { mainUser }
            </OverlayPanel>
            <ShopingCart />
        </>
    );
}