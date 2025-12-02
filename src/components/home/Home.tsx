import { Link } from "react-router-dom"
import ListaProduto from "../produtos/listaproduto/ListaProduto"

function Home() {
    return (
        <>
            {/* Container */}
            <div className="bg-indigo-900 flex justify-center">
                {/* Grid que divide a tela em 2 colunas */}
                <div className="container grid grid-cols-1 sm:grid-cols-2 text-white">
                    {/* Coluna esquerda */}
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className="text-5xl font-bold">Boas-vindas!</h2>
                        <h3 className="text-5xl font-bold">DORGAZIL</h3>
                        <p className="text-xl">Farmácia 24 Horas | Medicamentos | Dermocosméticos | Ofertas do Dia</p>
                        
                        {/* Botões */}
                        <div className="flex justify-around gap-4">
                            <Link to="/cadastrarproduto">
                                <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800">
                                    Novo Produto
                                </button>
                            </Link>
                            <Link to="/cadastrarcategoria">
                                <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800">
                                    Nova Categoria
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* Coluna Direita */}
                    <div className="flex justify-center items-center py-8">
                        <img
                            src="https://i.imgur.com/wyz71Qd.jpeg"
                            alt="Imagem da Página Home"
                            className="w-2/3 rounded-2xl border-4 border-white shadow-2xl"
                        />
                    </div>
                </div>
            </div>
            
            <ListaProduto />
        </>
    )
}

export default Home