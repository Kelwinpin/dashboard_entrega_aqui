import Header from "@/components/header";
import services from "@/tools/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import FormProduct from "./FormProduct";
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify"
import ItemProduct from "./ItemProduct";
import { LoadingOverlay, useLoadingOverlay } from '@/hooks/useLoadingOverlay';
import { AlertCircle, RefreshCw, Search, PlusCircle, Package } from "lucide-react";


export default function Products() {
    const entityName = "products";
    const { isLoading: overlayLoading, showLoading, hideLoading } = useLoadingOverlay();
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [itensPerPage, setItensPerPage] = useState(10);

    const { 
        data: products, 
        isLoading: queryLoading, 
        isError, 
        error,
        refetch,
        isFetching 
    } = useQuery({
        queryKey: ["products", searchTerm],
        queryFn: async () => {
            const response = await services.get("/products", {
                name: searchTerm,
                page: 1,
                itensPerPage: itensPerPage,
            });
            return response.data;
        },
        staleTime: 30 * 1000,
        cacheTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: true,
        keepPreviousData: true,
    });

    useEffect(() => {
        refetch();
    }, [itensPerPage, refetch]);

    const handleSearchChange = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    const invalidateAndRefetch = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: ["products"] });
    }, [queryClient]);

    const handleSubmit = useCallback(async (values) => {
        try {
            showLoading();
            const processedValues = {
                ...values,
                amount: Number(values.amount),
                price: Number(values.price)
            };
            
            const response = await services.post(`/${entityName}`, processedValues);

            if (response.status === 200) {
                toast.success("Produto cadastrado com sucesso!");
                setIsOpen(false);
                await invalidateAndRefetch();
            } else {
                toast.error("Erro ao cadastrar produto");
            }
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            toast.error("Erro inesperado ao cadastrar produto");
        } finally {
            hideLoading();
        }
    }, [entityName, showLoading, hideLoading, invalidateAndRefetch]);

    const handleEditSubmit = useCallback(async (values) => {
        if (!editProduct) return;
        
        try {
            showLoading();
            const processedValues = {
                ...values,
                amount: Number(values.amount),
                price: Number(values.price)
            };
            
            const response = await services.put(`/${entityName}/${editProduct.id}`, processedValues);

            if (response.status === 200) {
                toast.success("Produto editado com sucesso!");
                setIsOpen(false);
                setEditProduct(null);
                await invalidateAndRefetch();
            } else {
                toast.error("Erro ao editar produto");
            }
        } catch (error) {
            console.error("Erro ao editar:", error);
            toast.error("Erro inesperado ao editar produto");
        } finally {
            hideLoading();
        }
    }, [editProduct, entityName, showLoading, hideLoading, invalidateAndRefetch]);

    const handleEdit = useCallback((product) => {
        setEditProduct(product);
        setIsOpen(true);
    }, []);

    const handleDelete = useCallback(async (id) => {
        try {
            showLoading();
            const response = await services.delete(`/${entityName}/${id}`);

            if (response.status === 200) {
                toast.success("Produto inativado com sucesso!");
                await invalidateAndRefetch();
            } else {
                toast.error("Erro ao inativar produto");
            }
        } catch (error) {
            console.error("Erro ao inativar:", error);
            toast.error("Erro inesperado ao inativar produto");
        } finally {
            hideLoading();
        }
    }, [entityName, showLoading, hideLoading, invalidateAndRefetch]);

    const handleReactivate = useCallback(async (id) => {
        try {
            showLoading();
            const response = await services.put(`/${entityName}/reactive/${id}`);

            if (response.status === 200) {
                toast.success("Produto reativado com sucesso!");
                await invalidateAndRefetch();
            } else {
                toast.error("Erro ao reativar produto");
            }
        } catch (error) {
            console.error("Erro ao reativar:", error);
            toast.error("Erro inesperado ao reativar produto");
        } finally {
            hideLoading();
        }
    }, [entityName, showLoading, hideLoading, invalidateAndRefetch]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setEditProduct(null);
    }, []);

    // Loading state
    const isLoading = queryLoading && !products;

    // Error handling
    if (isError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-lg font-semibold text-red-800 mb-2">
                        Erro ao carregar produtos
                    </h2>
                    <p className="text-red-600 mb-4">
                        {error?.message || "Ocorreu um erro inesperado"}
                    </p>
                    <Button onClick={() => refetch()} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Tentar novamente
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <Header 
                    entity="produto" 
                    onChange={handleSearchChange}
                    add={() => setIsOpen(true)}
                    isSearching={isFetching}
                    setItensPerPage={setItensPerPage}
                />
                
                {searchTerm && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                            <Search className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-blue-700 text-sm">
                                Resultados para: "<strong>{searchTerm}</strong>"
                            </span>
                            {isFetching && (
                                <RefreshCw className="animate-spin h-4 w-4 text-blue-600 ml-2" />
                            )}
                        </div>
                        <span className="text-blue-600 text-sm">
                            {products?.rows?.length || 0} produto(s) encontrado(s)
                        </span>
                    </div>
                )}

                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-20 bg-gray-200 rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {products?.rows?.length === 0 ? (
                            <div className="text-center py-12">
                                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {searchTerm ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    {searchTerm 
                                        ? `Não encontramos produtos para "${searchTerm}"`
                                        : "Comece adicionando seu primeiro produto"
                                    }
                                </p>
                                {!searchTerm && (
                                    <Button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                                        <PlusCircle className="h-4 w-4 mr-2" />
                                        Adicionar Produto
                                    </Button>
                                )}
                            </div>
                        ) : (
                            products.rows.map(product => (
                                <ItemProduct 
                                    key={product.id} 
                                    product={product} 
                                    edit={handleEdit} 
                                    inactive={handleDelete} 
                                    reactivate={handleReactivate}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
            
            <FormProduct 
                isOpen={isOpen}
                onClose={handleClose} 
                entity="produto" 
                onSubmit={handleSubmit} 
                editProduct={editProduct} 
                onEditSubmit={handleEditSubmit} 
            />

            <LoadingOverlay
                open={overlayLoading}
                onClose={hideLoading}
                text=""
                variant="dots"
                backdrop="default"
            />
        </>
    );
}