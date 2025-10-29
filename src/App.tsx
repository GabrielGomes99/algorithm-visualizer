import { useState } from 'react';
import AlgorithmVisualizations from './components/AlgorithmVisualizations';
import ArvoreDiagramas from './components/ArvoreDiagramas';
import { BookOpen, TreePine, Home } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderContent = () => {
    switch (currentView) {
      case 'basic':
        return <AlgorithmVisualizations />;
      case 'advanced':
        return <ArvoreDiagramas />;
      default:
        return <HomePage setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
      {/* Navigation */}
      {currentView !== 'home' && (
        <nav className="bg-white shadow-lg p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-800">Visualizador de Algoritmos</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all"
              >
                <Home size={18} />
                Início
              </button>
              <button
                onClick={() => setCurrentView('basic')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === 'basic'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <BookOpen size={18} />
                Básico
              </button>
              <button
                onClick={() => setCurrentView('advanced')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === 'advanced'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <TreePine size={18} />
                Avançado
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Content */}
      <div className={currentView === 'home' ? '' : 'p-6'}>
        {renderContent()}
      </div>
    </div>
  );
}

const HomePage = ({ setCurrentView }: { setCurrentView: (view: string) => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
          Visualizador de Algoritmos
        </h1>
        <p className="text-xl text-slate-600 mb-12">
          Explore complexidade computacional com visualizações interativas
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div
            onClick={() => setCurrentView('basic')}
            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 border-2 border-blue-200 hover:border-blue-400"
          >
            <div className="text-blue-600 mb-4">
              <BookOpen size={64} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Visualizações Básicas</h2>
            <p className="text-slate-600 mb-4">
              Compare algoritmos, entenda complexidades e veja exemplos práticos
            </p>
            <ul className="text-sm text-slate-500 space-y-1">
              <li>• Mesclagem O(n log n) vs O(n²)</li>
              <li>• Subconjuntos 2^n</li>
              <li>• Memoização vs Recursão</li>
              <li>• Tabela de Complexidades</li>
              <li>• Counting Sort O(n + k)</li>
            </ul>
          </div>

          <div
            onClick={() => setCurrentView('advanced')}
            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 border-2 border-purple-200 hover:border-purple-400"
          >
            <div className="text-purple-600 mb-4">
              <TreePine size={64} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Análise Profunda</h2>
            <p className="text-slate-600 mb-4">
              Árvores de recursão, heap step-by-step e aplicações reais
            </p>
            <ul className="text-sm text-slate-500 space-y-1">
              <li>• Árvore completa do Fibonacci</li>
              <li>• Heap mesclagem passo a passo</li>
              <li>• Árvore de decisão 2^n</li>
              <li>• Casos de uso no mundo real</li>
              <li>• Google, GPS, Criptografia</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
          <h3 className="text-lg font-bold text-orange-900 mb-2">🎯 O que você vai aprender:</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
            <div>
              <strong>Complexidade:</strong> Por que O(n²) é lento e O(n log n) é eficiente
            </div>
            <div>
              <strong>Otimização:</strong> Como memoização transforma O(2^n) em O(n)
            </div>
            <div>
              <strong>Aplicações:</strong> Onde esses algoritmos são usados na prática
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
