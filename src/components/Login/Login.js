import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';

const { Text } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log('Attempting to log in:', values);
    // Aquí puedes agregar la lógica de autenticación y enviar los datos al servidor
    // Simulación de respuesta del servidor
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', paddingTop: '50px', backgroundColor: '#f0f2f5' }}>
      <div style={{ maxWidth: 650, width: '100%', padding: 90, paddingTop: 10, paddingBottom: 35, border: '1px solid #ccc', borderRadius: 5, backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20, fontSize: '30px' }}>Inicia Sesión</h2>
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
          style={{ marginTop: '-5px' }} // Ajuste para mover el formulario hacia arriba
        >
          <Form.Item
            label="Correo"
            name="correo"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu correo',
              },
            ]}
            style={{ marginBottom: '15px' }} // Ajuste para agregar margen inferior al campo
          >
            <Input style={{ width: '100%' }} />
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
            style={{ marginBottom: '30px' }} // Ajuste para agregar margen inferior al campo
          >
            <Input.Password style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: '20px' }}> {/* Asegúrate de tener un elemento secundario aquí */}
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '50%', left: '25%' }}>
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Text>¿No tienes una cuenta?</Text>{' '}
          <a href="/registro">Regístrate aquí</a>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button type="link" href="/">Ir a inicio</Button>
        </div>
      </div>
    </div>
  );
}
