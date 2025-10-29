import React, { useState } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, Calculator, Briefcase, GitBranch, Zap } from 'lucide-react';

const ArvoreDiagramas = () => {
  const [algoritmoAtivo, setAlgoritmoAtivo] = useState('fibonacci');

  const algoritmos = [
    { id: 'fibonacci', nome: 'Árvore Fibonacci', icon: GitBranch },
    { id: 'merge', nome: 'Heap Mesclar', icon: Zap },
    { id: 'subconjuntos', nome: 'Árvore Subconjuntos', icon: GitBranch },
    { id: 'aplicacoes', nome: 'Aplicações Reais', icon: Briefcase },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            Análise Profunda de Algoritmos
          </h1>
          <p className="text-slate-600 text-lg">Visualize cada passo, cálculo e aplicação real</p>
        </div>

        {/* Navegação */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {algoritmos.map(alg => {
            const Icon = alg.icon;
            return (
              <button
                key={alg.id}
                onClick={() => setAlgoritmoAtivo(alg.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  algoritmoAtivo === alg.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:shadow-md'
                }`}
              >
                <Icon size={20} />
                {alg.nome}
              </button>
            );
          })}
        </div>

        {/* Conteúdo */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {algoritmoAtivo === 'fibonacci' && <ArvoreFibonacci />}
          {algoritmoAtivo === 'merge' && <HeapMesclagem />}
          {algoritmoAtivo === 'subconjuntos' && <ArvoreSubconjuntos />}
          {algoritmoAtivo === 'aplicacoes' && <AplicacoesReais />}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ÁRVORE FIBONACCI - Mostra recursão completa
// ============================================================
const ArvoreFibonacci = () => {
  const [n, setN] = useState(5);
  const [mostrarSemMemo, setMostrarSemMemo] = useState(true);

  // Gera árvore de chamadas recursivas
  const gerarArvore = (valor: number, memo: Record<number, boolean> = {}): any => {
    if (mostrarSemMemo || !memo[valor]) {
      memo[valor] = true;
      if (valor <= 1) {
        return { valor, chamadas: 1, filhos: [], memo: false };
      }
      const esquerda = gerarArvore(valor - 1, memo);
      const direita = gerarArvore(valor - 2, memo);
      return {
        valor,
        chamadas: 1 + esquerda.chamadas + direita.chamadas,
        filhos: [esquerda, direita],
        memo: false
      };
    }
    return { valor, chamadas: 1, filhos: [], memo: true };
  };

  const arvore = gerarArvore(n, mostrarSemMemo ? {} : {});

  const calcularFibonacci = (n: number) => {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  };

  const resultado = calcularFibonacci(n);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">
          Árvore de Recursão - Fibonacci({n})
        </h2>
        <p className="text-slate-600">Visualize TODAS as chamadas recursivas</p>
      </div>

      {/* Controles */}
      <div className="flex flex-col items-center gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
        <div className="flex items-center gap-4">
          <label className="font-semibold text-slate-700">Calcular Fibonacci de:</label>
          <input
            type="range"
            min="1"
            max="8"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            className="w-48"
          />
          <span className="text-2xl font-bold text-indigo-600 w-12">{n}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMostrarSemMemo(!mostrarSemMemo)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              mostrarSemMemo
                ? 'bg-red-500 text-white'
                : 'bg-green-500 text-white'
            }`}
          >
            {mostrarSemMemo ? '❌ SEM Memoização' : '✅ COM Memoização'}
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-300">
          <div className="text-sm text-blue-700 font-semibold mb-1">Resultado</div>
          <div className="text-3xl font-bold text-blue-900">fib({n}) = {resultado}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-300">
          <div className="text-sm text-purple-700 font-semibold mb-1">Total de Chamadas</div>
          <div className="text-3xl font-bold text-purple-900">{arvore.chamadas.toLocaleString()}</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border-2 border-pink-300">
          <div className="text-sm text-pink-700 font-semibold mb-1">Complexidade</div>
          <div className="text-2xl font-bold text-pink-900">
            {mostrarSemMemo ? `O(2^${n}) ≈ ${Math.pow(2, n)}` : `O(${n})`}
          </div>
        </div>
      </div>

      {/* Árvore Visual */}
      <div className="bg-slate-50 rounded-xl p-6 overflow-x-auto">
        <div className="text-center mb-4 font-semibold text-slate-700">
          Árvore de Chamadas Recursivas
        </div>
        <div className="flex justify-center">
          <NoFibonacci no={arvore} />
        </div>
      </div>

      {/* Análise Detalhada */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
        <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2">
          <Calculator size={24} />
          Cálculo Detalhado
        </h3>
        
        {mostrarSemMemo ? (
          <div className="space-y-3 text-slate-700">
            <p className="font-semibold text-red-700">⚠️ SEM Memoização - INEFICIENTE:</p>
            <div className="bg-white rounded-lg p-4 font-mono text-sm space-y-2">
              <p>fib({n}) chama:</p>
              <p className="ml-4">├─ fib({n-1}) → que chama fib({n-2}) e fib({n-3})</p>
              <p className="ml-4">└─ fib({n-2}) → que chama fib({n-3}) e fib({n-4})</p>
              <p className="ml-4 text-red-600 font-bold">⚠️ fib({n-2}) é calculado DUAS VEZES!</p>
              <p className="mt-3 border-t pt-3">Total de chamadas: <strong>{arvore.chamadas}</strong></p>
              <p>Cada nível duplica as chamadas → Crescimento exponencial!</p>
            </div>
            
            <div className="bg-red-100 border border-red-300 rounded-lg p-3 mt-3">
              <p className="font-bold text-red-800">Por que é tão lento?</p>
              <p className="text-sm">Para n=40: ~2.000.000.000 de chamadas (2 segundos)</p>
              <p className="text-sm">Para n=50: ~40.000.000.000 de chamadas (40 segundos!)</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-slate-700">
            <p className="font-semibold text-green-700">✅ COM Memoização - EFICIENTE:</p>
            <div className="bg-white rounded-lg p-4 font-mono text-sm space-y-2">
              <p>fib({n}) verifica cache:</p>
              <p className="ml-4">├─ Não está em cache → Calcular</p>
              <p className="ml-4">├─ fib({n-1}) → NÃO está em cache → Calcular</p>
              <p className="ml-4">├─ fib({n-2}) → NÃO está em cache → Calcular</p>
              <p className="ml-4">└─ fib({n-2}) novamente → ✅ JÁ está em cache!</p>
              <p className="ml-4 text-green-600 font-bold">✅ Retorna valor armazenado (instantâneo)</p>
              <p className="mt-3 border-t pt-3">Total de cálculos únicos: <strong>{n}</strong></p>
            </div>
            
            <div className="bg-green-100 border border-green-300 rounded-lg p-3 mt-3">
              <p className="font-bold text-green-800">Por que é tão rápido?</p>
              <p className="text-sm">Para n=40: apenas 40 cálculos (milissegundos)</p>
              <p className="text-sm">Para n=100: apenas 100 cálculos!</p>
              <p className="text-sm font-semibold mt-2">Economia: 2.000.000.000 → 40 chamadas!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NoFibonacci = ({ no, nivel = 0 }: { no: any; nivel?: number }) => {
  const cores = {
    0: 'from-blue-500 to-blue-600',
    1: 'from-green-500 to-green-600',
    default: no.memo ? 'from-purple-400 to-purple-500' : 'from-slate-400 to-slate-500'
  };

  const cor = no.valor <= 1 ? cores[no.valor as 0 | 1] : cores.default;

  return (
    <div className="flex flex-col items-center">
      <div className={`relative bg-gradient-to-br ${cor} text-white rounded-xl px-6 py-3 font-bold text-lg shadow-lg ${no.memo ? 'border-4 border-purple-600' : ''}`}>
        fib({no.valor})
        {no.memo && (
          <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
            cache
          </div>
        )}
      </div>
      
      {no.filhos.length > 0 && (
        <div className="flex gap-8 mt-4 pt-4 border-t-2 border-slate-300">
          {no.filhos.map((filho: any, idx: number) => (
            <NoFibonacci key={idx} no={filho} nivel={nivel + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================
// HEAP MESCLAGEM - Visualiza processo de mesclagem
// ============================================================
const HeapMesclagem = () => {
  const [passo, setPasso] = useState(0);
  
  const listas = [
    [1, 4, 7, 10],
    [2, 5, 8],
    [3, 6, 9]
  ];

  const passos = [
    {
      titulo: "Passo 0: Estado Inicial",
      heap: [[1, 0, 0], [2, 1, 0], [3, 2, 0]],
      resultado: [],
      descricao: "Inserimos o PRIMEIRO elemento de cada lista no heap"
    },
    {
      titulo: "Passo 1: Remover menor (1)",
      heap: [[2, 1, 0], [3, 2, 0], [4, 0, 1]],
      resultado: [1],
      descricao: "Removemos 1 (menor), adicionamos próximo da lista 0 → 4"
    },
    {
      titulo: "Passo 2: Remover menor (2)",
      heap: [[3, 2, 0], [4, 0, 1], [5, 1, 1]],
      resultado: [1, 2],
      descricao: "Removemos 2, adicionamos próximo da lista 1 → 5"
    },
    {
      titulo: "Passo 3: Remover menor (3)",
      heap: [[4, 0, 1], [5, 1, 1], [6, 2, 1]],
      resultado: [1, 2, 3],
      descricao: "Removemos 3, adicionamos próximo da lista 2 → 6"
    },
    {
      titulo: "Passo 4: Remover menor (4)",
      heap: [[5, 1, 1], [6, 2, 1], [7, 0, 2]],
      resultado: [1, 2, 3, 4],
      descricao: "Removemos 4, adicionamos próximo da lista 0 → 7"
    },
  ];

  const passoAtual = passos[passo] || passos[passos.length - 1];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">
          Heap - Mesclagem de K Listas
        </h2>
        <p className="text-slate-600">Acompanhe o processo passo a passo</p>
      </div>

      {/* Controles */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setPasso(Math.max(0, passo - 1))}
          disabled={passo === 0}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:bg-slate-300 hover:bg-indigo-600 transition-all"
        >
          ← Anterior
        </button>
        <button
          onClick={() => setPasso(0)}
          className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-all"
        >
          <RotateCcw size={20} />
        </button>
        <button
          onClick={() => setPasso(Math.min(passos.length - 1, passo + 1))}
          disabled={passo === passos.length - 1}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:bg-slate-300 hover:bg-indigo-600 transition-all"
        >
          Próximo →
        </button>
      </div>

      <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-4 text-center">
        <h3 className="text-xl font-bold text-indigo-900">{passoAtual.titulo}</h3>
        <p className="text-slate-700 mt-2">{passoAtual.descricao}</p>
      </div>

      {/* Visualização */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Listas Originais */}
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-4 text-center">Listas Originais</h3>
          <div className="space-y-3">
            {listas.map((lista, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 border-2 border-slate-200">
                <div className="text-sm text-slate-600 mb-2">Lista {idx}:</div>
                <div className="flex gap-2">
                  {lista.map((num, i) => (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                        passoAtual.heap.some(h => h[1] === idx && h[2] === i)
                          ? 'bg-yellow-300 border-2 border-yellow-500'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heap (Min-Heap) */}
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="font-bold text-purple-800 mb-4 text-center">Heap (Fila de Prioridade)</h3>
          <div className="space-y-3">
            {passoAtual.heap.map((elem, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-lg p-4 border-2 ${
                  idx === 0 ? 'border-green-500 bg-green-50' : 'border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-purple-900">{elem[0]}</div>
                  <div className="text-sm text-slate-600">
                    Lista {elem[1]}, Posição {elem[2]}
                  </div>
                </div>
                {idx === 0 && (
                  <div className="text-xs text-green-700 font-semibold mt-1">
                    ← MENOR (será removido)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resultado */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
        <h3 className="font-bold text-green-900 mb-4 text-center text-xl">
          Array Resultante (Ordenado)
        </h3>
        <div className="flex gap-2 justify-center flex-wrap">
          {passoAtual.resultado.map((num, idx) => (
            <div
              key={idx}
              className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-lg"
            >
              {num}
            </div>
          ))}
          {passoAtual.resultado.length === 0 && (
            <div className="text-slate-400 italic">Vazio</div>
          )}
        </div>
      </div>

      {/* Análise de Complexidade */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
        <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
          <Calculator size={24} />
          Análise de Complexidade
        </h3>
        <div className="space-y-3 text-slate-700">
          <div className="bg-white rounded-lg p-4">
            <p className="font-semibold text-blue-800 mb-2">Por que O(n log k)?</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>n</strong> = Total de elementos = {listas.flat().length}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>k</strong> = Número de listas = {listas.length}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Cada operação no heap (inserir/remover): <strong>O(log k)</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Fazemos isso <strong>n</strong> vezes (para cada elemento)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="font-bold">Total: n × log k = O(n log k)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-100 border border-green-300 rounded-lg p-3">
            <p className="font-bold text-green-800">Comparação:</p>
            <p className="text-sm mt-1">Mesclagem linear (errada): O(n²) = {Math.pow(listas.flat().length, 2)}</p>
            <p className="text-sm">Com Heap (correto): O(n log k) = {Math.round(listas.flat().length * Math.log2(listas.length))}</p>
            <p className="text-sm font-bold text-green-700 mt-2">
              Economia: {Math.round(Math.pow(listas.flat().length, 2) / (listas.flat().length * Math.log2(listas.length)))}x mais rápido!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ÁRVORE DE SUBCONJUNTOS
// ============================================================
const ArvoreSubconjuntos = () => {
  const conjunto = ['A', 'B', 'C'];
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">
          Árvore de Decisão - Subconjuntos
        </h2>
        <p className="text-slate-600">Cada nível: INCLUIR ou NÃO INCLUIR o elemento</p>
      </div>

      <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-300">
        <div className="text-center mb-6">
          <div className="inline-block bg-purple-600 text-white px-8 py-4 rounded-xl text-2xl font-bold">
            Conjunto: {'{' + conjunto.join(', ') + '}'}
          </div>
        </div>

        {/* Árvore de decisão visual */}
        <div className="bg-white rounded-xl p-8 overflow-x-auto">
          <div className="flex flex-col items-center space-y-8">
            {/* Nível 0 - Raiz */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
                { }
              </div>
              <div className="text-sm text-slate-600 mt-1">Início</div>
            </div>

            {/* Nível 1 - Decisão sobre A */}
            <div className="flex gap-32">
              <div className="flex flex-col items-center">
                <div className="text-xs text-red-600 font-bold mb-1">NÃO incluir A</div>
                <div className="bg-red-100 border-2 border-red-400 px-6 py-3 rounded-xl font-bold">
                  { }
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs text-green-600 font-bold mb-1">INCLUIR A</div>
                <div className="bg-green-100 border-2 border-green-400 px-6 py-3 rounded-xl font-bold">
                  {'{A}'}
                </div>
              </div>
            </div>

            {/* Nível 2 - Decisão sobre B */}
            <div className="flex gap-12">
              <div className="flex flex-col items-center">
                <div className="text-xs text-red-600 font-bold mb-1">NÃO B</div>
                <div className="bg-red-100 px-4 py-2 rounded-lg text-sm">{ }</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs text-green-600 font-bold mb-1">SIM B</div>
                <div className="bg-green-100 px-4 py-2 rounded-lg text-sm">{'{B}'}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs text-red-600 font-bold mb-1">NÃO B</div>
                <div className="bg-red-100 px-4 py-2 rounded-lg text-sm">{'{A}'}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs text-green-600 font-bold mb-1">SIM B</div>
                <div className="bg-green-100 px-4 py-2 rounded-lg text-sm">{'{A,B}'}</div>
              </div>
            </div>

            {/* Nível 3 - Decisão sobre C (8 folhas) */}
            <div className="flex gap-4 text-xs">
              <div className="bg-slate-100 px-3 py-2 rounded border border-slate-300">∅</div>
              <div className="bg-slate-100 px-3 py-2 rounded border border-slate-300">{'{C}'}</div>
              <div className="bg-slate-100 px-3 py-2 rounded border border-slate-300">{'{B}'}</div>
              <div className="bg-slate-100 px-3 py-2 rounded border border-slate-300">{'{B,C}'}</div>
              <div className="bg-slate-100 px-3 py-2 rounded border border-slate-300">{'{A}'}</div>
              <div className="bg-slate-100 px-3 py-2 rounded border border-slate-300">{'{A,C}'}</div>
              <div className="bg-slate-100 px-3 py-2 rounded border border-slate-300">{'{A,B}'}</div>
              <div className="bg-slate-100 px-3 py-2 rounded border border-slate-300">{'{A,B,C}'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fórmula e Cálculo */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
        <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2">
          <Calculator size={24} />
          Cálculo: Por que 2^n?
        </h3>
        <div className="space-y-3 text-slate-700">
          <div className="bg-white rounded-lg p-4 space-y-2">
            <p className="font-semibold">Para cada elemento, temos 2 escolhas:</p>
            <ul className="ml-4 space-y-1 text-sm">
              <li>✓ INCLUIR no subconjunto</li>
              <li>✗ NÃO INCLUIR no subconjunto</li>
            </ul>
            
            <div className="border-t pt-3 mt-3 font-mono text-sm space-y-1">
              <p>Elemento A: 2 escolhas</p>
              <p>Elemento B: 2 escolhas</p>
              <p>Elemento C: 2 escolhas</p>
              <p className="text-orange-600 font-bold text-base pt-2">Total: 2 × 2 × 2 = 2³ = 8 subconjuntos</p>
            </div>
          </div>

          <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
            <p className="font-bold text-orange-800">Crescimento Exponencial:</p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>n=3 → 2³ = 8</div>
              <div>n=10 → 2¹⁰ = 1.024</div>
              <div>n=20 → 2²⁰ = 1.048.576</div>
              <div>n=30 → 2³⁰ = 1.073.741.824</div>
            </div>
            <p className="text-xs mt-2 text-orange-700">⚠️ Limite prático: n ≤ 25</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// APLICAÇÕES REAIS
// ============================================================
const AplicacoesReais = () => {
  const aplicacoes = [
    {
      algoritmo: "Mesclagem de K Listas (Heap)",
      casos: [
        {
          titulo: "🔍 Sistema de Busca (Google, Elasticsearch)",
          descricao: "Cada servidor retorna resultados ordenados por relevância. Precisamos mesclar milhares de listas mantendo a ordem.",
          exemplo: "100 servidores, cada um com 1000 resultados = 100.000 resultados mesclados em O(n log k)",
          economia: "Sem heap: ~10 bilhões de comparações. Com heap: ~1,6 milhões"
        },
        {
          titulo: "📊 Análise de Logs Distribuídos",
          descricao: "Múltiplos servidores geram logs com timestamps. Mesclar em ordem cronológica para debugging.",
          exemplo: "10 servidores, 1 milhão de logs cada = 10 milhões ordenados",
          economia: "Reduz tempo de 100s para 1s"
        },
        {
          titulo: "💰 Sistemas Financeiros - Order Book",
          descricao: "Múltiplas exchanges com ordens de compra/venda ordenadas por preço",
          exemplo: "5 exchanges, agregando ordens em tempo real",
          economia: "Latência crítica: 1ms vs 100ms"
        }
      ]
    },
    {
      algoritmo: "Memoização (Programação Dinâmica)",
      casos: [
        {
          titulo: "🗺️ GPS / Waze - Cálculo de Rotas",
          descricao: "Calcular menor caminho entre A e B. Subproblemas se repetem (caminhos intermediários).",
          exemplo: "Dijkstra com DP para 1 milhão de vias",
          economia: "De horas para milissegundos"
        },
        {
          titulo: "🎮 Inteligência Artificial em Jogos",
          descricao: "Pathfinding A* memoiza estados visitados para não recalcular caminhos.",
          exemplo: "100 NPCs calculando rotas simultaneamente",
          economia: "60 FPS estável vs travamentos"
        },
        {
          titulo: "💼 Otimização de Carteira (Finanças)",
          descricao: "Problema da mochila 0/1 - selecionar ativos maximizando retorno com restrição de risco.",
          exemplo: "1000 ativos possíveis, escolher melhor combinação",
          economia: "De impossível (2^1000) para viável (1000²)"
        },
        {
          titulo: "🧬 Bioinformática - Alinhamento de Sequências",
          descricao: "Comparar DNA/proteínas usando algoritmo Needleman-Wunsch (DP).",
          exemplo: "Sequências de 10.000 bases",
          economia: "Possibilita análise em tempo real"
        }
      ]
    },
    {
      algoritmo: "Counting Sort",
      casos: [
        {
          titulo: "🖼️ Processamento de Imagens",
          descricao: "Ordenar pixels por intensidade (0-255) para histograma ou filtros.",
          exemplo: "Imagem 4K = 8 milhões de pixels",
          economia: "O(n) vs O(n log n): 100ms vs 500ms"
        },
        {
          titulo: "🗳️ Sistemas de Votação",
          descricao: "Contar votos por candidato (range pequeno).",
          exemplo: "10 milhões de votos, 10 candidatos",
          economia: "Resultado em segundos, não minutos"
        },
        {
          titulo: "📈 Análise de Dados Categóricos",
          descricao: "Ordenar dados por categoria (idade, score, rating).",
          exemplo: "1 milhão de usuários, idades 0-120",
          economia: "Queries de analytics instantâneas"
        }
      ]
    },
    {
      algoritmo: "Subconjuntos (2^n)",
      casos: [
        {
          titulo: "🔐 Criptografia - Geração de Chaves",
          descricao: "Testar combinações de bits para força bruta (sempre exponencial).",
          exemplo: "Chave 128 bits = 2^128 combinações",
          economia: "Por isso criptografia é segura!"
        },
        {
          titulo: "🎯 Machine Learning - Feature Selection",
          descricao: "Selecionar melhor subconjunto de features para modelo.",
          exemplo: "20 features → testar 1 milhão de combinações",
          economia: "Usa heurísticas para evitar força bruta"
        },
        {
          titulo: "📦 Problema da Mochila",
          descricao: "E-commerce: selecionar produtos para frete grátis sem exceder peso.",
          exemplo: "20 itens no carrinho",
          economia: "DP reduz 2^20 para 20×peso_max"
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">
          Aplicações no Mundo Real
        </h2>
        <p className="text-slate-600">Como esses algoritmos são usados em produção</p>
      </div>

      {aplicacoes.map((grupo, idx) => (
        <div key={idx} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-300">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Briefcase className="text-indigo-600" size={28} />
            {grupo.algoritmo}
          </h3>
          
          <div className="space-y-4">
            {grupo.casos.map((caso, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border-l-4 border-indigo-500">
                <h4 className="text-xl font-bold text-indigo-900 mb-2">{caso.titulo}</h4>
                <p className="text-slate-700 mb-3">{caso.descricao}</p>
                
                <div className="bg-blue-50 rounded-lg p-3 mb-2">
                  <p className="text-sm font-semibold text-blue-800">📌 Exemplo Prático:</p>
                  <p className="text-sm text-slate-700">{caso.exemplo}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-green-800">💰 Economia/Impacto:</p>
                  <p className="text-sm text-slate-700">{caso.economia}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Resumo de Quando Usar */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-purple-900 mb-4">🎯 Quando Usar Cada Algoritmo?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-bold text-indigo-900 mb-2">Heap (Mesclagem)</h4>
            <ul className="text-sm space-y-1 text-slate-700">
              <li>✓ Múltiplas fontes ordenadas</li>
              <li>✓ Dados em streaming</li>
              <li>✓ K &lt;&lt; N (poucas listas, muitos dados)</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-bold text-indigo-900 mb-2">Memoização</h4>
            <ul className="text-sm space-y-1 text-slate-700">
              <li>✓ Subproblemas se repetem</li>
              <li>✓ Recursão custosa</li>
              <li>✓ Espaço disponível para cache</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-bold text-indigo-900 mb-2">Counting Sort</h4>
            <ul className="text-sm space-y-1 text-slate-700">
              <li>✓ Range pequeno de valores</li>
              <li>✓ Valores inteiros</li>
              <li>✓ N grande, K pequeno</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-bold text-indigo-900 mb-2">Subconjuntos</h4>
            <ul className="text-sm space-y-1 text-slate-700">
              <li>✓ N ≤ 25 (viável)</li>
              <li>✓ Todas combinações necessárias</li>
              <li>✓ Otimizar com DP quando possível</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArvoreDiagramas;
