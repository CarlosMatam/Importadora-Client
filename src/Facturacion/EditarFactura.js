import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';

const EditarFactura = () => {
    const { id_factura } = useParams();
    const [factura, setFactura] = useState({});
    const [detalleFactura, setDetalleFactura] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [iva, setIVA] = useState(0);
    const [totalDescuentos, setTotalDescuentos] = useState(0);
    const [total, setTotal] = useState(0);

    const obtenerFactura = async () => {
        try {
            const response = await axios.get(`${API}/Facturacion/${id_factura}`);
            const facturaData = response.data;

            setFactura(facturaData);

            if (facturaData.DetalleFactura) {
                setDetalleFactura(facturaData.DetalleFactura);
            } else {
                setDetalleFactura([]);
            }
        } catch (error) {
            console.error('Error al obtener la factura:', error);
        }
    };

    const obtenerDetalleFactura = async () => {
        try {
            const response = await axios.get(`${API}/Facturacion/${id_factura}/detalle`);
            const detalleFacturaData = response.data;

            setDetalleFactura(detalleFacturaData);
        } catch (error) {
            console.error('Error al obtener los detalles de la factura:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFactura((prevFactura) => ({
            ...prevFactura,
            [name]: value,
        }));
    };

    const handleDetalleChange = (event, index) => {
        const { name, value } = event.target;

        setDetalleFactura((prevDetalleFactura) => {
            const updatedDetalleFactura = [...prevDetalleFactura];
            updatedDetalleFactura[index] = {
                ...updatedDetalleFactura[index],
                [name]: value,
            };
            return updatedDetalleFactura;
        });
    };

    const calcularSubtotal = () => {
        const subtotal = detalleFactura.reduce(
            (total, detalle) => total + (detalle.subtotal - (detalle.subtotal * detalle.descuento / 100)),
            0
        );
        return subtotal;
    };

    const calcularIVA = (subtotal) => {
        const iva = subtotal * 0.13;
        return iva;
    };

    const calcularTotalDescuentos = () => {
        const totalDescuentos = detalleFactura.reduce(
            (total, detalle) => total + (detalle.cantidad * parseFloat(detalle.subtotal) * (parseFloat(detalle.descuento) || 0) / 100),
            0
        );
        return totalDescuentos;
    };

    const calcularTotal = () => {
        const subtotal = calcularSubtotal();
        const totalDescuentos = calcularTotalDescuentos();
        const iva = calcularIVA(subtotal);
        const total = subtotal - totalDescuentos + iva;
        return total.toFixed(2);
    };

    useEffect(() => {
        obtenerFactura();
        obtenerDetalleFactura();
    }, []);

    useEffect(() => {
        const subtotal = calcularSubtotal();
        const totalDescuentos = calcularTotalDescuentos();
        const iva = calcularIVA(subtotal);
        const total = subtotal + iva;

        setSubtotal(subtotal);
        setIVA(iva);
        setTotalDescuentos(totalDescuentos);
        setTotal(total.toFixed(2));
    }, [detalleFactura]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Actualizar la factura
            await axios.put(`${API}/Facturacion/${id_factura}`, factura);

            // Verificar que haya al menos un detalle agregado antes de enviarlo al backend
            if (detalleFactura.length === 0) {
                // Mostrar mensaje de error en una alerta
                alert('Debe agregar al menos un detalle de factura antes de guardar');
                return;
            }

            // Crear un arreglo de detalles de factura para enviar al servidor
            const detallesFacturaArray = detalleFactura.map((detalle) => ({
                id_detalle_factura: detalle.id_detalle_factura,
                id_factura: detalle.id_factura,
                id_producto: detalle.id_producto,
                cantidad: detalle.cantidad,
                subtotal: detalle.subtotal,
                descuento: detalle.descuento,
            }));

            // Actualizar el detalle de la factura
            await axios.put(
                `${API}/Facturacion/${id_factura}/detalle`,
                { detallesFactura: detallesFacturaArray }
            );

            console.log('Factura actualizada exitosamente');
        } catch (error) {
            console.error('Error al actualizar la factura:', error);
        }
    };

    const renderizarTotal = (valor) => {
        return valor ? Number(valor).toFixed(2) : '0.00';
    };

    const eliminarDetalle = (index) => {
        setDetalleFactura((prevDetalleFactura) => {
            const updatedDetalleFactura = [...prevDetalleFactura];
            updatedDetalleFactura.splice(index, 1);
            return updatedDetalleFactura;
        });
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />
        <div>
                <h2>Editar Factura</h2>
                <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                    <form onSubmit={handleSubmit} style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }}>

                        <div className="row">
                            <div className="col-md-3 mb-4">
                <label>Compañía:</label>
                <input
                    type="text"
                    name="id_compañia"
                    value={factura.id_compañia || ''}
                    onChange={handleInputChange}
                            />
                            </div>

                            <div className="col-md-2 mb-4">
                <label>Tipo de Factura:</label>
                <input
                    type="text"
                    name="id_tipo_factura"
                    value={factura.id_tipo_factura || ''}
                    onChange={handleInputChange}
                                />
                                
</div>

                            
                            <div className="col-md-3 mb-4">
                <label>Cliente:</label>
                <input
                    type="text"
                    name="id_cliente"
                     value={factura.id_cliente || ''}
                    onChange={handleInputChange}
                                />
                            </div>
                            
                            <div className="col-md-3 mb-4">
                <label>Fecha:</label>
                <input
                    type="text"
                    name="fecha"
                    value={factura.fecha || ''}
                    onChange={handleInputChange}
                                />
                                

                            </div>
                            
                            <div className="col-md-6 mb-4">
                <label>Vencimiento:</label>
                <input
                    type="text"
                    name="vencimiento"
                    value={factura.vencimiento || ''}
                    onChange={handleInputChange}
                                />
                                
                            </div>
                            
                            <div className="col-md-6 mb-4">
                <label>Total:</label>
                <input
                    type="text"
                    name="total"
                    value={factura.total || ''}
                            onChange={handleInputChange} style={{ marginLeft: '5px' }}
                                />
                            </div>
                        </div>
                <hr />
                <h3>Detalle de la Factura</h3>
                {detalleFactura.map((detalle, index) => (
                    <div key={index} style={{marginTop: '10px'
                    }}>
                        <label>ID Producto:</label>
                        <input
                            type="text"
                            name={`id_producto`}
                            value={detalle.id_producto || ''}
                            onChange={(event) => handleDetalleChange(event, index)}
                        />
                        <label>Cantidad:</label>
                        <input
                            type="text"
                            name={`detalleFactura[${index}].cantidad`}
                            value={detalle.cantidad || ''}
                            onChange={(event) => handleDetalleChange(event, index)}
                        />
                        <label>Subtotal:</label>
                        <input
                            type="text"
                            name={`detalleFactura[${index}].subtotal`}
                            value={detalle.subtotal || ''}
                            onChange={(event) => handleDetalleChange(event, index)}
                        />
                        <label>Descuento:</label>
                        <input
                            type="text"
                            name={`detalleFactura[${index}].descuento`}
                            value={detalle.descuento || ''}
                            onChange={(event) => handleDetalleChange(event, index)}
                        />
                        <button type="button" onClick={() => eliminarDetalle(index)}>Eliminar Detalle</button>
                    </div>
                ))}
                        
                        <div className="d-flex flex-column align-items-center">
                <h4>Subtotal: ₡ {renderizarTotal(subtotal)}</h4>
                <h4>IVA: ₡ {renderizarTotal(iva)}</h4>
                <h4>Total Descuentos: ₡ {renderizarTotal(totalDescuentos)}</h4>
                            <h4>Total: ₡ {renderizarTotal(total)}</h4>
                            
                        </div>

                        <div style={{
                            contentAlign: 'center', alignItems: 'center',
                            justifyContent: 'center', display: 'flex', margin: '10px'
                        }}>
                            <button className="btn btn-primary"  type="submit">Guardar cambios</button>
                            
                        </div>
                    </form>
                </div>
            <Link to="/Facturacion">Volver a la lista de facturas</Link>
            </div>
        </div>
    );
};

export default EditarFactura;