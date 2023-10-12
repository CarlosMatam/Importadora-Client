import '../CSS/EstilosMostrar.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';



const uri = `${API}/Pagos/`


const MostrarPago = () => {

    const [search, setSearch] = useState("")

    const [pagos, setPago] = useState([])
    useEffect(() => {
        getPagos()
    }, [])

    //procedimineto para mostrar todos los Agentes
    const getPagos = async () => {
        const res = await axios.get(uri)
        setPago(res.data)
    }

    //procedimineto para eliminar un Agente
    const deletePago = async (id_pago) => {
        await axios.delete(`${uri}${id_pago}`)
        getPagos()
    }

    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = pagos
    } else {
        resultado = pagos.filter((dato) =>
            dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()));
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />
            <div className='container-fluid' style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>

                <label>Buscar por ID: </label>
                <input type='text' placeholder='Digite el ID que desea buscar' className='form-control' value={search} onChange={searcher} ></input>
                <div className='row'>
                    <div className='col'>
                        <Link to="/Pagos/create" className='btn btn-primary mt-2 mb-2'>Nuevo Registro</Link>
                        <table className='table'>
                            <thead className='table-primary'>
                                <tr>

                                    <th>FECHA DE INGRESO</th>
                                    <th>MONTO</th>

                                    <th>ID PROVEEDOR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map((pago) => (
                                    <tr key={pago.id_pago}>
                                        <td> {pago.fecha_ingreso} </td>
                                        <td> {pago.monto} </td>

                                        <td> {pago.id_proveedor} </td>
                                        <td>

                                            <Link to={`/Pagos/edit/${pago.id_pago}`} className='btn btn-info'>Editar</Link>
                                            <button onClick={() => deletePago(pago.id_pago)} className='btn btn-danger'>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>



            </div>

        </div>


    )

}

export default MostrarPago