import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Row, Avatar, List, Image, Button } from 'antd';
import juego from '../../img/logo.jpg';
import { PlayCircleTwoTone } from '@ant-design/icons';

export default function Home() {

  const data = [
    {
      jugador: 'Toad',
    },
    {
      jugador: 'Yoshi',
    },
    {
      jugador: 'Bowser',
    },
    {
      jugador: 'Donkey Kong',
    },
    {
      jugador: 'Wario',
    },
    {
      jugador: 'Waluigi',
    },
    {
      jugador: 'Daisy',
    },
  ];

  return (
    <div >
      <Row>
        <Col span={12}>
          <div className="ant-component-wrapper">
            <div className="ant-component" style={{ backgroundColor: '#FFDEB7', marginRight: 20 }}>
              <div className="ant-component-header" style={{ textAlign: 'center' }}>
                <h1>Clasificación</h1>
              </div>
              <Row justify="center" align="bottom">
                <Col xs={20} sm={7} style={{ textAlign: 'center' }}>
                  <p>Luigi</p>
                  <div style={{ backgroundColor: '#CFCDCA', height: '100px' }}>
                    <h2>2</h2>
                  </div>
                </Col>
                <Col xs={20} sm={7} style={{ textAlign: 'center', marginLeft: '10px', marginRight: '10px' }}>
                  <p>Mario</p>
                  <div style={{ backgroundColor: '#FFCE22', height: '150px' }}>
                    <h2>1</h2>
                  </div>
                </Col>
                <Col xs={20} sm={7} style={{ textAlign: 'center' }}>
                  <p>Princesa Peach</p>
                  <div style={{ backgroundColor: '#EE6400', height: '50px' }}>
                    <h2>3</h2>
                  </div>
                </Col>
              </Row>
            </div>
            <List
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                    title={`${index + 4}.- ${item.jugador}`}
                  />
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className="ant-component-wrapper">
            <div className="ant-component">
              <div className="ant-component-header" style={{ textAlign: 'center' }}>
                <Button type="text" shape="round" icon={<PlayCircleTwoTone twoToneColor={"#FF9110"} />} style={{ color: '#FF9110', borderColor: '#FF9110', fontWeight: 'bold' }} >
                  <Link to="/playQuiz">Iniciar Quiz</Link>
                </Button>
                <Col span={24} style={{ marginTop: 20 }}>
                  <Image
                    width={'50%'}
                    src={juego}
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