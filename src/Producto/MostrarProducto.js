import '../CSS/EstilosMostrar.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';


const URI = 'http://localhost:8000/Productos/'


const MostrarProducto = () => {

    const [search, setSearch] = useState("")

    const [Productos, setProducto] = useState([])
    useEffect(() => {
        getProductos()
    }, [])


    //procedimineto para mostrar todos los Agentes
    const getProductos = async () => {
        const res = await axios.get(URI)
        setProducto(res.data)
    }

    //procedimineto para eliminar un Agente
    const deleteProducto = async (ID_PRODUCTO) => {
        await axios.delete(`${URI}${ID_PRODUCTO}`)
        getProductos()
    }

    //capturar valores input
    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = Productos
    } else {
        resultado = Productos.filter((dato) =>
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
                    <Link to="/Productos/create" className='btn btn-primary mt-2 mb-2'>Nuevo Registro</Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>

                                <th>NOMBRE</th>
                                <th>DESCRIPCIÓN</th>
                                <th>PROVEEDOR</th>
                                <th>COMPAÑÍA</th>
                                <th>PRECIO</th>
                                <th>DESCUENTO</th>
                                <th>PRIMER PORCENTAJE DE GANANCIA</th>
                                <th>SEGUNDO PORCENTAJE DE GANANCIA</th>
                                <th>TERCER PORCENTAJE DE GANANCIA</th>
                                <th>EXISTENCIAS ACTUALES</th>
                                <th>CABYS</th>
                                <th>FECHA DE INGRESO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultado.map((Producto) => (
                                <tr key={Producto.ID_PRODUCTO}>
                                    <td> {Producto.NOMBRE} </td>
                                    <td> {Producto.DESCRIPCION} </td>
                                    <td> {Producto.PROVEEDOR} </td>
                                    <td> {Producto.COMPANIA} </td>
                                    <td> {Producto.PRECIO} </td>
                                    <td> {Producto.DESCUENTO} </td>
                                    <td> {Producto.PORCENTAJE_GANANCIA_1} </td>
                                    <td> {Producto.PORCENTAJE_GANANCIA_2} </td>
                                    <td> {Producto.PORCENTAJE_GANANCIA_3} </td>
                                    <td> {Producto.EXISTENCIA_ACTUAL} </td>
                                    <td> {Producto.CABYS} </td>
                                    <td> {Producto.FECHA_INGRESO} </td>

                                    <td>

                                        <Link to={`Productos/edit/${Producto.ID_PRODUCTO}`} className='btn btn-info'>Editar</Link>
                                        <button onClick={() => deleteProducto(Producto.ID_PRODUCTO)} className='btn btn-danger'>Eliminar</button>
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

export default MostrarProducto;