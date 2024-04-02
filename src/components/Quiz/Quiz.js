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
  const [accion, setAccion] = useState(false);
  const [arrayRespuestas, setArrayRespuestas] = useState([]);

  const seleccionadoRespuesta = (respuesta, numero) => {
    setPregunta1(numero === 1);
    setPregunta2(numero === 2);
    setPregunta3(numero === 3);
    setPregunta4(numero === 4);
    
    console.log("respuesta seleccionada", respuesta);
    setRespuestaSeleccionada(respuesta);
    setAccion(true);
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
    console.log('respuesta guardada');
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
  const [gameOver, setGameOver] = useState(true);

  let [indice, setIndice] = useState(7);

  const reset = () => {
    setPregunta1(false);
    setPregunta2(false);
    setPregunta3(false);
    setPregunta4(false);
  }

  let audio = new Audio(new URL('./contadorSound.mp3', import.meta.url));
  const playAudio = async () => {
    try {
     await audio.play();
    } catch (error) {
      await console.error('Error al reproducir el audio:', error);
    }
  };

  const playSound = () => {
    audio.addEventListener('ended', playAudio);
    playAudio(); // Reproducir el sonido por primera vez
  };
  
  const detenerSonido = async () => {
    await audio.pause();
  }

  const stopGame = () => {
    detenerSonido()
    console.log('****Fin del juego******');
    setGameOver(false)
  }

  useEffect(() => {
    let tiempoAsignado = 40;
    let tiempoTranscurrido = 0;
    let stop = true


    console.log("indice start", indice);

    setTiempoAsignadoU(tiempoAsignado);
    
    if(start){
      playSound()
      setLoading(true);
      console.log('Inicia el juego');

      if (indice === 9 ) {
        console.log('****Fin del juego******');
        stopGame()
       

      } else {
        
          const intervalId = setInterval(() => {
            tiempoTranscurrido++;
            if (stop) {
              console.log('Tiempo transcurrido:', tiempoTranscurrido);
              console.log("stop", stop)
              setContador(tiempoTranscurrido);
              setTituloPregunta(preguntas[indice].pregunta);
              setRespuesta1(preguntas[indice].respuestas[0].respuesta1);
              setRespuesta2(preguntas[indice].respuestas[1].respuesta2);
              setRespuesta3(preguntas[indice].respuestas[2].respuesta3);
              setRespuesta4(preguntas[indice].respuestas[3].respuesta4);
            }
            if (tiempoTranscurrido >= tiempoAsignado) {
              tiempoTranscurrido = 0;
              reset();
              indice = indice + 1;
              setIndice(indice);
              console.log('indice*', indice);
              if (indice === 9) {
                stopGame();
                stop = false;
              }
            }
      
            if (accion) {
              reset();
              indice = indice + 1;
              setAccion(false);
              setIndice(indice);
            }
          }, 1000);
      
          return () => {
            detenerSonido();
            clearInterval(intervalId);
          };
        }
      
      
    }
    else{
        setLoading(false);
        console.log('Aun no inicia el juego');
    }
   
    console.log("indice 2", indice);

  }, [start, accion]);

  return (
    <>
    {loading ? 
     gameOver == true ? (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Flex gap="small" wrap="wrap">
            <Progress type="circle" percent={(contador / tiempoAsignadoU) * 100} format={() => `${contador}`} />
          </Flex>
          <h1 style={{ color: '#124076' }}> Pregunta 1:</h1>
          <Card
            hoverable
            style={{
              width: '90%', 
              maxWidth: '600px', 
              backgroundColor: '#124076',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
              <img alt="example" src={logo} style={{ width: '200px', height: 'auto' }} /> 
            </div>
            <h3 style={{ wordWrap: 'break-word', color: 'white', textAlign: 'center' }}>{tituloPregunta}</h3> 
          </Card>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', maxWidth: '600px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', paddingRight: '10px' }}>
              <Button type="primary" danger disabled={pregunta1}  onClick={() => seleccionadoRespuesta(respuesta1,1)} style={{ marginBottom: '20px', width: '100%', whiteSpace: 'normal', fontSize: '14px', overflowWrap: 'break-word' }}>
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
            
        </div> ) : 

        (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ color: '#124076' }}>Fin del juego</h1>
            <Button type="primary" onClick={() => verRespuestas()}>Ver respuestas</Button>
          </div>
        )
      
        :
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>
        <LoadingInicio />
        <Button style={{ marginTop: '20px' }} type="primary" onClick={() => setStart(true)}>¡Click para jugar!</Button>
      </div>
    }
    </>
  )
}