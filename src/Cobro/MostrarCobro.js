/*import '../CSS/EstilosMostrar.css'*/
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const uri = `${API}/Cobros/`


const MostrarCobro = () => {

    const [search, setSearch] = useState("")

    const [cobros, setCobro] = useState([])
    useEffect(() => {
        getCobros()
    }, [])

    //procedimineto para mostrar todos los Agentes
    const getCobros = async () => {
        const res = await axios.get(uri)
        setCobro(res.data)
    }

    //procedimineto para eliminar un Agente
    const deleteCobro = async (id_cobro) => {
        await axios.delete(`${uri}${id_cobro}`)
        getCobros()
    }

    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = cobros
    } else {
        resultado = cobros.filter((dato) =>
            dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()));
    }
    //MODIFICAR CUANDO SE TENGA CLIENTE

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />

            <div className='container-fluid' style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>

                <div className='row'>
                    <div className='col'>
                        <Link to="/Cobros/create" className='btn btn-primary mt-2 mb-2'>Nuevo Registro</Link>
                        <table className='table'>
                            <thead className='table-primary'>
                                <tr>

                                    <th>FECHA DE INGRESO</th>
                                    <th>MONTO</th>
                                    <th>ESTADO</th>
                                    <th>NOMBRE CLIENTE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map((cobro) => (
                                    <tr key={cobro.id_cobro}>
                                        <td> {cobro.fecha_ingreso} </td>
                                        <td> {cobro.monto} </td>
                                        <td> {cobro.estado} </td>
                                        <td> {cobro.tab_cliente.nombre} </td>
                                        <td>

                                            <Link to={`/Cobros/edit/${cobro.id_cobro}`} className='btn btn-info'>Editar</Link>
                                            <button onClick={() => deleteCobro(cobro.id_cobro)} className='btn btn-danger'>Eliminar</button>
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

export default MostrarCobro