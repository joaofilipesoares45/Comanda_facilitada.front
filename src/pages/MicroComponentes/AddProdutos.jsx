import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../context/DataContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from '@fortawesome/free-solid-svg-icons'
import { closeModal, numberForBrl, openModal, setNotification } from "../../JS/utils/functions"
import './css/add-produtos.css'
import { apiConnection } from "../../JS/utils/connection"

function AddProdutos() {
    const { produtos, comandaCorrente, setComandaCorrente, comandas } = useContext(DataContext)

    const [temporaryList, setTemporaryList] = useState([])

    useEffect(() => {
        // setTemporaryList([])
        if (comandaCorrente) {
            setTemporaryList(comandaCorrente.foodlist)
        }
    }, [setComandaCorrente, temporaryList])


    const search = ({ target }) => {
        const { value } = target
        const list = document.querySelectorAll('.list-produtos.s .produto-div')

        if (value.lenght !== 0) {
            list.forEach(div => {
                if (div.querySelector('h4 p').textContent.toLocaleUpperCase().includes(value.toLocaleUpperCase()) || value === div.id) {
                    div.removeAttribute('hidden')
                } else {
                    div.setAttribute('hidden', '')
                }
            })
        } else {
            list.forEach(div => div.removeAttribute('hidden'))
        }
    }

    const updateList = () => {
        const updateComanda = comandaCorrente
        updateComanda.foodlist = temporaryList
        
        if (comandas.filter(({ id }) => id === comandaCorrente.id).length !== 0) {
            apiConnection('comandas', 'put', updateComanda)
            setComandaCorrente(updateComanda)
        } else {
            setComandaCorrente(updateComanda)
            openModal('resumo-comanda')
            apiConnection('comandas', 'post', comandaCorrente)
        }

        if (temporaryList.length > 0) {
            setTemporaryList([])
            closeModal('add-produtos')
        } else {
            setNotification(2, `Erro`, 'Nenhum produto selecionado!')
        }
    }

    const add = ({ target }) => {
        const index = target.id

        if (!temporaryList.filter(el => el.food.id === produtos[index].id).length > 0) {
            temporaryList.push({
                quant: 1,
                food: produtos[index]
            })
        } else {
            temporaryList.forEach(el => {
                if (el.food.id === produtos[index].id) {
                    el.quant += 1
                }
            })
        }
        setNotification(1, 'Sucesso', 'Adicionado a comanda: <br>' + produtos[index].nome + ' x ' + temporaryList[temporaryList.length - 1].quant)
    }

    return (
        <div className="modal add-produtos">
            <div className="content">
                <h2>
                    <FontAwesomeIcon icon={solid.faArrowLeft} onClick={() => {
                        closeModal('add-produtos');
                        setTemporaryList([]);
                        setComandaCorrente()
                    }} />
                    Produtos
                    <FontAwesomeIcon icon={solid.faCheck} onClick={updateList} />
                </h2>

                <nav className="s-nav">
                    <div className="search">
                        <input type="text" placeholder="Pesquisar..." onKeyUp={search} />
                        <FontAwesomeIcon icon={solid.faMagnifyingGlass} />
                    </div>
                </nav>

                <div className="list-produtos s">
                    {produtos.map(({ id, nome, preco }, index) => {
                        return (
                            <div className="produto-div" key={'produto' + id} id={id}>
                                <h4><p>{nome}</p><span>{numberForBrl(preco)}</span></h4>
                                <FontAwesomeIcon icon={solid.faPlus} onClick={add} id={index} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AddProdutos