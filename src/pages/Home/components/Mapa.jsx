import { useContext, useEffect, useState } from 'react'
import { numberForBrl, openModal } from '../../../JS/utils/functions'
import '../css/mapa.css'
import { DataContext } from '../../../context/DataContext'

function Mapa() {

    const { comandas, setComandaCorrente, setTable } = useContext(DataContext)

    const [mapa, setMapa] = useState([1, 2, 3, 4, 5, 6, 7, 8])

    return (
        <div className="home-component mapa">
            <div className='list-tables'>
                {mapa.map((value) => {
                    const table = {
                        id: value,
                        status: 'livre',
                        total: 0,
                        comanda: undefined
                    }
                    comandas.forEach(comanda => {
                        const { mesa, foodlist, status } = comanda

                        if (mesa === value && status === 'active') {
                            let price = 0
                            foodlist.forEach(({ food, quant }) => {
                                price += food.preco * quant
                            })
                            table.status = 'ocupado'
                            table.total = price
                            table.comanda = comanda.id
                        }
                    })

                    return (
                        <div className='table-div' status={table.status} key={'mesa' + table.id} onClick={() => {
                            if (comandas.filter(({ id, status }) => id === Number(table.comanda) && status === 'active')[0]) {
                                openModal('resumo-comanda')
                                setComandaCorrente(comandas.filter(({ id }) => id === Number(table.comanda))[0])
                            } else {
                                const newComanda = {
                                    id: comandas.length + 1,
                                    mesa: table.id,
                                    status: 'active',
                                    foodlist: []
                                }
                                setComandaCorrente(newComanda)

                                openModal('add-produtos')
                                setTable(table.id)
                            }
                        }}>
                            <span>{table.status}</span>
                            <h4>{table.id}</h4>
                            <p>{numberForBrl(table.total)}</p>
                        </div>
                    )
                })
                }
            </div>

        </div>
    )
}

export default Mapa