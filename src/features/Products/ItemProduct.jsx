import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { EllipsisVertical, Lock, Pencil, LockOpen, Package, DollarSign, Activity, PictureInPicture } from "lucide-react"

// Função simulada para formatPrice
const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

export default function ItemProduct({ 
    product = {
        id: 1,
        name: "Produto Exemplo",
        amount: 25,
        price: 199.99,
        deletedAt: null
    }, 
    edit = () => {}, 
    inactive = () => {}, 
    reactivate = () => {} 
}) {
    const getStatusStyles = () => {
        if (product.deletedAt) {
            return "bg-red-100 text-red-700 border border-red-200"
        } else {
            return "bg-green-100 text-green-700 border border-green-200"
        }
    }

    const getStockColor = () => {
        if (product.amount === 0) return "text-red-600"
        if (product.amount < 10) return "text-yellow-600"
        return "text-green-600"
    }

    return (
        <div className="bg-white rounded-xl border border-gray-400 shadow-md shadow-black hover:shadow-md transition-shadow duration-200 overflow-hidden">
            {/* Mobile Layout */}
            <div className="block md:hidden p-4 space-y-4">
                {/* Header com nome e menu */}
                <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {product.name}
                        </h3>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button 
                                variant="outline" 
                                size="sm"
                                className="ml-3 h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                            >
                                <EllipsisVertical className="h-4 w-4 text-gray-600" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-1" align="end">
                            <div className="space-y-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start gap-2 hover:bg-blue-50 hover:text-blue-700"
                                    onClick={() => edit(product)}
                                >
                                    <Pencil className="h-4 w-4" />
                                    Editar
                                </Button>
                                {!product.deletedAt ? (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start gap-2 hover:bg-red-50 hover:text-red-700"
                                        onClick={() => inactive(product.id)}
                                    >
                                        <Lock className="h-4 w-4" />
                                        Inativar
                                    </Button>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start gap-2 hover:bg-green-50 hover:text-green-700"
                                        onClick={() => reactivate(product.id)}
                                    >
                                        <LockOpen className="h-4 w-4" />
                                        Reativar
                                    </Button>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Status */}
                <div className="flex items-center">
                    <Activity className="h-4 w-4 text-gray-500 mr-2" />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
                        {product.deletedAt ? "Inativo" : "Ativo"}
                    </span>
                </div>

                {/* Informações em grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <div>
                            <p className="text-xs text-gray-500">Estoque</p>
                            <p className={`text-sm font-semibold ${getStockColor()}`}>
                                {product.amount} un.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <div>
                            <p className="text-xs text-gray-500">Preço</p>
                            <p className="text-sm font-semibold text-gray-900">
                                R$ {formatPrice(product.price)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150">
                 <div className="flex-1 min-w-0 pr-4">
                  {
                    product.image ? (
                      <div className="flex items-center justify-center">
                        <img src={product.image} alt="Produto" className="h-16 w-16 rounded-lg" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border border-solid border-gray-200 rounded-lg">
                        <PictureInPicture className="text-gray-700" />
                      </div>
                    )
                  }
                </div>
                
                {/* Nome do produto */}
                <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                        {product.name}
                    </h3>
                </div>

                {/* Status */}
                <div className="flex items-center justify-center w-24 px-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyles()}`}>
                        {product.deletedAt ? "Inativo" : "Ativo"}
                    </span>
                </div>

                {/* Estoque */}
                <div className="flex items-center justify-center w-24 px-2">
                    <div className="text-center">
                        <p className={`text-sm font-semibold ${getStockColor()}`}>
                            {product.amount}
                        </p>
                        <p className="text-xs text-gray-500">un.</p>
                    </div>
                </div>

                {/* Preço */}
                <div className="flex items-center justify-center w-32 px-2">
                    <div className="text-center">
                        <p className="text-sm font-semibold text-gray-900">
                            R$ {formatPrice(product.price)}
                        </p>
                    </div>
                </div>

                {/* Menu de ações */}
                <div className="flex items-center justify-end w-12">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 rounded-full hover:bg-gray-200"
                            >
                                <EllipsisVertical className="h-4 w-4 text-gray-600" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-1" align="end">
                            <div className="space-y-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start gap-2 hover:bg-blue-50 hover:text-blue-700"
                                    onClick={() => edit(product)}
                                >
                                    <Pencil className="h-4 w-4" />
                                    Editar
                                </Button>
                                {!product.deletedAt ? (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start gap-2 hover:bg-red-50 hover:text-red-700"
                                        onClick={() => inactive(product.id)}
                                    >
                                        <Lock className="h-4 w-4" />
                                        Inativar
                                    </Button>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start gap-2 hover:bg-green-50 hover:text-green-700"
                                        onClick={() => reactivate(product.id)}
                                    >
                                        <LockOpen className="h-4 w-4" />
                                        Reativar
                                    </Button>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}