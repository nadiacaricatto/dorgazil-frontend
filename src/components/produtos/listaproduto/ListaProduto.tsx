import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import Produto from "../../../models/Produto";
import { buscar } from "../../../services/CategoriaService";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardProduto from "../cardproduto/CardProdutos";


function ListaProdutos() {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [produtos, setProdutos] = useState<Produto[]>([])

    useEffect(() => {
        buscarProdutos()    
    }, [produtos.length])

    async function buscarProdutos() {
        try {
            setIsLoading(true)
            await buscar('/produtos', setProdutos, {})
        } catch (error: any) {
            console.error('Erro: ', error)
            ToastAlerta('Erro ao buscar produtos!', 'erro')
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <>

            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader
                        color="#312e81"
                        size={32}
                    />
                </div>
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {(!isLoading && produtos.length === 0) && (
                            <span className="text-3xl text-center my-8">
                                Nenhuma Produto foi encontrado!
                            </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8 p-4">
                            {
                                produtos.map((produto) => (
                                    <CardProduto key={produto.id} produto={produto}/>
                                ))
                            }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaProdutos;