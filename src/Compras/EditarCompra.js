import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import API from '../utils/httpClient';

const EditarCompra = () => {
    const { num_documento } = useParams();
    const [compra, setCompra] = useState({});
    const [detalleCompra, setDetalleCompra] = useState([]);

    const obtenerCompra = async () => {
        try {
            const response = await axios.get(`${API}/Compras/${num_documento}`);
            const compraData = response.data;

            setCompra(compraData);

            if (compraData.DetalleCompra) {
                setDetalleCompra(compraData.DetalleCompra);
            } else {
                setDetalleCompra([]);
            }
        } catch (error) {
            console.error('Error al obtener la compra:', error);
        }
    };

    const obtenerDetalleCompra = async () => {
        try {
            const response = await axios.get(`${API}/Compras/${NUM_DOCUMENTO}/detalle`);
            const detalleCompraData = response.data;

            setDetalleCompra(detalleCompraData);
        } catch (error) {
            console.error('Error al obtener los detalles de la compra:', error);
        }
    };



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCompra((prevCompra) => ({
            ...prevCompra,
            [name]: value,
        }));
    };

    const handleDetalleChange = (event, index) => {
        const { name, value } = event.target;

        setDetalleCompra((prevDetalleCompra) => {
            const updatedDetalleCompra = [...prevDetalleCompra];
            updatedDetalleCompra[index] = {
                ...updatedDetalleCompra[index],
                [name]: value,
            };
            return updatedDetalleCompra;
        });
    };

    useEffect(() => {
        obtenerCompra();
        obtenerDetalleCompra();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Actualizar la compra
            await axios.put(`${API}/Compras/${num_documento}`, compra);

            // Verificar que haya al menos un detalle agregado antes de enviarlo al backend
            if (detalleCompra.length === 0) {
                // Mostrar mensaje de error en una alerta
                alert('Debe agregar al menos un detalle de compra antes de guardar');
                return;
            }

            // Crear un arreglo de detalles de compra para enviar al servidor
            const detallesCompraArray = detalleCompra.map((detalle) => ({
                id_detalle: detalle.id_detalle,
                id_producto: detalle.id_producto,
                cantidad: detalle.cantidad,
                subtotal: detalle.subtotal,
                descuento: detalle.descuento,
            }));

            // Actualizar el detalle de la compra
            await axios.put(
                `${API}/Compras/${num_documento}/detalle`,
                detallesCompraArray
            );

            console.log('Compra actualizada exitosamente');
        } catch (error) {
            console.error('Error al actualizar la compra:', error);
        }
    };

    const eliminarDetalle = (index) => {
        setDetalleCompra((prevDetalleCompra) => {
            const updatedDetalleCompra = [...prevDetalleCompra];
            updatedDetalleCompra.splice(index, 1);
            return updatedDetalleCompra;
        });
    };



    return (
        <div style={{ display: 'flex' }}>
            {/* Coloca el Sidebar a la izquierda */}
            <Sidebar />
        <div>
                <h2>Editar Compra</h2>
                <div style={{ flex: 1, padding: '20px', background: 'rgba(128, 128, 128, 0.1)' }}>
                    <form onSubmit={handleSubmit} style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '5px', background: 'white' }}>
                        
                <label>Compañía:</label>
                <input
                    type="text"
                    name="id_compania"
                            value={compra.id_compania || ''}
                            onChange={handleInputChange} 
                />
                        <label >Proveedor:</label>
                <input
                    type="text"
                    name="id_proveedor"
                            value={compra.id_proveedor || ''}
                            onChange={handleInputChange} 
                />
                        <label >Bodega:</label>
                <input
                    type="text"
                    name="id_bodega"
                            value={compra.id_bodega || ''}
                            onChange={handleInputChange} 
                />
                        <label style={{ marginLeft: '5px' }}>Fecha:</label>
                <input
                    type="date"
                    name="fecha"
                            value={compra.fecha || ''}
                            onChange={handleInputChange}
                />
                        <label style={{ marginLeft: '5px' }}>Total:</label>
                <input
                    type="text"
                    name="total"
                            value={compra.total || ''}
                            onChange={handleInputChange} style={{ marginLeft: '5px' }}
                />
                <hr />
                <h3>Detalle de la Compra</h3>
                {detalleCompra.map((detalle, index) => (
                    <div key={index}>
                        <label>ID Producto:</label>
                        <input
                            type="text"
                            name={`id_producto`}
                            value={detalle.id_producto || ''}
                            onChange={(event) => handleDetalleChange(event, index)}
                        />
                        <label>Cantidad:</label>
                        <input
                            type="number"
                            name={`detalleCompra[${index}].cantidad`}
                            value={detalle.cantidad || ''}
                            onChange={(event) => handleDetalleChange(event, index)}
                        />
                        <label>Subtotal:</label>
                        <input
                            type="number"
                            name={`detalleCompra[${index}].subtotal`}
                            value={detalle.subtotal || ''}
                            onChange={(event) => handleDetalleChange(event, index)}
                        />
                        <label>Descuento:</label>
                        <input
                            type="number"
                            name={`detalleCompra[${index}].descuento`}
                            value={detalle.descuento || ''}
                            onChange={(event) => handleDetalleChange(event, index)}
                        />
                        <button type="button" onClick={() => eliminarDetalle(index)}>Eliminar Detalle</button>
                    </div>
                ))}
                <button type="submit">Guardar cambios</button>
                    </form>
                </div>
            <Link to="/Compras">Volver a la lista de compras</Link>
            </div>
        </div>
    );
};

export default EditarCompra;