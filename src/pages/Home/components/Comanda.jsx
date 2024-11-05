import { useContext } from 'react'
import { setNotification, openModal, numberForBrl } from '../../../JS/utils/functions'
import '../css/comanda.css'
import { DataContext } from '../../../context/DataContext'

function Comanda() {

    const { comandas, setComandaCorrente } = useContext(DataContext)

    const startComanda = (event) => {
        event.preventDefault()
        const { value } = event.target.querySelector('input')
        if (value.length > 0) {
            const comanda = comandas.filter(({ id, mesa }) => (id === Number(value) || mesa === Number(value)))[0]
            if (comanda) {
                openModal('resumo-comanda')
                setComandaCorrente(comanda)
            } else {
                setNotification(2, 'Erro', 'Comanda não encontrada!!')
            }
        } else {
            setNotification(2, 'Erro', 'Informe o número da mesa ou comanda!!')
        }
    }

    return (
        <div className="home-component comanda">
            <form onSubmit={startComanda}>
                <div>
                    <input type="number" name='input-comanda' id='input-comanda' />
                    <label htmlFor="input-comanda">Comanda/Mesa</label>
                </div>
                <button>Exibir detalhes</button>
            </form>

            <div className='list-comandas'>
                {comandas.reverse().map(({ id, mesa, foodlist, status }) => {
                    let total = 0
                    foodlist.forEach(({ quant, food }) => {
                        total += quant * food.preco
                    });
                    return (
                        <div className='comanda-div' key={'cm' + id} status={status} onClick={() => {
                            const comanda = comandas.filter((cm) => (cm.id === id))[0]
                            if (comanda) {
                                openModal('resumo-comanda')
                                setComandaCorrente(comanda)
                            }
                        }}>
                            <h4>Mesa: {mesa}<p>{numberForBrl(total)}</p></h4>
                            <p>status: {status === 'active' ? 'aberta' : 'fechada'}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Comanda