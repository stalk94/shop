import React from 'react';
import "../style/product.css";
import globalState, { flags } from "../global.state";
import { useHookstate } from '@hookstate/core';
import { Tovar, Option } from "./type";
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Carousel } from 'primereact/carousel';
import { useInfoToolbar } from "../function";


const Options =({options, setValues, values}: {options: Array<Option>, setValues: Function})=> {
    const justifyTemplate =(option: string)=> {
        return <div style={{width:'15px',height:'15px',backgroundColor:option}}></div>
    }
    

    return(
        <div className='options'>
            {options.map((elem, index)=> {
                if(elem.type==='array') return(
                    <div>
                        <label>{elem.name}</label>
                        <Dropdown 
                            value={values[index].value} 
                            options={options[index].value} 
                            onChange={(e)=> setValues(index, e.value)} 
                        />
                    </div>
                );
                else if(elem.type==='bool') return(
                    <div>
                        <label>{elem.name}</label>
                        <SelectButton 
                            value={values[index].value} 
                            options={options[index].value} 
                            onChange={(e)=> setValues(index, e.value)}
                        />
                    </div>
                );
                else if(elem.type==='any') return(
                    <div>
                        <label>{elem.name}</label>
                        { options[index].value }
                    </div>
                );
                else if(elem.type==='color') return(
                    <div>
                        <label>{elem.name}</label>
                        <SelectButton 
                            value={values[index].value} 
                            options={options[index].value} 
                            onChange={(e)=> setValues(index, e.value)} 
                            itemTemplate={justifyTemplate} 
                            optionLabel="value" 
                        />
                    </div>
                );
            })}
        </div>
    );
}


export default function Product() {
    const product = useHookstate(flags.productView);
    const [count, setCount] = React.useState<number>(1);
    const [values, setValues] = React.useState(product.detail.get());

    const addShopCart =()=> {
        const data = JSON.parse(JSON.stringify(product.get()));
        data.detail = values;
        data.count = count;

        send('addShopingCart', {product: data}).then((res)=> {
            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else globalState.shopingCart.set(res);
        });
    }
    const useSetState =(index: number, value: any)=> {
        setValues((old)=> {
            return old.map((elem, i)=> {
                if(i===index) elem.value = value;
                return elem
            });
        });
    }
    React.useEffect(()=> {
        const result = [];
        JSON.parse(JSON.stringify(product.detail.get())).forEach((elem)=> {
            elem.value = undefined;
            result.push(elem);
        })
        setValues(result);
    }, []);

    return(
        <div className='container'>
            <div className='leftContainer'>

            </div>
            <div className='rightContainer'>
                <Carousel className="fotos"
                    circular={true}
                    value={product.images.get()}
                    numVisible={3} 
                    numScroll={1} 
                    autoplayInterval={3000}
                    itemTemplate={(image)=> 
                        <img className="product-image"
                            height='150px'
                            src={`../upload/${image}`} 
                            onError={(e)=> e.target.src='https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'} 
                        />
                    } 
                />
                <div className='name'>
                    { product.name.get() }
                </div>
                <div className='price'>
                    { product.price.get() }
                </div>
                <div className='description'>
                    { product.description.get() }
                </div>
                <Options options={product.detail.get()} setValues={useSetState} values={values}/>
                <Button 
                    className='p-button-outlined p-button-success'
                    icon="pi pi-shopping-cart"
                    label="В корзину"
                    disabled={product.count.get()<1 ? true: false}
                    onClick={() => addShopCart()}
                />
            </div>
        </div>
    );
}