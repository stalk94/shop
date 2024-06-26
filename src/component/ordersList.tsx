import React from 'react';
import "../style/order.css";
import { Order, Tovar, PayMethod } from "./type";
import globalState, { user } from "../global.state";
import { useHookstate } from '@hookstate/core';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { useInfoToolbar } from "../function";
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { Accordion, AccordionTab } from 'primereact/accordion';


const ListTovar =({order}: {order: Order})=> {
    // удалить из ордера товар
    const onDelete =(element: Tovar)=> {
        const arrayOrders = JSON.parse(JSON.stringify(globalState.orders.get()));
        const orders = [];

        arrayOrders.forEach((oldOrder)=> {
            if(oldOrder.id === order.id) {
                oldOrder.data = oldOrder.data.filter((tovar)=> tovar.id !== element.id);
            }
            orders.push(oldOrder);
        });

        globalState.orders.set(orders);
    }
    // подробная информация(пояснение) о статусе заказа
    const infoHeader =()=> {
        if(order.status==='create') return(
            <var style={{fontWeight:'lighter', color: 'grey'}}>
               ⚠️ Ваш заказ создан и ожидает обработки. Вы можете его оплатить через предложенные способы, либо ожидайте связи с менеджером для дальнейших инструкций.
            </var>
        );
        else if(order.status==='panding') return(
            <var style={{fontWeight:'lighter', color: 'grey'}}>
              ⚠️ В вашем заказе не хватает некоторых данных, ожидайте менеджер с вами свяжеться.
            </var>
        );
        else if(order.status==='complete') return(
            <var style={{fontWeight:'lighter', color: 'grey'}}>
              ⚠️ Заказ был принят и успешно обработан менеджером. Ожидайте дальнейших инструкций
            </var>
        );
        else if(order.status==='travel') return(
            <var style={{fontWeight:'lighter', color: 'grey'}}>
               ⚠️ Заказ был отправлен курьерской службой. Детали читайте ниже.
            </var>
        );
        else return(
            <var style={{fontWeight:'lighter', color: 'grey'}}>
               ⚠️ Что то пошло не так, либо заказ был отменен.
            </var>
        );
    }
    
    return (
        <DataTable
            value={order.data}
            responsiveLayout="scroll"
            header={infoHeader}
            rows={9}
            paginator
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
            {order.status==='create' && 
                <Column body={(data)=>
                    <Button
                        className="p-button-outlined p-button-danger"
                        icon="pi pi-times"
                        onClick={()=> onDelete(data)}
                    />
                } />
            }
        </DataTable>
    );
}
const TravelMethods =({curent, setMethod})=> {
    const travels = useHookstate(globalState.settings.travels);

    return(
        <div className='travels'>
            <div className='travelHeader'>
                <i className="pi pi-truck"> Cпособ доставки</i>
            </div>
            {travels.get().map((travel)=>
                <div className='travel' key={travel.id}>
                    <div className='radioButtonWrapper'>
                        <RadioButton 
                            inputId={`travel${travel.id}`}
                            value={`travel${travel.id}`}
                            name="travelMethod" 
                            onChange={(e)=> setMethod(travel.id)} 
                            checked={`travel${curent}` === `travel${travel.id}`} 
                        />
                        <label htmlFor={`travel${travel.id}`}> {travel.label}</label>
                    </div>
                    <div className='description'>
                        <i className="pi pi-info-circle" style={{fontSize:'0.8rem'}}/>
                        { " "+travel.description }
                    </div>
                </div>
            )}
        </div>
    );
}
const PayMethods =({travelCurent, curent, setMethod})=> {
    const [pays, setPays] = React.useState([]);
    const travels = useHookstate(globalState.settings.travels);

    React.useEffect(()=> {
        const find = globalState.settings.pays.get().filter((val)=> val.travelId===travelCurent);
        setPays(find);
    }, [travelCurent, curent]);


    return(
        <div className='travels'>
            {pays.length > 0 && 
                <div className='travelHeader'>
                    <i className="pi pi-money-bill"> Cпособы оплаты</i>
                </div>
            }
            {pays.map((pay: PayMethod)=>
                <div className='travel' key={pay.id}>
                    <div className='radioButtonWrapper'>
                        <RadioButton 
                            inputId={`pay${pay.id}`}
                            value={`pay${pay.id}`}
                            name="payMethod" 
                            onChange={(e)=> setMethod(pay.id)} 
                            checked={`pay${curent}` === `pay${pay.id}`} 
                        />
                        <label htmlFor={`pay${pay.id}`}> {pay.label}</label>
                    </div>
                    <div className='description'>
                        <i className="pi pi-info-circle" style={{fontSize:'0.8rem'}}/>
                        { " "+pay.description }
                    </div>
                </div>
            )}
        </div>
    );
}
const Wrapper =({order}: {order: Order})=> {
    const [adress, setAdress] = React.useState<string>();
    const [curentPayMethod, setPayMethod] = React.useState<number>();
    const [curentTravelMethod, setTravelMethod] = React.useState<number>();
    const [telephone, setTelephone] = React.useState<string>(user.telephone.get());

    // => orderRead
    const fetchReadOrder =(status: string)=> {
        const data = {
            id: order.id,
            telephone: order.telephone,
            massage: order.massage,
            status: status,
            data: order.data,
            travel: curentTravelMethod,
            pay: curentPayMethod,
            adress: adress
        }

        // отправка серверу изменений
        send('orderRead', data).then((res)=> {
            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else globalState.orders.set(res);
        });
    }
    // оплата заказа
    const orderReadHandler =()=> {
        
    }


    return(
        <>
            <div style={{border:'1px solid #191919', marginTop:'15px'}}>
                <div className='travelHeader'>
                    <i className="pi pi-phone"> Телефон</i>
                </div>
                <InputText style={{width:'50%'}} value={telephone} onChange={(e)=> setTelephone(e.target.value)} />
                <div className='travelHeader'>
                    <i className="pi pi-map-marker"> Адресс</i>
                </div>
                <InputText style={{width:'50%'}} value={adress} onChange={(e)=> setAdress(e.target.value)} />
            </div>
            <div style={{border:'1px solid #191919', marginTop:'15px'}}>
                <TravelMethods curent={curentTravelMethod} setMethod={setTravelMethod} />
                <PayMethods travelCurent={curentTravelMethod} curent={curentPayMethod} setMethod={setPayMethod} />
                <div className='description'>
                    { order.massage }
                </div>
                <Button style={{marginTop:'5px'}}
                    className='p-button-outlined p-button-success'
                    icon='pi pi-check'
                    disabled={curentPayMethod===undefined ? true : false}
                    label='Подтвердить'
                    onClick={orderReadHandler}
                />
            </div>
        </>
    );
}


export default function ListOrders() {
    const orders = useHookstate(globalState.orders);

    // title статусов заказа
    const getStatus =(status: string)=> {
        if (status === 'create') return (
            <div style={{ color: 'orange', marginLeft:'100px'}}>
                Не оплачен (в обработке)
            </div>
        );
        else if (status === 'panding') return (
            <div style={{ color: 'yellow', marginLeft: '100px' }}>
                Ожидайте связи с менеджером
            </div>
        );
        else if (status === 'complete') return (
            <div style={{ color: '#4fbae8', marginLeft: '100px' }}>
                Обработан
            </div>
        );
        else if (status === 'travel') return (
            <div style={{ color: '#bdf471', marginLeft: '100px' }}>
                В пути
            </div>
        );
        else return (
            <div style={{ color: 'red', marginLeft: '100px' }}>
                Отменен
            </div>
        );
    }
    

    return (
        <div className='listOrders'>
            <Accordion activeIndex={0}>
                {orders.get().map((order, index)=>
                    <AccordionTab key={index}
                        header={
                            <div style={{display:"flex",flexDirection:'row'}}>
                                { order.timeshtamp }
                                { getStatus(order.status) }
                            </div>
                        }
                    >
                        <ListTovar order={order} />
                        {order.status==='create' 
                            ? <Wrapper order={order} />
                            : <>
                                Выбранные способы
                             </>
                        }
                    </AccordionTab>
                )}
            </Accordion>
        </div>
    );
}