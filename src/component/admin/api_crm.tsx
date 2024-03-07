import React from 'react';
import globalState from "../../global.state";
import { useHookstate } from '@hookstate/core';



export default function Crm() {
    const pathCrmApi = useHookstate(globalState.settings.crm);

    return(
        <>
        </>
    );
}