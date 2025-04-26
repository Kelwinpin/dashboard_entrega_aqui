export default function ItemProduct({product}) {
    return (
        <div className="flex flex-row items-center justify-between gap-4 p-4 border-1 border-solid border-gray-600 rounded-md shadow-md shadow-black">
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-lg font-semibold">{product.name}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold">Estoque: {product.amount}</p>
                    <p className="text-sm font-semibold">Preço: {product.price}</p>
                </div>
            </div>
        </div>
    )
}