import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Navbar from './components/Navbar'
import Popup from './components/Popup'
import { SocketProvider } from './context/SocketContext'
import Fireman from './pages/Fireman'
import AddFireman from './pages/AddFireman'
import Vehicle from './pages/Vehicle'
import AddVehicle from './pages/AddVehicle'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <div>
      <SocketProvider>
        <BrowserRouter>
          <Navbar />
          <Sidebar />
          <Popup />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/fireman' element={<Fireman />} />
            <Route path='/add-fireman' element={<AddFireman />} />
            <Route path='/vehicle' element={<Vehicle />} />
            <Route path='/add-vehicle' element={<AddVehicle />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  )
}

export default App