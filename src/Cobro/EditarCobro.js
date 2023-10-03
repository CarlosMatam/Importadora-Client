/*import '../CSS/EstilosEditar.css'*/
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const URI = `${API}/Cobros/`

const EditarCobro = () => {
    const [FECHA_INGRESO, setFecha_ingreso] = useState('')
    const [MONTO, setMonto] = useState('')
    const [ESTADO, setEstado] = useState('')
    const [ID_CLIENTE, setId_cliente] = useState('')
    const navigate = useNavigate()
    const { ID_COBRO } = useParams()


    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI + ID_COBRO, {
            FECHA_INGRESO: FECHA_INGRESO, MONTO: MONTO, ESTADO: ESTADO, ID_CLIENTE: ID_CLIENTE
        })
        navigate('/Cobros')
    }



    useEffect(() => {
        getCobroById()
    }, [])

    const getCobroById = async () => {
        const res = await axios.get(URI + ID_COBRO)
        setFecha_ingreso(res.data.FECHA_INGRESO)
        setMonto(res.data.MONTO)
        setEstado(res.data.ESTADO)
        setId_cliente(res.data.ID_CLIENTE)
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />

       

                <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                    <form onSubmit={update} className="container" style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }}>
                        <div className="row">
                <div class="col-md-6">
                    <label className="form-label">Fecha de ingreso</label>
                    <input
                        value={FECHA_INGRESO}
                        onChange={(e) => setFecha_ingreso(e.target.value)}
                        type="text"
                        className='form-control'
                        required />

                </div>
                <div className="col-md-6">
                    <label className="form-label">Monto</label>
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
                        <button type="submit" className="btn btn-primary" style={{ margin: '10px auto', width: '300px', display: 'block' }}>Actualizar</button>
                        </div>
            </form>
                </div>
            </div>
       
    )


}

export default EditarCobro