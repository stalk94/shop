import React from 'react';
import "./lib/engine";
import globalState, { flags, user } from "./global.state";
import { useHookstate } from '@hookstate/core';
import { createRoot } from 'react-dom/client'
import "primereact/resources/themes/luna-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import { useDidMount } from 'rooks';
import { Toast } from 'primereact/toast';
import TovarList from "./component/listTovar";
import Header from "./component/header";
import BodyFavorite from "./component/body";
import Auth from "./component/auth";

const components = {
    base: <BodyFavorite />,
    category: <TovarList />
}


function App() {
    const view = useHookstate(flags.view);
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
        send('getShop', {}).then((res)=> {
            globalState.settings.set(res.settings);
            globalState.products.set(res.products);
            globalState.shopingCart.set(res.shopingCart);
        });
        //send('verifu', {}).then(user.set);
    });


    return(
        <React.Fragment>
            <Toast position="bottom-left" ref={toast} />
            <Auth /> 
            <Header />
            { components[view.get()] }
            <footer style={{textAlign:"center",backgroundColor:"black",marginTop:'3px'}}>
                © {globalState.settings.cooper.get() } { new Date().getFullYear() }
            </footer>
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