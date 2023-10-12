import '../CSS/EstilosCrear.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';




const uri = `${API}/Pagos/`
const uri2 = `${API}/Proveedores/`

const CrearPago = () => {


    const [proveedores, setProveedor] = useState([])
    useEffect(() => {
        getProveedores()
    }, [])

    //procedimineto para mostrar todos los tipos de cedula
    const getProveedores = async () => {
        const res = await axios.get(uri2)
        setProveedor(res.data)
    }

    const [fecha_ingreso, setFecha_ingreso] = useState('')
    const [monto, setMonto] = useState('')
    const [estado, setEstado] = useState('')
    const [id_proveedor, setId_proveedor] = useState('')
    const navigate = useNavigate()

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault()
        await axios.post(uri, { fecha_ingreso: fecha_ingreso, monto: monto, estado: estado, id_proveedor: id_proveedor })
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
                                value={fecha_ingreso}
                                onChange={(e) => setFecha_ingreso(e.target.value)}
                                type="date"
                                className='form-control'
                                required />

                        </div>
                        <div className="col-md-6  mb-4">
                            <label class="form-label">Monto</label>
                            <input
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>
                        <div className="col-md-6  mb-4">
                            <label className="form-label">Estado</label>
                            <input
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                type="text"
                                className='form-control'
                                required />

                        </div>

                        <div className="col-md-6  mb-4" >
                            <label className="form-label">Proveedor</label>
                            <select style={{ marginLeft: '15px' }} value={id_proveedor} onChange={(e) => setId_proveedor(e.target.value)}>
                                {proveedores.map((option) => (
                                    <option key={id_proveedor} value={option.id_proveedor} >{option.nombre}</option>
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