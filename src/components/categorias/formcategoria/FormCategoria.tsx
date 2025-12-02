import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import Categoria from "../../../models/Categoria"
import { buscar, atualizar, cadastrar } from "../../../services/CategoriaService"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function FormCategoria() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: '' } as Categoria)
    const { id } = useParams<{ id: string }>()

    async function buscarCategoriaPorId() {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {})
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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value,
        })
    }

    async function gerarNovoCategoria(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar("/categorias", categoria, setCategoria, {})
                ToastAlerta("A Categoria foi atualizado com sucesso!", "sucesso")
            } catch (error: any) {
                if (error.toString().includes("401")) {
                } else {
                    ToastAlerta("Erro ao atualizar a categoria!", "erro")
                }
            }
        } else {
            try {
                await cadastrar("/categorias", categoria, setCategoria)
                ToastAlerta("A Categoria foi cadastrada com sucesso!", "sucesso")
            } catch (error: any) {
                if (error.toString().includes("401")) {
                } else {
                    ToastAlerta("Erro ao cadastrar a categoria!", "erro")
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    console.log(JSON.stringify(categoria))

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">{id === undefined ? "Cadastrar" : "Atualizar"} Categoria</h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoCategoria}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Descrição da Categoria</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu categoria"
                        name="nome"
                        className="border-2 border-slate-700 rounded p-2"
                        value={categoria.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit"
                >
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={24} />
                    ) : (
                        <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                    )}
                </button>
            </form>
        </div>
    )
}

export default FormCategoria