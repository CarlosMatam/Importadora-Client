
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const URI = `${API}/Proveedores/`

const URI2 = `${API}/TipoCedula/`

const URI3 = `${API}/DireccionesProvee/`
const URI4 = `${API}/TelefonosProvee/`


const CrearProveedor = () => {

    const [Tipos, setTipo] = useState([])
    useEffect(() => {
        getTipos()
    }, [])

    //procedimineto para mostrar todos los tipos de cedula
    const getTipos = async () => {
        const res = await axios.get(URI2)
        setTipo(res.data)
    }




    const [NOMBRE, setNombre] = useState('')
    const [CORREO, setCorreo] = useState('')
    const [TIPO_CEDULA, setTipo_cedula] = useState('')
    const [CEDULA, setCedula] = useState('')

    const [ID_TIPO_CEDULA] = useState('')

    const [PROVINCIA, setProvincia] = useState('')
    const [CANTON, setCanton] = useState('')
    const [DISTRITO, setDistrito] = useState('')
    const [BARRIO, setBarrio] = useState('')
    const [OTRAS_SENNAS, setOtras_sennas] = useState('')

    const [TELEFONO_1, setTelefono_1] = useState('')
    const [TELEFONO_2, setTelefono_2] = useState('')
    const [TELEFONO_3, setTelefono_3] = useState('')



    const navigate = useNavigate()

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault()

        const proveedoresResponse = await axios.post(URI, { NOMBRE: NOMBRE, CORREO: CORREO, TIPO_CEDULA: TIPO_CEDULA, CEDULA: CEDULA })



        const ID_PROVEEDOR = proveedoresResponse.data.ID_PROVEEDOR;


        await axios.post(URI3, { PROVINCIA: PROVINCIA, CANTON: CANTON, DISTRITO: DISTRITO, BARRIO: BARRIO, OTRAS_SENNAS: OTRAS_SENNAS, ID_PROVEEDOR: ID_PROVEEDOR })

        await axios.post(URI4, { TELEFONO_1: TELEFONO_1, TELEFONO_2: TELEFONO_2, TELEFONO_3: TELEFONO_3, ID_PROVEEDOR: ID_PROVEEDOR })

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
                    value={NOMBRE}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    className='form-control'
                    required />

            </div>
                        <div className="col-md-3 mb-4">
                <label className="form-label">CORREO </label>
                <input
                    value={CORREO}
                    onChange={(e) => setCorreo(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>

                        <div className="col-md-4 mb-4">
                            <label className="form-label">TIPO CEDULA </label>
                            <select style={{ marginLeft: '15px' }} value={TIPO_CEDULA} onChange={(e) => setTipo_cedula(e.target.value)}>
                                {Tipos.map((option) => (
                                    <option key={option.ID_TIPO_CEDULA} value={option.ID_TIPO_CEDULA} >{option.DESCRIPCION}</option>
                                ))}
                            </select>
                        </div>
           


                        <div className="col-md-3 mb-4">
                <label className="form-label">CEDULA</label>
                <input
                    value={CEDULA}
                    onChange={(e) => setCedula(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>

                        <div className="col-md-3 mb-4">
                <label className="form-label">PROVINCIA</label>
                <input
                    value={PROVINCIA}
                    onChange={(e) => setProvincia(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>

                        <div className="col-md-3 mb-4">
                <label className="form-label">CANTON</label>
                <input
                    value={CANTON}
                    onChange={(e) => setCanton(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>

                        <div className="col-md-3 mb-4">
                <label className="form-label">DISTRITO</label>
                <input
                    value={DISTRITO}
                    onChange={(e) => setDistrito(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>

                        <div className="col-md-3 mb-4">
                <label className="form-label">BARRIO</label>
                <input
                    value={BARRIO}
                    onChange={(e) => setBarrio(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>

                        <div className="col-md-9 mb-4">
                <label className="form-label">OTRAS_SENNAS</label>
                <input
                    value={OTRAS_SENNAS}
                    onChange={(e) => setOtras_sennas(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>


                        <div className="col-md-4 mb-4">
                <label className="form-label">TELEFONO_1</label>
                <input
                    value={TELEFONO_1}
                    onChange={(e) => setTelefono_1(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>

                        <div className="col-md-4 mb-4">
                <label className="form-label">TELEFONO_2</label>
                <input
                    value={TELEFONO_2}
                    onChange={(e) => setTelefono_2(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>


                        <div className="col-md-4 mb-4">
                <label className="form-label">TELEFONO_3</label>
                <input
                    value={TELEFONO_3}
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


