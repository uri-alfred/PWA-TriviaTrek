import React, { useEffect, useState } from 'react';
import { Radio, Space, Button } from 'antd';
import { Card } from 'antd';
import logo from '../../img/Francia.jpg';
import preguntas  from './Preguntas';


export default function Quiz() {


  const { Meta } = Card;

  
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const [indicePregunta, setIndicePregunta] = useState(0);
  const [loading, setLoading] = useState(false);

  let indice = 0;

  useEffect(() => {
    console.log('JEJEJE ', preguntas[0]?.respuestas[0]); // Usando el operador de opcionalidad (?.)
    const intervalId = setInterval(() => {
      console.log('Cambio de pregunta: ', preguntas[indice]);
      setIndicePregunta(preguntas[indice]);
      setLoading(true);
      if (indice === 8) {
        indice = 0;
      }
      indice++;
    }, 4000);
  
    return () => clearInterval(intervalId);
  }, []);
  

  let tituloPregunta = indicePregunta.pregunta;
  let respuesta1 = indicePregunta.respuestas ? indicePregunta.respuestas[0].respuesta1 : preguntas[0].respuestas[0].respuesta1;
  let respuesta2 = indicePregunta.respuestas ? indicePregunta.respuestas[1].respuesta2 : preguntas[0].respuestas[1].respuesta2;
  let respuesta3 = indicePregunta.respuestas ? indicePregunta.respuestas[2].respuesta3 : preguntas[0].respuestas[2].respuesta3;
  let respuesta4 = indicePregunta.respuestas ? indicePregunta.respuestas[3].respuesta4 : preguntas[0].respuestas[3].respuesta4;
  
   
  console.log('respuesta1: ', respuesta1);
  console.log('respuesta2: ', respuesta2);
  console.log('respuesta3: ', respuesta3);
  console.log('respuesta4: ', respuesta4);

  return (
    <>
    {loading == true ? 
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1 style={{ color: '#124076' }}>Pregunta 1:</h1>
      <Card
        hoverable
        style={{
          width: '90%', // Ancho del 90% del contenedor padre
          maxWidth: '600px', // Ancho máximo de 600px
          backgroundColor: '#124076',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <img alt="example" src={logo} style={{ width: '200px', height: 'auto' }} /> {/* Ancho del 100% y altura automática */}
        </div>
        <h3 style={{ wordWrap: 'break-word', color: 'white', textAlign: 'center' }}>{tituloPregunta}</h3> {/* Alineación del texto al centro y máximo de ancho */}
      </Card>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', maxWidth: '600px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', paddingRight: '10px' }}>
        <Button type="primary" danger style={{ marginBottom: '20px', width: '100%', whiteSpace: 'normal', fontSize: '14px', overflowWrap: 'break-word' }}>
          {respuesta1}
        </Button>
        <Button type="primary" danger style={{ width: '100%', whiteSpace: 'normal', fontSize: '14px', overflowWrap: 'break-word' }}>
          {respuesta2}
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', paddingLeft: '10px' }}>
        <Button type="primary" danger style={{ marginBottom: '20px', width: '100%', whiteSpace: 'normal', fontSize: '14px', overflowWrap: 'break-word' }}>
          {respuesta3}
        </Button>
        <Button type="primary" danger style={{ width: '100%', whiteSpace: 'normal', fontSize: '14px', overflowWrap: 'break-word' }}>
          {respuesta4}
        </Button>
      </div>
    </div>
    
    </div> : <h1>Cargando...</h1>}
    
    </>
  )
}
