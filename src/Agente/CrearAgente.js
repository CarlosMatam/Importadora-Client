
/*import '../CSS/EstilosCrear.css'*/
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';

const uri = `${API}/Agentes`;
const uri2 = `${API}/Zonas/`;
const uri3 = `${API}/DireccionesAgente/`;
const uri4 = `${API}/TelefonosAgente/`;

const validaciones = Yup.object().shape({
    nombre: Yup.string().required('Nombre es requerido'),
    apellido_paterno: Yup.string().required('Primer Apellido es requerido'),
    apellido_materno: Yup.string().required('Segundo Apellido es requerido'),
    comision_por_venta: Yup.number()
        .typeError('Comisión debe ser un número')
        .required('Comisión es requerida'),
    id_zona: Yup.string().required('Zona es requerida'),
    identificacion: Yup.string().required('Cédula es requerida'),
    provincia: Yup.string().required('Provincia es requerida'),
    canton: Yup.string().required('Cantón es requerido'),
    distrito: Yup.string().required('Distrito es requerido'),
    barrio: Yup.string().required('Barrio es requerido'),
    otras_sennas: Yup.string().required('Otras señas es requerido'),
    telefono_1: Yup.string()
        .matches(/^\d+$/, 'Teléfono 1 solo debe contener números')
        .required('Teléfono 1 es requerido'),
    telefono_2: Yup.string()
        .matches(/^\d+$/, 'Teléfono 2 solo debe contener números')
        .required('Teléfono 2 es requerido'),
    telefono_3: Yup.string()
        .matches(/^\d+$/, 'Teléfono 3 solo debe contener números')
        .required('Teléfono 3 es requerido'),
});

const CrearAgente = () => {
    const [zonas, setZona] = useState([]);
    useEffect(() => {
        getZonas();
    }, []);

    // Consumir zonas
    const getZonas = async () => {
        const res = await axios.get(uri2);
        setZona(res.data);
    };

    const navigate = useNavigate();

    // Datos
    const store = async (values) => {
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            comision_por_venta,
            id_zona,
            identificacion,
            provincia,
            canton,
            distrito,
            barrio,
            otras_sennas,
            telefono_1,
            telefono_2,
            telefono_3,
        } = values;

        const agenteDeVentasResponse = await axios.post(uri, {
            nombre,
            apellido_paterno,
            apellido_materno,
            comision_por_venta,
            id_zona,
            identificacion,
        });

        const id_agente = agenteDeVentasResponse.data.id_agente;

        await axios.post(uri3, {
            provincia,
            canton,
            distrito,
            barrio,
            otras_sennas,
            id_agente,
        });

        await axios.post(uri4, {
            telefono_1,
            telefono_2,
            telefono_3,
            id_agente
        });

        navigate('/');
    };

    return (

        <Formik
            initialValues={{
                nombre: '',
                apellido_paterno: '',
                apellido_materno: '',
                comision_por_venta: '',
                id_zona: '',
                identificacion: '',
                provincia: '',
                canton: '',
                distrito: '',
                barrio: '',
                otras_sennas: '',
                telefono_1: '',
                telefono_2: '',
                telefono_3: '',
            }}
            validationSchema={validaciones}
            onSubmit={store}
        >


            <div style={{ display: 'flex' }}>
                {/* Coloca el Sidebar a la izquierda */}
                <Sidebar />
                <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                    <Form style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }}>
                        <div className="row">
                            <div className="col-md-3 mb-4">
                                <label className="form-label">Nombre</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    required
                                />
                                <ErrorMessage
                                    name="nombre"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3  mb-4">
                                <label className="form-label">Apellido Paterno</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="apellido_paterno"
                                    required
                                />
                                <ErrorMessage
                                    name="apellido_paterno"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3  mb-4">
                                <label className="form-label">Apellido Materno</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="apellido_materno"
                                    required
                                />
                                <ErrorMessage
                                    name="apellido_materno"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3  mb-4">
                                <label className="form-label">Comisión</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="comision_por_venta"
                                    required
                                />
                                <ErrorMessage
                                    name="comision_por_venta"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3  mb-4">
                                <label className="form-label">Cedula</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="identificacion"
                                    required
                                />
                                <ErrorMessage
                                    name="identificacion"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3  mb-4">
                                <label className="form-label">Zona</label>
                                <Field as="select" className="form-control" name="id_zona" required>
                                    <option value="">Seleccionar Zona</option>
                                    {zonas.map((option) => (
                                        <option key={option.id_zona} value={option.id_zona}>
                                            {option.nombre}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="id_zona"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3  mb-4">
                                <label className="form-label">Provincia</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="provincia"
                                    required
                                />
                                <ErrorMessage
                                    name="provincia"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3  mb-4">
                                <label className="form-label">Cantón</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="canton"
                                    required
                                />
                                <ErrorMessage
                                    name="canton"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3  mb-4">
                                <label className="form-label">Distrito</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="distrito"
                                    required
                                />
                                <ErrorMessage
                                    name="distrito"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3  mb-4">
                                <label className="form-label">Barrio</label>
                                <Field type="text" className="form-control" name="barrio" required />
                                <ErrorMessage
                                    name="barrio"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-6  mb-4">
                                <label className="form-label">Otras Señas</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="otras_sennas"
                                    required
                                />
                                <ErrorMessage
                                    name="otras_sennas"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-4  mb-4">
                                <label className="form-label">Teléfono 1</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="telefono_1"
                                    required
                                />
                                <ErrorMessage
                                    name="telefono_1"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-4  mb-4">
                                <label className="form-label">Teléfono 2</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="telefono_2"
                                    required
                                />
                                <ErrorMessage
                                    name="telefono_2"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-4  mb-4">
                                <label className="form-label">Teléfono 3</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="telefono_3"
                                    required
                                />
                                <ErrorMessage
                                    name="telefono_3"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ margin: '10px auto', width: '300px', display: 'block' }}>
                                Guardar
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </Formik>
    );
};

export default CrearAgente;