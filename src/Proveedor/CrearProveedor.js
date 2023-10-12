

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const uri = `${API}/Proveedores/`

const uri2 = `${API}/TipoCedula/`

const uri3 = `${API}/DireccionesProvee/`
const uri4 = `${API}/TelefonosProvee/`


const CrearProveedor = () => {

    const [tipos, setTipo] = useState([])
    useEffect(() => {
        getTipos()
    }, [])

    //procedimineto para mostrar todos los tipos de cedula
    const getTipos = async () => {
        const res = await axios.get(uri2)
        setTipo(res.data)
    }




    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [tipo_cedula, setTipo_cedula] = useState('')
    const [cedula, setCedula] = useState('')

    const [id_tipo_cedula] = useState('')

    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [barrio, setBarrio] = useState('')
    const [otras_sennas, setOtras_sennas] = useState('')

    const [telefono_1, setTelefono_1] = useState('')
    const [telefono_2, setTelefono_2] = useState('')
    const [telefono_3, setTelefono_3] = useState('')



    const navigate = useNavigate()

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault()

        const proveedoresResponse = await axios.post(uri, { nombre: nombre, correo: correo, tipo_cedula: tipo_cedula, cedula: cedula })



        const id_proveedor = proveedoresResponse.data.id_proveedor;


        await axios.post(uri3, { provincia: provincia, canton: canton, distrito: distrito, barrio: barrio, otras_sennas: otras_sennas, id_proveedor: id_proveedor })

        await axios.post(uri4, { telefono_1: telefono_1, telefono_2: telefono_2, telefono_3: telefono_3, id_proveedor: id_proveedor })

        navigate('/Proveedores')
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />
            <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                <form style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }} onSubmit={store}  >

                    <div className="row">
                        <div className="col-md-3 mb-4">
                            <label className="form-label">Nombre</label>
                            <input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                type="text"
                                className='form-control'
                                required />

                        </div>
                        <div className="col-md-3 mb-4">
                            <label className="form-label">CORREO </label>
                            <input
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-4 mb-4">
                            <label className="form-label">TIPO CEDULA </label>
                            <select style={{ marginLeft: '15px' }} value={tipo_cedula} onChange={(e) => setTipo_cedula(e.target.value)}>
                                {tipos.map((option) => (
                                    <option key={option.id_tipo_cedula} value={option.id_tipo_cedula} >{option.descripcion}</option>
                                ))}
                            </select>
                        </div>



                        <div className="col-md-3 mb-4">
                            <label className="form-label">CEDULA</label>
                            <input
                                value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-3 mb-4">
                            <label className="form-label">PROVINCIA</label>
                            <input
                                value={provincia}
                                onChange={(e) => setProvincia(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-3 mb-4">
                            <label className="form-label">CANTON</label>
                            <input
                                value={canton}
                                onChange={(e) => setCanton(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-3 mb-4">
                            <label className="form-label">DISTRITO</label>
                            <input
                                value={distrito}
                                onChange={(e) => setDistrito(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-3 mb-4">
                            <label className="form-label">BARRIO</label>
                            <input
                                value={barrio}
                                onChange={(e) => setBarrio(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-9 mb-4">
                            <label className="form-label">OTRAS_SENNAS</label>
                            <input
                                value={otras_sennas}
                                onChange={(e) => setOtras_sennas(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>


                        <div className="col-md-4 mb-4">
                            <label className="form-label">TELEFONO_1</label>
                            <input
                                value={telefono_1}
                                onChange={(e) => setTelefono_1(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>

                        <div className="col-md-4 mb-4">
                            <label className="form-label">TELEFONO_2</label>
                            <input
                                value={telefono_2}
                                onChange={(e) => setTelefono_2(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>


                        <div className="col-md-4 mb-4">
                            <label className="form-label">TELEFONO_3</label>
                            <input
                                value={telefono_3}
                                onChange={(e) => setTelefono_3(e.target.value)}
                                type="text"
                                className='form-control'
                                required />
                        </div>



                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" style={{ margin: '10px auto', width: '300px', display: 'block' }}>
                                Guardar
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default CrearProveedor





