import React from 'react';
import { Tovar } from "./type";
import "../style/list.css";
import globalState from "../global.state";
import { useHookstate } from '@hookstate/core';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';


const localisation = {
    ru: '₽',
    ua: '₴',
    br: 'Br'
}



export default function ListTovar() {
    const products = useHookstate(globalState.products);

    const addShopCart =(data: Tovar)=> {

    }
    const useDetailProduct =(data: Tovar)=> {
        
    }

    const renderList =(data: Tovar)=> {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <img src={`images/product/${data.image}`} onError={(e)=> e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">
                            ${data.price}
                        </span>
                        <div style={{marginTop:"20%"}}>
                            <Button className='p-button-info p-button-outlined'
                                style={{marginRight:'3px'}}
                                icon="pi pi-search"  
                                disabled={!data.status}
                                onClick={()=> useDetailProduct(data)}
                            />
                            <Button className='p-button-outlined p-button-success'
                                icon="pi pi-shopping-cart" 
                                label="В корзину" 
                                disabled={!data.status}
                                onClick={()=> addShopCart(data)}
                            />
                        </div>
                        <span>
                            {data.status}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    const renderGrid =(data: Tovar)=> ( 
        <div className="col-12 md:col-4">
            <div className="product-grid-item card">
                <div className="product-grid-item-top">
                    <div>
                        <i className="pi pi-tag product-category-icon"/>
                        <span className="product-category">
                            {data.category}
                        </span>
                    </div>
                    <span className='product-category' style={{backgroundColor:data.status?'#3ded077a':'#ed3d077d'}}>
                        {data.status?"В наличии":"Нет в наличии"}
                    </span>
                </div>
                <div className="product-grid-item-content">
                    <img src={`images/product/${data.image}`} onError={(e)=> e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-name">
                        {data.name}
                    </div>
                        <div className="product-description">
                            {data.description}
                        </div>
                </div>
                <div className="product-grid-item-bottom">
                    <span className="product-price">
                        {localisation[globalState.localisation.get()]} {data.price}
                    </span> 
                    <div>
                        <Button className='p-button-info p-button-outlined'
                            style={{marginRight:'3px'}}
                            icon="pi pi-search"  
                            disabled={!data.status}
                            onClick={()=> useDetailProduct(data)}
                        />
                        <Button className='p-button-outlined p-button-success'
                            icon="pi pi-shopping-cart" 
                            label="В корзину" 
                            disabled={!data.status}
                            onClick={()=> addShopCart(data)}
                        />
                    </div>
                </div>
            </div>
        </div>  
    );


    return(
        <DataView 
            itemTemplate={(product, layout)=> layout==='grid' ? renderGrid(product) : renderList(product)}
            value={products.get()} 
            layout={globalState.settings.tovarLayout.get()}
            paginator 
            rows={9}
        />
    );
} 