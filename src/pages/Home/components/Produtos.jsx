import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from '@fortawesome/free-solid-svg-icons'
import '../css/produtos.css'
import { numberForBrl, openModal } from "../../../JS/utils/functions"
import { useContext } from "react"
import { DataContext } from "../../../context/DataContext"

function Produtos() {
    const { produtos, setProduto } = useContext(DataContext)

    const search = ({ target }) => {
        const { value } = target
        const list = document.querySelectorAll('.list-produtos .produto-div')

        if (value.lenght !== 0) {
            list.forEach(div => {
                if (div.querySelector('h4 span').textContent.toLocaleUpperCase().includes(value.toLocaleUpperCase()) || value === div.id) {
                    div.removeAttribute('hidden')
                } else {
                    div.setAttribute('hidden', '')
                }
            })
        } else {
            list.forEach(div => div.removeAttribute('hidden'))
        }
    }

    return (
        <div className="home-component produtos">
            <nav className="s-nav">
                <div className="search">
                    <input type="text" placeholder="Pesquisar..." onKeyUp={search} />
                    <FontAwesomeIcon icon={solid.faMagnifyingGlass} />
                </div>
                <FontAwesomeIcon icon={solid.faFilter} />
                <span onClick={() => openModal('form-produto')}>
                    <FontAwesomeIcon icon={solid.faPlus} />
                </span>
            </nav>
            <div className="list-produtos">
                {produtos.map(({ id, nome, preco }, index) => {
                    return (
                        <div className="produto-div" key={'produto' + id} id={id}  onClick={() => {
                            openModal('form-produto')
                            setProduto(produtos[index])
                            }}>
                            <h4>cod: {id}<span>{nome}</span></h4>
                            <p>{numberForBrl(preco)}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Produtos