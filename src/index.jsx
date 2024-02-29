import React from 'react';
import { send, EVENT } from "./lib/engine";
import globalState from "./global.state";
import { createRoot } from 'react-dom/client'
import "primereact/resources/themes/luna-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import { useDidMount } from 'rooks';
import { Toast } from 'primereact/toast';
import TovarList from "./component/listTovar";



function App() {
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
        send('verifu', {})
    });


    return(
        <>
            <Toast position="bottom-left" ref={toast} />
           <TovarList /> 
        </>
    )
}




window.onload =()=> createRoot(document.querySelector(".root")).render(
    <App/>
);