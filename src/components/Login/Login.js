import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Image, Input, Row, Typography } from 'antd';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError("");
    try {
      await login(values.correo, values.contraseña);
      form.resetFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("No existe un usuario con ese correo.");
          break;
        case "auth/invalid-email":
          setError("Se requiere ingresar un correo.");
          break;
        case "auth/wrong-password":
          setError("Usuario o contraseña incorrectas. Intentelo de nuevo.");
          break;
        case "auth/internal-error":
          setError("Se requiere ingresar una contraseña.");
          break;
        case "auth/invalid-credential":
          setError("Usuario o contraseña incorrectas. Intentelo de nuevo.");
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
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    // Esta función se ejecutará cada vez que user cambie
    if (user !== null) {
      // Si user tiene un valor, navegar a la ruta "/"
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className='full-screen-background' >
      <div >
        <br />
        <Row>
          <Col xs={1} sm={2} md={6} lg={7}></Col>
          <Col xs={22} sm={20} md={12} lg={10} className='contenedorRegistro'>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Image src='Logo.png' preview={false} />
          </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '10px', paddingBottom: '20px' }}>
              <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>Inicia Sesión</Text>
            </div>

            {error &&
              <div>
                <Alert message={error} type="error" />
                <br />
              </div>
            }

            <Form
              form={form}
              name="login"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Correo"
                name="correo"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa tu correo',
                  },
                  {
                    type: 'email',
                    message: 'Ingresa un correo electrónico válido',
                  },
                ]}
              >
                <Input />
              </Form.Item>


              <Form.Item
                label="Contraseña"
                name="contraseña"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa tu contraseña',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <Button className='btn-orange' type="primary" htmlType="submit" loading={loading}>Iniciar Sesión</Button>
              </Form.Item>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '10px' }}>
                ¿No tienes una cuenta?<Button type="link" href="/registro">Regístrate aquí</Button>
              </div>

            </Form>
          </Col>
          <Col xs={22} sm={20} md={12} lg={10}></Col>
        </Row>
      </div>
    </div>

  );
}