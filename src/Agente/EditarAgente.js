/*import '../CSS/EstilosEditar.css'*/
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const URI = `${API}/Agentes`
const URI2 = `${API}/Zonas/`
const URI3 = `${API}/DireccionesAgente/`
const URI4 = `${API}/TelefonosAgente/`


const EditarAgente = () => {
    const [NOMBRE, setNombre] = useState('')
    const [APELLIDO_PATERNO, setApellido_paterno] = useState('')
    const [APELLIDO_MATERNO, setApellido_materno] = useState('')
    const [COMISION_POR_VENTA, setComision_por_venta] = useState('')
    const [ID_ZONA, setId_zona] = useState('')
    const [IDENTIFICACION, setIdentificacion] = useState('')


    const [PROVINCIA, setProvincia] = useState('')
    const [CANTON, setCanton] = useState('')
    const [DISTRITO, setDistrito] = useState('')
    const [BARRIO, setBarrio] = useState('')
    const [OTRAS_SENNAS, setOtras_sennas] = useState('')

    const [TELEFONO_1, setTelefono_1] = useState('')
    const [TELEFONO_2, setTelefono_2] = useState('')
    const [TELEFONO_3, setTelefono_3] = useState('')
    const navigate = useNavigate()
    const { ID_AGENTE } = useParams()


    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();

        // Actualizar el agente
        await axios.put(URI + ID_AGENTE, {
            NOMBRE: NOMBRE,
            APELLIDO_PATERNO: APELLIDO_PATERNO,
            APELLIDO_MATERNO: APELLIDO_MATERNO,
            COMISION_POR_VENTA: COMISION_POR_VENTA,
            ID_ZONA: ID_ZONA,
            IDENTIFICACION: IDENTIFICACION
        });

        // Actualizar los teléfonos
        await axios.put(URI4 + ID_AGENTE, {
            TELEFONO_1: TELEFONO_1,
            TELEFONO_2: TELEFONO_2,
            TELEFONO_3: TELEFONO_3
        });

        // Actualizar las direcciones
        await axios.put(URI3 + ID_AGENTE, {
            PROVINCIA: PROVINCIA,
            CANTON: CANTON,
            DISTRITO: DISTRITO,
            BARRIO: BARRIO,
            OTRAS_SENNAS: OTRAS_SENNAS
        });

        navigate('/');
    };



    useEffect(() => {
        getAgenteById()
    }, [])

    const getAgenteById = async () => {
        const res = await axios.get(URI + ID_AGENTE);
        setNombre(res.data.NOMBRE);
        setApellido_paterno(res.data.APELLIDO_PATERNO);
        setApellido_materno(res.data.APELLIDO_MATERNO);
        setComision_por_venta(res.data.COMISION_POR_VENTA);
        setId_zona(res.data.ID_ZONA);
        setIdentificacion(res.data.IDENTIFICACION);

        // Obtener los teléfonos y direcciones del agente
        const telefonosRes = await axios.get(URI4 + ID_AGENTE);
        const direccionesRes = await axios.get(URI3 + ID_AGENTE);

        // Establecer los estados de los teléfonos y direcciones
        setTelefono_1(telefonosRes.data.TELEFONO_1);
        setTelefono_2(telefonosRes.data.TELEFONO_2);
        setTelefono_3(telefonosRes.data.TELEFONO_3);
        setProvincia(direccionesRes.data.PROVINCIA);
        setCanton(direccionesRes.data.CANTON);
        setDistrito(direccionesRes.data.DISTRITO);
        setBarrio(direccionesRes.data.BARRIO);
        setOtras_sennas(direccionesRes.data.OTRAS_SENNAS);
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />

     

                <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                    <form onSubmit={update} style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }}>

                        <div className="row">
                            <div className='col-md-3 mb-4'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={NOMBRE}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                            <div className='col-md-3 mb-4'>
                    <label className='form-label'>Primer Apellido</label>
                                <input
                        value={APELLIDO_PATERNO}
                        onChange={(e) => setApellido_paterno(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                            <div className='col-md-3 mb-4'>
                    <label className='form-label'>Segundo Apellido</label>
                                <input
                        value={APELLIDO_MATERNO}
                        onChange={(e) => setApellido_materno(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>



                            <div className='col-md-3 mb-4'>
                    <label className='form-label'>Comisión por venta</label>
                                <input
                        value={COMISION_POR_VENTA}
                        onChange={(e) => setComision_por_venta(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                            <div className='col-md-3 mb-4'>
                    <label className='form-label'>ID Zona</label>
                                <input
                        value={ID_ZONA}
                        onChange={(e) => setId_zona(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                            <div className='col-md-3 mb-4'>
                    <label className='form-label'>Cedula</label>
                                <input
                        value={IDENTIFICACION}
                        onChange={(e) => setIdentificacion(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                            <div className="col-md-3 mb-4">
                    <label className="form-label">Teléfono 1</label>
                    <input
                        value={TELEFONO_1}
                        onChange={(e) => setTelefono_1(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Teléfono 2</label>
                    <input
                        value={TELEFONO_2}
                        onChange={(e) => setTelefono_2(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Teléfono 3</label>
                    <input
                        value={TELEFONO_3}
                        onChange={(e) => setTelefono_3(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>

                            <div className="col-md-3 mb-4">
                    <label className="form-label">Provincia</label>
                    <input
                        value={PROVINCIA}
                        onChange={(e) => setProvincia(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Cantón</label>
                    <input
                        value={CANTON}
                        onChange={(e) => setCanton(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Distrito</label>
                    <input
                        value={DISTRITO}
                        onChange={(e) => setDistrito(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Barrio</label>
                    <input
                        value={BARRIO}
                        onChange={(e) => setBarrio(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                            <div className="col-md-9 mb-4">
                    <label className="form-label">Otras señas</label>
                    <input
                        value={OTRAS_SENNAS}
                        onChange={(e) => setOtras_sennas(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>


                            <button type="submit" className="btn btn-primary" style={{ margin: '10px auto', width: '300px', display: 'block' }}>Actualizar</button>
                        </div>
                    </form>
                </div>
            
        </div>
    )


}

export default EditarAgente