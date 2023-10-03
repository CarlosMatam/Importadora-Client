import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';

const URI = `${API}/Compras/`;

const MostrarCompras = () => {
    const [search, setSearch] = useState('');
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        getCompras();
    }, []);

    // Procedimiento para mostrar todas las compras
    const getCompras = async () => {
        try {
            const res = await axios.get(URI);
            setCompras(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Procedimiento para eliminar una compra
    const deleteCompra = async (NUM_DOCUMENTO) => {
        try {
            await axios.delete(`${URI}${NUM_DOCUMENTO}`);
            getCompras();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    // Capturar valores input
    const searcher = (e) => {
        setSearch(e.target.value);
    };

    let resultado = [];
    if (!search) {
        resultado = compras;
    } else {
        resultado = compras.filter((compra) =>
            compra.NUM_DOCUMENTO.toString().includes(search.toLowerCase())
        );
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />
            <div className='container-fluid' style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
            <label>Buscar por número de documento de compra:</label>
            <input
                type='text'
                placeholder='Digite el número de documento de la compra'
                className='form-control'
                value={search}
                onChange={searcher}
            ></input>
            <div className='row'>
                <div className='col'>
                    <Link to='/Compras/create' className='btn btn-primary mt-2 mb-2'>
                        Nueva Compra
                    </Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Número de documento</th>
                                <th>Compañía</th>
                                <th>Bodega</th>
                                <th>Proveedor</th>
                                <th>Fecha</th>
                                <th>Total</th>

                            </tr>
                        </thead>
                        <tbody>
                            {resultado.map((compra) => (
                                <tr key={compra.NUM_DOCUMENTO}>
                                    <td>{compra.NUM_DOCUMENTO}</td>
                                    <td>{compra.TAB_COMPANIA.NOMBRE}</td>
                                    <td>{compra.TAB_BODEGA.NOMBRE}</td>
                                    <td>{compra.TAB_PROVEEDORE.NOMBRE}</td>
                                    <td>{compra.FECHA}</td>
                                    <td>{compra.TOTAL}</td>
                                    <td>
                                        <Link
                                            to={`/Compras/edit/${compra.NUM_DOCUMENTO}`}
                                            className='btn btn-info'
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => deleteCompra(compra.NUM_DOCUMENTO)}
                                            className='btn btn-danger'
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    );
};

export default MostrarCompras;