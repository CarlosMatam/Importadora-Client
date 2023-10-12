import '../CSS/EstilosMostrar.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const uri = `${API}/Transportes/`


const MostrarTransporte = () => {

    const [search, setSearch] = useState("")

    const [transportes, setTransporte] = useState([])
    useEffect(() => {
        getTransportes()
    }, [])


    //procedimineto para mostrar todos los Agentes
    const getTransportes = async () => {
        const res = await axios.get(uri)
        setTransporte(res.data)
    }

    //procedimineto para eliminar un Agente
    const deleteTransporte = async (id_transporte) => {
        await axios.delete(`${uri}${id_transporte}`)
        getTransportes()
    }

    //capturar valores input
    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = transportes
    } else {
        resultado = transportes.filter((dato) =>
            dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()));
    }


    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />

            <div className='container-fluid' style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>

                <label>Buscar por nombre: </label>
                <input type='text' placeholder='Digite el nombre' className='form-control' value={search} onChange={searcher} ></input>
                <div className='row'>
                    <div className='col'>
                        <Link to="/Transportes/create" className='btn btn-primary mt-2 mb-2'>Nuevo Registro</Link>
                        <table className='table'>
                            <thead className='table-primary'>
                                <tr>

                                    <th>NOMBRE</th>
                                    <th>TELEFONO_1</th>
                                    <th>TELEFONO_2</th>
                                    <th>TELEFONO_3</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map((transporte) => (
                                    <tr key={transporte.id_transporte}>
                                        <td> {transporte.nombre} </td>
                                        <td> {transporte.tab_telefonos_transporte.telefono_1} </td>
                                        <td> {transporte.tab_telefonos_transporte.telefono_2} </td>
                                        <td> {transporte.tab_telefonos_transporte.telefono_3} </td>
                                        <td>

                                            <Link to={`/Transportes/edit/${transporte.id_transporte}`} className='btn btn-info'>Editar</Link>
                                            <button onClick={() => deleteTransporte(transporte.id_transporte)} className='btn btn-danger'>Eliminar</button>
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

export default MostrarTransporte