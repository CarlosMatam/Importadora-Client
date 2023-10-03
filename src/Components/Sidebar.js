import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Administracion
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/Proveedores" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Proveedores</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/Compras" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">Compras por entrada</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/Facturacion" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Facturacion</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/Cobros" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Cobros</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/Pagos" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Pagos</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/Clientes" target="_blank" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Clientes</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/Transportes" target="_blank" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="car">Transportes</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/" target="_blank" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Agente de ventas</CDBSidebarMenuItem>
                        </NavLink>



                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                       
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;