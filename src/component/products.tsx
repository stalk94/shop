import React from 'react';
import { Tovar } from "./type";
import "../style/list.css";
import globalState, { flags } from "../global.state";
import { useHookstate } from '@hookstate/core';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { useInfoToolbar } from "../function";
const localisation = {ru: '₽', ua: '₴', br: 'Br'}


const Filters =({products, useProducts})=> {
    const category = useHookstate(flags.category);

    const useFilterPrice =(min: number, max: number)=> {
        useProducts((products)=> {
            const filter = products.filter((elem)=> elem.price > min && elem.price < max);
            return filter.sort((a, b)=> a.price - b.price);
        });
    }
    const useFilterNotEmpty =()=> {
        useProducts((products)=> {
            const filter = products.filter((elem)=> elem.count > 0);
            return filter;
        });
    }
    const useFilterRemove =()=> {
        const all = globalState.products.get();
        useProducts(all.filter(elem=> elem.category===category.get()));
    }

    return(
        <>
            
        </>
    );
}


export default function ListTovar() {
    const category = useHookstate(flags.category);
    const [products, setProducts] = React.useState(globalState.products.get());

    const useDetailProduct =(data: Tovar)=> {
        
    }
    const renderList =(data: Tovar)=> {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <img src={`../upload/${data.image}`} onError={(e)=> e.target.src='https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">
                            {localisation[globalState.settings.localisation.get()]} {data.price}
                        </span>
                        <div style={{marginTop:"20%"}}>
                            <Button className='p-button-info p-button-outlined'
                                style={{marginRight:'3px'}}
                                icon="pi pi-search"  
                                disabled={!data.status}
                                onClick={()=> useDetailProduct(data)}
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
                    <span className={`product-category ${data.count<1?'empty': data.status}`}>
                        {data.count<1?'Нет в наличии': data.status}
                    </span>
                </div>
                <div className="product-grid-item-content">
                    <img src={`../upload/${data.image}`} onError={(e)=> e.target.src='https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'} alt={data.name} />
                    <div className="product-name">
                        {data.name}
                    </div>
                        <div className="product-description">
                            {data.description}
                        </div>
                </div>
                <div className="product-grid-item-bottom">
                    <span className="product-price">
                        {localisation[globalState.settings.localisation.get()]} {data.price}
                    </span> 
                    <div>
                        <Button className='p-button-info p-button-outlined'
                            style={{marginRight:'3px'}}
                            icon="pi pi-search"  
                            disabled={!data.status}
                            onClick={()=> useDetailProduct(data)}
                        />
                    </div>
                </div>
            </div>
        </div>  
    );
    React.useEffect(()=> {
        const all = globalState.products.get();
        if(category.get()) setProducts(all.filter(elem=> elem.category===category.get()));
    }, [category]);


    return(
        <div style={{display:'flex', flexDirection:'row'}}>
            <Filters products={products} useProducts={setProducts} />
            <DataView 
                itemTemplate={(product, layout)=> layout==='grid' ? renderGrid(product) : renderList(product)}
                value={products} 
                layout={globalState.settings.tovarLayout.get()}
                paginator 
                rows={9}
            />
        </div>
    );
} 