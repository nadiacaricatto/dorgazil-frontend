import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home"
import Navbar from "./components/navbar/Navbar"
import 'react-toastify/dist/ReactToastify.css'
import ListaCategorias from "./components/categorias/listacategoria/ListaCategorias"
import FormCategoria from "./components/categorias/formcategoria/FormCategoria"
import FormProduto from "./components/produtos/formproduto/FormProduto"
import DeletarCategoria from "./components/categorias/deletarcategoria/DeletarCategoria"
import DeletarProduto from "./components/produtos/deletarproduto/DeletarProduto"
import Carrinho from "./pages/carrinho/Carrinho"
import Produtos from "./pages/produtos/Produtos" 

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
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/cadastrarproduto" element={<FormProduto />} />
            <Route path="/editarproduto/:id" element={<FormProduto />} />
            <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App