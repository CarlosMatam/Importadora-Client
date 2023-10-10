/*import '../CSS/EstilosEditar.css'*/
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const uri = `${API}/Agentes/`
const uri2 = `${API}/Zonas/`
const uri3 = `${API}/DireccionesAgente/`
const uri4 = `${API}/TelefonosAgente/`


const EditarAgente = () => {
    const [nombre, setNombre] = useState('')
    const [apellido_paterno, setApellido_paterno] = useState('')
    const [apellido_materno, setApellido_materno] = useState('')
    const [comision_por_venta, setComision_por_venta] = useState('')
    const [id_zona, setId_zona] = useState('')
    const [identificacion, setIdentificacion] = useState('')


    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [barrio, setBarrio] = useState('')
    const [otras_sennas, setOtras_sennas] = useState('')

    const [telefono_1, setTelefono_1] = useState('')
    const [telefono_2, setTelefono_2] = useState('')
    const [telefono_3, setTelefono_3] = useState('')
    const navigate = useNavigate()
    const { id_agente } = useParams()


    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();

        // Actualizar el agente
        await axios.put(uri + id_agente, {
            nombre: nombre,
            apellido_paterno: apellido_paterno,
            apellido_materno: apellido_materno,
            comision_por_venta: comision_por_venta,
            id_zona: id_zona,
            identificacion: identificacion
        });

        // Actualizar los teléfonos
        await axios.put(uri4 + id_agente, {
            telefono_1: telefono_1,
            telefono_2: telefono_2,
            telefono_3: telefono_3
        });

        // Actualizar las direcciones
        await axios.put(uri3 + id_agente, {
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            barrio: barrio,
            otras_sennas: otras_sennas
        });

        navigate('/');
    };



    useEffect(() => {
        getAgenteById()
    }, [])

    const getAgenteById = async () => {
        const res = await axios.get(uri + id_agente);
        setNombre(res.data.nombre);
        setApellido_paterno(res.data.apellido_paterno);
        setApellido_materno(res.data.apellido_materno);
        setComision_por_venta(res.data.comision_por_venta);
        setId_zona(res.data.id_zona);
        setIdentificacion(res.data.identificacion);

        // Obtener los teléfonos y direcciones del agente
        const telefonosRes = await axios.get(uri4 + id_agente);
        const direccionesRes = await axios.get(uri3 + id_agente);

        // Establecer los estados de los teléfonos y direcciones
        setTelefono_1(telefonosRes.data.telefono_1);
        setTelefono_2(telefonosRes.data.telefono__2);
        setTelefono_3(telefonosRes.data.telefono__3);
        setProvincia(direccionesRes.data.provincia);
        setCanton(direccionesRes.data.canton);
        setDistrito(direccionesRes.data.distrito);
        setBarrio(direccionesRes.data.barrio);
        setOtras_sennas(direccionesRes.data.otras_sennas);
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
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <div className='col-md-3 mb-4'>
                            <label className='form-label'>Primer Apellido</label>
                            <input
                                value={apellido_paterno}
                                onChange={(e) => setApellido_paterno(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className='col-md-3 mb-4'>
                            <label className='form-label'>Segundo Apellido</label>
                            <input
                                value={apellido_materno}
                                onChange={(e) => setApellido_materno(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>



                        <div className='col-md-3 mb-4'>
                            <label className='form-label'>Comisión por venta</label>
                            <input
                                value={comision_por_venta}
                                onChange={(e) => setComision_por_venta(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className='col-md-3 mb-4'>
                            <label className='form-label'>ID Zona</label>
                            <input
                                value={id_zona}
                                onChange={(e) => setId_zona(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className='col-md-3 mb-4'>
                            <label className='form-label'>Cedula</label>
                            <input
                                value={identificacion}
                                onChange={(e) => setIdentificacion(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className="col-md-3 mb-4">
                            <label className="form-label">Teléfono 1</label>
                            <input
                                value={telefono_1}
                                onChange={(e) => setTelefono_1(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3 mb-4">
                            <label className="form-label">Teléfono 2</label>
                            <input
                                value={telefono_2}
                                onChange={(e) => setTelefono_2(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3 mb-4">
                            <label className="form-label">Teléfono 3</label>
                            <input
                                value={telefono_3}
                                onChange={(e) => setTelefono_3(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-3 mb-4">
                            <label className="form-label">Provincia</label>
                            <input
                                value={provincia}
                                onChange={(e) => setProvincia(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3 mb-4">
                            <label className="form-label">Cantón</label>
                            <input
                                value={canton}
                                onChange={(e) => setCanton(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3 mb-4">
                            <label className="form-label">Distrito</label>
                            <input
                                value={distrito}
                                onChange={(e) => setDistrito(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3 mb-4">
                            <label className="form-label">Barrio</label>
                            <input
                                value={barrio}
                                onChange={(e) => setBarrio(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-9 mb-4">
                            <label className="form-label">Otras señas</label>
                            <input
                                value={otras_sennas}
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