import React from 'react';
import globalState from "../../global.state";
import axios from 'axios';
import { ImageContainerProps, Tovar } from "../type";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useInfoToolbar } from "../../function";

// редактор и загрузчик картинок товаров 
const ImageContainer =({images, image, useImage, useImages}: ImageContainerProps)=> {
    const addImage =()=> {
        const element = document.createElement("input");
        element.type = "file";
        element.accept = ".png,.jpg";
        element.onchange =()=> {
            const file = element.files[0];
            const formData = new FormData();
            
            formData.append("image", file, file.name.split('.')[1]);
            axios.post(gurl+'upload', formData).then((res)=> {
                if(res.data.error) useInfoToolbar("error", 'Ошибка', res.data.error);
                else useImages([...images, res.data]);
            });
        }
        element.click();
    }
    const toogleImage =(src: string)=> {
        useImage(src);
    }
    const removeImage =(src: string)=> {
        useImages((old)=> old.filter((imgSrc: string)=> imgSrc!==src));
    }

    return(
        <div className='imageContainer'>
            <img style={{border:'2px solid red'}}
                src={`../../upload/${image}`} 
                height='100px'
                width='100px'
                onError={(e)=> e.target.src='https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'}  
            />
            {images.map((src, index)=> src!==image && 
                <div key={index} style={{display:'flex', flexDirection:'column'}}>
                    <img className='listImages'
                        onClick={()=> toogleImage(src)}
                        src={`../../upload/${src}`} 
                        width='60px'
                        height='60px'
                        onError={(e)=> e.target.src='https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'}  
                    />
                    <Button
                        style={{marginTop:'2px', width:'60px'}} 
                        className='p-button-outlined p-button-danger'
                        icon='pi pi-trash'
                        onClick={()=> removeImage(src)}
                    />
                </div>
            )}  
            <div className='addImageContainer' onClick={addImage}>
                <div className='addImage'>
                    +
                </div> 
            </div>        
        </div>
    );
}


export function ReadProduct({product}: {product: Tovar}) {
    const [name, setName] = React.useState(product.name);
    const [text, setText] = React.useState(product.text);
    const [image, setImage] = React.useState(product.image);
    const [count, setCount] = React.useState(product.count);
    const [price, setPrice] = React.useState(product.price);
    const [status, setStatus] = React.useState(product.status);
    const [images, setImages] = React.useState(product.images);
    const [category, setCategory] = React.useState(product.category);
    const [description, setDescription] = React.useState(product.description);

    const useFetch =()=> {
        const data = {
            id: product.id,
            name: name,
            image: image,
            images: images,
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
                <ImageContainer images={images} image={image} useImage={setImage} useImages={setImages} />
                <span>Наименование</span>
                <InputText value={name} onChange={(e)=> setState(e, 'name')}/>
                <span>Стоимость</span>
                <InputText type='number' value={price} onChange={(e)=> setState(e, 'price')}/>
                <span>Категория</span>
                <Dropdown 
                    value={category} 
                    options={getCategory()} 
                    onChange={(e)=> setState(e, 'category')} 
                />
                <span>Статус</span>
                <Dropdown 
                    value={status} 
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
    const [name, setName] = React.useState<string>('');
    const [image, setImage] = React.useState<string>();
    const [images, setImages] = React.useState<Array<string>>([]);
    const [description, setDescription] = React.useState<string>('');
    const [text, setText] = React.useState<string>('');
    const [count, setCount] = React.useState<number>(0);
    const [price, setPrice] = React.useState<number>(0);
    const [status, setStatus] = React.useState<'new'|'action'|'favorite'>('new');
    const [category, setCategory] = React.useState<string>();

    const useFetch =()=> {
        const data = {
            name: name,
            image: image,
            images: images,
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
                <ImageContainer images={images} image={image} useImage={setImage} useImages={setImages} />
                <span>Наименование</span>
                <InputText value={name} onChange={(e)=> setState(e, 'name')}/>
                <span>Стоимость</span>
                <InputText type='number' value={price} onChange={(e)=> setState(e, 'price')}/>
                <span>Категория</span>
                <Dropdown 
                    value={category} 
                    options={getCategory()} 
                    onChange={(e)=> setState(e, 'category')} 
                />
                <span>Статус</span>
                <Dropdown 
                    value={status} 
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