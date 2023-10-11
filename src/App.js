import logo from './logo.jpeg';
import './App.css';





//importamos los componentes
import MostrarAG from './Agente/MostrarAgente';
import CrearAgente from './Agente/CrearAgente';
import EditarAgente from './Agente/EditarAgente';
import MostrarProveedores from './Proveedor/MostrarProveedor';
import MostrarCobro from './Cobro/MostrarCobro';
import CrearCobro from './Cobro/CrearCobro';
import EditarCobro from './Cobro/EditarCobro';
import MostrarPago from './Pago/MostrarPago';
import CrearPago from './Pago/CrearPago';
import EditarPago from './Pago/EditarPago';
import CrearProveedor from './Proveedor/CrearProveedor';
import EditarProveedor from './Proveedor/EditarProveedor';
import CrearTransporte from './Transporte/CrearTransporte';
import EditarTransporte from './Transporte/EditarTransporte';
import MostrarTransporte from './Transporte/MostrarTransporte';
import CrearCliente from './Cliente/CrearCliente';
import EditarCliente from './Cliente/EditarCliente';
import MostrarCliente from './Cliente/MostrarCliente';
import Login from './Login/InicioSesion';
import CrearFactura from './Facturacion/CrearFactura';
import CrearProducto from './Producto/CrearProducto';
import EditarProducto from './Producto/EditarProducto';
import MostrarProducto from './Producto/MostrarProducto';
import MostrarF from './Facturacion/MostrarFactura';
import EditarFactura from './Facturacion/EditarFactura';
import CrearCompra from './Compras/CrearCompras';
import MostrarCompras from './Compras/MostrarCompras';
import EditarCompra from './Compras/EditarCompra';



//importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {



  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ margin: '15px'}} />
      </header>


      <BrowserRouter>
        

            <Routes>

              <Route path='/Cobros' element={<MostrarCobro />} />
              <Route path='/Cobros/create' element={<CrearCobro />} />
              <Route path='/Cobros/edit/:ID_COBRO' element={<EditarCobro />} />
              <Route path='/Pagos' element={<MostrarPago />} />
              <Route path='/Pagos/edit/:ID_PAGO' element={<EditarPago />} />
              <Route path='/Pagos/create' element={<CrearPago />} />
              <Route path='/Pagos/edit/:ID_PAGO' element={<EditarPago />} />
              <Route path='/Proveedores' element={<MostrarProveedores />} />
              <Route path='/' element={<MostrarAG />} />
              <Route path='/create' element={<CrearAgente />} />
              <Route path='/Proveedores/create' element={<CrearProveedor />} />
              <Route path='/edit/:id_agente' element={<EditarAgente />} />
              <Route path='/Proveedores/edit/:ID_PROVEEDOR' element={<EditarProveedor />} />
              <Route path='/Transportes' element={<MostrarTransporte />} />
              <Route path='/Transportes/create' element={<CrearTransporte />} />
              <Route path='/Transportes/edit/:ID_TRANSPORTE' element={<EditarTransporte />} />
              <Route path='/Clientes' element={<MostrarCliente />} />
              <Route path='/Clientes/create' element={<CrearCliente />} />
              <Route path='/Clientes/edit/:id_cliente' element={<EditarCliente />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Facturacion/create' element={<CrearFactura />} />
              <Route path='/Compras/create' element={<CrearCompra />} />
              <Route path='/Productos/create' element={<CrearProducto />} />
              <Route path='/Productos' element={<MostrarProducto />} />
              <Route path='/Compras' element={<MostrarCompras />} />
              <Route path='/Facturacion' element={<MostrarF />} />
              <Route path='/Facturacion/edit/:ID_FACTURA' element={<EditarFactura />} />
              <Route path='/Compras/edit/:num_documento' element={<EditarCompra />} />
              {/*<Route path='/Cabys' element={<MostrarCabys />} />*/}
              {/*<Route path='/Productos/edit/:ID_PRODUCTO' element={<EditarProducto />} />*/}
            </Routes>

          

      </BrowserRouter>
    </div>

  );
}

export default App;