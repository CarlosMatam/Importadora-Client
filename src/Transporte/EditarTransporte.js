import '../CSS/EstilosEditar.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const URI = `${API}/Transportes/`
const URI2 = `${API}/TelefonosTrans/`


const EditarTransporte = () => {
    const [NOMBRE, setNombre] = useState('')

    const [TELEFONO_1, setTelefono_1] = useState('')
    const [TELEFONO_2, setTelefono_2] = useState('')
    const [TELEFONO_3, setTelefono_3] = useState('')
    const navigate = useNavigate()
    const { ID_TRANSPORTE } = useParams()


    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();

        // Actualizar el agente
        await axios.put(URI + ID_TRANSPORTE, {
            NOMBRE: NOMBRE,
        });

        // Actualizar los teléfonos
        await axios.put(URI2 + ID_TRANSPORTE, {
            TELEFONO_1: TELEFONO_1,
            TELEFONO_2: TELEFONO_2,
            TELEFONO_3: TELEFONO_3
        });

        navigate('/Transportes');
    };



    useEffect(() => {
        getTransporteById()
    }, [])

    const getTransporteById = async () => {
        const res = await axios.get(URI + ID_TRANSPORTE);
        setNombre(res.data.NOMBRE);

        // Obtener los teléfonos y direcciones del agente
        const telefonosRes = await axios.get(URI2 + ID_TRANSPORTE);

        // Establecer los estados de los teléfonos y direcciones
        setTelefono_1(telefonosRes.data.TELEFONO_1);
        setTelefono_2(telefonosRes.data.TELEFONO_2);
        setTelefono_3(telefonosRes.data.TELEFONO_3);
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
                        value={NOMBRE}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                            <div className="col-md-6  mb-4">
                    <label className="form-label">Teléfono 1</label>
                    <input
                        value={TELEFONO_1}
                        onChange={(e) => setTelefono_1(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                            <div className="col-md-6  mb-4">
                    <label className="form-label">Teléfono 2</label>
                    <input
                        value={TELEFONO_2}
                        onChange={(e) => setTelefono_2(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                            <div className="col-md-6  mb-4">
                    <label className="form-label">Teléfono 3</label>
                    <input
                        value={TELEFONO_3}
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