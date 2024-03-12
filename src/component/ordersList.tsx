import React from 'react';
import { Order } from "./type";
import globalState from "../global.state";
import { useHookstate } from '@hookstate/core';
import { Accordion, AccordionTab } from 'primereact/accordion';



export default function ListOrders() {
    const orders = useHookstate(globalState.orders);


    return(
        <div className='listOrders'>
            <Accordion activeIndex={0}>
                {orders.get().map((order: Order, index)=> 
                    <AccordionTab key={index}
                        header={}
                    > 
                        
                    </AccordionTab>
                )}
            </Accordion>
        </div>
    );
}