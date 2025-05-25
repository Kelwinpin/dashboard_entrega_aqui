import Header from "@/components/header";
import services from "@/tools/services";
import { useQuery } from "@tanstack/react-query";
import FormProduct from "./FormProduct";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import Loader from "@/components/loader";
import ItemProduct from "./ItemProduct";

export default function Products() {
    const entityName = "products";

    const { data: products, isLoading: isLoadingProducts, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await services.get("/products");
            return response.data;
        },
    })

    const [isOpen, setIsOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const onSubmit = async(values) => {
       values.amount = Number(values.amount);
       values.price = Number(values.price);
       const response = await services.post(`/${entityName}`, values);

       if (response.status === 200) {
           toast.success("Produto cadastrado com sucesso");
           setIsOpen(false);
           await refetch();
       } else {
           toast.error("Erro ao cadastrar produto");
       }
    }

    const onEditSubmit = async(values) => {
       values.amount = Number(values.amount);
       values.price = Number(values.price);
       const response = await services.put(`/${entityName}/${editProduct.id}`, values);

       if (response.status === 200) {
           toast.success("Produto editado com sucesso");
           setIsOpen(false);
           setEditProduct(null);
       } else {
           toast.error("Erro ao cadastrar produto");
       }
    }

    const edit = (product) => {
        setIsOpen(true);
        setEditProduct(product);
    }

    const handleDelete = async(id) => {
        const response = await services.delete(`/${entityName}/${id}`);

        if (response.status === 200) {
            toast.success("Produto inativo com sucesso");
            refetch();
        } else {
            toast.error("Erro ao inativar produto");
        }
    }

    const handleReactivate = async(id) => {
        const response = await services.put(`/${entityName}/reactive/${id}`);

        if (response.status === 200) {
            toast.success("Produto reativado com sucesso");
            refetch();
        } else {
            toast.error("Erro ao reativar produto");
        }
    }

    useEffect(() => {        
        refetch();
    },[isOpen, refetch]);
    
    return (
        isLoadingProducts ? <Loader /> :
        <div class="container mx-auto px-4 py-8">
           <Header entity="produto" search={() => {}} add={() => setIsOpen(true)} />

            <div class="space-y-4 mt-3">
                {products && products.rows.map(product => 
                    <ItemProduct 
                        key={product.id} 
                        product={product} 
                        edit={edit} 
                        inactive={() => handleDelete(product.id)} 
                        reactivate={() => handleReactivate(product.id)}
                    />
                )}
            </div>
            {
                isOpen && 
                <FormProduct 
                    onClose={() => {
                        setIsOpen(false); 
                        setEditProduct(null);
                    }} 
                    entity="produto" 
                    onSubmit={onSubmit} 
                    editProduct={editProduct} 
                    onEditSubmit={onEditSubmit} 
                />
            }
        </div>
    )
}