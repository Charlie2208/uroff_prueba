import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
// import Lista from './components/Lista'
// import Todos from './components/Todos'
import Home from './views/Home'
import Detalle from './views/Detalle'
//import reactLogo from './assets/react.svg'
import axios from 'axios'


const  App = () => {

  
  return (
    <div>
      <Routes>
        {/* <Route exact path="/" element={<Lista />} /> */}
        <Route exact path="/:name" element={<Detalle />}/>
        <Route exact path="/home" element={<Home />} />
      </Routes>  
    </div>
  
  )
}

export default App
