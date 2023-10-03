import '../CSS/EstilosMostrar.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';


const URI = 'http://localhost:8000/Pagos/'


const MostrarPago = () => {

    const [search, setSearch] = useState("")

    const [Pagos, setPago] = useState([])
    useEffect(() => {
        getPagos()
    }, [])

    //procedimineto para mostrar todos los Agentes
    const getPagos = async () => {
        const res = await axios.get(URI)
        setPago(res.data)
    }

    //procedimineto para eliminar un Agente
    const deletePago = async (ID_PAGO) => {
        await axios.delete(`${URI}${ID_PAGO}`)
        getPagos()
    }

    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = Pagos
    } else {
        resultado = Pagos.filter((dato) =>
            dato.NOMBRE.toLowerCase().includes(search.toLocaleLowerCase()));
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />
            <div className='container-fluid' style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>

            <label>Buscar por ID: </label>
            <input type='text' placeholder='Digite el ID que desea buscar' className='form-control' value={search} onChange={searcher} ></input>
            <div className='row'>
                <div className='col'>
                    <Link to="/Pagos/create" className='btn btn-primary mt-2 mb-2'>Nuevo Registro</Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>

                                <th>FECHA DE INGRESO</th>
                                <th>MONTO</th>

                                <th>ID PROVEEDOR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultado.map((Pago) => (
                                <tr key={Pago.ID_PAGO}>
                                    <td> {Pago.FECHA_INGRESO} </td>
                                    <td> {Pago.MONTO} </td>

                                    <td> {Pago.ID_PROVEEDOR} </td>
                                    <td>

                                        <Link to={`/Pagos/edit/${Pago.ID_PAGO}`} className='btn btn-info'>Editar</Link>
                                        <button onClick={() => deletePago(Pago.ID_PAGO)} className='btn btn-danger'>Eliminar</button>
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

export default MostrarPago