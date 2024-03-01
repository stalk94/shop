import React from 'react';
import { send, EVENT } from "./lib/engine";
import globalState, { flags } from "./global.state";
import { createRoot } from 'react-dom/client'
import "primereact/resources/themes/luna-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import { useDidMount } from 'rooks';
import { Toast } from 'primereact/toast';
import TovarList from "./component/listTovar";
import ShopingCart from "./component/shopingCart";
import Header from "./component/header";
import BodyFavorite from "./component/body";
import Auth from "./component/auth";



function App() {
    const [view, setView] = React.useState();
    const toast = React.useRef(null);


    const showToast =(type, title, text)=> {
        toast.current.show({
            severity: type, 
            summary: <>{ title }</>, 
            detail: text, 
            life: 2000
        });
    }
    useDidMount(()=> {
        EVENT.on('info', (detail)=> showToast(detail.type, detail.title, detail.text));
        send('verifu', {}).then(globalState.user.set);
        send('getShopingCart', {}).then(globalState.shopingCart.set);
    });


    return(
        <React.Fragment>
            <Toast position="bottom-left" ref={toast} />
            <Auth /> 
            <Header />
            <ShopingCart />
            { view }
        </React.Fragment>
    );
}




window.onload =()=> createRoot(document.querySelector(".root")).render(
    <App/>
);


/**  ! В продакшене врубить
 * window.onbeforeunload =(event)=> { 
            event.preventDefault(); 
            send("exit", {}).then((res)=> {
                if(res.error) useInfoToolbar("error", "Error", res.error);
                else console.log(res);
            });
        };
 */