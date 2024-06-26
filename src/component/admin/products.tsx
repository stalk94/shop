import React from 'react';
import { Tovar } from "../type";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { ReadProduct, AddProduct } from './modal';
import globalState from "../../global.state";
import { useHookstate } from '@hookstate/core';
import { useInfoToolbar } from "../../function";



export default function Products() {
    const products = useHookstate(globalState.products);
    const [curent, setCurent] = React.useState<Tovar>({});
    const [viewAddModal, setViewAddModal] = React.useState<boolean>(false);
    const [viewModal, setViewModal] = React.useState<boolean>(false);

    // => deleteProduct
    const useFetchDelete =(product: Tovar)=> {
        send('deleteProduct', {product: product}).then((res)=> {
            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else products.set(res);
        });
    }
    const useReadProduct =(product: Tovar)=> {
        setCurent(product);
        setViewModal(true);
    }
    const countProduct =(product: Tovar)=> {
        if(product.count < 1) return <div style={{color:'red'}}>
            {product.count}
        </div>
        else if(product.count < 15) return <div style={{color:'orange'}}>
            {product.count}
        </div>
        else return product.count;
    }


    return(
        <>
            <Dialog style={{width:'50vw'}}
                modal={true}
                visible={viewAddModal}  
                onHide={()=> setViewAddModal(false)}
            >
                <AddProduct />
            </Dialog>
            <Dialog style={{width:'50vw'}}
                modal={true}
                visible={viewModal}  
                onHide={()=> setViewModal(false)}
            >
                <ReadProduct product={curent}/>
            </Dialog>
            <DataTable 
                value={products.get()} 
                header={<Button className="p-button-success" icon="pi pi-plus" onClick={()=> setViewAddModal(true)}/>} 
                paginator 
                rows={20}
            >
                <Column 
                    body={(data)=> 
                        <img src={`../upload/${data.image}`}
                            height='60px'
                            onError={(e)=> e.target.src='https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'} 
                            alt={data.name} 
                        />
                    }
                />
                <Column field="name" header="Наименование"/>
                <Column field="price" header="Стоимость" />
                <Column field="category" header="Категория"/>
                <Column header="Остаток" body={countProduct}/>
                <Column field="status" header="Статус" />
                <Column body={(data)=> 
                    <>
                        <Button className="p-button-outlined" icon="pi pi-pencil" onClick={(e)=> useReadProduct(data)}/>
                        <Button style={{marginLeft:'5px'}} className="p-button-outlined p-button-danger" icon="pi pi-trash" onClick={()=> useFetchDelete(data)}/>
                    </>
                }/>
            </DataTable>
        </>
    );
}