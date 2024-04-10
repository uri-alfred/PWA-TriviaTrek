import React, { createRef, useState } from 'react';
import '../../App.css';
import { Form, Input, Button, Col, Row, Typography, Alert, Image } from 'antd';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const { Item } = Form;
const { Password } = Input;
const { Text } = Typography;

export default function Registro() {

  const formRef = createRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const formSucces = async (datos) => {
    setLoading(true);
    setError('');
    try {
      await signup(datos.email, datos.confirm, datos.username, null);
      navigate("/inicioSession");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("El correo que estas ingresando no es valido.");
          break;
        case "auth/weak-password":
          setError("La contraseña debe tener al menos 6 caracteres.");
          break;
        case "auth/email-already-in-use":
          setError("Ya existe una cuenta registrada con ese correo.");
          break;
        case "auth/internal-error":
          setError("Revisa bien los datos ingresados.");
          break;
        case "auth/network-request-failed":
          setError("Error de conexión. Intentelo de nuevo más tarde.");
          break;

        default:
          setError(error.message);
          break;
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const formfailed = (error) => {
    console.log("error: ", error);
  }

  return (
    <div className='full-screen-background' >
      <div >

        <br />
        <Row>
          <Col xs={1} sm={2} md={6} lg={7}></Col>
          <Col xs={22} sm={20} md={12} lg={10} className='contenedorRegistro'>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image rel="preload" fetchpriority="high" alt='' src='Logo.webp' width={200} height={200} preview={false} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '10px', paddingBottom: '20px' }}>
              <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>Registro de Usuario</Text>
            </div>

            {error &&
              <div>
                <Alert message={error} type="error" />
                <br />
              </div>
            }

            <Form
              name="registro"
              initialValues={{
                remember: true,
              }}
              onFinish={formSucces}
              onFinishFailed={formfailed}
              autoComplete="off"
              layout="vertical"
              ref={formRef}
            >

              <Item
                name="email"
                label="Correo"
                rules={[
                  {
                    type: 'email',
                    message: 'Por favor ingresa un correo valido!',
                  },
                  {
                    required: true,
                    message: 'Por favor ingresa un correo!',
                  },
                ]}
              >
                <Input />
              </Item>

              <Item
                label="Nombre de usuario"
                name="username"
                rules={[{
                  required: true,
                  message: "Por favor ingrese su usuario!",
                }]}
              >
                <Input />
              </Item>

              <Item
                name="password"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa una contraseña!',
                  },
                ]}
                hasFeedback
              >
                <Password />
              </Item>
              <Item
                name="confirm"
                label="Confirma tu contraseña"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa la confirmacion de tu contraseña!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('La contraseña no coincide!'));
                    },
                  }),
                ]}
              >
                <Password />
              </Item>

              <Item style={{ textAlign: 'center' }}>
                <Button className='btn-orange' type="primary" htmlType="submit" loading={loading}>Registrar Usuario</Button>
              </Item>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '20px' }}>
                <Button type="link" href="/inicioSession">Iniciar Sesion</Button>
              </div>

            </Form>
          </Col>
          <Col xs={22} sm={20} md={12} lg={10}></Col>
        </Row>
      </div>
    </div>
  )
}


