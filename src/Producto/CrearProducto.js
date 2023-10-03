import '../CSS/EstilosCrear.css'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';


const URI = `${API}/Productos/`;
const URI2 = `${API}/Companias/`;
const URI3 = `${API}/Proveedores/`;
const URI4 = `${API}/Cabys`;

const Validaciones = Yup.object().shape({
    ID_PRODUCTO: Yup.string().required('Codigo es requerido'),
    NOMBRE: Yup.string().required('Nombre es requerido'),
    DESCRIPCION: Yup.string().required('DESCRIPCION es requerido'),
    PROVEEDOR: Yup.string().required(' PROVEEDOR es requerido'),
    PRECIO: Yup.number()
        .typeError('PRECIO debe ser un número')
        .required('PRECIO es requerida'),
    DESCUENTO: Yup.string().required('DESCUENTO es requerida'),
    PORCENTAJE_GANANCIA_1: Yup.string().required('PORCENTAJE_GANANCIA_1 es requerida'),
    PORCENTAJE_GANANCIA_2: Yup.string().required('PORCENTAJE_GANANCIA_2 es requerida'),
    PORCENTAJE_GANANCIA_3: Yup.string().required('PORCENTAJE_GANANCIA_3 es requerido'),
    EXISTENCIA_ACTUAL: Yup.string().required('EXISTENCIA_ACTUAL es requerido'),
    CABYS: Yup.string().required('CABYS es requerido'),
    COMPANIA: Yup.string().required('COMPANIA es requerido'),
    FECHA_INGRESO: Yup.date().required('FECHA_INGRESO es requerido'),

});

const CrearProducto = () => {

    const [Companias, setCompania] = useState([]);
    useEffect(() => {
        getCompanias();
    }, []);


    const getCompanias = async () => {
        const res = await axios.get(URI2);
        setCompania(res.data);
    };

    const [Proveedores, setProveedor] = useState([]);
    useEffect(() => {
        getProveedores();
    }, []);


    const getProveedores = async () => {
        const res = await axios.get(URI3);
        setProveedor(res.data);
    };

    const [Cabys, setCabys] = useState([]);
    useEffect(() => {
        getCabys();
    }, []);


    const getCabys = async () => {
        const res = await axios.get(URI4);
        setCabys(res.data);
    };

    const navigate = useNavigate();

    // datos
    const store = async (values) => {
        const {
            ID_PRODUCTO,
            NOMBRE,
            DESCRIPCION,
            PROVEEDOR,
            PRECIO,
            DESCUENTO,
            PORCENTAJE_GANANCIA_1,
            PORCENTAJE_GANANCIA_2,
            PORCENTAJE_GANANCIA_3,
            EXISTENCIA_ACTUAL,
            CABYS,
            COMPANIA,
            FECHA_INGRESO,
        } = values;

        const agenteDeVentasResponse = await axios.post(URI, {
            ID_PRODUCTO,
            NOMBRE,
            DESCRIPCION,
            PROVEEDOR,
            PRECIO,
            DESCUENTO,
            PORCENTAJE_GANANCIA_1,
            PORCENTAJE_GANANCIA_2,
            PORCENTAJE_GANANCIA_3,
            EXISTENCIA_ACTUAL,
            CABYS,
            COMPANIA,
            FECHA_INGRESO,
        });


        navigate('/Productos');
    };

    return (
        <Formik
            initialValues={{
                ID_PRODUCTO: "",
                NOMBRE: '',
                DESCRIPCION: '',
                PROVEEDOR: '',
                PRECIO: '',
                DESCUENTO: '',
                PORCENTAJE_GANANCIA_1: '',
                PORCENTAJE_GANANCIA_2: '',
                PORCENTAJE_GANANCIA_3: '',
                EXISTENCIA_ACTUAL: '',
                CABYS: '',
                COMPANIA: '',
                FECHA_INGRESO: '',
            }}
            validationSchema={Validaciones}
            onSubmit={store}
        >
            <div style={{ display: 'flex' }}>
                {/* Coloca el Sidebar a la izquierda */}
                <Sidebar />
            <Form>

                <div className="col-md-4">
                    <label className="form-label">Codigo</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="ID_PRODUCTO"
                        required
                    />
                    <ErrorMessage
                        name="ID_PRODUCTO"
                        component="div"
                        className="text-danger"
                    />
                </div>


                <div className="col-md-4">
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
                <div className="col-md-4">
                    <label className="form-label">Descripción</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="DESCRIPCION"
                        required
                    />
                    <ErrorMessage
                        name="DESCRIPCION"
                        component="div"
                        className="text-danger"
                    />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Proveedor</label>
                    <Field as="select" className="form-control" name="PROVEEDOR" required>
                        <option value="">Seleccionar Proveedor</option>
                        {Proveedores.map((option) => (
                            <option key={option.ID_PROVEEDOR} value={option.ID_PROVEEDOR}>
                                {option.NOMBRE}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage
                        name="PROVEEDOR"
                        component="div"
                        className="text-danger"
                    />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Precio</label>
                    <Field
                        type="number"
                        className="form-control"
                        name="PRECIO"
                        required
                    />
                    <ErrorMessage
                        name="PRECIO"
                        component="div"
                        className="text-danger"
                    />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Descuento</label>
                    <Field
                        type="number"
                        className="form-control"
                        name="DESCUENTO"
                        required
                    />
                    <ErrorMessage
                        name="DESCUENTO"
                        component="div"
                        className="text-danger"
                    />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Primer Porcentaje de Ganancia</label>
                    <Field
                        type="number"
                        className="form-control"
                        name="PORCENTAJE_GANANCIA_1"
                        required
                    />
                    <ErrorMessage
                        name="PORCENTAJE_GANANCIA_1"
                        component="div"
                        className="text-danger"
                    />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Segundo Porcentaje de Ganancia</label>
                    <Field
                        type="number"
                        className="form-control"
                        name="PORCENTAJE_GANANCIA_2"
                        required
                    />
                    <ErrorMessage
                        name="PORCENTAJE_GANANCIA_2"
                        component="div"
                        className="text-danger"
                    />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Tercer Porcentaje de Ganancia</label>
                    <Field
                        type="number"
                        className="form-control"
                        name="PORCENTAJE_GANANCIA_3"
                        required
                    />
                    <ErrorMessage
                        name="PORCENTAJE_GANANCIA_3"
                        component="div"
                        className="text-danger"
                    />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Existencias Actuales</label>
                    <Field
                        type="number"
                        className="form-control"
                        name="EXISTENCIA_ACTUAL"
                        required
                    />
                    <ErrorMessage
                        name="EXISTENCIA_ACTUAL"
                        component="div"
                        className="text-danger"
                    />
                </div>
                <div className="col-md-2">
                    <label className="form-label">CABYS</label>
                    <Field as="select" className="form-control" name="CABYS" required>
                        <option value="">Seleccionar CABYS</option>
                        {Cabys.map((option) => (
                            <option key={option.ID_CABYS_MYM} value={option.ID_CABYS_MYM}>
                                {option.DESCRIPCION_BIEN_SERVICIO}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage
                        name="CABYS"
                        component="div"
                        className="text-danger"
                    />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Compañía</label>
                    <Field as="select" className="form-control" name="COMPANIA" required>
                        <option value="">Seleccionar Compañía</option>
                        {Companias.map((option) => (
                            <option key={option.ID_COMPANIA} value={option.ID_COMPANIA}>
                                {option.NOMBRE}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage
                        name="COMPANIA"
                        component="div"
                        className="text-danger"
                    />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Fecha de Ingreso</label>
                    <Field
                        type="date"
                        className="form-control"
                        name="FECHA_INGRESO"
                        required
                    />
                    <ErrorMessage
                        name="FECHA_INGRESO"
                        component="div"
                        className="text-danger"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Guardar
                </button>
                </Form>
            </div>
        </Formik>
    );
};

export default CrearProducto;