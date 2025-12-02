import ListaPostagens from "../../components/home/Home"

function Home() {
	return (
		<>
			{/* Container */}
			<div className="bg-indigo-900 flex justify-center">
				{/* Grid que divide a tela em 2 colunas */}
				<div className="container grid grid-cols-1 sm:grid-cols-2 text-white">
					{/* Coluna esquerda */}
					<div className="flex flex-col gap-4 items-center justify-center py-4">
						<h2 className="text-5xl font-bold">Boas-vindas!</h2>
                        <h3 className ="text-5x1 font-bold">DORGAZIL</h3>
						<p className="text-xl">Farmácia 24 Horas | Medicamentos | Dermocosméticos | Ofertas do Dia</p>

						{/* Link/Botão */}
						<div className="flex justify-around gap-4">
                            
                            <ModalPostagem/>

                        </div>
					</div>

					{/* Coluna Direita */}
					<div className="flex justify-center">
						<img
							src="https://i.imgur.com/fyfri1v.png"
							alt="Imagem da Página Home"
							className="w-2/3"
						/>
					</div>
				</div>
			</div>
			<ListaPostagens />
		</>
	)
}

export default Home
