
export function useInfoToolbar(type:"error"|"success"|"warn", title:string, text:string) {
    const detail = {
        type: type,
        title: title,
        text: text
    }

    EVENT.emit("info", detail);
}

export function upload(event) {
    const formData = new FormData();

    const selectedFile = event.target.files[0];
    formData.append("myFile", selectedFile, selectedFile.name);
    return formData;
}