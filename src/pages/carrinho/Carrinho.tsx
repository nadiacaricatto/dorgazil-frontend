import { useEffect, useState } from "react"
import { Trash } from "@phosphor-icons/react"

interface ItemCarrinho {
    id: number
    nome: string
    preco: string
    foto: string
    quantidade: number
}

function Carrinho() {
    const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])

    useEffect(() => {
        carregarCarrinho()
    }, [])

    function carregarCarrinho() {
        const carrinhoLocal = JSON.parse(localStorage.getItem('carrinho') || '[]')
        setCarrinho(carrinhoLocal)
    }

    function removerItem(id: number) {
        const novoCarrinho = carrinho.filter(item => item.id !== id)
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))
        setCarrinho(novoCarrinho)
    }

    function aumentarQuantidade(id: number) {
        const novoCarrinho = carrinho.map(item => 
            item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))
        setCarrinho(novoCarrinho)
    }

    function diminuirQuantidade(id: number) {
        const novoCarrinho = carrinho.map(item => 
            item.id === id && item.quantidade > 1 
                ? { ...item, quantidade: item.quantidade - 1 } 
                : item
        )
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))
        setCarrinho(novoCarrinho)
    }

    function calcularTotal() {
        return carrinho.reduce((total, item) => {
            const preco = parseFloat(item.preco.replace(',', '.'))
            return total + (preco * item.quantidade)
        }, 0).toFixed(2)
    }

    function limparCarrinho() {
        localStorage.removeItem('carrinho')
        setCarrinho([])
    }

    return (
        <div className="flex justify-center w-full my-8">
            <div className="container flex flex-col gap-4">
                <h1 className="text-4xl font-bold text-center text-indigo-900">Meu Carrinho</h1>

                {carrinho.length === 0 ? (
                    <div className="text-center text-2xl text-gray-600 my-8">
                        Seu carrinho está vazio!
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-4">
                            {carrinho.map((item) => (
                                <div key={item.id} className="border border-slate-900 rounded p-4 flex gap-4 items-center">
                                    <img 
                                        src={item.foto} 
                                        alt={item.nome}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold">{item.nome}</h3>
                                        <p className="text-lg text-indigo-600 font-bold">R$ {item.preco}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => diminuirQuantidade(item.id)}
                                            className="bg-gray-300 hover:bg-gray-400 w-8 h-8 rounded">
                                            -
                                        </button>
                                        <span className="text-lg font-semibold w-8 text-center">{item.quantidade}</span>
                                        <button 
                                            onClick={() => aumentarQuantidade(item.id)}
                                            className="bg-gray-300 hover:bg-gray-400 w-8 h-8 rounded">
                                            +
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => removerItem(item.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white p-2 rounded">
                                        <Trash size={24} weight="fill" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-indigo-900 pt-4 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-indigo-900">
                                Total: R$ {calcularTotal()}
                            </h2>
                            <div className="flex gap-4">
                                <button 
                                    onClick={limparCarrinho}
                                    className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded">
                                    Limpar Carrinho
                                </button>
                                <button className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded">
                                    Finalizar Compra
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Carrinho