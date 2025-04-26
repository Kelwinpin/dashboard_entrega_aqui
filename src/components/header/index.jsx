import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SheetIcon, PlusCircle } from "lucide-react"

export default function Header({entity = "", search = () => {}}) {
    return (
       <header className="w-full flex flex-row items-center justify-between gap-3">
            <div className="flex flex-row items-center justify-between gap-1">
                <Input placeholder={`Pesquisar ${entity}`} className="w-full border-1 border-solid border-primary" />
                <Button className="bg-blue-900 text-white cursor-pointer hover:bg-blue-950" onClick={() => search()}>
                    <Search />
                </Button>
            </div>
            <div className="flex flex-row items-center justify-between gap-4">
                <Button className="bg-blue-900 text-white cursor-pointer hover:bg-blue-950">
                    Adicionar {entity}
                    <PlusCircle className="ml-1" />
                </Button>
                <Button className="bg-blue-900 text-white cursor-pointer hover:bg-blue-950">
                    Exportar {entity}s
                    <SheetIcon className="ml-1" />
                </Button>
            </div>
       </header>
    )
}