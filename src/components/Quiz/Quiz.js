import React, { useEffect, useState } from 'react';
import { Button, Flex, Progress, Row, Col } from 'antd';
import { Card } from 'antd';

import preguntas  from './Preguntas';
import LoadingInicio from '../../componentAnimation/IntroLoad';
import { auth } from '../../firebase';
import { newScore } from './ApiScore';




export default function Quiz() {
  const [scoreGET, setScore] = useState();
  const [logo, setLogo] = useState(require("../../img/Francia.jpg"));
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
    
    setRespuestaSeleccionada(respuesta);
    setAccion(true);
  };

  const guardarRespuesta = () => {
    setArrayRespuestas(prevArray => [...prevArray, respuestaSeleccionada]);
  };

  
  useEffect(() => {
    guardarRespuesta();
  }, [respuestaSeleccionada]);


  const [loading, setLoading] = useState(false);
  const [contador, setContador] = useState(0);
  const [tiempoAsignadoU, setTiempoAsignadoU] = useState();

  const [start, setStart] = useState(false);

  const [tituloPregunta, setTituloPregunta] = useState();
  const [numeroPregunta, setNumeroPregunta] = useState( "cargando..." );

  const [respuesta1 , setRespuesta1] = useState(  "cargando..." );
  const [respuesta2 , setRespuesta2] = useState(  "cargando..." );
  const [respuesta3 , setRespuesta3] = useState(  "cargando..." );
  const [respuesta4 , setRespuesta4] = useState(  "cargando..." );
  const [gameOver, setGameOver] = useState(true);

  let [indice, setIndice] = useState(0);

  const reset = () => {
    setPregunta1(false);
    setPregunta2(false);
    setPregunta3(false);
    setPregunta4(false);
  }


  const stopGame = () => {
    setGameOver(false)
  }


  const [respuestasCorrectasUsuario, setRespuestasCorrectasUsuario] = useState([]);
  let scoreFinal;

  const compararRespuestas = (respuestasUsuario, respuestasCorrectas) => {
    let countCorrecto = 0; // Inicializa countCorrecto a 0
    const respuestas = respuestasUsuario.map((respuesta, index) => {
      if (respuesta === respuestasCorrectas[index]) {
        countCorrecto++;
        return {
          respuesta: respuesta,
          esCorrecta: true
        };
      } else {
        return {
          respuesta: respuesta,
          esCorrecta: false,
          respuestaCorrecta: respuestasCorrectas[index]
        };
      }
    });
    scoreFinal = countCorrecto
    setScore(countCorrecto);
    return respuestas;
  };
  
  const saveScore = async () => {
    // Respuestas correctas
    const respuestasCorrectas = [
      'París',
      '1945',
      'Karl Benz',
      'Cristóbal Colón',
      'Club de Fútbol Pachuca',
      'Asia',
      'China',
      'Civilización del Valle del Indo',
      'Rómulo Augusto'
    ];

   // Filtrar respuestas del usuario
   const filteredData = arrayRespuestas.filter(item => item !== null && item !== undefined && item !== "");

    // Comparar respuestas del usuario con las correctas
    const respuestasUsuario = compararRespuestas(filteredData, respuestasCorrectas);

    // Actualizar el estado con las respuestas del usuario
    setRespuestasCorrectasUsuario(respuestasUsuario);
    await newScore(scoreFinal, auth.currentUser.uid, auth.currentUser.displayName)
   
  };


  useEffect(() => {
    let tiempoAsignado = 40;
    let tiempoTranscurrido = 0;
    let stop = true

    setTiempoAsignadoU(tiempoAsignado);
    
    if(start){
 
      setLoading(true);

      if (indice === 9 ) {
        stopGame()
        saveScore()

      } else {
        
          const intervalId = setInterval(() => {
            tiempoTranscurrido++;
            if (stop) {
              setNumeroPregunta(preguntas[indice].numero);
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
              indice++;
              setIndice(indice);
              if (indice === 9) {
                stopGame();
                stop = false;
              }
            }

            if(indice === 0){
              setLogo(require("../../img/Francia.jpg"))
            }else if(indice === 1){
          
              setLogo(require("../../img/Guerramundial.jpg"))
            }else if(indice === 2){
           
              setLogo(require("../../img/automovil.jpeg"))
            }else if(indice === 3){
           
              setLogo(require("../../img/americano.jpg"))
            }else if(indice === 4){
            
              setLogo(require("../../img/mexicano.png"))
            }else if(indice === 5){
           
              setLogo(require("../../img/continente.jpg"))
            }else if(indice === 6){
            
              setLogo(require("../../img/poblacion.jpeg"))
            }else if(indice === 7){
            
              setLogo(require("../../img/civilizacion.jpg"))
            }else if(indice === 8){
            
              setLogo(require("../../img/romano.jpeg"))
            }
            
      
            if (accion) {
              reset();
              indice++;
              setAccion(false);
              setIndice(indice);
            }

          }, 1000);
               
          return () => {
  
            clearInterval(intervalId);
          };
        }      
      
    }
    else{
        setLoading(false);
    }
   
  }, [start, accion]);



  return (
    <>
    {loading ? 
     gameOver === true ? (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Flex gap="small" wrap="wrap">
            <Progress type="circle" percent={(contador / tiempoAsignadoU) * 100} format={() => `${contador}`} />
          </Flex>
          <h1 style={{ color: '#124076' }}> Pregunta: {numeroPregunta}</h1>
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
              <img rel="preload" fetchpriority="high" alt={logo} src={logo} style={{ width: '200px', height: 'auto' }} /> 
            </div>
            <h3 style={{ wordWrap: 'break-word', color: 'white', textAlign: 'center' }}>{tituloPregunta}</h3> 
          </Card>
          
          <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={12}>
        <Button type="primary" danger disabled={pregunta1} onClick={() => seleccionadoRespuesta(respuesta1, 1)} style={{ width: '100%', fontSize: '14px', backgroundColor: 'rgb(255, 145, 16)' }}>
          {respuesta1}
        </Button>
      </Col>
      <Col xs={24} sm={12}>
        <Button type="primary" danger disabled={pregunta2} onClick={() => seleccionadoRespuesta(respuesta2, 2)} style={{ width: '100%', fontSize: '14px', backgroundColor: 'rgb(255, 145, 16)' }}>
          {respuesta2}
        </Button>
      </Col>
      <Col xs={24} sm={12}>
        <Button type="primary" danger disabled={pregunta3} onClick={() => seleccionadoRespuesta(respuesta3, 3)} style={{ width: '100%', fontSize: '14px', backgroundColor: 'rgb(255, 145, 16)' }}>
          {respuesta3}
        </Button>
      </Col>
      <Col xs={24} sm={12}>
        <Button type="primary" danger disabled={pregunta4} onClick={() => seleccionadoRespuesta(respuesta4, 4)} style={{ width: '100%', fontSize: '14px', backgroundColor: 'rgb(255, 145, 16)' }}>
          {respuesta4}
        </Button>
      </Col>
    </Row>
            
        </div> ) : 

        (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ color: '#124076' }}>Fin del juego</h1>
         

            <h2>Respuestas del usuario:</h2>
            <ul>
              {respuestasCorrectasUsuario.map((respuesta, index) => (
                <li key={index}>
                  Respuesta: {respuesta.respuesta} - {respuesta.esCorrecta ? 'Correcta' : 'Incorrecta'} {respuesta.esCorrecta ? null : `- Respuesta Correcta: ${respuesta.respuestaCorrecta}`}
                </li>
              ))}
            </ul>
            <h1>Score: {scoreGET}</h1>
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

