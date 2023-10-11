/*import '../CSS/EstilosCrear.css'*/
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';



const uri = `${API}/Clientes/`;
const uri2 = `${API}/TipoCedula/`;
const uri3 = `${API}/DireccionesCliente/`;
const uri4 = `${API}/TelefonosCliente/`;
const uri5 = `${API}/TiposCliente/`;

const Validaciones = Yup.object().shape({
    nombre: Yup.string().required('Nombre es requerido'),
    apellido_paterno: Yup.string().required('Primer Apellido es requerido'),
    apellido_materno: Yup.string().required('Segundo Apellido es requerido'),
    id_tipo_cliente: Yup.number()
        .typeError('ID_TIPO_CLIENTE debe ser un número')
        .required('ID_TIPO_CLIENTE es requerida'),
    correo: Yup.string().required('Correo es requerido'),
    tipo_cedula: Yup.string().required('Tipo de cédula es requerida'),
    cedula: Yup.string().required('Cédula es requerida'),
    provincia: Yup.string().required('Provincia es requerido'),
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

const CrearCliente = () => {

    const [tiposcedulas, setCedula] = useState([]);
    useEffect(() => {
        getTiposCedulas();
    }, []);

    // Procedure to fetch all Zonas
    const getTiposCedulas = async () => {
        const res = await axios.get(uri2);
        setCedula(res.data);
    };

    const [tiposclientes, setCliente] = useState([]);
    useEffect(() => {
        getTiposClientes();
    }, []);

    // Procedure to fetch all Zonas
    const getTiposClientes = async () => {
        const res = await axios.get(uri5);
        setCliente(res.data);
    };

    const navigate = useNavigate();

    // datos
    const store = async (values) => {
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            id_tipo_cliente,
            correo,
            tipo_cedula,
            cedula,
            provincia,
            canton,
            distrito,
            barrio,
            otras_sennas,
            telefono_1,
            telefono_2,
            telefono_3,
        } = values;

        const clienteResponse = await axios.post(uri, {
            nombre,
            apellido_paterno,
            apellido_materno,
            id_tipo_cliente,
            correo,
            tipo_cedula,
            cedula,
        });

        const id_cliente = clienteResponse.data.id_cliente;

        await axios.post(uri3, {
            provincia,
            canton,
            distrito,
            barrio,
            otras_sennas,
            id_cliente,
        });

        await axios.post(uri4, {
            telefono_1,
            telefono_2,
            telefono_3,
            id_cliente,
        });

        navigate('/Clientes');
    };

    return (
        <Formik
            initialValues={{
                nombre: '',
                apellido_paterno: '',
                apellido_materno: '',
                id_tipo_cliente: '',
                correo: '',
                tipo_cedula: '',
                cedula: '',
                provincia: '',
                canton: '',
                distrito: '',
                barrio: '',
                otras_sennas: '',
                telefono_1: '',
                telefono_2: '',
                telefono_3: '',
            }}
            validationSchema={Validaciones}
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
                            <div className="col-md-3 mb-4">
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
                            <div className="col-md-3 mb-4">
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
                            <div className="col-md-3 mb-4">
                                <label className="form-label">Tipo de Cliente</label>
                                <Field as="select" className="form-control" name="id_tipo_cliente" required>
                                    <option value="">Seleccionar Tipo de Cliente</option>
                                    {tiposclientes.map((option) => (
                                        <option key={option.id_tipo_cliente} value={option.id_tipo_cliente}>
                                            {option.nombre}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="id_tipo_cliente"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3 mb-4">
                                <label className="form-label">Correo</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="correo"
                                    required
                                />
                                <ErrorMessage
                                    name="correo"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3 mb-4">
                                <label className="form-label">Tipo de Cédula</label>
                                <Field as="select" className="form-control" name="tipo_cedula" required>
                                    <option value="">Seleccionar Tipo de Cédula</option>
                                    {tiposcedulas.map((option) => (
                                        <option key={option.id_tipo_cedula} value={option.id_tipo_cedula}>
                                            {option.descripcion}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="tipo_cedula"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3 mb-4">
                                <label className="form-label">Cédula</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="cedula"
                                    required
                                />
                                <ErrorMessage
                                    name="cedula"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-3 mb-4">
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
                            <div className="col-md-4 mb-4">
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
                            <div className="col-md-4 mb-4">
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
                            <div className="col-md-4 mb-4">
                                <label className="form-label">Barrio</label>
                                <Field type="text" className="form-control" name="barrio" required />
                                <ErrorMessage
                                    name="barrio"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="col-md-12 mb-4">
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
                            <div className="col-md-4 mb-4">
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
                            <div className="col-md-4 mb-4">
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
                            <div className="col-md-4 mb-4">
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

export default CrearCliente;