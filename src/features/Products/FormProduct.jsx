import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from "react-hook-form"
import productSchema from "../../tools/schemas/product"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { MaskInput } from '@/components/inputs/maskInput'
import Dropzone from '@/components/dropzone'

export default function FormProduct({onClose = () => {}, onSubmit = () => {}, entity, editProduct, onEditSubmit = () => {}, isOpen = false}) {
    const form = useForm({
        resolver: zodResolver(productSchema),
    })

    const initialValues = editProduct ? editProduct : {};
    
    if (initialValues) {        
        Object.keys(initialValues).forEach(key => {
            if (key === "amount" || key === "price") {
                form.setValue(key, String(initialValues[key]));
            } else {
                form.setValue(key, initialValues[key]);
            }
        })
    }

    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-opacity-80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />
            
            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Formulário de {entity}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(editProduct ? onEditSubmit : onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Nome" 
                                                    className="border border-solid border-primary" 
                                                    {...field} 
                                                />
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
                                                <MaskInput 
                                                    placeholder="Estoque" 
                                                    dataMaska='000' 
                                                    className="border-2 border-solid" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
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
                                                <MaskInput 
                                                    placeholder="Preço" 
                                                    money 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />  
                                <Controller
                                    name="image"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Dropzone
                                            onFilesChange={(files) => {                                                
                                                field.onChange(files);
                                                form.setValue('image', files, { shouldValidate: true });
                                            }}
                                            maxFiles={1}
                                            maxSize={10 * 1024 * 1024}
                                        />
                                    )}
                                />
                            </form>
                        </Form>
                    </div>

                    {/* Footer with buttons */}
                    <div className="border-t border-gray-200 p-6">
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                onClick={onClose}
                                type="button"
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                type="submit"
                                onClick={form.handleSubmit(editProduct ? onEditSubmit : onSubmit)}
                            >
                                {editProduct ? "Salvar" : "Adicionar"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}