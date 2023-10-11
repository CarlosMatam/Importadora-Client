/*import '../CSS/EstilosEditar.css'*/
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const uri = `${API}/Clientes/`;
const uri2 = `${API}/TipoCedula/`;
const uri3 = `${API}/DireccionesCliente/`;
const uri4 = `${API}/TelefonosCliente/`;
const uri5 = `${API}/TiposCliente/`;


const EditarCliente = () => {
    const [nombre, setNombre] = useState('')
    const [apellido_paterno, setApellido_paterno] = useState('')
    const [apellido_materno, setApellido_materno] = useState('')
    const [id_tipo_cliente, setId_tipo_cliente] = useState('')
    const [correo, setCorreo] = useState('')
    const [tipo_cedula, setTipo_cedula] = useState('')
    const [cedula, setCedula] = useState('')


    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [barrio, setBarrio] = useState('')
    const [otras_sennas, setOtras_sennas] = useState('')

    const [telefono_1, setTelefono_1] = useState('')
    const [telefono_2, setTelefono_2] = useState('')
    const [telefono_3, setTelefono_3] = useState('')
    const navigate = useNavigate()
    const { id_cliente } = useParams()


    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();

        // Actualizar el agente
        await axios.put(uri + id_cliente, {
            nombre: nombre,
            apellido_paterno: apellido_paterno,
            apellido_materno: apellido_materno,
            id_tipo_cliente: id_tipo_cliente,
            correo: correo,
            tipo_cedula: tipo_cedula,
            cedula: cedula,
        });

        // Actualizar los teléfonos
        await axios.put(uri4 + id_cliente, {
            telefono_1: telefono_1,
            telefono_2: telefono_2,
            telefono_3: telefono_3
        });

        // Actualizar las direcciones
        await axios.put(uri3 + id_cliente, {
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            barrio: barrio,
            otras_sennas: otras_sennas
        });

        navigate('/Clientes');
    };



    useEffect(() => {
        getClienteById()
    }, [])

    const getClienteById = async () => {
        const res = await axios.get(uri + id_cliente);
        setNombre(res.data.nombre);
        setApellido_paterno(res.data.apellido_paterno);
        setApellido_materno(res.data.apellido_materno);
        setId_tipo_cliente(res.data.id_tipo_cliente);
        setCorreo(res.data.correo);
        setTipo_cedula(res.data.tipo_cedula);
        setCedula(res.data.cedula);

        // Obtener los teléfonos y direcciones del agente
        const telefonosRes = await axios.get(uri4 + id_cliente);
        const direccionesRes = await axios.get(uri3 + id_cliente);

        // Establecer los estados de los teléfonos y direcciones
        setTelefono_1(telefonosRes.data.telefono_1);
        setTelefono_2(telefonosRes.data.telefono_2);
        setTelefono_3(telefonosRes.data.telefono_3);
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

            <div>

                <h3>Edit POST</h3>
                <form onSubmit={update}>
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
                        <textarea
                            value={apellido_paterno}
                            onChange={(e) => setApellido_paterno(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>

                    <div className='col-md-3 mb-4'>
                        <label className='form-label'>Segundo Apellido</label>
                        <textarea
                            value={apellido_materno}
                            onChange={(e) => setApellido_materno(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>



                    <div className='col-md-3 mb-4'>
                        <label className='form-label'>ID_TIPO_CLIENTE</label>
                        <textarea
                            value={id_tipo_cliente}
                            onChange={(e) => setId_tipo_cliente(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>

                    <div className='col-md-3 mb-4'>
                        <label className='form-label'>CORREO</label>
                        <textarea
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>

                    <div className='col-md-3 mb-4'>
                        <label className='form-label'>TIPO_CEDULA</label>
                        <textarea
                            value={tipo_cedula}
                            onChange={(e) => setTipo_cedula(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>

                    <div className='col-md-3 mb-4'>
                        <label className='form-label'>CEDULA</label>
                        <textarea
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>

                    <div className='col-md-3 mb-4'>
                        <label className="form-label">Teléfono 1</label>
                        <input
                            value={telefono_1}
                            onChange={(e) => setTelefono_1(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className='col-md-3 mb-4'>
                        <label className="form-label">Teléfono 2</label>
                        <input
                            value={telefono_2}
                            onChange={(e) => setTelefono_2(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className='col-md-3 mb-4'>
                        <label className="form-label">Teléfono 3</label>
                        <input
                            value={telefono_3}
                            onChange={(e) => setTelefono_3(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className='col-md-3 mb-4'>
                        <label className="form-label">Provincia</label>
                        <input
                            value={provincia}
                            onChange={(e) => setProvincia(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className='col-md-3 mb-4'>
                        <label className="form-label">Cantón</label>
                        <input
                            value={canton}
                            onChange={(e) => setCanton(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className='col-md-3 mb-4'>
                        <label className="form-label">Distrito</label>
                        <input
                            value={distrito}
                            onChange={(e) => setDistrito(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className='col-md-3 mb-4'>
                        <label className="form-label">Barrio</label>
                        <input
                            value={barrio}
                            onChange={(e) => setBarrio(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className='col-md-3 mb-4'>
                        <label className="form-label">Otras señas</label>
                        <input
                            value={otras_sennas}
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