import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';

const iva_porcentaje = 0.13; // Valor del IVA (13%)

const CrearCompra = () => {
    const [companias, setCompanias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [bodegas, setBodegas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [detalleCompra, setDetalleCompra] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [descuentoTotal, setDescuentoTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalConIVA, setTotalConIVA] = useState(0); // Total con IVA incluido
    const [iva, setIVA] = useState(0); // IVA
    const [compra, setCompra] = useState({
        id_compania: '',
        id_proveedor: '',
        id_bodega: '',
        fecha: new Date().toISOString().slice(0, 10),
    });
    const [producto, setProducto] = useState({
        id_producto: '',
        descripcion: '',
        cantidad: '',
        precio: '',
        porc_descuento: '',

        precio_total: 0,
    });

    const [codigoProducto, setCodigoProducto] = useState('');

    useEffect(() => {
        obtenerCompanias();
        obtenerProveedores();
        obtenerBodegas();
        obtenerProductos();
    }, []);

    const obtenerCompanias = async () => {
        try {
            const response = await axios.get(`${API}/Companias`);
            setCompanias(response.data);
        } catch (error) {
            console.error('Error al obtener las compañías:', error);
        }
    };

    const obtenerProveedores = async () => {
        try {
            const response = await axios.get(`${API}/Proveedores`);
            setProveedores(response.data);
        } catch (error) {
            console.error('Error al obtener los proveedores:', error);
        }
    };

    const obtenerBodegas = async () => {
        try {
            const response = await axios.get(`${API}/Bodegas`);
            setBodegas(response.data);
        } catch (error) {
            console.error('Error al obtener las bodegas:', error);
        }
    };

    const obtenerProductos = async () => {
        try {
            const response = await axios.get(`${API}/Productos`);
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProducto((prevProducto) => ({
            ...prevProducto,
            [name]: value,
        }));
    };

    const handleCompraChange = (event) => {
        const { name, value } = event.target;
        setCompra((prevCompra) => ({
            ...prevCompra,
            [name]: value,
        }));
    };

    const handleAgregarProducto = () => {
        if (producto.cantidad > 0 && producto.precio > 0) {
            const precioSinDescuento = producto.cantidad * producto.precio;
            const descuento = precioSinDescuento * (producto.porc_descuento / 100);
            const precioConDescuento = precioSinDescuento - descuento;

            const nuevoProducto = {
                ...producto,
                precio_total: precioConDescuento,
            };

            // Asignar el número de documento a cada detalle de compra antes de agregarlo al estado
            nuevoProducto.num_documento = compra.num_documento;

            setDetalleCompra((prevDetalleCompra) => [...prevDetalleCompra, nuevoProducto]);
            limpiarProducto();
        } else {
            alert('La cantidad y el precio deben ser mayores a cero.');
        }
    };


    const limpiarProducto = () => {
        setProducto({
            id_producto: '',
            descripcion: '',
            cantidad: '',
            precio: '',
            porc_descuento: '',
            precio_total: 0,
        });
    };

    const limpiarCompra = () => {
        setCompra({
            id_compania: '',
            id_proveedor: '',
            id_bodega: '',
            fecha: new Date().toISOString().slice(0, 10),
        });
    };

    const handleCodigoChange = async (event) => {
        const { value } = event.target;
        setCodigoProducto(value);

        if (value !== '') {
            try {
                const response = await axios.get(`${API}/Productos/buscar/${value}`);
                const productoData = response.data;

                if (productoData) {
                    setProducto((prevProducto) => ({
                        ...prevProducto,
                        id_producto: productoData.id_producto,
                        descripcion: productoData.descripcion,
                        cantidad: '',
                        precio: productoData.precio,
                        porc_descuento: productoData.descuento,

                        precio_total: 0,
                    }));
                } else {
                    setProducto((prevProducto) => ({
                        ...prevProducto,
                        id_producto: '',
                        descripcion: '',
                        cantidad: '',
                        precio: '',
                        porc_descuento: '',

                        precio_total: 0,
                    }));
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setProducto((prevProducto) => ({
                ...prevProducto,
                id_producto: '',
                descripcion: '',
                cantidad: '',
                precio: '',
                porc_descuento: '',

                precio_total: 0,
            }));
        }
    };

    useEffect(() => {
        const calcularTotales = () => {
            const subtotal = detalleCompra.reduce((total, producto) => total + producto.precio_total, 0);
            setSubtotal(subtotal);

            const descuentoTotal = detalleCompra.reduce(
                (total, producto) => total + (producto.cantidad * producto.precio * producto.porc_descuento) / 100,
                0
            );
            setDescuentoTotal(descuentoTotal);

            const total = subtotal;
            setTotal(total);

            const totalConIVA = total * (1 + iva_porcentaje);
            setTotalConIVA(totalConIVA);

            const iva = total * iva_porcentaje;
            setIVA(iva);
        };

        calcularTotales();
    }, [detalleCompra]);

    const crearCompra = async () => {
        if (!compra.id_compania || !compra.id_proveedor || !compra.id_bodega) {
            alert('Debe seleccionar una compañía, un proveedor y una bodega.');
            return;
        }

        if (detalleCompra.length === 0) {
            alert('Debe agregar al menos un producto al detalle de compra.');
            return;
        }

        // Calcular los totales antes de enviar la compra al servidor
        const subtotal = detalleCompra.reduce((total, producto) => total + producto.precio_total, 0);
        const descuentoTotal = detalleCompra.reduce(
            (total, producto) => total + (producto.cantidad * producto.precio * producto.porc_descuento) / 100,
            0
        );
        const total = subtotal;
        const iva = total * iva_porcentaje;
        const totalConIVA = total + iva;


        const nuevaCompra = {
            ...compra,
            detallesCompra: detalleCompra,
            TOTAL: totalConIVA,
            DESCUENTO: descuentoTotal,
        };


        try {
            await axios.post(`${API}/Compras`, nuevaCompra);
            alert('Compra creada correctamente.');
            limpiarCompra();
            setDetalleCompra([]);
        } catch (error) {
            console.error('Error al crear la compra:', error);
            alert('Error al crear la compra. Por favor, inténtalo nuevamente.');
        }
    };

    const lineasAgregadas = detalleCompra.length;

    const eliminarDetalle = (index) => {
        setDetalleCompra((prevDetalleCompra) => {
            const newDetalleVenta = [...prevDetalleCompra];
            newDetalleVenta.splice(index, 1);
            return newDetalleVenta;
        });
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />
            
            <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
            <h2>Crear Compra</h2>
                <div style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }}>
                    <h3>Información de la Compra</h3>
                    <div className="row">
                        <div className="col-md-3 mb-4">
                    <label htmlFor="compania">Compañía:</label>
                    <select
                        id="compania"
                        name="id_compania"
                         value={compra.id_compania}
                        onChange={handleCompraChange}
                    >
                        <option value="">Seleccionar Compañía</option>
                        {companias.map((compania) => (
                            <option key={compania.id_compania} value={compania.id_compania}>
                                {compania.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                        <div className="col-md-3 mb-4">
                    <label htmlFor="proveedor">Proveedor:</label>
                    <select
                        id="proveedor"
                        name="id_proveedor"
                        value={compra.id_proveedor}
                        onChange={handleCompraChange}
                    >
                        <option value="">Seleccionar Proveedor</option>
                        {proveedores.map((proveedor) => (
                            <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                {proveedor.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                        <div className="col-md-3 mb-4">
                    <label htmlFor="bodega">Bodega:</label>
                            <select id="bodega" name="id_bodega" value={compra.id_bodega} onChange={handleCompraChange}>
                        <option value="">Seleccionar Bodega</option>
                        {bodegas.map((bodega) => (
                            <option key={bodega.id_bodega} value={bodega.id_bodega}>
                                {bodega.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                        <div className="col-md-3 mb-4">
                    <label htmlFor="fecha">Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={compra.fecha}
                        onChange={handleCompraChange}
                    />
                </div>
            </div>
            <hr />
                    <div>
                        
                        <h3>Detalle de la Compra</h3>
                        <div className="row">
                            <div className="col-md-2 mb-4">
                    <label htmlFor="codigoProducto">Código de Producto:</label>
                    <input
                        type="text"
                        id="codigoProducto"
                        value={codigoProducto}
                        onChange={handleCodigoChange}
                                />
                               
                               
                            </div>
                            
                            <div className="col-md-2 mb-4">
                    <label htmlFor="descripcion">Descripción:</label>
                    <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                            <div className="col-md-2 mb-4">
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input
                        type="number"
                        id="cantidad"
                        name="cantidad"
                        value={producto.cantidad}
                        onChange={handleInputChange}
                    />
                </div>
                            <div className="col-md-2 mb-4">
                    <label htmlFor="precio">Precio:</label>
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        value={producto.precio}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                            <div className="col-md-2 mb-4">
                    <label htmlFor="descuento">Descuento (%):</label>
                    <input
                        type="number"
                        id="descuento"
                        name="porc_descuento"
                        value={producto.porc_descuento}
                        onChange={handleInputChange}
                    />
                            </div>
                            <div className="col-md-2 mb-4">
                                <button onClick={handleAgregarProducto}>Agregar Producto</button>
                                <button style={{ marginTop: "8px" }} onClick={limpiarProducto}>Limpiar Producto</button>
                            </div>
                            
                        </div>
                        <h4 style={{ textAlign: 'center' }}>Detalle de Compra Agregado</h4>

                        <p style={{ textAlign: 'center' }}>Líneas agregadas: {lineasAgregadas}</p>
                <div style={{ contentAlign: 'center', alignItems: 'center',
                            justifyContent: 'center' , display:'flex'}}>
                            

                            <table >
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Descuento</th>

                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalleCompra.map((detalle, index) => (
                                <tr key={index}>
                                    <td>{detalle.id_producto}</td>
                                    <td>{detalle.descripcion}</td>
                                    <td>{detalle.cantidad}</td>
                                    <td>{detalle.precio}</td>
                                    <td>{detalle.porc_descuento}%</td>
                                    <td>{detalle.precio_total}</td>
                                    <td>
                                        <button onClick={() => eliminarDetalle(index)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
                    <hr />
                    <h4 style={{ textAlign: 'center', margin:"20px" }}>Resumen de la Compra</h4>
                    <div>
                
                        <div className="d-flex flex-column align-items-center">
                            <div >
                                
                                <p>Subtotal: {subtotal}</p>
                            </div>
                            <div >
                                <p>Descuento: {descuentoTotal}</p>
                            </div>
                            <div >
                                <p>Total: {total}</p>
                            </div>
                            <div >
                                <p>IVA (13%): {iva}</p>
                            </div>
                            <div >
                                <p>Total con IVA: {totalConIVA}</p>
                                </div>
                </div>
            </div>
            <hr />
                    <div style={{
                        contentAlign: 'center', alignItems: 'center',
                        justifyContent: 'center', display: 'flex'
                    }}>
                        <button className="btn btn-primary" style={{marginRight: '10px' }} onClick={crearCompra}>Crear Compra</button>
                        <button className="btn btn-danger" onClick={limpiarCompra}>Limpiar Compra</button>
            </div>
                </div>
            </div>
        </div>
    );
};

export default CrearCompra;