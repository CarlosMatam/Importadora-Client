/*import '../CSS/EstilosCrear.css'*/
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';



const URI = 'http://localhost:8000/Cobros/'
//RECORDAR HACER LA const URI2 cuando exista cliente

const CrearCobro = () => {

    const [search, setSearch] = useState("")

    const [FECHA_INGRESO, setFecha_ingreso] = useState('')
    const [MONTO, setMonto] = useState('')
    const [ESTADO, setEstado] = useState('')
    const [ID_CLIENTE, setId_cliente] = useState('')
    const navigate = useNavigate()

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI, { FECHA_INGRESO: FECHA_INGRESO, MONTO: MONTO, ESTADO: ESTADO, ID_CLIENTE: ID_CLIENTE })
        navigate('/Cobros')
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />
            <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                <form style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }} onSubmit={store}  >

                    <div className="row">
            <div class="col-md-6">
                <label className="form-label">Fecha de ingreso</label>
                <input
                    value={FECHA_INGRESO}
                    onChange={(e) => setFecha_ingreso(e.target.value)}
                    type="date"
                    className='form-control'
                    required />

            </div>
            <div className="col-md-6">
                <label class="form-label">Monto</label>
                <input
                    value={MONTO}
                    onChange={(e) => setMonto(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>
            <div className="col-md-6">
                <label className="form-label">Estado</label>
                <input
                    value={ESTADO}
                    onChange={(e) => setEstado(e.target.value)}
                    type="text"
                    className='form-control'
                    required />

            </div>
            <div className="col-md-6">
                <label className="form-label">ID Cliente</label>
                <input
                    value={ID_CLIENTE}
                    onChange={(e) => setId_cliente(e.target.value)}
                    type="text"
                    className='form-control'
                    required />

            </div>

            <div className="col-12">
                        <button type="submit" className="btn btn-primary" style={{ margin: '10px auto', width: '300px', display: 'block' }}>
                            Guardar
                            </button>
                        </div>
            </div>
        </form>
            </div>
        </div>
    )
}

export default CrearCobro