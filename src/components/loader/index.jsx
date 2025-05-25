export default function Loader() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
        <p className="text-center text-xl font-bold">Carregando...</p>
      </div>
    );
  }