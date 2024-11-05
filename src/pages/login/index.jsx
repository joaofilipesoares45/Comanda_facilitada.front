import login from '../../JS/login/login'
import './css/index.css'

function Login() {
    return (
        <div className="page login">
            <header><h1>Comanda Facilitada</h1></header>
            <main>
                <section className='login-section'>
                    <form onSubmit={login}>
                        <div className='inputs'>
                            <div>
                                <input type="text" name='username' id='username'/>
                                <label htmlFor="username">Usuário</label>
                            </div>
                        </div>
                        <button>Acessar</button>
                    </form>                    
                </section>
            </main>
        </div>
    )

}

export default Login