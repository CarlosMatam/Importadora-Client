import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';

const URI = 'http://localhost:8000/Facturacion/'


const MostrarF = () => {

    const [search, setSearch] = useState("")

    const [Facturas, setFactura] = useState([])
    useEffect(() => {
        getFacturas()
    }, [])


    //procedimineto para mostrar todos los Facturas
    const getFacturas = async () => {
        const res = await axios.get(URI)
        setFactura(res.data)
    }

    //procedimineto para eliminar un Agente
    const deleteFactura = async (ID_FACTURA) => {
        await axios.delete(`${URI}${ID_FACTURA}`)
        getFacturas()
    }

    //capturar valores input
    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = Facturas
    } else {
        resultado = Facturas.filter((dato) =>
            dato.ID_FACTURA.toString().includes(search.toLowerCase())
        );
    }


    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />
            <div className='container-fluid' style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
            <label>Buscar por ID de factura: </label>
            <input type='text' placeholder='Digite el consecutivo de la factura' className='form-control' value={search} onChange={searcher} ></input>
            <div className='row'>
                <div className='col'>
                    <Link to="/Facturacion/create" className='btn btn-primary mt-2 mb-2'>Nueva Factura</Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>

                                <th>ID factura</th>
                                <th>Compañia</th>
                                <th>Tipo Factura </th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Vencimiento</th>
                                <th>Total</th>


                            </tr>
                        </thead>
                        <tbody>
                            {resultado.map((Factura) => (
                                <tr key={Factura.ID_FACTURA}>
                                    <td> {Factura.ID_FACTURA} </td>
                                    <td> {Factura.TAB_COMPANIA.NOMBRE} </td>
                                    <td> {Factura.TAB_TIPOS_FACTURA.nombre} </td>
                                    <td> {Factura.TAB_CLIENTE.NOMBRE} </td>
                                    <td> {Factura.FECHA} </td>
                                    <td> {Factura.VENCIMIENTO} </td>
                                    <td> {Factura.TOTAL} </td>

                                    <td>

                                        <Link to={`/Facturacion/edit/${Factura.ID_FACTURA}`} className='btn btn-info'>Editar</Link>
                                        <button onClick={() => deleteFactura(Factura.ID_FACTURA)} className='btn btn-danger'>Eliminar</button>
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

export default MostrarF