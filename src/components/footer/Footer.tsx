import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { useContext, type ReactNode } from "react"

function Footer() {
	let data = new Date().getFullYear()

	let component: ReactNode

		component = (

			<div className="flex justify-center bg-indigo-900 text-white">
				<div className="container flex flex-col items-center py-4">
					<p className="text-xl font-bold">Farmácia Dorgazil - Saúde e Bem Estar | 2025 | Copyright: {data}</p>
					<div className="flex gap-2">
						<a href="#" target="_blank">
							<LinkedinLogoIcon size={48} weight="bold" />
						</a>
						<a href="#" target="_blank">
							<InstagramLogoIcon size={48} weight="bold" />
						</a>
						<a href="#" target="_blank">
							<GithubLogoIcon size={48} weight="bold" />
						</a>
					</div>
				</div>
			</div>

		)
	}

	return (
		<>
			{ component }
		</>
	)


export default Footer
