import React from 'react';
import '../style/admin.css';
import { LeftContainerProps } from "./type";
import { Menu } from 'primereact/menu';
import Products from './admin/products';
import Category from './admin/category';
import Action from './admin/action';
import Base from './admin/base';
import Orders from './admin/orders';


const LeftContainer =({useView}: LeftContainerProps)=> {
    const items = [
        {label: 'Глобальные', icon: 'pi pi-fw pi-cog', command:()=> useView('base')},
        {label: 'Категории', icon: 'pi pi-fw pi-database', command:()=> useView('category')},
        {label: 'Товар', icon: 'pi pi-fw pi-shopping-cart', command:()=> useView('products')},
        {label: 'Акции', icon: 'pi pi-fw pi-star', command:()=> useView('action')},
        {label: 'Заявки', icon: 'pi pi-fw pi-shopping-cart', command:()=> useView('orders')}
    ];


    return(<Menu style={{width:'20%'}} model={items} />);
}


export default function BaseContainer() {
    const [view, setView] = React.useState<'base'|'category'|'products'|'action'|'orders'>('orders');
    const CategoryList = {
        base: <Base/>,
        category: <Category/>,
        products: <Products/>,
        action: <Action/>,
        orders: <Orders/>
    }


    return(
        <div className='adminContainer'>
            <LeftContainer useView={setView}/>
            <div style={{width:'100%'}}>
                { CategoryList[view] }
            </div>
        </div>
    );
}