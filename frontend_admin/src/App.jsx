import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Popup from './components/Popup'
import { SocketProvider } from './context/SocketContext'
import Fireman from './pages/Fireman'
import AddFireman from './pages/AddFireman'

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
            <Route path='/fireman' element={<Fireman />} />
            <Route path='/add-fireman' element={<AddFireman />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  )
}

export default App