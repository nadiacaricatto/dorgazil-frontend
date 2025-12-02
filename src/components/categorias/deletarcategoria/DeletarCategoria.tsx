import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { buscar, deletar } from "../../../services/CategoriaService"
import { ClipLoader } from "react-spinners"
import Categoria from "../../../models/Categoria"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarCategoria() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    const { id } = useParams<{ id: string }>()

    async function buscarCategoriaPorId() {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
            }
        } 
    }

    useEffect(() => {
        if(id !== undefined){
            buscarCategoriaPorId();
        }
    }, [id])

    function retornar() {
        navigate("/categorias")
    }

    async function deletarCategoria(){
        setIsLoading(true);
        try{
            await deletar(`/categorias/${id}`, {
            })
            ToastAlerta('Categoria deletado com sucesso!', 'sucesso')
        }catch(error: any){
            if(error.toString().includes('401')){
            }else{
                ToastAlerta('Erro ao deletar o categoria!', 'erro')
            }
        }
        setIsLoading(false);
        retornar();
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar categori</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o categori a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Categoria
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{categoria.nome}</p>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}    
                    >
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                            onClick={deletarCategoria}
                        >
                        {
                            isLoading ?
                                <ClipLoader 
                                    color="#ffffff"
                                    size={24}
                                />
                            :
                            <span>Sim</span>                        
                        }
                        
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarCategoria