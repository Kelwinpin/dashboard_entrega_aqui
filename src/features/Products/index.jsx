import Header from "@/components/header";
import services from "@/tools/services";
import { useQuery } from "@tanstack/react-query";
import FormProduct from "./FormProduct";
import { useState } from "react";
import { toast } from "react-toastify"
import Loader from "@/components/loader";
import ItemProduct from "./ItemProduct";

export default function Products() {
    const { data: products, isLoading: isLoadingProducts, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await services.get("/products");
            return response.data;
        },
    })

    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = async(values) => {
       values.amount = Number(values.amount);
       values.price = Number(values.price);
       const response = await services.post("/products", values);

       if (response.status === 200) {
           toast.success("Produto cadastrado com sucesso");
           setIsOpen(false);
           refetch();
       } else {
           toast.error("Erro ao cadastrar produto");
       }
    }
    
    return (
        isLoadingProducts ? <Loader /> :
        <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
           <Header entity="produto" search={() => {}} add={() => setIsOpen(true)} />
            {products && products.rows.map(product => <ItemProduct key={product.id} product={product} />)}
            {
                isOpen && <FormProduct onClose={() => setIsOpen(false)} entity="produto" onSubmit={onSubmit} />
            }
        </div>
    )
}