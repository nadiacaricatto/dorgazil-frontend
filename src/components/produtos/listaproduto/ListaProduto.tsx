import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import Produto from "../../../models/Produto";
import Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/CategoriaService";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardProduto from "../cardproduto/CardProdutos";

function ListaProduto() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([])
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [categoriaFiltro, setCategoriaFiltro] = useState<string>("")

    useEffect(() => {
        buscarProdutos()
        buscarCategorias()
    }, [])

    useEffect(() => {
        filtrarProdutos()
    }, [categoriaFiltro, produtos])

    async function buscarProdutos() {
        try {
            setIsLoading(true)
            await buscar('/produtos', setProdutos, {})
        } catch (error: any) {
            console.error('Erro: ', error)
            ToastAlerta('Erro ao buscar produtos!', 'erro')
        } finally {
            setIsLoading(false)
        }
    }

    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias, {})
        } catch (error: any) {
            console.error('Erro ao buscar categorias: ', error)
        }
    }

    function filtrarProdutos() {
        if (categoriaFiltro === "") {
            setProdutosFiltrados(produtos)
        } else {
            const filtrados = produtos.filter(
                produto => produto.categoria?.nome === categoriaFiltro
            )
            setProdutosFiltrados(filtrados)
        }
    }

    return (
        <>
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader color="#312e81" size={32} />
                </div>
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    
                    <div className="flex justify-center mb-6">
                        <select 
                            value={categoriaFiltro}
                            onChange={(e) => setCategoriaFiltro(e.target.value)}
                            className="border-2 border-indigo-600 rounded px-4 py-2 text-lg">
                            <option value="">Filtrar por Categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.nome}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    {(!isLoading && produtosFiltrados.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhum Produto foi encontrado!
                        </span>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                        {produtosFiltrados.map((produto) => (
                            <CardProduto key={produto.id} produto={produto}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaProduto;