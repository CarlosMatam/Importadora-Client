import '../CSS/EstilosCrear.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';



const uri = `${API}/Transportes/`
const uri2 = `${API}/TelefonosTrans/`


const CrearTransporte = () => {

    const [nombre, setNombre] = useState('')

    const [telefono_1, setTelefono_1] = useState('')
    const [telefono_2, setTelefono_2] = useState('')
    const [telefono_3, setTelefono_3] = useState('')



    const navigate = useNavigate()

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault()

        const transporteResponse = await axios.post(uri, { nombre: nombre })



        const id_transporte = transporteResponse.data.id_transporte;

        await axios.post(uri2, { telefono_1: telefono_1, telefono_2: telefono_2, telefono_3: telefono_3, id_transporte: id_transporte })

        navigate('/Transportes')
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />

            <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                <form style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }} onSubmit={store}  >
                    <div className="row">
                        <div className="col-md-6  mb-4">
                            <label className="form-label">NOMBRE</label>
                            <input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
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

export default CrearTransporte


