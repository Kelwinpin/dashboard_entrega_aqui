import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import productSchema from "../../tools/schemas/product"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { MaskInput } from '@/components/inputs/maskInput'

export default function FormProduct({onClose = () => {}, onSubmit = () => {}, entity}) {
    const form = useForm({
        resolver: zodResolver(productSchema),
    })

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
                <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full">
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <p className="text-lg font-semibold">Formulário de {entity}</p>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nome" className="border border-solid border-primary" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estoque</FormLabel>
                                            <FormControl>
                                                <MaskInput placeholder="Estoque" dataMaska='000' className="border-2 border-solid" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Preço</FormLabel>
                                            <FormControl>
                                                <MaskInput placeholder="Preço" money {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-center items-center gap-12">
                                    <button
                                        className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-900"
                                        onClick={() => onClose()}
                                    >
                                        Fechar
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-900"
                                        type='submit'
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}