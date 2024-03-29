import React from 'react';
import "../style/auth.css";
import { flags, user } from "../global.state";
import { useHookstate } from '@hookstate/core';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useInfoToolbar } from "../function";



export default function BaseContainer() {
    const state = useHookstate(flags);
    const [login, setLogin] = React.useState<string>();
    const [telephone, setTelephone] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();

    // => auth | reg
    const authUser =()=> {
        send(state.viewAuthType.get(), {login:login,password:password,telephone:telephone}).then((res)=> {
            if(res.error) useInfoToolbar("error", 'Ошибка', res.error);
            else {
                if(state.viewAuthType.get()==='auth') user.set(res);
                else useInfoToolbar("success", 'Регистрация успешна', 'Теперь войдите в систему');
                setLogin();
                setPassword();
                setTelephone();
                state.viewAuth.set(false);
            }
        });
    }


    return(
        <Dialog 
            header={state.viewAuthType.get()==='auth'?'Авторизация':'Регистрация'} 
            visible={state.viewAuth.get()} 
            style={{width: '50vw'}} 
            modal 
            onHide={()=> state.viewAuth.set(false)}
            footer={
                <span>
                    <Button onClick={authUser} label="Отправить" icon="pi pi-check" className="p-button-success" style={{marginRight:'20px'}}/>
                    <Button onClick={()=> state.viewAuth.set(false)} label="Cancel" icon="pi pi-times" className="p-button-secondary"/>
                </span>
            }
        >
            <div className="column">
                <div className="field">
                    <label style={{marginLeft:"5px",color:"gray"}} htmlFor="perm">e-mail</label>
                    <InputText value={login} onChange={(ev)=> setLogin(ev.target.value)} placeholder='test@gm.ru'/>
                </div>
                <div className="field">
                    <label style={{marginLeft:"5px",color:"gray"}} htmlFor="perm">password</label>
                    <input className='p-inputtext p-component' type='password' value={password} onChange={(ev)=> setPassword(ev.target.value)} placeholder='min 6'/>
                </div>
                {state.viewAuthType.get()==='reg' && 
                    <>
                    <div className="field">
                        <label style={{marginLeft:"5px",color:"gray"}} htmlFor="perm">Номер телефона</label>
                        <InputText value={telephone} onChange={(ev)=> setTelephone(ev.target.value)} placeholder='+00000000000'/>
                    </div>
                    </>
                }
            </div>
        </Dialog>
    );
}