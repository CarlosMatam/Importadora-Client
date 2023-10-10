/*import '../CSS/EstilosMostrar.css'*/
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const URI = `${API}/Agentes/`


const MostrarAG = () => {

    const [search, setSearch] = useState("")

    const [Agentes, setAgente] = useState([])
    useEffect(() => {
        getAgentes()
    }, [])


    //procedimineto para mostrar todos los Agentes
    const getAgentes = async () => {
        const res = await axios.get(URI)
        setAgente(res.data)
    }

    //procedimineto para eliminar un Agente
    const deleteAgente = async (id_agente) => {
        await axios.delete(`${URI}${id_agente}`)
        getAgentes()
    }

    //capturar valores input
    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = Agentes
    } else {
        resultado = Agentes.filter((dato) =>
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
                    <Link to="/create" className='btn btn-primary mt-2 mb-2'>Nuevo Registro</Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>

                                <th>NOMBRE</th>
                                <th>1er APELLIDO</th>
                                <th>2do APELLIDO</th>
                                <th>PROVINCIA</th>
                                <th>TELEFONO</th>
                                <th>TELEFONO 2</th>
                                <th>COMISION</th>
                                <th>ZONA</th>
                                <th>CEDULA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultado.map((Agente) => (
                                <tr key={Agente.id_agente}>
                                    <td> {Agente.nombre} </td>
                                    <td> {Agente.apellido_paterno} </td>
                                    <td> {Agente.apellido_materno} </td>

                                    <td> {Agente.tab_direcciones_agentes_venta.provincia} </td>
                                    <td> {Agente.tab_telefonos_agentes_venta.telefono_1} </td>
                                    <td> {Agente.tab_telefonos_agentes_venta.telefono_2} </td>
                                    <td> {Agente.comision_por_venta} </td>
                                    <td> {Agente.tab_zona.nombre} </td>
                                    <td> {Agente.identificacion} </td>
                                    <td>

                                        <Link to={`/edit/${Agente.id_agente}`} className='btn btn-info'>Editar</Link>
                                        <button onClick={() => deleteAgente(Agente.id_agente)} className='btn btn-danger'>Eliminar</button>
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

export default MostrarAG