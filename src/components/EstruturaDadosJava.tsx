import { useState } from 'react';
import { Code, Play, Plus, Minus, Search, TreePine, List } from 'lucide-react';

const EstruturaDadosJava = () => {
  const [activeTab, setActiveTab] = useState('arrays');

  const tabs = [
    { id: 'arrays', label: 'Arrays', icon: List },
    { id: 'arvore', label: 'Árvore Binária', icon: TreePine },
    { id: 'recursao', label: 'Recursão', icon: Code },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-2 text-emerald-800">
        Estruturas de Dados em Java
      </h1>
      <p className="text-center text-emerald-600 mb-6">Visualizações interativas com código Java</p>
      
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
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-emerald-700 hover:bg-emerald-50'
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
        {activeTab === 'arrays' && <ArrayVisualization />}
        {activeTab === 'arvore' && <ArvoreBinariaVisualization />}
        {activeTab === 'recursao' && <RecursaoVisualization />}
      </div>
    </div>
  );
};

// ============================================================
// ARRAYS - Operações básicas
// ============================================================
const ArrayVisualization = () => {
  const [array, setArray] = useState([10, 25, 3, 47, 8, 15]);
  const [busca, setBusca] = useState(25);
  const [novoElemento, setNovoElemento] = useState(99);
  const [operacao, setOperacao] = useState('');

  const buscarElemento = () => {
    setOperacao('busca');
    setTimeout(() => setOperacao(''), 2000);
  };

  const adicionarElemento = () => {
    setArray([...array, novoElemento]);
    setOperacao('adicionar');
    setTimeout(() => setOperacao(''), 1000);
  };

  const removerElemento = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
    setOperacao('remover');
    setTimeout(() => setOperacao(''), 1000);
  };

  const ordenarArray = () => {
    setArray([...array].sort((a, b) => a - b));
    setOperacao('ordenar');
    setTimeout(() => setOperacao(''), 2000);
  };

  const encontrado = array.indexOf(busca);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Arrays em Java</h2>
        <p className="text-emerald-600">Operações fundamentais com arrays</p>
      </div>

      {/* Código Java */}
      <div className="bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
        <div className="text-yellow-400 mb-2">// Declaração e inicialização</div>
        <div>int[] array = {'{' + array.join(', ') + '};'}</div>
        <div className="mt-2 text-yellow-400">// Operações</div>
        <div>array.length; // Tamanho: {array.length}</div>
        <div>Arrays.sort(array); // Ordenação</div>
        <div>Arrays.binarySearch(array, valor); // Busca</div>
      </div>

      {/* Controles */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-4 rounded-lg">
          <h3 className="font-bold text-emerald-800 mb-3">Buscar Elemento</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              value={busca}
              onChange={(e) => setBusca(Number(e.target.value))}
              className="flex-1 px-3 py-2 border rounded-lg"
              placeholder="Valor a buscar"
            />
            <button
              onClick={buscarElemento}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Search size={16} />
              Buscar
            </button>
          </div>
          {operacao === 'busca' && (
            <div className={`text-sm font-semibold ${encontrado >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {encontrado >= 0 ? `Encontrado no índice ${encontrado}` : 'Elemento não encontrado'}
            </div>
          )}
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg">
          <h3 className="font-bold text-emerald-800 mb-3">Adicionar Elemento</h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={novoElemento}
              onChange={(e) => setNovoElemento(Number(e.target.value))}
              className="flex-1 px-3 py-2 border rounded-lg"
              placeholder="Novo elemento"
            />
            <button
              onClick={adicionarElemento}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
            >
              <Plus size={16} />
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Visualização do Array */}
      <div className="bg-slate-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">Array Atual</h3>
          <button
            onClick={ordenarArray}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Ordenar
          </button>
        </div>
        
        <div className="flex gap-2 flex-wrap justify-center">
          {array.map((valor, index) => (
            <div key={index} className="relative group">
              <div
                className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-bold text-lg shadow-md transition-all ${
                  operacao === 'busca' && index === encontrado
                    ? 'bg-yellow-300 border-2 border-yellow-500 animate-pulse'
                    : operacao === 'adicionar' && index === array.length - 1
                    ? 'bg-green-300 border-2 border-green-500'
                    : 'bg-blue-100 border-2 border-blue-300 hover:bg-blue-200'
                }`}
              >
                <div className="text-xs text-slate-600">[{index}]</div>
                <div className="text-blue-800">{valor}</div>
              </div>
              <button
                onClick={() => removerElemento(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Minus size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-slate-600">
          Tamanho: {array.length} | Clique no X para remover elementos
        </div>
      </div>

      {/* Complexidades */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <h3 className="font-bold text-blue-800 mb-2">Complexidades em Java</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Acesso por índice:</strong> O(1)<br/>
            <strong>Busca linear:</strong> O(n)<br/>
            <strong>Busca binária:</strong> O(log n)
          </div>
          <div>
            <strong>Inserção no final:</strong> O(1)<br/>
            <strong>Remoção:</strong> O(n)<br/>
            <strong>Ordenação:</strong> O(n log n)
          </div>
        </div>
      </div>
    </div>
  );
};


// ============================================================
// ÁRVORE BINÁRIA - Estrutura hierárquica
// ============================================================
const ArvoreBinariaVisualization = () => {
  const [arvore, setArvore] = useState<any>({
    valor: 50,
    esquerda: {
      valor: 30,
      esquerda: { valor: 20, esquerda: null, direita: null },
      direita: { valor: 40, esquerda: null, direita: null }
    },
    direita: {
      valor: 70,
      esquerda: { valor: 60, esquerda: null, direita: null },
      direita: { valor: 80, esquerda: null, direita: null }
    }
  });
  
  const [novoValor, setNovoValor] = useState(25);
  const [buscarValor, setBuscarValor] = useState(40);
  const [caminhoPercorrido, setCaminhoPercorrido] = useState<number[]>([]);

  const inserirNo = (no: any, valor: number): any => {
    if (!no) return { valor, esquerda: null, direita: null };
    
    if (valor < no.valor) {
      no.esquerda = inserirNo(no.esquerda, valor);
    } else if (valor > no.valor) {
      no.direita = inserirNo(no.direita, valor);
    }
    return no;
  };

  const buscarNo = (no: any, valor: number, caminho: number[] = []): boolean => {
    if (!no) return false;
    
    caminho.push(no.valor);
    
    if (no.valor === valor) {
      setCaminhoPercorrido([...caminho]);
      return true;
    }
    
    if (valor < no.valor) {
      return buscarNo(no.esquerda, valor, caminho);
    } else {
      return buscarNo(no.direita, valor, caminho);
    }
  };

  const adicionarElemento = () => {
    const novaArvore = { ...arvore };
    inserirNo(novaArvore, novoValor);
    setArvore(novaArvore);
  };

  const buscarElemento = () => {
    setCaminhoPercorrido([]);
    buscarNo(arvore, buscarValor);
    setTimeout(() => {
      setCaminhoPercorrido([]);
    }, 3000);
  };

  const percorrerEmOrdem = (no: any, resultado: number[] = []): number[] => {
    if (!no) return resultado;
    
    percorrerEmOrdem(no.esquerda, resultado);
    resultado.push(no.valor);
    percorrerEmOrdem(no.direita, resultado);
    
    return resultado;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Árvore Binária de Busca</h2>
        <p className="text-emerald-600">Estrutura hierárquica ordenada</p>
      </div>

      {/* Código Java */}
      <div className="bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
        <div className="text-yellow-400 mb-2">// Classe Nó</div>
        <div>class No {'{'}</div>
        <div>    int valor;</div>
        <div>    No esquerda, direita;</div>
        <div>{'}'}</div>
        <div className="mt-2 text-yellow-400">// Inserção</div>
        <div>public No inserir(No raiz, int valor) {'{'}</div>
        <div>    if (raiz == null) return new No(valor);</div>
        <div>    if (valor {'<'} raiz.valor)</div>
        <div>        raiz.esquerda = inserir(raiz.esquerda, valor);</div>
        <div>    else raiz.direita = inserir(raiz.direita, valor);</div>
        <div>    return raiz;</div>
        <div>{'}'}</div>
      </div>

      {/* Controles */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-4 rounded-lg">
          <h3 className="font-bold text-emerald-800 mb-3">Inserir Elemento</h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={novoValor}
              onChange={(e) => setNovoValor(Number(e.target.value))}
              className="flex-1 px-3 py-2 border rounded-lg"
              placeholder="Valor a inserir"
            />
            <button
              onClick={adicionarElemento}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
            >
              <Plus size={16} />
              Inserir
            </button>
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg">
          <h3 className="font-bold text-emerald-800 mb-3">Buscar Elemento</h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={buscarValor}
              onChange={(e) => setBuscarValor(Number(e.target.value))}
              className="flex-1 px-3 py-2 border rounded-lg"
              placeholder="Valor a buscar"
            />
            <button
              onClick={buscarElemento}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Search size={16} />
              Buscar
            </button>
          </div>
          {caminhoPercorrido.length > 0 && (
            <div className="mt-2 text-sm">
              <strong>Caminho:</strong> {caminhoPercorrido.join(' → ')}
            </div>
          )}
        </div>
      </div>

      {/* Visualização da Árvore */}
      <div className="bg-slate-50 p-6 rounded-lg overflow-x-auto">
        <h3 className="font-bold text-slate-800 mb-4 text-center">Estrutura da Árvore</h3>
        <div className="flex justify-center">
          <NoArvore no={arvore} caminhoPercorrido={caminhoPercorrido} />
        </div>
      </div>

      {/* Percursos */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <h3 className="font-bold text-blue-800 mb-2">Percurso Em Ordem (Ordenado)</h3>
        <div className="font-mono text-lg">
          [{percorrerEmOrdem(arvore).join(', ')}]
        </div>
        <p className="text-sm text-slate-600 mt-2">
          Complexidade: Inserção/Busca O(log n) no melhor caso, O(n) no pior caso
        </p>
      </div>
    </div>
  );
};

const NoArvore = ({ no, caminhoPercorrido, nivel = 0 }: { no: any; caminhoPercorrido: number[]; nivel?: number }) => {
  if (!no) return null;

  const estaNoCaminho = caminhoPercorrido.includes(no.valor);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
          estaNoCaminho
            ? 'bg-yellow-500 border-4 border-yellow-600 animate-pulse'
            : 'bg-emerald-500 border-2 border-emerald-600'
        }`}
      >
        {no.valor}
      </div>
      
      {(no.esquerda || no.direita) && (
        <div className="flex gap-8 mt-4 pt-4">
          <div className="flex flex-col items-center">
            {no.esquerda && (
              <>
                <div className="w-px h-4 bg-slate-400"></div>
                <NoArvore no={no.esquerda} caminhoPercorrido={caminhoPercorrido} nivel={nivel + 1} />
              </>
            )}
          </div>
          <div className="flex flex-col items-center">
            {no.direita && (
              <>
                <div className="w-px h-4 bg-slate-400"></div>
                <NoArvore no={no.direita} caminhoPercorrido={caminhoPercorrido} nivel={nivel + 1} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// RECURSÃO - Exemplos clássicos
// ============================================================
const RecursaoVisualization = () => {
  const [n, setN] = useState(5);
  const [algoritmo, setAlgoritmo] = useState('fatorial');
  const [passos, setPassos] = useState<string[]>([]);
  const [executando, setExecutando] = useState(false);

  const calcularFatorial = (num: number, chamadas: string[] = []): number => {
    chamadas.push(`fatorial(${num})`);
    
    if (num <= 1) {
      chamadas.push(`→ caso base: fatorial(${num}) = 1`);
      return 1;
    }
    
    const resultado = num * calcularFatorial(num - 1, chamadas);
    chamadas.push(`→ fatorial(${num}) = ${num} * fatorial(${num - 1}) = ${resultado}`);
    return resultado;
  };

  const calcularFibonacci = (num: number, chamadas: string[] = []): number => {
    chamadas.push(`fibonacci(${num})`);
    
    if (num <= 1) {
      chamadas.push(`→ caso base: fibonacci(${num}) = ${num}`);
      return num;
    }
    
    const resultado = calcularFibonacci(num - 1, chamadas) + calcularFibonacci(num - 2, chamadas);
    chamadas.push(`→ fibonacci(${num}) = fibonacci(${num - 1}) + fibonacci(${num - 2}) = ${resultado}`);
    return resultado;
  };

  const calcularPotencia = (base: number, exp: number, chamadas: string[] = []): number => {
    chamadas.push(`potencia(${base}, ${exp})`);
    
    if (exp === 0) {
      chamadas.push(`→ caso base: potencia(${base}, 0) = 1`);
      return 1;
    }
    
    const resultado = base * calcularPotencia(base, exp - 1, chamadas);
    chamadas.push(`→ potencia(${base}, ${exp}) = ${base} * potencia(${base}, ${exp - 1}) = ${resultado}`);
    return resultado;
  };

  const executarAlgoritmo = () => {
    setExecutando(true);
    const novasChamadas: string[] = [];
    
    switch (algoritmo) {
      case 'fatorial':
        calcularFatorial(n, novasChamadas);
        break;
      case 'fibonacci':
        calcularFibonacci(Math.min(n, 8), novasChamadas); // Limitar para evitar muitas chamadas
        break;
      case 'potencia':
        calcularPotencia(2, n, novasChamadas);
        break;
    }
    
    setPassos(novasChamadas);
    setExecutando(false);
  };

  const getCodigoJava = () => {
    switch (algoritmo) {
      case 'fatorial':
        return `public static int fatorial(int n) {
    if (n <= 1) return 1;
    return n * fatorial(n - 1);
}`;
      case 'fibonacci':
        return `public static int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`;
      case 'potencia':
        return `public static int potencia(int base, int exp) {
    if (exp == 0) return 1;
    return base * potencia(base, exp - 1);
}`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Recursão em Java</h2>
        <p className="text-emerald-600">Visualize as chamadas recursivas</p>
      </div>

      {/* Seleção de Algoritmo */}
      <div className="flex gap-2 justify-center flex-wrap">
        {[
          { id: 'fatorial', label: 'Fatorial' },
          { id: 'fibonacci', label: 'Fibonacci' },
          { id: 'potencia', label: 'Potência' }
        ].map(alg => (
          <button
            key={alg.id}
            onClick={() => setAlgoritmo(alg.id)}
            className={`px-4 py-2 rounded-lg transition-all ${
              algoritmo === alg.id
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            }`}
          >
            {alg.label}
          </button>
        ))}
      </div>

      {/* Código Java */}
      <div className="bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
        <div className="text-yellow-400 mb-2">// Método recursivo - {algoritmo}</div>
        <pre>{getCodigoJava()}</pre>
      </div>

      {/* Controles */}
      <div className="bg-emerald-50 p-4 rounded-lg">
        <div className="flex items-center gap-4 justify-center">
          <label className="font-semibold text-emerald-800">
            {algoritmo === 'potencia' ? 'Expoente:' : 'Valor de n:'}
          </label>
          <input
            type="range"
            min="1"
            max={algoritmo === 'fibonacci' ? "8" : "10"}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-xl font-bold text-emerald-600 w-8">{n}</span>
          <button
            onClick={executarAlgoritmo}
            disabled={executando}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Play size={16} />
            {executando ? 'Executando...' : 'Executar'}
          </button>
        </div>
      </div>

      {/* Visualização das Chamadas */}
      {passos.length > 0 && (
        <div className="bg-slate-50 p-6 rounded-lg">
          <h3 className="font-bold text-slate-800 mb-4">Rastreamento das Chamadas</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {passos.map((passo, index) => (
              <div
                key={index}
                className={`p-2 rounded font-mono text-sm ${
                  passo.includes('→')
                    ? 'bg-green-100 text-green-800 ml-4'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {passo}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-slate-600">
            Total de chamadas: {passos.filter(p => !p.includes('→')).length}
          </div>
        </div>
      )}

      {/* Complexidades */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-bold text-blue-800 mb-2">Fatorial</h3>
          <p className="text-sm">Complexidade: O(n)</p>
          <p className="text-sm">Espaço: O(n)</p>
          <p className="text-xs text-slate-600">Linear - cada número usado uma vez</p>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <h3 className="font-bold text-red-800 mb-2">Fibonacci</h3>
          <p className="text-sm">Complexidade: O(2^n)</p>
          <p className="text-sm">Espaço: O(n)</p>
          <p className="text-xs text-slate-600">Exponencial - muitas chamadas repetidas</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <h3 className="font-bold text-green-800 mb-2">Potência</h3>
          <p className="text-sm">Complexidade: O(n)</p>
          <p className="text-sm">Espaço: O(n)</p>
          <p className="text-xs text-slate-600">Linear - pode ser otimizada para O(log n)</p>
        </div>
      </div>
    </div>
  );
};

export default EstruturaDadosJava;
