/*import '../CSS/EstilosMostrar.css'*/
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';


const URI = 'http://localhost:8000/Clientes/'


const MostrarCliente = () => {

    const [search, setSearch] = useState("")

    const [Clientes, setCliente] = useState([])
    useEffect(() => {
        getClientes()
    }, [])


    //procedimineto para mostrar todos los Agentes
    const getClientes = async () => {
        const res = await axios.get(URI)
        setCliente(res.data)
    }

    //procedimineto para eliminar un Agente
    const deleteCliente = async (ID_CLIENTE) => {
        await axios.delete(`${URI}${ID_CLIENTE}`)
        getClientes()
    }

    //capturar valores input
    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = Clientes
    } else {
        resultado = Clientes.filter((dato) =>
            dato.NOMBRE.toLowerCase().includes(search.toLocaleLowerCase()));
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
                            {resultado.map((Cliente) => (
                                <tr key={Cliente.ID_CLIENTE}>
                                    <td> {Cliente.NOMBRE} </td>
                                    <td> {Cliente.APELLIDO_PATERNO} </td>
                                    <td> {Cliente.APELLIDO_MATERNO} </td>
                                    <td> {Cliente.TAB_DIRECCIONES_CLIENTE.PROVINCIA} </td>
                                    <td> {Cliente.TAB_TELEFONOS_CLIENTE.TELEFONO_1} </td>
                                    <td> {Cliente.TAB_TELEFONOS_CLIENTE.TELEFONO_2} </td>
                                    <td> {Cliente.TAB_TIPOS_CLIENTE.NOMBRE} </td>
                                    <td> {Cliente.TAB_TIPOS_CEDULA.DESCRIPCION} </td>
                                    <td> {Cliente.CEDULA} </td>
                                    <td>

                                        <Link to={`edit/${Cliente.ID_CLIENTE}`} className='btn btn-info'>Editar</Link>
                                        <button onClick={() => deleteCliente(Cliente.ID_CLIENTE)} className='btn btn-danger'>Eliminar</button>
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