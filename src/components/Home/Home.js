import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <h1>Home</h1>
        <Link to='/playQuiz'>Jugar</Link>
        <br />
        <Link to='/inicioSession'>Inicio de sesión</Link>
        <br />
        <Link to='/registro'>Registro</Link>
    </div>
  )
}
