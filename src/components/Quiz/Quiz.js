import React, { useEffect, useState } from 'react';
import { Radio, Space, Button, Flex, Progress } from 'antd';
import { Card } from 'antd';
import logo from '../../img/Francia.jpg';
import preguntas  from './Preguntas';
import LoadingInicio from '../../componentAnimation/IntroLoad';





export default function Quiz() {
  
  const [pregunta1, setPregunta1] = useState(false);
  const [pregunta2, setPregunta2] = useState(false);
  const [pregunta3, setPregunta3] = useState(false);
  const [pregunta4, setPregunta4] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState();
  const [arrayRespuestas, setArrayRespuestas] = useState([]);

  const seleccionadoRespuesta = (respuesta, numero) => {
    setPregunta1(numero === 1);
    setPregunta2(numero === 2);
    setPregunta3(numero === 3);
    setPregunta4(numero === 4);

    console.log("respuesta seleccionada", respuesta);
    setRespuestaSeleccionada(respuesta);
  };

  const guardarRespuesta = () => {
    console.log('Respuesta guardada:', respuestaSeleccionada);
    setArrayRespuestas(prevArray => [...prevArray, respuestaSeleccionada]);

    console.log('Array de respuestas 1:', arrayRespuestas);
  };

 async function verRespuestas () {
    await console.log('Array de respuestas 2:', arrayRespuestas);
  }
  
  useEffect(() => {
    guardarRespuesta();
  }, [respuestaSeleccionada]);


  const [loading, setLoading] = useState(false);
  const [contador, setContador] = useState(0);
  const [tiempoAsignadoU, setTiempoAsignadoU] = useState();

  const [start, setStart] = useState(false);

  const [tituloPregunta, setTituloPregunta] = useState();
  const [respuesta1 , setRespuesta1] = useState(  "cargando..." );
  const [respuesta2 , setRespuesta2] = useState(  "cargando..." );
  const [respuesta3 , setRespuesta3] = useState(  "cargando..." );
  const [respuesta4 , setRespuesta4] = useState(  "cargando..." );


  useEffect(() => {
   
    let indice = 0;
    let tiempoAsignado = 40;
    let tiempoTranscurrido = 0;

    setTiempoAsignadoU(tiempoAsignado);
    
    if(start){
      setLoading(true);
      console.log('Inicia el juego');
      const intervalId = setInterval(() => {
        tiempoTranscurrido++;
        setContador(tiempoTranscurrido);
        setTituloPregunta(preguntas[indice].pregunta);
        setRespuesta1(preguntas[indice].respuestas[0].respuesta1);
        setRespuesta2(preguntas[indice].respuestas[1].respuesta2);
        setRespuesta3(preguntas[indice].respuestas[2].respuesta3);
        setRespuesta4(preguntas[indice].respuestas[3].respuesta4);


        if (tiempoTranscurrido >= tiempoAsignado) {
          //console.log('Se ha cumplido el tiempo');
          tiempoTranscurrido = 0;
          setPregunta1(false);
          setPregunta2(false);
          setPregunta3(false);
          setPregunta4(false);

          if (indice === 8) {
            indice = 0;
          }
          indice++;
        }
      }, 1000); // Intervalo de 1 segundo
  
      return () => clearInterval(intervalId); // Limpieza del intervalo
    }
    else{
      setLoading(false);
      console.log('Aun no inicia el juego');
    }
    

  }, [start]);

  


  



  

  // let tituloPregunta = indicePregunta.pregunta ? indicePregunta.pregunta : preguntas[0].pregunta;
  // let respuesta1 = indicePregunta.respuestas ? indicePregunta.respuestas[0].respuesta1 : preguntas[0].respuestas[0].respuesta1;
  // let respuesta2 = indicePregunta.respuestas ? indicePregunta.respuestas[1].respuesta2 : preguntas[0].respuestas[1].respuesta2;
  // let respuesta3 = indicePregunta.respuestas ? indicePregunta.respuestas[2].respuesta3 : preguntas[0].respuestas[2].respuesta3;
  // let respuesta4 = indicePregunta.respuestas ? indicePregunta.respuestas[3].respuesta4 : preguntas[0].respuestas[3].respuesta4;
  


  return (
    <>
    {loading ? 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Flex gap="small" wrap="wrap">
        <Progress type="circle" percent={(contador / tiempoAsignadoU) * 100} format={() => `${contador}`} />
      </Flex>
      <h1 style={{ color: '#124076' }}> Pregunta 1:</h1>
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
        <Button type="primary" danger disabled={pregunta1} onClick={() => seleccionadoRespuesta(respuesta1,1)} style={{ marginBottom: '20px', width: '100%', whiteSpace: 'normal', fontSize: '14px', overflowWrap: 'break-word' }}>
          {respuesta1}
        </Button>
        <Button type="primary" danger disabled={pregunta2} onClick={() => seleccionadoRespuesta(respuesta2,2)} style={{ width: '100%', whiteSpace: 'normal', fontSize: '14px', overflowWrap: 'break-word' }}>
          {respuesta2}
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', paddingLeft: '10px' }}>
        <Button type="primary" danger disabled={pregunta3} onClick={() => seleccionadoRespuesta(respuesta3,3)} style={{ marginBottom: '20px', width: '100%', whiteSpace: 'normal', fontSize: '14px', overflowWrap: 'break-word' }}>
          {respuesta3}
        </Button>
        <Button type="primary" danger disabled={pregunta4} onClick={() => seleccionadoRespuesta(respuesta4,4)} style={{ width: '100%', whiteSpace: 'normal', fontSize: '14px', overflowWrap: 'break-word' }}>
          {respuesta4}
        </Button>
      </div>
    </div>
        
    </div> :
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>
      <LoadingInicio />
      <Button style={{ marginTop: '20px' }} type="primary" onClick={() => setStart(true)}>¡Click para jugar!</Button>
    </div>
    }
    
    
    </>
  )
}
