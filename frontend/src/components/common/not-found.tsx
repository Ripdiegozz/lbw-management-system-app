import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Página No Encontrada</h2>
        <p className="text-xl text-gray-600 mb-8">Oops! La página que buscas no existe.</p>
        <Link to="/" className="px-6 py-3 text-white rounded-lg transition duration-300 ease-in-out bg-primary hover:bg-primary/80">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
