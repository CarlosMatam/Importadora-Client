

import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const uri = `${API}/Proveedores/`


const MostrarProveedores = () => {

    const [search, setSearch] = useState("")

    const [proveedores, setProveedor] = useState([])
    useEffect(() => {
        getProveedores()
    }, [])


    //procedimineto para mostrar todos los Agentes
    const getProveedores = async () => {
        const res = await axios.get(uri)
        setProveedor(res.data)
    }

    //procedimineto para eliminar un Agente
    const deleteProveedor = async (id_proveedor) => {
        await axios.delete(`${uri}${id_proveedor}`)
        getProveedores()
    }

    //capturar valores input
    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = proveedores
    } else {
        resultado = proveedores.filter((dato) =>
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
                        <Link to="/Proveedores/create" className='btn btn-primary mt-2 mb-2'>Nuevo Registro</Link>
                        <table className='table'>
                            <thead className='table-primary'>
                                <tr>

                                    <th>NOMBRE</th>
                                    <th>CORREO</th>
                                    <th>TIPO_CEDULA</th>
                                    <th>Provincia</th>
                                    <th>TELEFONO</th>
                                    <th>TELEFONO 2</th>
                                    <th>CEDULA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map((proveedor) => (
                                    <tr key={proveedor.id_proveedor}>
                                        <td> {proveedor.nombre} </td>
                                        <td> {proveedor.correo} </td>
                                        <td> {proveedor.tab_tipos_cedula.descripcion} </td>
                                        <td> {proveedor.tab_direcciones_proveedore.provincia} </td>
                                        <td> {proveedor.tab_telefonos_proveedore.telefono_1} </td>
                                        <td> {proveedor.tab_telefonos_proveedore.telefono_2} </td>
                                        <td> {proveedor.cedula} </td>

                                        <td>

                                            <Link to={`/Proveedores/edit/${proveedor.id_proveedor}`} className='btn btn-info'>Editar</Link>
                                            <button onClick={() => deleteProveedor(proveedor.id_proveedor)} className='btn btn-danger'>Eliminar</button>
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

export default MostrarProveedores