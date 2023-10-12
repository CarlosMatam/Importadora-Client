import '../CSS/EstilosEditar.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const uri = `${API}/Transportes/`
const uri2 = `${API}/TelefonosTrans/`


const EditarTransporte = () => {
    const [nombre, setNombre] = useState('')

    const [telefono_1, setTelefono_1] = useState('')
    const [telefono_2, setTelefono_2] = useState('')
    const [telefono_3, setTelefono_3] = useState('')
    const navigate = useNavigate()
    const { id_transporte } = useParams()


    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();

        // Actualizar el agente
        await axios.put(uri + id_transporte, {
            nombre: nombre,
        });

        // Actualizar los teléfonos
        await axios.put(uri2 + id_transporte, {
            telefono_1: telefono_1,
            telefono_2: telefono_2,
            telefono_3: telefono_3
        });

        navigate('/Transportes');
    };



    useEffect(() => {
        getTransporteById()
    }, [])

    const getTransporteById = async () => {
        const res = await axios.get(uri + id_transporte);
        setNombre(res.data.nombre);

        // Obtener los teléfonos y direcciones del agente
        const telefonosRes = await axios.get(uri2 + id_transporte);

        // Establecer los estados de los teléfonos y direcciones
        setTelefono_1(telefonosRes.data.telefono_1);
        setTelefono_2(telefonosRes.data.telefono_2);
        setTelefono_3(telefonosRes.data.telefono_3);
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />
            <div>

                <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                    <form onSubmit={update} style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }}>

                        <div className="row">
                            <div className='col-md-6  mb-4'>
                                <label className='form-label'>Nombre</label>
                                <input
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    type="text"
                                    className='form-control'
                                />
                            </div>

                            <div className="col-md-6  mb-4">
                                <label className="form-label">Teléfono 1</label>
                                <input
                                    value={telefono_1}
                                    onChange={(e) => setTelefono_1(e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6  mb-4">
                                <label className="form-label">Teléfono 2</label>
                                <input
                                    value={telefono_2}
                                    onChange={(e) => setTelefono_2(e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6  mb-4">
                                <label className="form-label">Teléfono 3</label>
                                <input
                                    value={telefono_3}
                                    onChange={(e) => setTelefono_3(e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                            </div>


                            <button type="submit" className="btn btn-primary" style={{ margin: '10px auto', width: '300px', display: 'block' }}>Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )


}

export default EditarTransporte