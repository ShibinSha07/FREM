import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Popup from './components/Popup'
import { SocketProvider } from './context/SocketContext'

function App() {

  return (
    <div>
      <SocketProvider>
        <BrowserRouter>
          <Navbar />
          <Popup />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  )
}

export default App