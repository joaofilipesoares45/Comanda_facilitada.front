import './css/index.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect } from 'react'
import { DataContext } from '../../context/DataContext'
import Comanda from './components/Comanda'
import Mapa from './components/Mapa'
import Produtos from './components/Produtos'
import Configuracoes from './components/Configuracoes'
import { apiConnection } from '../../JS/utils/connection'
import { closeModal, setNotification } from '../../JS/utils/functions'

function Home() {
    const { component, handleChangeComponent, setProdutos, setComandas } = useContext(DataContext)

    useEffect(() => {
        const getData = async () => {
            const comandas = await apiConnection('comandas', 'get')
            const produtos = await apiConnection('produtos', 'get')
            if (comandas) {
                setComandas(comandas || [])
                setProdutos(produtos || [])
            } else {
                setNotification(2, 'Erro', 'Servidor não está respondendo')
            }
        }
        getData()
    })

    const escape = (event) => {
        const { target, key } = event

        if (target.className === 'close-m-input' && key === 'Escape') {

            closeModal()
        }
    }

    return (
        <div className="page home" >
            <input type="text" style={{ opacity: 0, position: 'absolute', zIndex: -2 }} className='close-m-input' onKeyUp={(event) => {
                const {key} = event
                key === 'Escape' && closeModal()
            }} />
            <header><h1>Comandas</h1></header>
            <main>
                <nav className="home-navigator">
                    <FontAwesomeIcon icon={solid.faCartShopping} onClick={(event) => handleChangeComponent(<Comanda />, event)} />
                    <FontAwesomeIcon icon={solid.faBorderAll} onClick={(event) => handleChangeComponent(<Mapa />, event)} />
                    <FontAwesomeIcon icon={solid.faBoxArchive} onClick={(event) => handleChangeComponent(<Produtos />, event)} />
                    <FontAwesomeIcon icon={solid.faGear} onClick={(event) => handleChangeComponent(<Configuracoes />, event)} />
                </nav>
                <section className='home-content'>
                    {component}
                </section>

            </main>

        </div>
    )
}

export default Home