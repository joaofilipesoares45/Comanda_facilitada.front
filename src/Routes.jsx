import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/Home'
import { DataProvider } from './context/DataContext'
import Notification from './pages/MicroComponentes/Notification'
import Resumo from './pages/MicroComponentes/Resumo'
import AddProdutos from './pages/MicroComponentes/AddProdutos'
import LoadModal from './pages/MicroComponentes/LoadModal'
import FormProduto from './pages/MicroComponentes/FormProduto'

function AppRoutes() {
    const baseUrl = '/ComandaFacilitada'
    return (
        <Router>
            <Notification/>
            <LoadModal/>
            
            <Routes>
                <Route path={baseUrl + '/'} element={<Login />} />
                <Route exact path={baseUrl + '/home'}
                    element={
                        <DataProvider>
                            <Home />
                            <Resumo />
                            <AddProdutos/>
                            <FormProduto/>
                        </DataProvider>
                    }>
                </Route>
            </Routes>

        </Router>
    )
}

export default AppRoutes