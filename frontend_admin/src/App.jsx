import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from "./pages/About"
import Home from "./pages/Home"
import Contact from './pages/Contact'
import Navbar from './components/Navbar'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App