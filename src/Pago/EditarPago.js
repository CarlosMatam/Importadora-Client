import '../CSS/EstilosEditar.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';



const uri = `${API}/Pagos/`

const EditarPago = () => {
    const [fecha_ingreso, setFecha_ingreso] = useState('')
    const [monto, setMonto] = useState('')
    const [estado, setEstado] = useState('')
    const [id_proveedor, setId_proveedor] = useState('')
    const navigate = useNavigate()
    const { id_pago } = useParams()


    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()
        await axios.put(uri + id_pago, {
            fecha_ingreso: fecha_ingreso, monto: monto, estado: estado, id_proveedor: id_proveedor
        })
        navigate('/Pagos')
    }



    useEffect(() => {
        getPagoById()
    }, [])

    const getPagoById = async () => {
        const res = await axios.get(uri + id_pago)
        setFecha_ingreso(res.data.fecha_ingreso)
        setMonto(res.data.monto)
        setEstado(res.data.estado)
        setId_proveedor(res.data.id_proveedor)
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />


            <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                <form onSubmit={update} style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }}>

                    <div className="row">
                        <div class="col-md-6">
                            <label className="form-label">Fecha de ingreso</label>
                            <input
                                value={fecha_ingreso}
                                onChange={(e) => setFecha_ingreso(e.target.value)}
                                type="text"
                                className='form-control'
                                required />

                        </div>
                        <div className="col-md-6">
                            <label class="form-label">Monto</label>
                            <input
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Estado</label>
                            <input
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                type="text"
                                className='form-control'
                                required />

                        </div>
                        <div className="col-12">
                            <label className="form-label">ID Proveedor</label>
                            <input
                                value={id_proveedor}
                                onChange={(e) => setId_proveedor(e.target.value)}
                                type="text"
                                className='form-control'
                                required />

                        </div>
                        <button type="submit" className="btn btn-primary" style={{ margin: '10px auto', width: '300px', display: 'block' }}>Actualizar</button>
                    </div>
                </form>
            </div>
        </div>

    )


}

export default EditarPago