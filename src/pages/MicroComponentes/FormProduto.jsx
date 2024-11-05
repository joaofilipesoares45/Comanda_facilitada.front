import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from '@fortawesome/free-solid-svg-icons'
import './css/form-produto.css'

import { closeModal, setNotification } from "../../JS/utils/functions"
import { useContext, useEffect, useState } from "react"
import { apiConnection } from "../../JS/utils/connection"
import { DataContext } from "../../context/DataContext"
import { useForm } from "react-hook-form"

function FormProduto() {
    const { produto, setProduto, produtos } = useContext(DataContext)
    const { register, setValue } = useForm({
        defaultValues: {
            nome: '',
            preco: ''
        }
    })

    useEffect(() => {
        if (produto) {
            setValue('nome', produto.nome)
            setValue('preco', produto.preco)
        } else {
            setValue('nome', '')
            setValue('preco', '')
        }
    }, [produto])

    const newProduct = () => {
        const inputs = document.querySelectorAll('.form-produto .inputs input')

        const produto = {
            id: produtos.length + 1
        }
        
        let verif = true

        inputs.forEach(input => {
            const { id, value } = input
            produto[id] = value
            if (id === 'preco') {
                produto[id] = Number(value)
            }

            if (value.length === 0) {
                verif = false
            }
        })
        

        if (verif) {
            apiConnection('produtos', 'post', produto)
            setProduto()
            closeModal()
        }else {
            setNotification(2, 'Erro', 'Preecha todos os campos!')
        }
    }

    const update = () => {

        const inputs = document.querySelectorAll('.form-produto .inputs input')

        const updateProduto = {
            id: produto.id
        }

        let verif = true

        inputs.forEach(input => {
            const { id, value } = input
            updateProduto[id] = value
            if (id === 'preco') {
                updateProduto[id] = Number(value)
            }

            if (value.length === 0) {
                verif = false
            }
        })
        
        if (verif) {
            apiConnection('produtos', 'put', updateProduto)
            setProduto()
            closeModal()
        }else {
            setNotification(2, 'Erro', 'Preecha todos os campos!')
        }
    }

    const deleteProduct = () => {
        apiConnection('produtos', 'delete', produto)
        setProduto()
        closeModal()
    }

    return (
        <div className="modal form-produto">
            <div className="form-content">
                <h2>Formulario<FontAwesomeIcon icon={solid.faClose} onClick={() => {
                    closeModal()
                    setProduto()
                }} /></h2>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="inputs">
                        <div>
                            <input type="text" id="nome" {...register('nome')} />
                            <label htmlFor="nome">Nome</label>
                        </div>
                        <div>
                            <input type="number" id="preco" {...register('preco')} />
                            <label htmlFor="preco">Preço</label>
                        </div>
                    </div>
                    <nav>
                        {produto && <button onClick={deleteProduct} className="delete">Excluir</button>}
                        {!produto ?
                            <button onClick={newProduct}>Salvar</button> :
                            <button onClick={update}>Atualizar</button>}
                    </nav>
                </form>
            </div>
        </div>
    )
}

export default FormProduto