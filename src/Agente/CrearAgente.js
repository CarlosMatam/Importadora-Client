
/*import '../CSS/EstilosCrear.css'*/
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Sidebar from '../Components/Sidebar';


const URI = 'http://localhost:8000/Agentes/';
const URI2 = 'http://localhost:8000/Zonas/';
const URI3 = 'http://localhost:8000/DireccionesAgente/';
const URI4 = 'http://localhost:8000/TelefonosAgente/';

const Validaciones = Yup.object().shape({
    NOMBRE: Yup.string().required('Nombre es requerido'),
    APELLIDO_PATERNO: Yup.string().required('Primer Apellido es requerido'),
    APELLIDO_MATERNO: Yup.string().required('Segundo Apellido es requerido'),
    COMISION_POR_VENTA: Yup.number()
        .typeError('Comisión debe ser un número')
        .required('Comisión es requerida'),
    ID_ZONA: Yup.string().required('Zona es requerida'),
    IDENTIFICACION: Yup.string().required('Cédula es requerida'),
    PROVINCIA: Yup.string().required('Provincia es requerida'),
    CANTON: Yup.string().required('Cantón es requerido'),
    DISTRITO: Yup.string().required('Distrito es requerido'),
    BARRIO: Yup.string().required('Barrio es requerido'),
    OTRAS_SENNAS: Yup.string().required('Otras señas es requerido'),
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

const CrearAgente = () => {
    const [Zonas, setZona] = useState([]);
    useEffect(() => {
        getZonas();
    }, []);

    // consumir zonas
    const getZonas = async () => {
        const res = await axios.get(URI2);
        setZona(res.data);
    };

    const navigate = useNavigate();

    // datos
    const store = async (values) => {
        const {
            NOMBRE,
            APELLIDO_PATERNO,
            APELLIDO_MATERNO,
            COMISION_POR_VENTA,
            ID_ZONA,
            IDENTIFICACION,
            PROVINCIA,
            CANTON,
            DISTRITO,
            BARRIO,
            OTRAS_SENNAS,
            TELEFONO_1,
            TELEFONO_2,
            TELEFONO_3,
        } = values;

        const agenteDeVentasResponse = await axios.post(URI, {
            NOMBRE,
            APELLIDO_PATERNO,
            APELLIDO_MATERNO,
            COMISION_POR_VENTA,
            ID_ZONA,
            IDENTIFICACION,
        });

        const ID_AGENTE = agenteDeVentasResponse.data.ID_AGENTE;

        await axios.post(URI3, {
            PROVINCIA,
            CANTON,
            DISTRITO,
            BARRIO,
            OTRAS_SENNAS,
            ID_AGENTE,
        });

        await axios.post(URI4, {
            TELEFONO_1,
            TELEFONO_2,
            TELEFONO_3,
            ID_AGENTE
        });

        navigate('/');
    };

    return (
        
        <Formik
            initialValues={{
                NOMBRE: '',
                APELLIDO_PATERNO: '',
                APELLIDO_MATERNO: '',
                COMISION_POR_VENTA: '',
                ID_ZONA: '',
                IDENTIFICACION: '',
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
                            <div className="col-md-3  mb-4">
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
                            <div className="col-md-3  mb-4">
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
                            <div className="col-md-3  mb-4">
                    <label className="form-label">Comisión</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="COMISION_POR_VENTA"
                        required
                    />
                    <ErrorMessage
                        name="COMISION_POR_VENTA"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-3  mb-4">
                    <label className="form-label">Cedula</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="IDENTIFICACION"
                        required
                    />
                    <ErrorMessage
                        name="IDENTIFICACION"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-3  mb-4">
                    <label className="form-label">Zona</label>
                    <Field as="select" className="form-control" name="ID_ZONA" required>
                        <option value="">Seleccionar Zona</option>
                        {Zonas.map((option) => (
                            <option key={option.ID_ZONA} value={option.ID_ZONA}>
                                {option.NOMBRE}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage
                        name="ID_ZONA"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-3  mb-4">
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
                            <div className="col-md-3  mb-4">
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
                            <div className="col-md-3  mb-4">
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
                            <div className="col-md-3  mb-4">
                    <label className="form-label">Barrio</label>
                    <Field type="text" className="form-control" name="BARRIO" required />
                    <ErrorMessage
                        name="BARRIO"
                        component="div"
                        className="text-danger"
                    />
                </div>
                            <div className="col-md-6  mb-4">
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
                            <div className="col-md-4  mb-4">
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
                            <div className="col-md-4  mb-4">
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
                            <div className="col-md-4  mb-4">
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
                            <button type="submit" className="btn btn-primary" style={{ margin: '10px auto', width: '300px', display: 'block'  }}>
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