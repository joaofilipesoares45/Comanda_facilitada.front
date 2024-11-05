export const openModal = (modalClass) => {
    const modal = document.querySelector(`.${modalClass}`)
    modal.setAttribute('open', '')
    document.querySelector('.close-m-input').focus()

}

export const closeModal = (modalClass) => {
    if (!modalClass) {
        document.querySelectorAll('.modal').forEach(modal => modal.removeAttribute('open'))
    } else {
        document.querySelector(`.${modalClass}`).removeAttribute('open')
    }
}

export const setNotification = (type, title, descricao, func) => {
    if (typeof type === 'object') {
        title = type[1]
        descricao = type[2]
        type = type[0]
    }

    const modal = document.querySelector('.modal.notifications')
    const box = document.querySelector('.modal.notifications span')
    box.innerHTML = ''

    const header = document.createElement('h3')
    header.textContent = title

    const text = document.createElement('p')
    text.innerHTML = descricao

    box.append(header, text)
    modal.setAttribute('open', '')
    modal.setAttribute('type', type)

    if (type === 3) {
        const nav = document.createElement('nav')

        const button1 = document.createElement('button')
        button1.textContent = 'Sim'
        button1.onclick = func
        const button2 = document.createElement('button')
        button2.textContent = 'Não'
        button2.onclick = () => modal.removeAttribute('open')

        nav.append(button1, button2)
        box.append(nav)
    }

    let cont = 0
    const inter = setInterval(() => {
        cont <= 3 ? cont++ : clearInterval(inter) || modal.removeAttribute('open');
    }, 1000)
}

export const numberForBrl = (value) => {
    return new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)
}