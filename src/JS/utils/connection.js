import { setNotification } from "./functions"

export const apiConnection = async (path, method, body, func) => {
    const link = `http://localhost:3001/${path}`
    let head = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: method.toUpperCase(),
        body: JSON.stringify(body)
    }

    try {
        return await fetch(link, head)
            .then(res => res.json())
            .then(data => {
                if (!data.msg) {
                    return data
                } else {
                    setNotification(data.msg)
                }
            })
    } catch (e) {
        // setNotification(2, 'Erro', 'Servidor não está respondendo')
    }
}   
