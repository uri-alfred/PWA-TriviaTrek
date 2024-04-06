import axios from 'axios';
import React, { useState, useEffect } from 'react';


function obtenerFechaActual() {
    const now = new Date();
    const formattedDate = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    return formattedDate;
}

const newScore = async (score, uuid, displayName, jwt) => {
  const url = 'https://us-central1-triviatrek-187ec.cloudfunctions.net/api/puntuacion/agregarPuntuacion';
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      "uid": uuid,
      "score": score,
      "nombre": displayName == null ? 'Anónimo' : displayName,
      "fecha": obtenerFechaActual()
    })
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};


export {newScore };
