import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import loginSchema from '../../tools/schemas/login'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MaskInput } from "@/components/inputs/maskInput"
import axios from "axios"
import { toast } from "react-toastify"

export default function Auth() {
    const form = useForm({
        resolver: zodResolver(loginSchema),
    })

    async function onSubmit(values) {
        values.cnpj = values.cnpj.replace(/\D/g, '');
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login/dashboard`, values).catch(error => {
            toast.error(`${error.response.data.error}`)
        })
        const data = response.data
        console.log(data)
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4 p-8 text-center border-2 border-solid border-primary rounded-md'>
            <h1 className='text-md font-bold'>
                Bem vindo ao Dashboard Entrega Aqui
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="cnpj"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CNPJ</FormLabel>
                                <FormControl>
                                    <MaskInput placeholder="CNPJ" dataMaska="000.000.000/0000-00" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="login"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Login</FormLabel>
                                <FormControl>
                                    <Input placeholder="Login" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input placeholder="Senha" type="password" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}