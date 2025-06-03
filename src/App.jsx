import React from 'react'
import Wasiya from './pages/taher/mainpage'
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
      <Routes>
        <Route path="/"  element={<Wasiya />}/>
      </Routes>

  )
}

export default App