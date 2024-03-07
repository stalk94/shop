import React from 'react';
import "../style/body.css";
import { ShowcaseProps, Tovar } from './type';
import globalState from "../global.state";
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';



const Showcase =({products, template, header}: ShowcaseProps)=> {
    return(
        <Carousel className="showcase"
            circular={true}
            value={products}
            numVisible={3} 
            numScroll={1} 
            autoplayInterval={3000}
            itemTemplate={template} 
            header={<h5>{header}</h5>} 
        />
    );
}

/**
 * Карусели товаров:
 * -новинки
 * -помеченные рекомендуемыми
 * -акционные
 * -популярные
 */
export default function Body() {
    const getNew =()=> {
        const result = globalState.products.get();
        return result.filter((elem)=> elem.status==='new');
    }
    const productTemplate =(product: Tovar)=> {
        return(
            <div className="product-item">
                <div className="mb-3">
                    <img className="product-image"
                        height='150px'
                        src={`../upload/${product.image}`} 
                        onError={(e)=> e.target.src='https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'} 
                        alt={product.name}  
                    />
                </div>
                <div>
                    <h4 className="mb-1">
                        {product.name}
                    </h4>
                    <h6 className="mt-0 mb-3">
                        ${product.price}
                    </h6>
                    <div className="buttons">
                        <Button icon="pi pi-search" className="p-button p-button-rounded mr-2" />
                        <Button icon="pi pi-cog" className="p-button-help p-button-rounded" />
                    </div>
                </div>
            </div>
        );
    }


    return(
        <div className='BodyContainer'>
            <Showcase header='Новинки'
                products={getNew()} 
                template={productTemplate} 
            />
        </div>
    );
}
