import { createContext, useEffect, useState } from "react";
import Comanda from "../pages/Home/components/Comanda";
import { apiConnection } from "../JS/utils/connection";


export const DataContext = createContext();

export function DataProvider({ children }) {
    const [component, setComponent] = useState(<Comanda />)
    const handleChangeComponent = (component, { target }) => {
        target.parentElement.querySelectorAll('svg').forEach(element => {
            element.removeAttribute('selected')
        });

        if (!target.hasAttribute('selected')) {
            setComponent(component)

            target.setAttribute('selected', '')
        } else {
            target.removeAttribute('selected')
        }
    }

    const [comandaCorrente, setComandaCorrente] = useState()

    const [table, setTable] = useState()

    const [produtos, setProdutos] = useState([])

    const [comandas, setComandas] = useState([])

    const [produto, setProduto] = useState()

    const value = {
        component,
        handleChangeComponent,

        comandaCorrente,
        setComandaCorrente,

        produto, 
        setProduto,

        table, 
        setTable,

        produtos,
        setProdutos,

        comandas,
        setComandas,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}