import axios from 'axios';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBContainer } from 'cdbreact';
import '../CSS/Login.css'
import fondo from '../FondoLogin.jpg';
import API from '../utils/httpClient';


const uri = `${API}/Login/`;

const Validaciones = Yup.object().shape({
    login_user: Yup.string().required('¡Usuario Requerido!'),
    contrasenna: Yup.string().required('¡Contraseña Requerida!'),
});

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const store = async (values) => {
        const {
            login_user,
            contrasenna,
        } = values;
        try {
            await axios.post(uri, {
                login_user,
                contrasenna,
            });

            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                setErrorMessage(errorMessage);
            }
        }

    };

    return (

        <Formik
            initialValues={{
                login_user: '',
                contrasenna: '',
            }}
            validationSchema={Validaciones}
            onSubmit={store}
        >
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100vh',
                backgroundImage: 'url(' + fondo + ')',

            }} >

                <div style={{
                    contentAlign: 'center', alignItems: 'center',
                    justifyContent: 'center', display: 'flex',
                    margin: '100px',

                }}>
                    <Form style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '10px', background: 'white' }}>
                        <CDBContainer>
                            <CDBCard style={{ width: '30rem' }}>
                                <CDBCardBody className="mx-4">
                                    <div>
                                        <h4 style={{ textAlign: 'center' }} className="h3">Iniciar Sesión</h4>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Usuario:</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="login_user"
                                            placeholder="Ingrese el usuario"

                                        />
                                        <ErrorMessage
                                            name="login_user"
                                            component="div"
                                            className="text-danger"

                                        />
                                    </div>


                                    <div className="mb-3">
                                        <label className="form-label">Contraseña:</label>
                                        <Field
                                            type="password"
                                            className="form-control"
                                            name="contrasenna"
                                            placeholder="Ingrese la contraseña"

                                        />
                                        <ErrorMessage
                                            name="contrasenna"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div>

                                    </div>
                                    {/* Mostrar el mensaje de error */}
                                    <p className="text-danger">{errorMessage}</p>

                                    <div style={{
                                        contentAlign: 'center', alignItems: 'center',
                                        justifyContent: 'center', display: 'flex'
                                    }}>

                                        <CDBBtn style={{ margin: '10px' }} type="submit" className="btn btn-primary">
                                            Iniciar Sesión
                                        </CDBBtn>

                                    </div>
                                </CDBCardBody>
                            </CDBCard>

                        </CDBContainer>
                    </Form>
                </div>
            </div>
        </Formik>
    );
};

export default Login;