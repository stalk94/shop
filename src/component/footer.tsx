import React from 'react';
import "../style/footer.css";
import globalState, { flags } from "../global.state";
import { useHookstate } from '@hookstate/core';



/**
 * Блоки нижнего контикула.
 *  - О нас
 *  - Оплата и Доставка
 *  - 
 */
export default function BaseContainer() {
    const state = useHookstate(flags);


    return(
        <div className='PromoContainer'>
            <ul className="column">
                <li className='info' onClick={()=> state.view.set('contactInfo')}>Контакты</li>
                <li className='info' onClick={()=> state.view.set('repeatInfo')}>Возврат товара</li>
                <li className='info' onClick={()=> state.view.set('payInfo')}>Оплата и Доставка</li>
                <li className='info' onClick={()=> state.view.set('contractInfo')}>Условия и договор</li>
            </ul>
        </div>
    );
}