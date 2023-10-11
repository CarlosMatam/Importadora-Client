/*import '../CSS/EstilosMostrar.css'*/
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const uri = `${API}/Clientes/`


const MostrarCliente = () => {

    const [search, setSearch] = useState("")

    const [clientes, setCliente] = useState([])
    useEffect(() => {
        getClientes()
    }, [])


    //procedimineto para mostrar todos los Agentes
    const getClientes = async () => {
        const res = await axios.get(uri)
        setCliente(res.data)
    }

    //procedimineto para eliminar un Agente
    const deleteCliente = async (id_cliente) => {
        await axios.delete(`${uri}${id_cliente}`)
        getClientes()
    }

    //capturar valores input
    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = clientes
    } else {
        resultado = clientes.filter((dato) =>
            dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()));
    }


    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />

            <div className='container-fluid'>

                <label>Buscar por nombre: </label>
                <input type='text' placeholder='Digite el nombre' className='form-control' value={search} onChange={searcher} ></input>
                <div className='row'>
                    <div className='col'>
                        <Link to="/Clientes/create" className='btn btn-primary mt-2 mb-2'>Nuevo Registro</Link>
                        <table className='table'>
                            <thead className='table-primary'>
                                <tr>

                                    <th>NOMBRE</th>
                                    <th>1er APELLIDO</th>
                                    <th>2do APELLIDO</th>
                                    <th>PROVINCIA</th>
                                    <th>TELÉFONO</th>
                                    <th>TELÉFONO 2</th>
                                    <th>TIPO DE CLIENTE</th>
                                    <th>TIPO DE CÉDULA</th>
                                    <th>CÉDULA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map((cliente) => (
                                    <tr key={cliente.id_cliente}>
                                        <td> {cliente.nombre} </td>
                                        <td> {cliente.apellido_paterno} </td>
                                        <td> {cliente.apellido_materno} </td>
                                        <td> {cliente.tab_direcciones_cliente.provincia} </td>
                                        <td> {cliente.tab_telefonos_cliente.telefono_1} </td>
                                        <td> {cliente.tab_telefonos_cliente.telefono_2} </td>
                                        <td> {cliente.tab_tipos_cliente.nombre} </td>
                                        <td> {cliente.tab_tipos_cedula.descripcion} </td>
                                        <td> {cliente.cedula} </td>
                                        <td>

                                            <Link to={`edit/${cliente.id_cliente}`} className='btn btn-info'>Editar</Link>
                                            <button onClick={() => deleteCliente(cliente.id_cliente)} className='btn btn-danger'>Eliminar</button>
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

export default MostrarCliente;