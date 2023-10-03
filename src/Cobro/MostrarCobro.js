/*import '../CSS/EstilosMostrar.css'*/
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';


const URI = 'http://localhost:8000/Cobros/'


const MostrarCobro = () => {

    const [search, setSearch] = useState("")

    const [Cobros, setCobro] = useState([])
    useEffect(() => {
        getCobros()
    }, [])

    //procedimineto para mostrar todos los Agentes
    const getCobros = async () => {
        const res = await axios.get(URI)
        setCobro(res.data)
    }

    //procedimineto para eliminar un Agente
    const deleteCobro = async (ID_COBRO) => {
        await axios.delete(`${URI}${ID_COBRO}`)
        getCobros()
    }

    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = Cobros
    } else {
        resultado = Cobros.filter((dato) =>
            dato.NOMBRE.toLowerCase().includes(search.toLocaleLowerCase()));
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
                            {resultado.map((Cobro) => (
                                <tr key={Cobro.ID_COBRO}>
                                    <td> {Cobro.FECHA_INGRESO} </td>
                                    <td> {Cobro.MONTO} </td>
                                    <td> {Cobro.ESTADO} </td>
                                    <td> {Cobro.TAB_CLIENTE.NOMBRE} </td>
                                    <td>

                                        <Link to={`/Cobros/edit/${Cobro.ID_COBRO}`} className='btn btn-info'>Editar</Link>
                                        <button onClick={() => deleteCobro(Cobro.ID_COBRO)} className='btn btn-danger'>Eliminar</button>
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