import React from 'react';
import globalState from "../../global.state";
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useInfoToolbar } from "../../function";


const ImageContainer =({images, product})=> {
    const [state, setState] = React.useState(images);

    const useFetch =()=> {
        axios.post('addImageProduct', state)
    }

    return(
        <>
            <div className='imageContainer'>
                {state.map((src, index)=>
                    <img key={index}
                        src={`upload/${src}`} 
                        height='60px'
                        onError={(e)=> e.target.src='https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'}  
                    />
                )}           
            </div>
        </>
    );
}


export function ReadProduct({product}) {
    const [name, setName] = React.useState(product.name);
    const [count, setCount] = React.useState(product.count);
    const [price, setPrice] = React.useState(product.price);
    const [status, setStatus] = React.useState(product.status);
    const [description, setDescription] = React.useState(product.description);
    const [text, setText] = React.useState(product.text);
    const [category, setCategory] = React.useState(product.category);

    const useFetch =()=> {
        const data = {
            id: product.id,
            name: name,
            image: [],
            count: count,
            price: price,
            status: status,
            category: category,
            description: description,
            text: text
        }

        send('readProduct', {product: data}).then((res)=> {
            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else globalState.products.set(res);
        });
    }
    const getCategory =()=> {
        const result = [];
        const category = globalState.settings.category.get();
        category.forEach((elem)=> elem.label!=='Главная' && result.push(elem.label));

        return result;
    }
    const setState =(elem: React.ChangeEvent, name: string)=> {
        if(name==='category') setCategory(elem.value);
        else if(name==='name') setName(elem.value);
        else if(name==='price') setPrice(elem.value);
        else if(name==='count') setCount(elem.value);
        else if(name==='status') setStatus(elem.value);
        else if(name==='description') setDescription(elem.value);
        else if(name==='text') setText(elem.value);
    }

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <>
                <span>Наименование</span>
                <InputText value={name} onChange={(e)=> setState(e, 'name')}/>
                <span>Стоимость</span>
                <InputText type='number' value={price} onChange={(e)=> setState(e, 'price')}/>
                <span>Категория</span>
                <Dropdown value={category} 
                    options={getCategory()} 
                    onChange={(e)=> setState(e, 'category')} 
                />
                <span>Статус</span>
                <Dropdown value={status} 
                    options={['new', 'action', 'favorite']} 
                    onChange={(e)=> setState(e, 'status')} 
                />
                <span>Краткое описание</span>
                <InputText value={description} onChange={(e)=> setState(e, 'description')}/>
                <span>Описание</span>
                <InputText value={text} onChange={(e)=> setState(e, 'text')}/>
                <span>Остаток</span>
                <InputText type='number' value={count} onChange={(e)=> setState(e, 'count')}/>
            </>
            <div style={{marginTop:'5%'}}>
                <Button className="p-button-outlined p-button-success" 
                    label='Изменить'
                    icon="pi pi-check" 
                    onClick={useFetch}
                />
            </div>
        </div>
    );
}
export function AddProduct() {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [text, setText] = React.useState('');
    const [count, setCount] = React.useState(0);
    const [price, setPrice] = React.useState(0);
    const [status, setStatus] = React.useState();
    const [category, setCategory] = React.useState();

    const useFetch =()=> {
        const data = {
            name: name,
            image: [],
            count: count,
            price: price,
            status: status,
            category: category,
            description: description,
            text: text
        }

        send('addProduct', {product: data}).then((res)=> {
            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else globalState.products.set(res);
        });
    }
    const getCategory =()=> {
        const result = [];
        const category = globalState.settings.category.get();
        category.forEach((elem)=> elem.label!=='Главная' && result.push(elem.label));

        return result;
    }
    const setState =(elem: React.ChangeEvent, name: string)=> {
        if(name==='category') setCategory(elem.value);
        else if(name==='name') setName(elem.value);
        else if(name==='price') setPrice(elem.value);
        else if(name==='count') setCount(elem.value);
        else if(name==='status') setStatus(elem.value);
        else if(name==='description') setDescription(elem.value);
        else if(name==='text') setText(elem.value);
    }

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <>
                <span>Наименование</span>
                <InputText value={name} onChange={(e)=> setState(e, 'name')}/>
                <span>Стоимость</span>
                <InputText type='number' value={price} onChange={(e)=> setState(e, 'price')}/>
                <span>Категория</span>
                <Dropdown value={category} 
                    options={getCategory()} 
                    onChange={(e)=> setState(e, 'category')} 
                />
                <span>Статус</span>
                <Dropdown value={status} 
                    options={['new', 'action', 'favorite']} 
                    onChange={(e)=> setState(e, 'status')} 
                />
                <span>Краткое описание</span>
                <InputText value={description} onChange={(e)=> setState(e, 'description')}/>
                <span>Описание</span>
                <InputText value={text} onChange={(e)=> setState(e, 'text')}/>
                <span>Остаток</span>
                <InputText type='number' value={count} onChange={(e)=> setState(e, 'count')}/>
            </>
            <div style={{marginTop:'5%'}}>
                <Button className="p-button-outlined p-button-success" 
                    label='Добавить'
                    icon="pi pi-check" 
                    onClick={useFetch}
                />
            </div>
        </div>
    );
}