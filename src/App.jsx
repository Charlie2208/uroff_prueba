import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Detalle from './views/Detalle'

const  App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:name" element={<Detalle />}/>
      </Routes>  
    </div>
  )
}

export default App
