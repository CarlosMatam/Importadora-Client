/*import '../CSS/EstilosEditar.css'*/
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const URI = `${API}/Clientes/`;
const URI2 = `${API}/TipoCedula/`;
const URI3 = `${API}/DireccionesCliente/`;
const URI4 = `${API}/TelefonosCliente/`;
const URI5 = `${API}/TiposCliente/`;


const EditarCliente = () => {
    const [NOMBRE, setNombre] = useState('')
    const [APELLIDO_PATERNO, setApellido_paterno] = useState('')
    const [APELLIDO_MATERNO, setApellido_materno] = useState('')
    const [ID_TIPO_CLIENTE, setId_tipo_cliente] = useState('')
    const [CORREO, setCorreo] = useState('')
    const [TIPO_CEDULA, setTipo_cedula] = useState('')
    const [CEDULA, setCedula] = useState('')


    const [PROVINCIA, setProvincia] = useState('')
    const [CANTON, setCanton] = useState('')
    const [DISTRITO, setDistrito] = useState('')
    const [BARRIO, setBarrio] = useState('')
    const [OTRAS_SENNAS, setOtras_sennas] = useState('')

    const [TELEFONO_1, setTelefono_1] = useState('')
    const [TELEFONO_2, setTelefono_2] = useState('')
    const [TELEFONO_3, setTelefono_3] = useState('')
    const navigate = useNavigate()
    const { ID_CLIENTE } = useParams()


    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();

        // Actualizar el agente
        await axios.put(URI + ID_CLIENTE, {
            NOMBRE: NOMBRE,
            APELLIDO_PATERNO: APELLIDO_PATERNO,
            APELLIDO_MATERNO: APELLIDO_MATERNO,
            ID_TIPO_CLIENTE: ID_TIPO_CLIENTE,
            CORREO: CORREO,
            TIPO_CEDULA: TIPO_CEDULA,
            CEDULA: CEDULA,
        });

        // Actualizar los teléfonos
        await axios.put(URI4 + ID_CLIENTE, {
            TELEFONO_1: TELEFONO_1,
            TELEFONO_2: TELEFONO_2,
            TELEFONO_3: TELEFONO_3
        });

        // Actualizar las direcciones
        await axios.put(URI3 + ID_CLIENTE, {
            PROVINCIA: PROVINCIA,
            CANTON: CANTON,
            DISTRITO: DISTRITO,
            BARRIO: BARRIO,
            OTRAS_SENNAS: OTRAS_SENNAS
        });

        navigate('/Clientes');
    };



    useEffect(() => {
        getClienteById()
    }, [])

    const getClienteById = async () => {
        const res = await axios.get(URI + ID_CLIENTE);
        setNombre(res.data.NOMBRE);
        setApellido_paterno(res.data.APELLIDO_PATERNO);
        setApellido_materno(res.data.APELLIDO_MATERNO);
        setId_tipo_cliente(res.data.ID_TIPO_CLIENTE);
        setCorreo(res.data.CORREO);
        setTipo_cedula(res.data.TIPO_CEDULA);
        setCedula(res.data.CEDULA);

        // Obtener los teléfonos y direcciones del agente
        const telefonosRes = await axios.get(URI4 + ID_CLIENTE);
        const direccionesRes = await axios.get(URI3 + ID_CLIENTE);

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
        
        <div>

            <h3>Edit POST</h3>
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={NOMBRE}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Primer Apellido</label>
                    <textarea
                        value={APELLIDO_PATERNO}
                        onChange={(e) => setApellido_paterno(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Segundo Apellido</label>
                    <textarea
                        value={APELLIDO_MATERNO}
                        onChange={(e) => setApellido_materno(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>



                <div className='mb-3'>
                    <label className='form-label'>ID_TIPO_CLIENTE</label>
                    <textarea
                        value={ID_TIPO_CLIENTE}
                        onChange={(e) => setId_tipo_cliente(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>CORREO</label>
                    <textarea
                        value={CORREO}
                        onChange={(e) => setCorreo(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>TIPO_CEDULA</label>
                    <textarea
                        value={TIPO_CEDULA}
                        onChange={(e) => setTipo_cedula(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>CEDULA</label>
                    <textarea
                        value={CEDULA}
                        onChange={(e) => setCedula(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Teléfono 1</label>
                    <input
                        value={TELEFONO_1}
                        onChange={(e) => setTelefono_1(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono 2</label>
                    <input
                        value={TELEFONO_2}
                        onChange={(e) => setTelefono_2(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono 3</label>
                    <input
                        value={TELEFONO_3}
                        onChange={(e) => setTelefono_3(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Provincia</label>
                    <input
                        value={PROVINCIA}
                        onChange={(e) => setProvincia(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantón</label>
                    <input
                        value={CANTON}
                        onChange={(e) => setCanton(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Distrito</label>
                    <input
                        value={DISTRITO}
                        onChange={(e) => setDistrito(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Barrio</label>
                    <input
                        value={BARRIO}
                        onChange={(e) => setBarrio(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Otras señas</label>
                    <input
                        value={OTRAS_SENNAS}
                        onChange={(e) => setOtras_sennas(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>


                <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
            </div>
        </div>
    )


}

export default EditarCliente