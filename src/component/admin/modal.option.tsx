import React from 'react';
import globalState from "../../global.state";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { ColorPicker, ColorPickerValueType } from 'primereact/colorpicker';
import { useInfoToolbar } from "../../function";

type AddRowProps = {
    values: Array<string>, 
    type:'array' | 'radio' | 'any' | 'bool' | 'color' 
    setValues: (value: any)=> void
}


const AddRow =({values, type, setValues}: AddRowProps)=> {
    const setColor =(color: ColorPickerValueType, index: number)=> {
        setValues((old)=> {
            old[index] = color;
            return old;
        });
    }

    return(
        <>
            {(()=> {
                if(type==='any') return <InputText value={values[1]} onChange={(e) => setValues([e.target.value])}/>
                else if(type==='color') return(
                    <>
                        <div style={{display:'flex', marginTop:'20px', marginBottom:'20px', border:'1px solid black'}}>
                            {Array.isArray(values) && values.map((elem, index)=> 
                                <ColorPicker key={index}
                                    style={{width:'35%'}} 
                                    onChange={(e) => setColor(e.value, index)} 
                                />
                            )}
                        </div>
                        <Button className="p-button-outlined"
                            icon="pi pi-plus"
                            onClick={()=> setValues([...values, 'red'])}
                        />
                    </>
                );
                else if(type==='bool') return(
                    <>
                        <InputText value={Array.isArray(values) && values[0]} onChange={(e) => setValues([e.target.value, values[1]])}/>
                        <InputText value={Array.isArray(values) && values[1]} onChange={(e) => setValues([values[0], e.target.value])}/>
                    </>
                );
                else if(type==='array') return(
                    <>
                        <var style={{color:'gray', marginTop:'10px'}}>Значения должны быть перечислены через запятую</var>
                        <InputText placeholder='one, two'
                            value={values[1]} 
                            onChange={(e) => setValues([e.target.value])}
                        />
                    </>
                );
            })()}
        </>
    );
}


export function AddOption() {
    const [name, setName] = React.useState<string>();
    const [type, setType] = React.useState<'array'|'radio'|'any'|'bool'|'color'>('any');
    const [category, setCategory] = React.useState<string>();
    const [values, setValues] = React.useState<Array<string | number> | string>([]);

    const getType =()=> {
        return [{
            label: 'Список',
            value: 'array'
        },{
            label: 'Переключатель',
            value: 'bool'
        },{
            label: 'Выбор цвета',
            value: 'color'
        },{
            label: 'Параметр',
            value: 'any'
        }];
    }
    const getCategory =()=> {
        const result = [];
        const category = globalState.settings.category.get();
        category.forEach((elem, index)=> index!==0 && result.push(elem.label));

        return result;
    }
    // => addOptionAdmin
    const useFetch =()=> {
        const data = {
            name: name,
            type: type,
            caregory: category,
            value: values
        }

        if(type==='any') data.value = values[0];
        else if(type==='array') data.value = values[0].split(",").map((elem)=> elem.trim());
        
        send('addOptionAdmin', {option: data}).then((res)=> {
            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else globalState.settings.options.set(res);
        });
    }
    React.useEffect(()=> {
        if(type==='color') setValues(['red']);
        else setValues([]);
    }, [type]);

    
    return(
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Имя</span>
            <InputText value={name} onChange={(e) => setName(e.target.value)} />
            <span>Категория</span>
            <Dropdown
                value={category}
                options={getCategory()}
                onChange={(e) => setCategory(e.value)}
            />
            <span>Тип</span>
            <Dropdown
                value={type}
                options={getType()}
                onChange={(e) => setType(e.value)}
            />
            <span>Значениe(-я)</span>
            <AddRow values={values} type={type} setValues={setValues}/>
            <div style={{ marginTop: '5%' }}>
                <Button className="p-button-outlined p-button-success"
                    label='Создать'
                    icon="pi pi-check"
                    onClick={useFetch}
                />
            </div>
        </div>
    );
}