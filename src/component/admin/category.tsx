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
import { GiKnifeFork, GiClothes, GiTrousers } from "react-icons/gi";
import { GoGear } from "react-icons/go";
import { PiBootBold } from "react-icons/pi";
import { FaCar, FaTshirt, FaWrench, FaBars } from "react-icons/fa";

// Иконки категорий
export const iconsList = {
    standart: <FaBars />,
    eat: <GiKnifeFork />,
    gear: <GoGear />,
    car: <FaCar />,
    clothes: <GiClothes />,
    trousers: <GiTrousers />,
    shirt: <FaTshirt />,
    wrench: <FaWrench />,
    boot: <PiBootBold />,
};



//Привязка пользовательских параметров товара к категории
const CustomParam =()=> {
    return(
        <>
        </>
    );
}


export default function Category() {
    const [name, setName] = React.useState<string>('');
    const [icon, setIcon] = React.useState<string>('standart');
    const [curent, setCurent] = React.useState(globalState.settings.category.get());
    const category = useHookstate(globalState.settings.category);
    const addCategoryRef = React.useRef(null);

    const addCategory =()=> {
        send('addCategory', {category: {label: name, icon: icon}}).then((res)=> {
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
                    <InputText placeholder='min 3 simbol' value={name} onChange={(e)=> setName(e.value)}/>
                    <span>Иконка</span>
                    <Dropdown 
                        itemTemplate={(data)=> 
                            <>
                                { iconsList[data] }
                                { "  "+data }
                            </>
                        }
                        value={icon} 
                        options={Object.keys(iconsList)} 
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
                <Column header="Иконка" body={(data)=> iconsList[data.icon]}/>
                <Column field="label" header="Наименование"/>
                <Column body={(data)=> 
                    <Button style={{marginLeft:'5px'}} 
                        className="p-button-outlined p-button-danger" 
                        icon="pi pi-trash" 
                        onClick={()=> send('delCategory', {category:data}).then((res)=> {
                            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
                            else category.set(res);
                        })}
                    />
                }/>
            </DataTable>
        </>
    );
}