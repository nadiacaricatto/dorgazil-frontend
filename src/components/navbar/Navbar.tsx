import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"

function Navbar() {

	const navigate = useNavigate();

	let component: ReactNode

		component = (

			<div
				className="w-full flex justify-center py-4
            			   bg-indigo-900 text-white"
			>
				<div className="container flex justify-between text-lg mx-8">
					<Link to="/home" className="text-2xl font-bold">
						Blog Pessoal
					</Link>

					<div className="flex gap-4">
                        <Link to='/categorias' className='hover:underline'>Categorias</Link> 
                        <Link to='/produtos' className="hover:underline">Produtos</Link> 
                        <Link to='/cadastrartema' className="hover:underline">Ofertas</Link>
                    </div>
				</div>
			</div>

		)
	}

export default Navbar
