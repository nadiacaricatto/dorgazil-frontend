import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produto";
import { buscar as buscarCategoria } from "../../../services/CategoriaService";
import { buscar as buscarProduto, atualizar as atualizarProduto, cadastrar as cadastrarProduto } from "../../../services/ProdutoService";

import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormProduto() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [categorias, setCategorias] = useState<Categoria[]>([])

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        nome: ''
    })

    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nome: '',
        preco: '',
        foto: '',
        categoria: null
    })

    const { id } = useParams<{ id: string }>()

    async function buscarProdutoPorId(id: string) {
        try {
            await buscarProduto(`/produtos/${id}`, setProduto, {})
        } catch (error: any) {
            if (error.toString().includes('401')) {
                ToastAlerta('Ocorreu um erro na busca por Produtos. Tente novamente!', 'erro')
            }
        }
    }

    async function buscarCategorias() {
        try {
            await buscarCategoria('/categorias', setCategorias, {})
        } catch (error: any) {
            if (error.toString().includes('401')) {
                ToastAlerta('Ocorreu um erro na busca por Produtos. Tente novamente!', 'erro')
            }
        }
    }

    async function buscarCategoriaPorId(idCategoria: string) {
        try {
            await buscarCategoria(`/categorias/${idCategoria}`, setCategoria, {})
        } catch (error: any) {
            if (error.toString().includes('401')) {
                ToastAlerta('Ocorreu um erro na busca por Categorias. Tente novamente!', 'erro')
            }
        }
    }

    useEffect(() => {
        buscarCategorias()

        if (id !== undefined) {
            buscarProdutoPorId(id)
        }
    }, [id])

    useEffect(() => {
        if (categoria.id !== 0) {
            setProduto({
                ...produto,
                categoria: categoria,
            })
        }
    }, [categoria])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
        });
    }

    function retornar() {
        navigate('/produtos');
    }

    async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizarProduto(`/produtos/${id}`, produto, setProduto, {})
                ToastAlerta('O Produto foi atualizado com sucesso!', 'sucesso')
            } catch (error: any) {
                ToastAlerta('Erro ao atualizar o produto. Tente novamente!', 'erro')
            }
        } else {
            try {
                await cadastrarProduto(`/produtos`, produto, setProduto)
                ToastAlerta('O Produto foi cadastrado com sucesso!', 'sucesso');
            } catch (error: any) {
                ToastAlerta('Erro ao cadastrar o produto!', 'erro');
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoCategoria = categoria.nome === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Nome do Produto</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        name="nome"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="preco">Preço do Produto</label>
                    <input
                        type="text"
                        placeholder="0.00"
                        name="preco"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.preco}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="foto">URL da Foto</label>
                    <input
                        type="text"
                        placeholder="https://..."
                        name="foto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p>Categoria do Produto</p>
                    <select 
                        name="categoria" 
                        id="categoria" 
                        className='border p-2 border-slate-800 rounded' 
                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione uma Categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <button 
                    type='submit' 
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoCategoria}
                >
                    {isLoading ? 
                        <ClipLoader color="#ffffff" size={24} /> : 
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormProduto;
