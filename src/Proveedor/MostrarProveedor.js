
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';


const URI = 'http://localhost:8000/Proveedores/'


const MostrarProveedores = () => {

    const [search, setSearch] = useState("")

    const [Proveedores, setProveedor] = useState([])
    useEffect(() => {
        getProveedores()
    }, [])


    //procedimineto para mostrar todos los Agentes
    const getProveedores = async () => {
        const res = await axios.get(URI)
        setProveedor(res.data)
    }

    //procedimineto para eliminar un Agente
    const deleteProveedor = async (ID_PROVEEDOR) => {
        await axios.delete(`${URI}${ID_PROVEEDOR}`)
        getProveedores()
    }

    //capturar valores input
    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = Proveedores
    } else {
        resultado = Proveedores.filter((dato) =>
            dato.NOMBRE.toLowerCase().includes(search.toLocaleLowerCase()));
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
                            {resultado.map((Proveedor) => (
                                <tr key={Proveedor.ID_PROVEEDOR}>
                                    <td> {Proveedor.NOMBRE} </td>
                                    <td> {Proveedor.CORREO} </td>
                                    <td> {Proveedor.TAB_TIPOS_CEDULA.DESCRIPCION} </td>
                                    <td> {Proveedor.TAB_DIRECCIONES_PROVEEDORE.PROVINCIA} </td>
                                    <td> {Proveedor.TAB_TELEFONOS_PROVEEDORE.TELEFONO_1} </td>
                                    <td> {Proveedor.TAB_TELEFONOS_PROVEEDORE.TELEFONO_2} </td>
                                    <td> {Proveedor.CEDULA} </td>

                                    <td>

                                        <Link to={`/Proveedores/edit/${Proveedor.ID_PROVEEDOR}`} className='btn btn-info'>Editar</Link>
                                        <button onClick={() => deleteProveedor(Proveedor.ID_PROVEEDOR)} className='btn btn-danger'>Eliminar</button>
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