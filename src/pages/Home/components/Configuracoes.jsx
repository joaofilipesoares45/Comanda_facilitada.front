import '../css/configuracoes.css'

function Configuracoes() {

    const save = (event) => {
        event.preventDefault()
    }
    return (
        <div className='home-component configuracoes'>
            <form onSubmit={save}>
                <div>
                    <input type="text" name="server-input" id="server-input" />
                    <label htmlFor="server-input">Servidor</label>
                </div>
                <button>Confirmar</button>
            </form>
        </div>

    )
}

export default Configuracoes