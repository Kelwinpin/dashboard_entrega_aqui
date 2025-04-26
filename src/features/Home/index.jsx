import home from "../../assets/home.svg"
import { storage } from "@/tools/storage"

export default function Home() {
    const company = storage.getDecodedToken().company;
    console.log("🚀 ~ Home ~ company:", company)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 text-center rounded-md bg-white items-center justify-center">
            <div>
                <h1 className="text-md font-medium">
                    Bem vindo ao Dashboard Entrega Aqui
                </h1>
                <p>
                   Olá {company.name}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 text-center rounded-md bg-white">
                <img src={home} alt="home" className="h-96 w-full" />   
            </div>
            <div>
                <h1 className="text-md font-medium">
                    Últimos pedidos
                </h1>
            </div>
            <div>
                <h1 className="text-md font-medium">
                    Últimos produtos cadastrados
                </h1>
            </div>
        </div>
    )
}