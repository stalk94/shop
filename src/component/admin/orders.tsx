import React from 'react';
import { Order } from "../type";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { useInfoToolbar } from "../../function";


/**
 * Список товаров в данной заявке пользователя 
 */
const ListTovar =({order}: {order: Order})=> {
    const onDelete =(element: Tovar)=> {
        send('delProductOrder', { product: element, id: order.id }).then((res)=> {
            if (res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else globalState.orders.set(res);
        });
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

export default function BaseContainer() {
    const [orders, setOrders] = React.useState<Array<Order>>([]);
    
    React.useEffect(()=> {
        send('getOrders', {}).then((res)=> {
            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else setOrders(res);
        });
    }, []);


    return(
        <>
           
        </>
    );
}