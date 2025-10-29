import React, { useState } from 'react';
import { ArrowRight, GitBranch, Layers, Zap, Database, TrendingUp, ListTree, Binary } from 'lucide-react';

const AlgorithmVisualizations = () => {
  const [activeTab, setActiveTab] = useState('merge');

  const tabs = [
    { id: 'merge', label: 'Mesclagem O(n log n)', icon: Layers },
    { id: 'subsets', label: 'Subconjuntos 2^n', icon: GitBranch },
    { id: 'memo', label: 'Memoização', icon: Database },
    { id: 'complexity', label: 'Complexidades', icon: TrendingUp },
    { id: 'counting', label: 'Counting Sort', icon: ListTree },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">
        Visualizações de Algoritmos
      </h1>
      <p className="text-center text-slate-600 mb-6">Explore conceitos com diagramas interativos</p>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-blue-50'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg p-6 shadow-inner min-h-96">
        {activeTab === 'merge' && <MergeVisualization />}
        {activeTab === 'subsets' && <SubsetsVisualization />}
        {activeTab === 'memo' && <MemoizationVisualization />}
        {activeTab === 'complexity' && <ComplexityTable />}
        {activeTab === 'counting' && <CountingSortVisualization />}
      </div>
    </div>
  );
};

const MergeVisualization = () => {
  const [method, setMethod] = useState('wrong');
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Mesclagem de K Listas Ordenadas</h2>
        <p className="text-slate-600">Compare a abordagem ERRADA vs CORRETA</p>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setMethod('wrong')}
          className={`px-6 py-2 rounded-lg transition-all ${
            method === 'wrong' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          ❌ Mesclagem Linear
        </button>
        <button
          onClick={() => setMethod('correct')}
          className={`px-6 py-2 rounded-lg transition-all ${
            method === 'correct' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          ✅ Com Heap (Fila Prioridade)
        </button>
      </div>

      {method === 'wrong' ? (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4">❌ Abordagem ERRADA - O(n²)</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded">Lista 1: [1, 4, 7]</div>
              <ArrowRight className="text-red-600" />
              <div className="bg-red-200 p-3 rounded font-bold">Mesclar</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded">Lista 2: [2, 5, 8]</div>
              <ArrowRight className="text-red-600" />
              <div className="bg-red-300 p-3 rounded font-bold">Mesclar novamente</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded">Lista 3: [3, 6, 9]</div>
              <ArrowRight className="text-red-600" />
              <div className="bg-red-400 p-3 rounded font-bold text-white">Mesclar de novo!</div>
            </div>
            <div className="bg-white p-4 rounded mt-4">
              <p className="font-semibold text-red-800">Problema:</p>
              <p className="text-slate-700">Cada mesclagem processa TODOS os elementos já mesclados</p>
              <p className="text-red-600 font-mono mt-2">n + 2n + 3n + ... = O(n²)</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">✅ Abordagem CORRETA - O(n log k)</h3>
          <div className="space-y-4">
            <div className="bg-green-100 p-4 rounded">
              <p className="font-bold text-green-800 mb-2">Fila de Prioridade (Heap):</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-2 rounded text-center border-2 border-green-400">
                  <div className="text-sm text-slate-600">Lista 1</div>
                  <div className="font-bold">1</div>
                </div>
                <div className="bg-white p-2 rounded text-center border-2 border-green-400">
                  <div className="text-sm text-slate-600">Lista 2</div>
                  <div className="font-bold">2</div>
                </div>
                <div className="bg-white p-2 rounded text-center border-2 border-green-400">
                  <div className="text-sm text-slate-600">Lista 3</div>
                  <div className="font-bold">3</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <ArrowRight className="text-green-600" size={32} />
            </div>

            <div className="bg-white p-4 rounded">
              <p className="font-semibold text-green-800 mb-2">Processo:</p>
              <ol className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</span>
                  <span>Remove menor elemento do heap (sempre O(log k))</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</span>
                  <span>Adiciona próximo elemento da mesma lista</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</span>
                  <span>Repete n vezes (total de elementos)</span>
                </li>
              </ol>
              <p className="text-green-600 font-mono mt-3 text-center text-lg">n × log k = O(n log k)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SubsetsVisualization = () => {
  const set = ['A', 'B', 'C'];
  const subsets = [
    [],
    ['A'],
    ['B'],
    ['C'],
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'C'],
    ['A', 'B', 'C']
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Subconjuntos: 2^n Combinações</h2>
        <p className="text-slate-600">Para conjunto {'{A, B, C}'} temos 2³ = 8 subconjuntos</p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
        <div className="text-center mb-4">
          <div className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg text-xl font-bold">
            Conjunto Original: {'{' + set.join(', ') + '}'}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mt-6">
          {subsets.map((subset, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-4 shadow-md border-2 border-purple-200 hover:border-purple-400 transition-all"
            >
              <div className="text-xs text-purple-600 font-semibold mb-2">Subconjunto {idx}</div>
              <div className="text-center font-mono">
                {'{' + (subset.length > 0 ? subset.join(', ') : '∅') + '}'}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-lg p-4">
          <h3 className="font-bold text-purple-800 mb-2">Fórmula:</h3>
          <div className="text-center text-2xl font-mono text-purple-600">
            2^n = 2^3 = 8 subconjuntos
          </div>
          <p className="text-slate-600 text-sm mt-2 text-center">
            Cada elemento pode estar PRESENTE ou AUSENTE (2 escolhas × n elementos)
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="font-semibold text-blue-800">💡 Aplicação Prática:</p>
        <p className="text-slate-700">Problema da Mochila, Problema do Caixeiro Viajante, Programação Dinâmica com Máscaras de Bits</p>
      </div>
    </div>
  );
};

const MemoizationVisualization = () => {
  const [showMemo, setShowMemo] = useState(true);

  const fibCalls = [
    { n: 5, calls: 15, color: 'bg-red-500' },
    { n: 10, calls: 177, color: 'bg-red-600' },
    { n: 15, calls: 1973, color: 'bg-red-700' },
    { n: 20, calls: 21891, color: 'bg-red-800' },
  ];

  const fibMemo = [
    { n: 5, calls: 5, color: 'bg-green-500' },
    { n: 10, calls: 10, color: 'bg-green-600' },
    { n: 15, calls: 15, color: 'bg-green-700' },
    { n: 20, calls: 20, color: 'bg-green-800' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Memoização: Evitar Recálculos</h2>
        <p className="text-slate-600">Exemplo com Fibonacci</p>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setShowMemo(false)}
          className={`px-6 py-2 rounded-lg transition-all ${
            !showMemo ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Sem Memoização
        </button>
        <button
          onClick={() => setShowMemo(true)}
          className={`px-6 py-2 rounded-lg transition-all ${
            showMemo ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Com Memoização
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`rounded-lg p-6 ${!showMemo ? 'bg-red-50 border-2 border-red-300' : 'bg-gray-50 opacity-50'}`}>
          <h3 className="text-xl font-bold text-red-800 mb-4">❌ Recursão Ingênua</h3>
          <pre className="bg-white p-4 rounded text-sm overflow-x-auto">
{`def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
    
# Muitos cálculos repetidos!`}
          </pre>
          
          <div className="mt-4 space-y-2">
            {fibCalls.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-16 font-mono text-sm">fib({item.n})</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div 
                    className={`${item.color} h-full flex items-center justify-end pr-2 text-white text-xs font-bold`}
                    style={{ width: `${Math.min((item.calls / 25000) * 100, 100)}%` }}
                  >
                    {item.calls.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-red-700 font-semibold mt-3 text-center">Complexidade: O(2^n)</p>
        </div>

        <div className={`rounded-lg p-6 ${showMemo ? 'bg-green-50 border-2 border-green-300' : 'bg-gray-50 opacity-50'}`}>
          <h3 className="text-xl font-bold text-green-800 mb-4">✅ Com Memoização</h3>
          <pre className="bg-white p-4 rounded text-sm overflow-x-auto">
{`cache = {}
def fib(n):
    if n in cache:
        return cache[n]
    if n <= 1:
        return n
    cache[n] = fib(n-1) + fib(n-2)
    return cache[n]`}
          </pre>
          
          <div className="mt-4 space-y-2">
            {fibMemo.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-16 font-mono text-sm">fib({item.n})</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div 
                    className={`${item.color} h-full flex items-center justify-end pr-2 text-white text-xs font-bold`}
                    style={{ width: `${(item.calls / 20) * 100}%` }}
                  >
                    {item.calls}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-green-700 font-semibold mt-3 text-center">Complexidade: O(n)</p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
        <p className="font-semibold text-yellow-800">🎯 Quando Usar:</p>
        <ul className="text-slate-700 space-y-1 mt-2">
          <li>• Subproblemas sobrepostos (mesmo cálculo várias vezes)</li>
          <li>• Recursão com chamadas repetidas</li>
          <li>• Programação Dinâmica</li>
        </ul>
      </div>
    </div>
  );
};

const ComplexityTable = () => {
  const complexities = [
    { name: 'Constante', notation: 'O(1)', example: 'Acesso a array por índice', color: 'bg-green-100', bar: 5 },
    { name: 'Logarítmica', notation: 'O(log n)', example: 'Busca binária', color: 'bg-green-200', bar: 15 },
    { name: 'Linear', notation: 'O(n)', example: 'Percorrer array', color: 'bg-yellow-100', bar: 30 },
    { name: 'Linearítmica', notation: 'O(n log n)', example: 'Merge Sort, Heap Sort', color: 'bg-yellow-200', bar: 45 },
    { name: 'Quadrática', notation: 'O(n²)', example: 'Bubble Sort, loops aninhados', color: 'bg-orange-200', bar: 60 },
    { name: 'Cúbica', notation: 'O(n³)', example: 'Multiplicação de matrizes', color: 'bg-orange-300', bar: 75 },
    { name: 'Exponencial', notation: 'O(2^n)', example: 'Subconjuntos, Fibonacci ingênuo', color: 'bg-red-300', bar: 90 },
    { name: 'Fatorial', notation: 'O(n!)', example: 'Todas permutações', color: 'bg-red-400', bar: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Tabela de Complexidades</h2>
        <p className="text-slate-600">Do mais rápido ao mais lento</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3 text-left">Notação</th>
              <th className="p-3 text-left">Exemplo</th>
              <th className="p-3 text-left">Velocidade Relativa</th>
            </tr>
          </thead>
          <tbody>
            {complexities.map((item, idx) => (
              <tr key={idx} className={`${item.color} border-b border-slate-300`}>
                <td className="p-3 font-semibold">{item.name}</td>
                <td className="p-3 font-mono text-lg">{item.notation}</td>
                <td className="p-3 text-sm">{item.example}</td>
                <td className="p-3">
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-full transition-all"
                      style={{ width: `${item.bar}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
          <h3 className="font-bold text-green-800 mb-2">✅ Eficientes (Usáveis)</h3>
          <p className="text-sm text-slate-700">O(1), O(log n), O(n), O(n log n)</p>
          <p className="text-xs text-slate-600 mt-1">Funcionam bem até para n = 1.000.000+</p>
        </div>
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
          <h3 className="font-bold text-red-800 mb-2">❌ Ineficientes (Cuidado!)</h3>
          <p className="text-sm text-slate-700">O(2^n), O(n!)</p>
          <p className="text-xs text-slate-600 mt-1">Inviáveis para n {'>'} 20-25</p>
        </div>
      </div>
    </div>
  );
};

const CountingSortVisualization = () => {
  const input = [4, 2, 2, 8, 3, 3, 1];
  const counts = { 1: 1, 2: 2, 3: 2, 4: 1, 8: 1 };
  const output = [1, 2, 2, 3, 3, 4, 8];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Counting Sort: O(n + k)</h2>
        <p className="text-slate-600">Ordenação linear quando k (range) é pequeno</p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h3 className="font-bold text-blue-800 mb-3">Passo 1: Array Original</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {input.map((num, idx) => (
              <div key={idx} className="bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
          <h3 className="font-bold text-purple-800 mb-3">Passo 2: Contar Frequências</h3>
          <div className="grid grid-cols-5 gap-3">
            {Object.entries(counts).map(([num, count]) => (
              <div key={num} className="bg-white rounded-lg p-3 border-2 border-purple-200 text-center">
                <div className="text-2xl font-bold text-purple-600">{num}</div>
                <div className="text-sm text-slate-600">aparece</div>
                <div className="text-xl font-bold text-purple-800">{count}×</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
          <h3 className="font-bold text-green-800 mb-3">Passo 3: Reconstruir Ordenado</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {output.map((num, idx) => (
              <div key={idx} className="bg-green-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border-2 border-slate-300">
        <h3 className="font-bold text-slate-800 mb-2">Complexidade:</h3>
        <div className="text-center text-xl font-mono text-slate-700 mb-2">
          O(n + k)
        </div>
        <div className="text-sm text-slate-600 space-y-1">
          <p><strong>n</strong> = tamanho do array = {input.length}</p>
          <p><strong>k</strong> = range de valores (max - min) = {Math.max(...input) - Math.min(...input)}</p>
          <p className="text-green-700 font-semibold mt-2">✅ Melhor que O(n log n) quando k é pequeno!</p>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizations;
