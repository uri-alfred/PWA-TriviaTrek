import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Row, Avatar, List, Image, Button } from 'antd';
import juego from '../../img/logo.jpg';
import { PlayCircleTwoTone } from '@ant-design/icons';
import { get } from '../../api/peticiones';

export default function Home() {

  const [datos, setDatos] = useState(null);

  useEffect(() => {
    async function obtenerDatos() {
      try {
        const respuesta = await get('/puntuacion/consultarPuntuacion');
        setDatos(respuesta);
        // console.log(respuesta);
      } catch (error) {
        console.error('La petición falló:', error);
      }
    }

    obtenerDatos();
  }, []); // Pasar un array vacío como dependencias para asegurarte de que el efecto solo se ejecuta una vez


  return (
    <div >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <div className="ant-component-wrapper">
            <div className="ant-component" style={{ backgroundColor: '#FFDEB7', marginRight: 20 }}>
              <div className="ant-component-header" style={{ textAlign: 'center' }}>
                <h1>Clasificación</h1>
              </div>
              <Row gutter={[16, 16]} justify="center" align="bottom">
                <Col xs={20} sm={7} style={{ textAlign: 'center' }}>
                  <p>{datos && datos[1] && datos[1].nombre}</p>
                  <div style={{ backgroundColor: '#CFCDCA', height: '100px' }}>
                    <h2>2</h2>
                  </div>
                </Col>
                <Col xs={20} sm={7} style={{ textAlign: 'center', marginLeft: '10px', marginRight: '10px' }}>
                  <p>{datos && datos[0] && datos[0].nombre}</p>
                  <div style={{ backgroundColor: '#FFCE22', height: '150px' }}>
                    <h2>1</h2>
                  </div>
                </Col>
                <Col xs={20} sm={7} style={{ textAlign: 'center' }}>
                  <p>{datos && datos[2] && datos[2].nombre}</p>
                  <div style={{ backgroundColor: '#EE6400', height: '50px' }}>
                    <h2>3</h2>
                  </div>
                </Col>
              </Row>
            </div>
            <List
              dataSource={datos ? datos.slice(3, 10) : []}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                    title={`${index + 4}.- ${item.nombre}`}
                  />
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className="ant-component-wrapper">
            <div className="ant-component">
              <div className="ant-component-header" style={{ textAlign: 'center' }}>
                <Button type="text" shape="round" icon={<PlayCircleTwoTone twoToneColor={"#FF9110"} />} style={{ color: '#FF9110', borderColor: '#FF9110', fontWeight: 'bold' }} >
                  <Link to="/playQuiz">Iniciar Quiz</Link>
                </Button>
                {/* <Button onClick={manejarClic}>
                  Haz clic para hacer una petición
                </Button> */}
                <Col span={24} style={{ marginTop: 20 }}>
                  <Image
                    width={'50%'}
                    src={juego}
                    preview={false}
                  />
                </Col>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}