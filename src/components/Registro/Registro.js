import React, {createRef, useState} from 'react';
import '../../App.css';
import {Form, Input, Button, Col, Row, Radio, DatePicker, Select, Typography } from 'antd';
import { Route, Routes } from 'react-router-dom';

import { StyleProvider } from '@ant-design/cssinjs';
import local from 'antd/es/date-picker/locale/es_ES';




const {Item} = Form;
const {Password} = Input;
const {Group} = Radio;
const {Option} = Select;


export default function Registro() {
  const { Title, Paragraph, Text, Link } = Typography;

  const [value, setValue] = useState(1);


  const formRef = createRef();

  const formSucces=(datos)=>{
    console.log("formulario enviado exitosamente", datos);
  }
  
  const formfailed=(error)=>{
    console.log("error: ", error);
  }

  const onChange = e=>{
    setValue(e.target.value);
  }

  const prefixSelector = (
    <Item name="slectCodigo" noStyle>
      <Select style={{ width: 80 }} defaultValue="52">
        <Option value="52">+52</Option>
        <Option value="53">+53</Option>
        <Option value="54">+54</Option>
        <Option value="55">+55</Option>
        <Option value="56">+56</Option>
       
      </Select>
    </Item>
  );  

  const borrarCampos = ()=>{
    formRef.current.resetFields();
  }
  const formItemLayout ={
    labelCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 44,
      },
      sm: {
        span: 20,
      },
    },
  };

  
  return (
    <div className='full-screen-background' >
      <div >

     
      <br />    
        <Row>
          <Col xs={1} sm={2} md={6} lg={7}></Col>
          <Col xs={22} sm={20} md={12} lg={10} className='contenedorRegistro'>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop:'10px', paddingBottom:'20px' }}>

              <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>Registro de Usuario</Text>
            </div>
          
            <Form name= "formulario" initialValues={{
                recordar: true,
              }}
              onFinish={formSucces}
              onFinishFailed={formfailed}
              ref={formRef}
              {...formItemLayout}
            >
              <Item
                label="Nombre Usuario"
                name="username"
                rules={[{
                  required: true,
                  message: "Por favor ingrese su usuario",
                }]}
              >
                <Input/>
              </Item>
              <Item
                label="Correo"
                name="email"
                rules={[{
                  required: true,
                  message: "Por favor ingrese su correo",
                }]}
              >
                <Input/>
              </Item>
              
          
              <Item
                label="Contraseña"
                name="contrasenia"
                rules={[{
                  required: true,
                  message: "Por favor ingrese su contraseña",
                }]}
              >
                <Password/>
              </Item>
              <Item
                label="Repetir Contraseña"
                name="contrasenia"
                rules={[{
                  required: true,
                  message: "Por favor ingrese su contraseña",
                }]}
              >
                <Password/>
              </Item>
              

              

              <Item style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit">Registrar Usuario</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button htmlType="button" onClick={borrarCampos}>Borrar Campos</Button>
              </Item>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop:'10px' }}>
                <Button type="link" href="/">Regresar al inicio</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom:'20px' }}>
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


