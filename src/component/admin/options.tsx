import React from 'react';
import { Option } from "../type";
import globalState from "../../global.state";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useInfoToolbar } from "../../function";
import { useHookstate } from '@hookstate/core';
import { RxSwitch } from "react-icons/rx";
import { AddOption } from './modal.option';



export default function Options() {
    const [viewModal, setViewModal] = React.useState<boolean>(true);
    const options = useHookstate(globalState.settings.options);

    // => deleteOptionAdmin
    const useDelete =(option: Option)=> {
        send('deleteOptionAdmin', {option: option}).then((res)=> {
            if(res.error) useInfoToolbar('error', 'Ошибка', res.error);
            else options.set(res);
        });
    }
    const justifyTemplate =(option: Option)=> {
        if(option.type==='array'||option.type==='bool') return(option.value.join(', '));
        else if(option.type==='any') return option.value;
        else if(option.type==='color') return(
            <div style={{display:'flex'}}>
                {option.value.map((color, index)=> 
                    <div key={index} 
                        style={{width:'15px',height:'15px',backgroundColor:color,marginRight:'2px'}}
                    >
                    </div>
                )}
            </div>
        );
    }
    const justifyType =(type: 'array'|'radio'|'any'|'bool'|'color')=> {
        if(type==='array') return <i className="pi pi-list"/>;
        else if(type==='bool') return <RxSwitch />;
        else if(type==='color') return <i className="pi pi-palette"/>;
        else if(type==='any') return <i className="pi pi-tags"/>;
    }


    return(
        <div>
            <Dialog style={{ width: '50vw' }}
                modal={true}
                visible={viewModal}
                onHide={()=> setViewModal(false)}
            >
                <AddOption />
            </Dialog>
            <DataTable
                value={options.get()} 
                header={<Button className="p-button-success" icon="pi pi-plus" onClick={()=> setViewModal(true)}/>} 
                paginator 
                rows={20}
            >
                <Column field="name" header="Наименование"/>
                <Column field="category" header="Категория"/>
                <Column header="Тип" body={(data)=> justifyType(data.type)}/>
                <Column header="Значения" body={justifyTemplate}/>
                <Column body={(data)=> 
                    <>
                        <Button style={{marginLeft:'5px'}} className="p-button-outlined p-button-danger" icon="pi pi-trash" onClick={()=> useDelete(data)}/>
                    </>
                }/>
            </DataTable>
        </div>
    );
}