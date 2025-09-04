import { Link } from 'react-router-dom';

export function Home() {
  const categories = [
    { id: 1, name: 'Comida Pronta', path: '/comida-pronta' },
    { id: 2, name: 'Limpeza', path: '/limpeza' },
    { id: 3, name: 'Rápido e Prático', path: '/rapido-pratico' },
    { id: 4, name: 'Padaria', path: '/padaria' },
  ];

  return (
    <div className="container mx-auto px-4">
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold">Snack Mania</h1>
        <p className="text-gray-600">Sua comida universitária!</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(category => (
          <Link
            key={category.id}
            to={category.path}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{category.name}</h2>
          </Link>
        ))}
      </main>
    </div>
  );
}
