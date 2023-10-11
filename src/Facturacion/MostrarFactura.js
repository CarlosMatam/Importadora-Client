import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';

const URI = `${API}/Facturacion/`


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
    const deleteFactura = async (id_factura) => {
        await axios.delete(`${URI}${id_factura}`)
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
            dato.id_factura.toString().includes(search.toLowerCase())
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
                                <tr key={Factura.id_factura}>
                                    <td> {Factura.id_factura} </td>
                                    <td> {Factura.tab_compania.nombre} </td>
                                    <td> {Factura.tab_tipos_factura.nombre} </td>
                                    <td> {Factura.tab_cliente.nombre} </td>
                                    <td> {Factura.fecha} </td>
                                    <td> {Factura.vencimiento} </td>
                                    <td> {Factura.total} </td>

                                    <td>

                                        <Link to={`/Facturacion/edit/${Factura.id_factura}`} className='btn btn-info'>Editar</Link>
                                        <button onClick={() => deleteFactura(Factura.id_factura)} className='btn btn-danger'>Eliminar</button>
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