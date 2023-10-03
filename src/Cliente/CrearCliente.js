/*import '../CSS/EstilosCrear.css'*/
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Sidebar from '../Components/Sidebar';


const URI = 'http://localhost:8000/Clientes/';
const URI2 = 'http://localhost:8000/TipoCedula/';
const URI3 = 'http://localhost:8000/DireccionesCliente/';
const URI4 = 'http://localhost:8000/TelefonosCliente/';
const URI5 = 'http://localhost:8000/TiposCliente/';

const Validaciones = Yup.object().shape({
    NOMBRE: Yup.string().required('Nombre es requerido'),
    APELLIDO_PATERNO: Yup.string().required('Primer Apellido es requerido'),
    APELLIDO_MATERNO: Yup.string().required('Segundo Apellido es requerido'),
    ID_TIPO_CLIENTE: Yup.number()
        .typeError('ID_TIPO_CLIENTE debe ser un número')
        .required('ID_TIPO_CLIENTE es requerida'),
    CORREO: Yup.string().required('CORREO es requerida'),
    TIPO_CEDULA: Yup.string().required('TIPO_CEDULA es requerida'),
    CEDULA: Yup.string().required('CEDULA es requerida'),
    PROVINCIA: Yup.string().required('PROVINCIA es requerido'),
    CANTON: Yup.string().required('CANTON es requerido'),
    DISTRITO: Yup.string().required('DISTRITO es requerido'),
    BARRIO: Yup.string().required('BARRIO señas es requerido'),
    OTRAS_SENNAS: Yup.string().required('OTRAS_SENNAS señas es requerido'),
    TELEFONO_1: Yup.string()
        .matches(/^\d+$/, 'Teléfono 1 solo debe contener números')
        .required('Teléfono 1 es requerido'),
    TELEFONO_2: Yup.string()
        .matches(/^\d+$/, 'Teléfono 2 solo debe contener números')
        .required('Teléfono 2 es requerido'),
    TELEFONO_3: Yup.string()
        .matches(/^\d+$/, 'Teléfono 3 solo debe contener números')
        .required('Teléfono 3 es requerido'),
});

const CrearCliente = () => {

    const [TiposCedulas, setCedula] = useState([]);
    useEffect(() => {
        getTiposCedulas();
    }, []);

    // Procedure to fetch all Zonas
    const getTiposCedulas = async () => {
        const res = await axios.get(URI2);
        setCedula(res.data);
    };

    const [TiposClientes, setCliente] = useState([]);
    useEffect(() => {
        getTiposClientes();
    }, []);

    // Procedure to fetch all Zonas
    const getTiposClientes = async () => {
        const res = await axios.get(URI5);
        setCliente(res.data);
    };

    const navigate = useNavigate();

    // datos
    const store = async (values) => {
        const {
            NOMBRE,
            APELLIDO_PATERNO,
            APELLIDO_MATERNO,
            ID_TIPO_CLIENTE,
            CORREO,
            TIPO_CEDULA,
            CEDULA,
            PROVINCIA,
            CANTON,
            DISTRITO,
            BARRIO,
            OTRAS_SENNAS,
            TELEFONO_1,
            TELEFONO_2,
            TELEFONO_3,
        } = values;

        const clienteResponse = await axios.post(URI, {
            NOMBRE,
            APELLIDO_PATERNO,
            APELLIDO_MATERNO,
            ID_TIPO_CLIENTE,
            CORREO,
            TIPO_CEDULA,
            CEDULA,
        });

        const ID_CLIENTE = clienteResponse.data.ID_CLIENTE;

        await axios.post(URI3, {
            PROVINCIA,
            CANTON,
            DISTRITO,
            BARRIO,
            OTRAS_SENNAS,
            ID_CLIENTE,
        });

        await axios.post(URI4, {
            TELEFONO_1,
            TELEFONO_2,
            TELEFONO_3,
            ID_CLIENTE,
        });

        navigate('/Clientes');
    };

    return (
        <Formik
            initialValues={{
                NOMBRE: '',
                APELLIDO_PATERNO: '',
                APELLIDO_MATERNO: '',
                ID_TIPO_CLIENTE: '',
                CORREO: '',
                TIPO_CEDULA: '',
                CEDULA: '',
                PROVINCIA: '',
                CANTON: '',
                DISTRITO: '',
                BARRIO: '',
                OTRAS_SENNAS: '',
                TELEFONO_1: '',
                TELEFONO_2: '',
                TELEFONO_3: '',
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
                        name="NOMBRE"
                        required
                    />
                    <ErrorMessage
                        name="NOMBRE"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Apellido Paterno</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="APELLIDO_PATERNO"
                        required
                    />
                    <ErrorMessage
                        name="APELLIDO_PATERNO"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Apellido Materno</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="APELLIDO_MATERNO"
                        required
                    />
                    <ErrorMessage
                        name="APELLIDO_MATERNO"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Tipo de Cliente</label>
                    <Field as="select" className="form-control" name="ID_TIPO_CLIENTE" required>
                        <option value="">Seleccionar Tipo de Cliente</option>
                        {TiposClientes.map((option) => (
                            <option key={option.ID_TIPO_CLIENTE} value={option.ID_TIPO_CLIENTE}>
                                {option.NOMBRE}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage
                        name="ID_TIPO_CLIENTE"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Correo</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="CORREO"
                        required
                    />
                    <ErrorMessage
                        name="CORREO"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Tipo de Cédula</label>
                    <Field as="select" className="form-control" name="TIPO_CEDULA" required>
                        <option value="">Seleccionar Tipo de Cédula</option>
                        {TiposCedulas.map((option) => (
                            <option key={option.ID_TIPO_CEDULA} value={option.ID_TIPO_CEDULA}>
                                {option.DESCRIPCION}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage
                        name="TIPO_CEDULA"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Cédula</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="CEDULA"
                        required
                    />
                    <ErrorMessage
                        name="CEDULA"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-3 mb-4">
                    <label className="form-label">Provincia</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="PROVINCIA"
                        required
                    />
                    <ErrorMessage
                        name="PROVINCIA"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-4 mb-4">
                    <label className="form-label">Cantón</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="CANTON"
                        required
                    />
                    <ErrorMessage
                        name="CANTON"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-4 mb-4">
                    <label className="form-label">Distrito</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="DISTRITO"
                        required
                    />
                    <ErrorMessage
                        name="DISTRITO"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-4 mb-4">
                    <label className="form-label">Barrio</label>
                    <Field type="text" className="form-control" name="BARRIO" required />
                    <ErrorMessage
                        name="BARRIO"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-12 mb-4">
                    <label className="form-label">Otras Señas</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="OTRAS_SENNAS"
                        required
                    />
                    <ErrorMessage
                        name="OTRAS_SENNAS"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-4 mb-4">
                    <label className="form-label">Teléfono 1</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="TELEFONO_1"
                        required
                    />
                    <ErrorMessage
                        name="TELEFONO_1"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-4 mb-4">
                    <label className="form-label">Teléfono 2</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="TELEFONO_2"
                        required
                    />
                    <ErrorMessage
                        name="TELEFONO_2"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-4 mb-4">
                    <label className="form-label">Teléfono 3</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="TELEFONO_3"
                        required
                    />
                    <ErrorMessage
                        name="TELEFONO_3"
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