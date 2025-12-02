import axios from "axios";

// Instância do Axios
const api = axios.create({
    baseURL: 'https://farmacia-ug0p.onrender.com'
})

// Função Cadastrar Categoria
export const cadastrar = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

// Função Consultar Categoria
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

// Função Atualizar Categoria
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
}

// Função Deletar Categoria
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header);
}