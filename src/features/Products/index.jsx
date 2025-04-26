import Header from "@/components/header";
import services from "@/tools/services";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
    const { data: products, isLoading: isLoadingProducts } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await services.get("/products");
            return response.data;
        },
    })
    
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
           <Header entity="produto" search={() => {}} />
        </div>
    )
}