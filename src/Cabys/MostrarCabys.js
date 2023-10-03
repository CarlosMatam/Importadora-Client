import '../CSS/EstilosMostrar.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const URI = 'http://localhost:8000/Cabys/'


const MostrarCabys = () => {

    const [search, setSearch] = useState("")

    const [Cabys, setCabys] = useState([])
    useEffect(() => {
        getCabys()
    }, [])


    //procedimineto para mostrar todos los Agentes
    const getCabys = async () => {
        const res = await axios.get(URI)
        setCabys(res.data)
    }

    //capturar valores input
    const searcher = (e) => {
        setSearch(e.target.value)

    }

    let resultado = []
    if (!search) {
        resultado = Cabys
    } else {
        resultado = Cabys.filter((dato) =>
            dato.DESCRIPCION_BIEN_SERVICIO.toLowerCase().includes(search.toLocaleLowerCase()));
    }


    return (
        <div className='container-fluid'>
            <Navbar />
            <label>Buscar por descripción de bien o servicio: </label>
            <input type='text' placeholder='Digite la descripción' className='form-control' value={search} onChange={searcher} ></input>
            <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>

                                <th>Categoría 1</th>
                                <th>Descripción de categoría 1</th>
                                <th>Categoría 2</th>
                                <th>Descripción de categoría 2</th>
                                <th>Categoría 3</th>
                                <th>Descripción de categoría 3</th>
                                <th>Categoría 4</th>
                                <th>Descripción de categoría 4</th>
                                <th>Categoría 5</th>
                                <th>Descripción de categoría 5</th>
                                <th>Categoría 6</th>
                                <th>Descripción de categoría 6</th>
                                <th>Categoría 7</th>
                                <th>Descripción de categoría 7</th>
                                <th>Categoría 8</th>
                                <th>Descripción de categoría 8</th>
                                <th>Código de bien o servicio</th>
                                <th>Descripción de bien o servicio</th>
                                <th>Impuesto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultado.map((Cabys) => (
                                <tr key={Cabys.ID_CABYS_MYM}>
                                    <td> {Cabys.CATEGORIA_1} </td>
                                    <td> {Cabys.DESCRIPCION_CATEGORIA_1} </td>
                                    <td> {Cabys.CATEGORIA_2} </td>
                                    <td> {Cabys.DESCRIPCION_CATEGORIA_2} </td>
                                    <td> {Cabys.CATEGORIA_3} </td>
                                    <td> {Cabys.DESCRIPCION_CATEGORIA_3} </td>
                                    <td> {Cabys.CATEGORIA_4} </td>
                                    <td> {Cabys.DESCRIPCION_CATEGORIA_4} </td>
                                    <td> {Cabys.CATEGORIA_5} </td>
                                    <td> {Cabys.DESCRIPCION_CATEGORIA_5} </td>
                                    <td> {Cabys.CATEGORIA_6} </td>
                                    <td> {Cabys.DESCRIPCION_CATEGORIA_6} </td>
                                    <td> {Cabys.CATEGORIA_7} </td>
                                    <td> {Cabys.DESCRIPCION_CATEGORIA_7} </td>
                                    <td> {Cabys.CATEGORIA_8} </td>
                                    <td> {Cabys.DESCRIPCION_CATEGORIA_8} </td>
                                    <td> {Cabys.CODIGO_BIEN_SERVICIO} </td>
                                    <td> {Cabys.DESCRIPCION_BIEN_SERVICIO} </td>
                                    <td> {Cabys.IMPUESTO} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default MostrarCabys;