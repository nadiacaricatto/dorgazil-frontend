import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home"
import Navbar from "./components/navbar/Navbar"
import 'react-toastify/dist/ReactToastify.css'
import ListaCategorias from "./components/categorias/listacategoria/ListaCategorias"

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/produtos" element={<ListaProduto />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App