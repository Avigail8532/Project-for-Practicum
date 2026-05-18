import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* הנתיב הראשי של האתר - יציג את עמוד ההרשמה שכתבת */}
        <Route path="/" element={<Register />} />
        
        {/* בהמשך, כשניצור את עמוד הדשבורד, נחבר אותו כאן בצורה הזו: */}
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}


export default App