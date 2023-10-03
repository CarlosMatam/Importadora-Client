import '../CSS/EstilosEditar.css'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../Components/Sidebar';


const URI = 'http://localhost:8000/Productos/';
const URI2 = 'http://localhost:8000/Companias/';
const URI3 = 'http://localhost:8000/Proveedores/';


const EditarProducto = () => {
    const [Companias, setCompania] = useState([]);
    useEffect(() => {
        getCompanias();
    }, []);

    // Procedure to fetch all Zonas
    const getCompanias = async () => {
        const res = await axios.get(URI2);
        setCompania(res.data);
    };

    const [Proveedores, setProveedor] = useState([]);
    useEffect(() => {
        getProveedores();
    }, []);

    // Procedure to fetch all Zonas
    const getProveedores = async () => {
        const res = await axios.get(URI3);
        setProveedor(res.data);
    };

    const [NOMBRE, setNombre] = useState('')
    const [DESCRIPCION, setDescripcion] = useState('')
    const [PRECIO, setPrecio] = useState('')
    const [DESCUENTO, setDescuento] = useState('')
    const [PORCENTAJE_GANANCIA_1, setPorcentaje_ganancia_1] = useState('')
    const [PORCENTAJE_GANANCIA_2, setPorcentaje_ganancia_2] = useState('')
    const [PORCENTAJE_GANANCIA_3, setPorcentaje_ganancia_3] = useState('')
    const [EXISTENCIA_ACTUAL, setExistencia_actual] = useState('')
    const [CABYS, setCabys] = useState('')
    const [FECHA_INGRESO, setFecha_ingreso] = useState('')

    const navigate = useNavigate()

    const { ID_PRODUCTO } = useParams()
    const { COMPANIA } = useState('')
    const { PROVEEDOR } = useState('')


    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();

        // Actualizar el agente
        await axios.put(URI + ID_PRODUCTO, {
            NOMBRE: NOMBRE,
            DESCRIPCION: DESCRIPCION,
            Proveedores: Proveedores,
            PRECIO: PRECIO,
            DESCUENTO: DESCUENTO,
            PORCENTAJE_GANANCIA_1: PORCENTAJE_GANANCIA_1,
            PORCENTAJE_GANANCIA_2: PORCENTAJE_GANANCIA_2,
            PORCENTAJE_GANANCIA_3: PORCENTAJE_GANANCIA_3,
            EXISTENCIA_ACTUAL: EXISTENCIA_ACTUAL,
            CABYS: CABYS,
            Companias: Companias,
            FECHA_INGRESO: FECHA_INGRESO,
        });

        navigate('/Productos');
    };



    useEffect(() => {
        getProductoById()
    }, [])

    const getProductoById = async () => {
        const res = await axios.get(URI + ID_PRODUCTO);
        setNombre(res.data.NOMBRE);
        setDescripcion(res.data.DESCRIPCION);
        setPrecio(res.data.PRECIO);
        setDescuento(res.data.DESCUENTO);
        setPorcentaje_ganancia_1(res.data.PORCENTAJE_GANANCIA_1);
        setPorcentaje_ganancia_2(res.data.PORCENTAJE_GANANCIA_2);
        setPorcentaje_ganancia_3(res.data.PORCENTAJE_GANANCIA_3);
        setExistencia_actual(res.data.EXISTENCIA_ACTUAL);
        setCabys(res.data.CABYS);
        setFecha_ingreso(res.data.FECHA_INGRESO);

        const CompaniaRes = await axios.get(URI2 + COMPANIA);
        setCompania(CompaniaRes.data.NOMBRE);
        const ProveedorRes = await axios.get(URI3 + PROVEEDOR);
        setProveedor(ProveedorRes.data.NOMBRE);
    }

    return (
        <Formik>

            <h3>Edit POST</h3>
            <div style={{ display: 'flex' }}>
                {/* Coloca el Sidebar a la izquierda */}
                <Sidebar />
            <Form onSubmit={update}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={NOMBRE}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Descripción</label>
                    <textarea
                        value={DESCRIPCION}
                        onChange={(e) => setDescripcion(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                <div className="col-md-2">
                    <label className="form-label">Proveedor</label>
                    <Field as="select" className="form-control" name="PROVEEDOR" required>
                        <option value={PROVEEDOR}>Seleccionar Proveedor</option>
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

                <div className='mb-3'>
                    <label className='form-label'>Precio</label>
                    <textarea
                        value={PRECIO}
                        onChange={(e) => setPrecio(e.target.value)}
                        type="number"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Descuento</label>
                    <textarea
                        value={DESCUENTO}
                        onChange={(e) => setDescuento(e.target.value)}
                        type="number"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Primer Porcentaje de Ganancia</label>
                    <textarea
                        value={PORCENTAJE_GANANCIA_1}
                        onChange={(e) => setPorcentaje_ganancia_1(e.target.value)}
                        type="number"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Segundo Porcentaje de Ganancia</label>
                    <textarea
                        value={PORCENTAJE_GANANCIA_2}
                        onChange={(e) => setPorcentaje_ganancia_2(e.target.value)}
                        type="number"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Tercer Porcentaje de Ganancia</label>
                    <textarea
                        value={PORCENTAJE_GANANCIA_3}
                        onChange={(e) => setPorcentaje_ganancia_3(e.target.value)}
                        type="number"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Existencias Actuales</label>
                    <textarea
                        value={EXISTENCIA_ACTUAL}
                        onChange={(e) => setExistencia_actual(e.target.value)}
                        type="number"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>CABYS</label>
                    <textarea
                        value={CABYS}
                        onChange={(e) => setCabys(e.target.value)}
                        type="text"
                        className='form-control'
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

                <div className='mb-3'>
                    <label className='form-label'>Fecha de Ingreso</label>
                    <textarea
                        value={FECHA_INGRESO}
                        onChange={(e) => setFecha_ingreso(e.target.value)}
                        type="date"
                        className='form-control'
                    />
                </div>

                <button type="submit" className="btn btn-primary">Actualizar</button>
                </Form>
            </div>
        </Formik>
    )


}

export default EditarProducto
