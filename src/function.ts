
export function useInfoToolbar(type:"error"|"success"|"warn", title:string, text:string) {
    const detail = {
        type: type,
        title: title,
        text: text
    }

    EVENT.emit("info", detail);
}