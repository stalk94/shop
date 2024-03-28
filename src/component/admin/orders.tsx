import React from 'react';
import "../../style/order.css";
import { Order, Tovar } from "../type";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Dialog } from 'primereact/dialog';
import { ReadOrder } from './modal';
import { useInfoToolbar } from "../../function";
import globalState from "../../global.state";


const ListTovar =({order}: {order: Order})=> {
    const getCountProduct =(idProduct: number)=> {
        const products = globalState.products.get();
        const find = products.find((elem)=> elem.id===idProduct);

        if(find) return find.count;
        else return 'ошибка';
    }
    

    return (
        <DataTable
            value={order.data}
            responsiveLayout="scroll"
        >
            <Column body={(data)=>
                <img alt={data.name}
                    height="40"
                    src={`../upload/${data.image}`}
                    onError={(e)=> e.target.src = 'https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg'}
                />
            } />
            <Column field="name" header="Название" />
            <Column field="price" header="Стоимость" />
            <Column header="Текущий остаток" 
                body={(data)=> getCountProduct(data.id)} 
            />
        </DataTable>
    );
}
const InfoOrder =({order}: {order: Order})=> {
    const [travel, setTravel] = React.useState(order?.travel);
    const [adress, setAdress] = React.useState(order?.adress);
    const [pay, setPay] = React.useState(order?.pay?.id);
    const [massage, setMassage] = React.useState(order?.massage);
    

    return(
        <div className='infoOrder'>
            <div className='segment'>
                <var className='label'>email: </var> 
                {order?.author}
            </div>
            <div className='segment'>
                <var className='label'>телефон: </var>  
                {order?.telephone}
            </div>
            <div className='segment'>
                <var className='label'>Способ доставки: </var> 
                { order?.travel?.label }
            </div>
            <div className='segment'>
                <var className='label'>Адресс доставки: </var> 
                { order?.adress }
            </div>
            <div className='segment'>
                <var className='label'>Способ оплаты: </var> 
                { order?.pay?.label }
            </div>
            <div className='segment'>
                <var className='label'>Заметка: </var> 
                { order?.massage }
            </div>
        </div>
    );
}



export default function BaseContainer() {
    const [orders, setOrders] = React.useState<Array<Order>>([]);
    const [viewModal, setViewModal] = React.useState<boolean>(false);
    
    // title статусов заказа
    const getStatus = (status: string) => {
        if (status === 'create') return (
            <div style={{ color: 'orange', marginLeft:'100px'}}>
                Не оплачен (в обработке)
            </div>
        );
        else if (status === 'panding') return (
            <div style={{ color: 'yellow', marginLeft: '100px' }}>
                Ожидает утверждения
            </div>
        );
        else if (status === 'complete') return (
            <div style={{ color: '#4fbae8', marginLeft: '100px' }}>
                Обработан
            </div>
        );
        else if (status === 'travel') return (
            <div style={{ color: '#bdf471', marginLeft: '100px' }}>
                Отправлен
            </div>
        );
        else return (
            <div style={{ color: 'red', marginLeft: '100px' }}>
                Отменен
            </div>
        );
    }
    const getOrders =()=> {
        send('getOrders', {}).then((res)=> {
            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else setOrders(res);
        });
    }
    React.useEffect(()=> getOrders());


    return(
        <div className='listOrders'>
            <Accordion activeIndex={0}>
                {orders.map((order, index)=>
                    <AccordionTab key={index}
                        header={
                            <div style={{display:"flex",flexDirection:'row'}}>
                                { order.timeshtamp }
                                { getStatus(order.status) }
                            </div>
                        }
                    >
                        <Dialog style={{width:'50vw'}}
                            modal={true}
                            visible={viewModal}  
                            onHide={()=> setViewModal(false)}
                        >
                            <ReadOrder order={order} useGetOrders={getOrders}/>
                        </Dialog>
                        <InfoOrder order={order}/>
                        <Button style={{marginBottom:'15px', marginLeft: '15px'}}
                            className='p-button-outlined p-button-success'
                            icon='pi pi-pencil'
                            label='Редактировать'
                            onClick={()=> setViewModal(true)}
                        />
                        <ListTovar order={order} />
                    </AccordionTab>
                )}
            </Accordion>
        </div>
    );
}

/**
 * setOrders([{
            id: 0,
            timeshtamp: '14.03.2024 18:40',
            author: 'test',
            telephone: '0000',
            status: 'create',
            massage: 'тест 1',
            data: [{
                id: 1000,
                count: 1,
                code: "f230fh0g3",
                name: "Bamboo Watch",
                description: "Product Description",
                image: ["bamboo-watch.jpg"],
                price: 65,
                category: "Прочее",
                status: true
            }],
            travel: {
                id: 0,
                value: 0,
                label: 'Самовывоз',
                description: 'Самовывоз с нашего склада в хащах'
            },
            pay: {
                label: 'Наложенный платеж'
            },
            adress: 'улица Залуп 4'
        }])
 */