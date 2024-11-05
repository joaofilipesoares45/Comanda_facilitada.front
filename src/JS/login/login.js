import { apiConnection } from "../utils/connection";

const login = (event) => {
    event.preventDefault();
    const { target } = event
    const user = {}

    target.querySelectorAll('input').forEach(({ name, value }) => {
        user[name] = value
    });

    apiConnection('login', 'post', user).then(data => {
        if (data) {
            localStorage.LOGIN_User = JSON.stringify(data)
            window.location = '/ComandaFacilitada/home'
        }
    })
    
}

export default login