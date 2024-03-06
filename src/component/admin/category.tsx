import React from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useInfoToolbar } from "../../function";
import globalState from "../../global.state";
import { useHookstate } from '@hookstate/core';

/**
 * Привязка пользовательских параметров товара к категории
 */
const CustomParam =()=> {
    return(
        <>
        </>
    );
}


export default function Category() {
    const [name, setName] = React.useState<string>('');
    const [icon, setIcon] = React.useState<string>();
    const [curent, setCurent] = React.useState(globalState.settings.category.get());
    const category = useHookstate(globalState.settings.category);
    const addCategoryRef = React.useRef(null);
    const iconsList = ['pi pi-apple', 'pi pi-box', 'pi pi-car', 'pi pi-database', 'pi pi-cog', 'pi pi-wrench', 'pi pi-phone', 'pi pi-align-justify'];

    const addCategory =()=> {
        send('addCategory', {category: {name: name, icon: icon}}).then((res)=> {
            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else category.set(res);
        });
    }
    React.useEffect(()=> {
        setCurent(category.get().filter((elem)=> elem.label!=='Главная' && elem));
    }, [category]);


    return(
        <>
            <OverlayPanel ref={addCategoryRef}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <span>Наименование</span>
                    <InputText value={name} onChange={(e)=> setName(e.value)}/>
                    <span>Иконка</span>
                    <Dropdown 
                        itemTemplate={(data)=> 
                            <>
                                <i className={data}/>
                                { "  "+data }
                            </>
                        }
                        value={icon} 
                        options={iconsList} 
                        onChange={(e)=> setIcon(e.value)} 
                    />
                     <Button style={{marginTop:'15px'}} 
                        className="p-button-outlined p-button-success" 
                        label='Добавить'
                        icon="pi pi-plus" 
                        onClick={addCategory}
                    />
                </div>
            </OverlayPanel>
            <DataTable 
                value={curent} 
                header={<Button className="p-button-success" icon="pi pi-plus" onClick={(e)=> addCategoryRef.current.toggle(e)}/>} 
                responsiveLayout="scroll"
            >
                <Column header="Иконка"
                    body={(data)=> 
                        <i className={data.icon}/>
                    }
                />
                <Column field="label" header="Наименование"/>
                <Column
                    body={(data)=> 
                        <Button style={{marginLeft:'5px'}} 
                            className="p-button-outlined p-button-danger" 
                            icon="pi pi-trash" 
                            onClick={()=> send('delCategory', {category:data}).then((res)=> {
                                if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
                                else category.set(res);
                            })}
                        />
                    }
                />
            </DataTable>
        </>
    );
}