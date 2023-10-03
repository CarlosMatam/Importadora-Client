import React from 'react';
import { CDBCard, CDBCardBody, CDBContainer } from 'cdbreact';
import '../CSS/Login.css'

const OlvidoContrasenna = () => {
  return (
    <CDBContainer>
      <CDBCard style={{ width: '30rem' }}>
        <CDBCardBody className="mx-4">
          <div className="text-center mt-4 mb-2">
            <p className="m3">Lamentamos el inconveniente, favor comunicarse al encargado de departamento para recuperar su contraseña</p>
          </div>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};
export default OlvidoContrasenna;