import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import Produto from "../../../models/Produto"
import { buscar, deletar } from "../../../services/CategoriaService"

function DeletarProduto() {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [produto, setProduto] = useState<Produto>({} as Produto)
    const { id } = useParams<{ id: string}>()

    async function buscarProdutoPorId() {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                })
        } catch (error: any) {
            if (error.toString().includes('401')) {
            }
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarProdutoPorId();
        }
    }, [id])

    function retornar () {
        navigate("/produtos")
    }
      
    async function deletarProduto() {
        setIsLoading(true)
        try {
            await deletar(`/produtos/${id}`, {
            })
            ToastAlerta('Exclusão de Produto feita com sucesso', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('401')) {
            }else {
                ToastAlerta('Ocorreu um erro ao excluir o Produto.Tente novamente!', 'erro')
            }
        }
        setIsLoading(false)
        retornar()
    }
    
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Produto</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja excluir o produto a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Produto
                </header>
                <div className="p-4">
                    <p className='text-xl h-full'>{produto.nome}</p>
                    <p>{produto.nome}</p>
                </div>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                        hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarProduto}>

                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        }
                        
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto