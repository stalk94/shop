import React from 'react';
import globalState, { flags, user } from "../global.state";
import { useHookstate } from '@hookstate/core';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import ShopingCart from "./shopingCart";
import { useDidMount } from 'rooks';



export default function Header() {
    const state = useHookstate(user);
    const shopingCart = useHookstate(globalState.shopingCart);
    const [mainUser, setMainUser] = React.useState<JSX.IntrinsicElements>();
    const op = React.useRef(null);
    const ops = React.useRef(null);
    
    // слушатель переключения навигации
    useDidMount(()=> {
        const navBar = document.querySelector('.p-menubar').querySelector('.p-menubar-root-list');
        navBar.addEventListener('click', (ev)=> {
            if(ev.target.textContent!=='Главная') {
                flags.category.set(ev.target.textContent);
                flags.view.set('category');
            }
            else flags.view.set('base')
        });
    });
    React.useEffect(()=> {
        if(state.login.get()) {
            const model = [{
                    label: 'Кабинет',
                    icon: 'pi pi-user',
                    command:  ()=> flags.view.set('user')
                }
            ];
            if(state.permision.get() < 2) model.push({
                label: 'Управление',
                icon: 'pi pi-cog',
                command: ()=> flags.view.set('admin')
            });
            model.push({
                label: 'Выход',
                icon: 'pi pi-power-off',
                command: ()=> send('out', {login:state.login.get()}).then(state.set)
            });

            setMainUser(<Menu model={model}/>);
        }
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
        <React.Fragment>
            <Menubar
                model={globalState.settings.category.get()}
                start={
                    <img alt="logo" 
                        src={globalState.logo.get()?globalState.logo.get():'https://www.primefaces.org/primereact/images/logo.png'} 
                        height="40" 
                        className="mr-2"
                    />
                }
                end={
                    <React.Fragment>
                        <Button className='p-button-success p-button-text' 
                            style={{fontSize:'1.2rem'}}
                            onClick={(e)=> ops.current.toggle(e)}
                        >
                            <i className="pi pi-shopping-cart mr-4 p-text-success p-overlay-badge" style={{fontSize:'1.2rem'}}>
                                <Badge value={shopingCart.get().length} />
                            </i>
                        </Button>
                        <Button className='p-button-secondary p-button-text' 
                            icon="pi pi-bars"
                            onClick={(e)=> op.current.toggle(e)}
                        />
                    </React.Fragment>
                }
            />
            <OverlayPanel ref={op}>
                { mainUser }
            </OverlayPanel>
            <OverlayPanel ref={ops}>
                <ShopingCart />
            </OverlayPanel>
        </React.Fragment>
    );
}