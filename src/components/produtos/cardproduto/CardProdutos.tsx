import { Link } from 'react-router-dom'
import Produto from '../../../models/Produto'

interface CardProdutoProps {
    produto: Produto
}

function CardProduto({ produto }: CardProdutoProps) {
    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>
                
            <div>
                <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                    <img
                        src={produto.foto} 
                        alt={produto.nome}
                        className="w-16 h-16 object-cover rounded" 
                    />
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {produto.categoria?.nome}
                    </h3>
                </div>
                <div className='p-4'>
                    <h4 className='text-lg font-semibold uppercase'>{produto.nome}</h4>
                    <p className='text-xl font-bold text-indigo-600'>R$ {produto.preco}</p>
                    <p className='text-sm text-gray-600'>Categoria: {produto.categoria?.nome}</p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/editarproduto/${produto.id}`}
                    className='w-full text-white bg-indigo-400 
                    hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarproduto/${produto.id}`}
                    className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardProduto