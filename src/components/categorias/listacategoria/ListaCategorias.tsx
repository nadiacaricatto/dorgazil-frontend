import { buscar } from "../../../services/CategoriaService";
import { SyncLoader } from "react-spinners";
import CardCategoria from "../cardcategoria/CardCategoria";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Categoria from "../../../models/Categoria";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListaCategorias() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        buscarCategorias()
    }, [categorias.length])

    async function buscarCategorias(){
    try{
        setIsLoading(true);
        await buscar('/categorias', setCategorias, {})
    }catch(error: any){
        console.error('Erro: ', error)
        ToastAlerta ('Erro ao buscar categorias!', 'erro')
    }finally{
        setIsLoading(false);
    }
}

    return (
        <>
            {
                isLoading && (
                    <div className="flex justify-center w-full my-8">
                        <SyncLoader
                            color="#312e81"
                            size={32}
                        />
                    </div>
                )
            }

            <div className="flex justify-center w-full px-4 my-4">
                <div className="container flex flex-col">

                    
                    <div className="flex justify-end mb-4">
                        <Link to="/cadastrarcategoria">
                            <button className="border rounded px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-800">
                                Nova Categoria
                            </button>
                        </Link>
                    </div>


                    {
                       (!isLoading && categorias.length === 0) &&(
                            <span className="text-3xl text-center my-8">
                                Nenhum Categoria foi encontrado!
                            </span>
                       )
                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                            {
                                categorias.map((categoria) => (
                                    <CardCategoria key={categoria.id} categoria={categoria}/>
                                ) )
                            }
                            
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaCategorias;