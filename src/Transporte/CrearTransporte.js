import '../CSS/EstilosCrear.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';



const URI = 'http://localhost:8000/Transportes/'
const URI2 = 'http://localhost:8000/TelefonosTrans/'


const CrearTransporte = () => {

    const [NOMBRE, setNombre] = useState('')

    const [TELEFONO_1, setTelefono_1] = useState('')
    const [TELEFONO_2, setTelefono_2] = useState('')
    const [TELEFONO_3, setTelefono_3] = useState('')



    const navigate = useNavigate()

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault()

        const transporteResponse = await axios.post(URI, { NOMBRE: NOMBRE })



        const ID_TRANSPORTE = transporteResponse.data.ID_TRANSPORTE;

        await axios.post(URI2, { TELEFONO_1: TELEFONO_1, TELEFONO_2: TELEFONO_2, TELEFONO_3: TELEFONO_3, ID_TRANSPORTE: ID_TRANSPORTE })

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
                    value={NOMBRE}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    className='form-control'
                    required />

            </div>

                    <div className="col-md-6  mb-4">
                <label className="form-label">TELEFONO_1</label>
                <input
                    value={TELEFONO_1}
                    onChange={(e) => setTelefono_1(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>

                    <div className="col-md-6  mb-4">
                <label className="form-label">TELEFONO_2</label>
                <input
                    value={TELEFONO_2}
                    onChange={(e) => setTelefono_2(e.target.value)}
                    type="text"
                    className='form-control'
                    required />
            </div>


                    <div className="col-md-6  mb-4">
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

export default CrearTransporte


