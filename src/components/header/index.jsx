import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Search, RefreshCw, Settings } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import useDebounce from "@/hooks/useDebounce"

export default function Header({ entity = "", add = () => {}, onChange = () => {}, isSearching = false, setItensPerPage = () => {} }) {
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef(null);

    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        onChange(debouncedSearchValue);
    }, [debouncedSearchValue, onChange]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const clearSearch = () => {
        setSearchValue("");
        inputRef.current?.focus();
    };

    return (
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
                <Settings className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                    Gerenciar {entity}s
                </h1>
                <select 
                    name="itensPerPage" 
                    id="itensPerPage" 
                    className="border border-blue-300 text-gray-600 py-1 px-2 rounded-lg"
                    onChange={(e) => setItensPerPage(e.target.value)}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {isSearching ? (
                            <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
                        ) : (
                            <Search className="h-4 w-4 text-gray-400" />
                        )}
                    </div>
                    <Input
                        ref={inputRef}
                        type="text"
                        placeholder={`Pesquisar ${entity}...`}
                        value={searchValue}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    />
                    {searchValue && (
                        <button
                            onClick={clearSearch}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                        >
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <Button 
                    onClick={add}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 whitespace-nowrap"
                >
                    <PlusCircle className="h-4 w-4" />
                    <span>Novo {entity}</span>
                </Button>
            </div>
        </header>
    );
};
