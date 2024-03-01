import EventEmiter from "./emiter";
import store, { useLocalStorage } from "./rxStorage";


globalThis.gurl = 'http://localhost:3000/';
export const STORE = store.init(useLocalStorage());
export const EVENT = new EventEmiter();

export async function send(url, data, metod) {
    let dataServer = {
        method: metod ?? 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(metod!=='GET') dataServer.body = JSON.stringify(data);

    const request = await fetch(gurl + url, dataServer);
    return request.json();
}