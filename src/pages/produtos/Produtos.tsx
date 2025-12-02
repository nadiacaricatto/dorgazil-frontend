import { Link } from "react-router-dom"
import ListaProduto from "../../components/produtos/listaproduto/ListaProduto"

function Produtos() {
    return (
        <div className="flex flex-col">
            <div className="flex justify-end px-8 py-4">
                <Link to="/cadastrarproduto">
                    <button className="border rounded px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-800">
                        Novo Produto
                    </button>
                </Link>
            </div>
            <ListaProduto />
        </div>
    )
}

export default Produtos