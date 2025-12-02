import { Link } from "react-router-dom"
import { FirstAidKit, ShoppingCart } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

function Navbar() {
    const [totalItens, setTotalItens] = useState(0)
    
    useEffect(() => {
        atualizarCarrinho()
        window.addEventListener('storage', atualizarCarrinho)
        return () => window.removeEventListener('storage', atualizarCarrinho)
    }, [])
    
    function atualizarCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]')
        const total = carrinho.reduce((acc: number, item: any) => acc + item.quantidade, 0)
        setTotalItens(total)
    }
    
    return (
        <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
            <div className="container flex justify-between text-lg mx-8">
                <Link to="/home" className="text-2xl font-bold flex items-center gap-2">
                    <FirstAidKit size={32} weight="fill" />
                    Dorgazil
                </Link>
                <div className="flex gap-4 items-center">
                    <Link to="/categorias" className="hover:underline">Categorias</Link>
                    <Link to="/produtos" className="hover:underline">Produtos</Link>
                    <Link to="/carrinho" className="hover:underline flex items-center gap-2">
                        <ShoppingCart size={24} weight="fill" />
                        {totalItens > 0 && (
                            <span className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                {totalItens}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Navbar