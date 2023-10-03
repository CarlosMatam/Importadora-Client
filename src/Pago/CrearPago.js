import '../CSS/EstilosCrear.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';



const URI = 'http://localhost:8000/Pagos/'
const URI2 = 'http://localhost:8000/Proveedores/'

const CrearPago = () => {


    const [Proveedores, setProveedor] = useState([])
    useEffect(() => {
        getProveedores()
    }, [])

    //procedimineto para mostrar todos los tipos de cedula
    const getProveedores = async () => {
        const res = await axios.get(URI2)
        setProveedor(res.data)
    }

    const [FECHA_INGRESO, setFecha_ingreso] = useState('')
    const [MONTO, setMonto] = useState('')
    const [ESTADO, setEstado] = useState('')
    const [ID_PROVEEDOR, setId_proveedor] = useState('')
    const navigate = useNavigate()

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI, { FECHA_INGRESO: FECHA_INGRESO, MONTO: MONTO, ESTADO: ESTADO, ID_PROVEEDOR: ID_PROVEEDOR })
        navigate('/Pagos')
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />

        <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                <form style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }} onSubmit={store}  >

                    <div className="row">
                        <div class="col-md-6  mb-4">
                <label className="form-label">Fecha de ingreso</label>
                <input
                    value={FECHA_INGRESO}
                    onChange={(e) => setFecha_ingreso(e.target.value)}
                    type="date"
                    className='form-control'
                    required />

            </div>
                        <div className="col-md-6  mb-4">
                <label class="form-label">Monto</label>
                <input
                    value={MONTO}
                    onChange={(e) => setMonto(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>
                        <div className="col-md-6  mb-4">
                <label className="form-label">Estado</label>
                <input
                    value={ESTADO}
                    onChange={(e) => setEstado(e.target.value)}
                    type="text"
                    className='form-control'
                    required />

            </div>
          
                        <div className="col-md-6  mb-4" > 
                            <label className="form-label">Proveedor</label>    
                            <select style={{ marginLeft: '15px' }} value={ID_PROVEEDOR} onChange={(e) => setId_proveedor(e.target.value)}>
                {Proveedores.map((option) => (
                    <option key={ID_PROVEEDOR} value={option.ID_PROVEEDOR} >{option.NOMBRE}</option>
                ))}
                            </select>
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

export default CrearPago