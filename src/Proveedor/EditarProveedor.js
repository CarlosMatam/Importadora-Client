

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';



const uri = `${API}/Proveedores/`
const uri2 = `${API}/TipoCedula/`
const uri3 = `${API}/DireccionesProvee/`
const uri4 = `${API}/TelefonosProvee/`


const EditarProveedor = () => {

    const [nombre, setNombre] = useState('')
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
    const { id_proveedor } = useParams()


    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();

        // Actualizar el agente
        await axios.put(uri + id_proveedor, {
            nombre: nombre,
            correo: correo,
            tipo_cedula: tipo_cedula,
            cedula: cedula,

        });

        // Actualizar los teléfonos
        await axios.put(uri4 + id_proveedor, {
            telefono_1: telefono_1,
            telefono_2: telefono_2,
            telefono_3: telefono_3
        });

        // Actualizar las direcciones
        await axios.put(uri3 + id_proveedor, {
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            barrio: barrio,
            otras_sennas: otras_sennas
        });

        navigate('/Proveedores');
    };



    useEffect(() => {
        getProveedorById()
    }, [])

    const getProveedorById = async () => {
        const res = await axios.get(uri + id_proveedor);
        setNombre(res.data.nombre);
        setCorreo(res.data.correo);
        setTipo_cedula(res.data.tipo_cedula);
        setCedula(res.data.cedula);


        // Obtener los teléfonos y direcciones del agente
        const telefonosRes = await axios.get(uri4 + id_proveedor);
        const direccionesRes = await axios.get(uri3 + id_proveedor);

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




            <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                <form onSubmit={update} style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }}>

                    <div className="row">
                        <div className="col-md-3  mb-4">
                            <label className="form-label">Nombre</label>
                            <input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                type="text"
                                className='form-control'
                                required />

                        </div>
                        <div className="col-md-3  mb-4">
                            <label className="form-label">CORREO </label>
                            <input
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className='col-md-3  mb-4'>
                            <label className='form-label'>Tipo de cedula</label>
                            <input
                                value={tipo_cedula}
                                onChange={(e) => setTipo_cedula(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className="col-md-3  mb-4">
                            <label className="form-label">CEDULA</label>
                            <input
                                value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-3  mb-4">
                            <label className="form-label">PROVINCIA</label>
                            <input
                                value={provincia}
                                onChange={(e) => setProvincia(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-3  mb-4">
                            <label className="form-label">CANTON</label>
                            <input
                                value={canton}
                                onChange={(e) => setCanton(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-3  mb-4">
                            <label className="form-label">DISTRITO</label>
                            <input
                                value={distrito}
                                onChange={(e) => setDistrito(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-3  mb-4">
                            <label className="form-label">BARRIO</label>
                            <input
                                value={barrio}
                                onChange={(e) => setBarrio(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-6  mb-4">
                            <label className="form-label">OTRAS_SENNAS</label>
                            <input
                                value={otras_sennas}
                                onChange={(e) => setOtras_sennas(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>


                        <div className="col-md-6  mb-4">
                            <label className="form-label">TELEFONO_1</label>
                            <input
                                value={telefono_1}
                                onChange={(e) => setTelefono_1(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-6  mb-4">
                            <label className="form-label">TELEFONO_2</label>
                            <input
                                value={telefono_2}
                                onChange={(e) => setTelefono_2(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>


                        <div className="col-md-6  mb-4">
                            <label className="form-label">TELEFONO_3</label>
                            <input
                                value={telefono_3}
                                onChange={(e) => setTelefono_3(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>




                        <button type="submit" className="btn btn-primary" style={{ margin: '10px auto', width: '300px', display: 'block' }}>Actualizar</button>
                    </div>
                </form>
            </div>

        </div>
    )


}

export default EditarProveedor