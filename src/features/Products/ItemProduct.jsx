import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { EllipsisVertical, Lock, Pencil, LockOpen } from "lucide-react"

export default function ItemProduct({product}) {
    return (
        <div class="bg-white p-4 rounded-lg md:flex justify-between gap-4 md:items-center border border-solid border-gray-300 shadow-md shadow-black">
            <div class="flex flex-col md:flex-row md:items-center w-full md:w-4/12 my-3 md:my-0">
                <p className="text-lg font-semibold">{product.name}</p>
            </div>
            <div class="flex items-center gap-2 w-full md:w-2/12 my-3 md:my-0">
                <p className="text-sm font-semibold">Estoque: {product.amount}</p>
            </div>
            <div class="flex items-center gap-2 w-full md:w-2/12 my-3 md:my-0">
                <p className="text-sm font-semibold">Preço: {product.amount}</p>
            </div>
            <div class="flex justify-end md:pr-3 w-full md:w-1/12 my-3 md:my-0">
                <Popover>
                    <PopoverTrigger as-child>
                        <Button class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
                            <EllipsisVertical className="text-gray-700" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-56 mr-3 p-0 m-0">
                        <ul class="p-0 m-0 bg-white">
                            <li className="hover:bg-gray-300 cursor-pointer">
                                <Button
                                    class="flex items-center space-x-3 p-3 cursor-pointer"
                                >
                                    <Pencil className="text-gray-400" />
                                    <div class="text-sm font-medium text-gray-700">Editar</div>
                                </Button>
                                <hr class="border-gray-300" />
                            </li>
                            <li className="hover:bg-gray-300 cursor-pointer">
                                <Button
                                    class="flex items-center space-x-3 p-3 cursor-pointer"
                                >
                                    <Lock className="text-gray-400" />
                                    <div class="text-sm font-medium text-gray-700">Inativar</div>
                                </Button>
                                <hr class="border-gray-300" />
                            </li>
                            <li className="hover:bg-gray-300 cursor-pointer">
                                <Button
                                    class="flex items-center space-x-3 p-3 cursor-pointer"
                                >
                                    <LockOpen className="text-gray-400" />
                                    <div class="text-sm font-medium text-gray-700">Reativar</div>
                                </Button>
                                <hr class="border-gray-300" />
                            </li>
                        </ul>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}