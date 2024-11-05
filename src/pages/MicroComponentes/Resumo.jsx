import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from '@fortawesome/free-solid-svg-icons'
import './css/resumo.css'
import { closeModal, numberForBrl, openModal, setNotification } from "../../JS/utils/functions"
import { useContext } from "react"
import { DataContext } from "../../context/DataContext"
import { apiConnection } from "../../JS/utils/connection"

function Resumo() {
    const { comandaCorrente, setComandaCorrente } = useContext(DataContext)
    const { mesa, foodlist, status } = comandaCorrente || { mesa: '', foodlist: [], status: '' }

    const finish = () => {
        if (comandaCorrente.foodlist.length > 0) {
            comandaCorrente.status = 'finish'
            apiConnection('comandas', 'put', comandaCorrente)
            setNotification(1, 'Sucesso', 'Comanda finalizada')
            closeModal('resumo-comanda');
            setComandaCorrente()
        } else {
            setNotification(2, 'Erro', 'Nenhum item adicionado a comanda!')
        }
    }

    const remove = ({ target }) => {
        const index = target.id
        const updateComanda = comandaCorrente
        if (updateComanda.foodlist[index].quant === 1) {
            updateComanda.foodlist.splice(index, 1)
        } else {
            updateComanda.foodlist[index].quant -= 1
        }
        apiConnection('comandas', 'put', updateComanda)
        setComandaCorrente(updateComanda)
    }

    const cancel = () => {
        if (foodlist.length === 0) {
            setNotification(3, 'Atenção', 'Quer mesmo cancelar essa comanda?', () => {
                apiConnection('comandas', 'delete', comandaCorrente)
                setComandaCorrente()
                closeModal('resumo-comanda')
                setNotification(1, 'Sucesso', 'Cancelamento finalizado!')
            })
        } else {
            setNotification(2, 'Erro', 'Comanda ainda está ativa!')
        }
    }

    const getTotal = () => {
        let total = 0
        foodlist.forEach(({ food, quant }) => {
            total += food.preco * quant
        });
        return total
    }

    return (
        <div className="modal resumo-comanda">
            <div className="resumo-content">


                <div className="data">
                    <h2>
                        <FontAwesomeIcon icon={solid.faArrowLeft} onClick={() => {
                            closeModal('resumo-comanda');
                            setComandaCorrente()
                        }} />
                        Resumo
                        <FontAwesomeIcon icon={solid.faPlus} onClick={() => {
                            if (status === 'active') {
                                openModal('add-produtos')
                            } else {
                                setNotification(2, 'Erro', 'Comanda fechada!')
                            }
                        }} />
                    </h2>
                    <h3><span>Comanda/Mesa<p>{mesa}</p></span></h3>
                    <div className="food-list">
                        {
                            foodlist.length > 0 ? foodlist.map(({ quant, food }, index) => {
                                return (
                                    <div key={'produto' + food.id} >
                                        <h4>
                                            {status === 'active' && <FontAwesomeIcon icon={solid.faMinus} id={index} status={status} onClick={remove} />}
                                            {quant} x {food.nome}
                                        </h4>
                                        <p>{numberForBrl(quant * food.preco)}</p>
                                    </div>
                                );
                            }) : <div className="info"><h4><FontAwesomeIcon icon={solid.faExclamation} />Nenhum item adionado a esta comanda!</h4></div>
                        }

                        {
                            foodlist.length > 0 ?
                                <span className="total">
                                    Total: {numberForBrl(getTotal())}
                                </span> :
                                ''
                        }
                    </div>
                </div>

                {status === 'active' &&
                    <nav>
                        {foodlist.length === 0 ?
                            <button onClick={cancel}>Cancelar</button> :
                            <button onClick={finish} className="finish">Encerrar Comanda</button>}
                    </nav>}
            </div>
        </div>
    )
}

export default Resumo