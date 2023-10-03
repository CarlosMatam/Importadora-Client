import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';

const EditarFactura = () => {
    const { ID_FACTURA } = useParams();
    const [factura, setFactura] = useState({});
    const [detalleFactura, setDetalleFactura] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [iva, setIVA] = useState(0);
    const [totalDescuentos, setTotalDescuentos] = useState(0);
    const [total, setTotal] = useState(0);

    const obtenerFactura = async () => {
        try {
            const response = await axios.get(`${API}/Facturacion/${ID_FACTURA}`);
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
            const response = await axios.get(`${API}/Facturacion/${ID_FACTURA}/detalle`);
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
            (total, detalle) => total + (detalle.SUBTOTAL - (detalle.SUBTOTAL * detalle.DESCUENTO / 100)),
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
            (total, detalle) => total + (detalle.CANTIDAD * parseFloat(detalle.SUBTOTAL) * (parseFloat(detalle.DESCUENTO) || 0) / 100),
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
            await axios.put(`${API}/Facturacion/${ID_FACTURA}`, factura);

            // Verificar que haya al menos un detalle agregado antes de enviarlo al backend
            if (detalleFactura.length === 0) {
                // Mostrar mensaje de error en una alerta
                alert('Debe agregar al menos un detalle de factura antes de guardar');
                return;
            }

            // Crear un arreglo de detalles de factura para enviar al servidor
            const detallesFacturaArray = detalleFactura.map((detalle) => ({
                ID_DETALLE_FACTURA: detalle.ID_DETALLE_FACTURA,
                ID_FACTURA: detalle.ID_FACTURA,
                ID_PRODUCTO: detalle.ID_PRODUCTO,
                CANTIDAD: detalle.CANTIDAD,
                SUBTOTAL: detalle.SUBTOTAL,
                DESCUENTO: detalle.DESCUENTO,
            }));

            // Actualizar el detalle de la factura
            await axios.put(
                `${API}/Facturacion/${ID_FACTURA}/detalle`,
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
                    name="ID_COMPANIA"
                    value={factura.ID_COMPANIA || ''}
                    onChange={handleInputChange}
                            />
                            </div>

                            <div className="col-md-2 mb-4">
                <label>Tipo de Factura:</label>
                <input
                    type="text"
                    name="ID_TIPO_FACTURA"
                    value={factura.ID_TIPO_FACTURA || ''}
                    onChange={handleInputChange}
                                />
                                
</div>

                            
                            <div className="col-md-3 mb-4">
                <label>Cliente:</label>
                <input
                    type="text"
                    name="ID_CLIENTE"
                    value={factura.ID_CLIENTE || ''}
                    onChange={handleInputChange}
                                />
                            </div>
                            
                            <div className="col-md-3 mb-4">
                <label>Fecha:</label>
                <input
                    type="text"
                    name="FECHA"
                    value={factura.FECHA || ''}
                    onChange={handleInputChange}
                                />
                                

                            </div>
                            
                            <div className="col-md-6 mb-4">
                <label>Vencimiento:</label>
                <input
                    type="text"
                    name="VENCIMIENTO"
                    value={factura.VENCIMIENTO || ''}
                    onChange={handleInputChange}
                                />
                                
                            </div>
                            
                            <div className="col-md-6 mb-4">
                <label>Total:</label>
                <input
                    type="text"
                    name="TOTAL"
                    value={factura.TOTAL || ''}
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
                            name={`ID_PRODUCTO`}
                            value={detalle.ID_PRODUCTO || ''}
                            onChange={(event) => handleDetalleChange(event, index)}
                        />
                        <label>Cantidad:</label>
                        <input
                            type="text"
                            name={`detalleFactura[${index}].CANTIDAD`}
                            value={detalle.CANTIDAD || ''}
                            onChange={(event) => handleDetalleChange(event, index)}
                        />
                        <label>Subtotal:</label>
                        <input
                            type="text"
                            name={`detalleFactura[${index}].SUBTOTAL`}
                            value={detalle.SUBTOTAL || ''}
                            onChange={(event) => handleDetalleChange(event, index)}
                        />
                        <label>Descuento:</label>
                        <input
                            type="text"
                            name={`detalleFactura[${index}].DESCUENTO`}
                            value={detalle.DESCUENTO || ''}
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