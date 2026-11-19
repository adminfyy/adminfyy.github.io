<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import {
  createArithModule,
  createFibModule,
  createPrimeModule,
  createMatrixModule,
  fibJS,
  sumPrimesJS,
  matrixMulJS,
  createMatrix,
  benchmark,
  hexDump,
  ARITH_WAT,
  FIB_WAT,
  PRIME_WAT,
  MATRIX_WAT,
} from "@/utils/wasm";
import type {
  WasmArithModule,
  WasmFibModule,
  WasmPrimeModule,
  WasmMatrixModule,
  BenchmarkResult,
} from "@/utils/wasm";

const lessonLinks = [
  { id: "what", label: "1. WASM 是什么" },
  { id: "binary", label: "2. 二进制结构" },
  { id: "wat", label: "3. WAT 语法" },
  { id: "call", label: "4. JS 调用" },
  { id: "memory", label: "5. 线性内存" },
  { id: "bench", label: "6. 性能实验" },
  { id: "pitfalls", label: "7. 常见坑" },
  { id: "practice", label: "8. 练习" },
];

const binarySections = [
  {
    area: "Magic",
    bytes: "00 61 73 6D",
    desc: "固定魔数，对应字符 \\0asm，用来标识这是一个 WASM 模块。",
  },
  {
    area: "Version",
    bytes: "01 00 00 00",
    desc: "版本号小端序存储，当前稳定版本为 1。",
  },
  {
    area: "Type",
    bytes: "01 07 01 60 02 7F 7F 01 7F",
    desc: "声明函数签名：(i32, i32) -> i32，后面的函数都复用这个类型。",
  },
  {
    area: "Function",
    bytes: "03 04 03 00 00 00",
    desc: "声明 3 个函数，类型索引都是 0，即共用上面的签名。",
  },
  {
    area: "Export",
    bytes: "07 13 03 …",
    desc: "把三个函数导出为 add / sub / mul，JS 通过 instance.exports 访问。",
  },
  {
    area: "Code",
    bytes: "0A 19 03 …",
    desc: "函数体字节码：local.get、i32.add 等指令，决定了实际执行逻辑。",
  },
];

const instructionNotes = [
  { code: "local.get 0", desc: "把第 0 个参数压入操作数栈" },
  { code: "local.get 1", desc: "把第 1 个参数压入操作数栈" },
  { code: "i32.add", desc: "弹出两个 i32 相加，结果再压回栈" },
  { code: "i32.const 10", desc: "把立即数 10 压入栈，常用于循环边界" },
  { code: "block / loop", desc: "定义控制流块，loop 配合 br_if 实现循环" },
  { code: "br_if 0", desc: "条件成立时跳回 loop 开头，相当于 continue" },
  { code: "i32.load", desc: "从线性内存按地址读取 4 字节整数" },
  { code: "i32.store", desc: "把整数写入线性内存的指定地址" },
  { code: "end", desc: "结束当前块或函数体" },
];

const typeMap = [
  { wasm: "i32", js: "number" },
  { wasm: "i64", js: "BigInt" },
  { wasm: "f32 / f64", js: "number" },
  { wasm: "funcref / externref", js: "函数或对象引用" },
  { wasm: "memory", js: "WebAssembly.Memory" },
  { wasm: "global", js: "WebAssembly.Global" },
];

const loadExample = [
  "// 1. 浏览器里推荐流式编译，服务端需返回 application/wasm",
  'const response = await fetch("/add.wasm");',
  "const { instance } = await WebAssembly.instantiateStreaming(response);",
  "",
  "// 2. 通过 exports 像普通函数一样调用",
  "const sum = instance.exports.add(2, 3); // 5",
  "",
  "// 3. 需要传入内存/表格时用第二个参数",
  "const { instance: inst2 } = await WebAssembly.instantiate(bytes, {",
  "  env: { memory: new WebAssembly.Memory({ initial: 1 }) },",
  "});",
].join("\n");

const memoryExample = [
  "// WASM 的线性内存就是一整块 ArrayBuffer",
  "const buf = new Int32Array(instance.exports.memory.buffer);",
  "",
  "// 写入矩阵 A 到偏移 0，矩阵 B 到 sz*sz",
  "for (let i = 0; i < sz; i++) {",
  "  for (let j = 0; j < sz; j++) {",
  "    buf[i * sz + j] = matA[i][j];",
  "    buf[sz * sz + i * sz + j] = matB[i][j];",
  "  }",
  "}",
  "",
  "// WASM 按字节偏移寻址，所以 int32 偏移要 ×4",
  "instance.exports.matMul(0, sz * sz * 4, 2 * sz * sz * 4, sz);",
  "",
  "// 结果从 C 区读回（同样按 int32 视图读取）",
  "const first = buf[2 * sz * sz];",
].join("\n");

const pitfalls = [
  "调用开销：小函数频繁跨界可能比纯 JS 更慢，适合批量、重计算场景。",
  "数据拷贝：JS 与 WASM 不共享对象，需要写内存再读回，注意复用 TypedArray 视图。",
  "内存增长：memory.grow 会让旧 ArrayBuffer detach，必须重新创建 TypedArray。",
  "i64 对应 BigInt：注意浏览器兼容与性能，不要让 i64 参与高频调用。",
  "体积与加载：WASM 包体影响首屏，建议按需加载并开启流式编译。",
  "MIME 类型：instantiateStreaming 要求 application/wasm，配错会退回手动编译。",
  "调试成本：保留 WAT 或源码映射，配合 wasm-objdump、Chrome DevTools 排查。",
];

const exercises = [
  "给算术模块新增 div 导出，修改 WAT 后用页面上的 wabt 编译验证（提示：i32.div_s）。",
  "把 Fibonacci 改成递归版本，与现有迭代版本对比调用耗时和栈深度。",
  "把矩阵乘法的结果通过 Int32Array 读回并按行渲染成表格，验证偏移计算。",
];

// ─── WASM module state ───
const wasmReady = ref(false);
const wasmError = ref("");
const loadingStatus = ref("正在初始化 wabt...");

let arithModule: WasmArithModule | null = null;
let fibModule: WasmFibModule | null = null;
let primeModule: WasmPrimeModule | null = null;
let matrixModule: WasmMatrixModule | null = null;

// ─── 动手实验：算术 ───
const aInput = ref(42);
const bInput = ref(17);

const arithResult = computed(() => {
  if (!arithModule) return null;
  const a = aInput.value;
  const b = bInput.value;
  return {
    wasmAdd: arithModule.add(a, b),
    jsAdd: a + b,
    wasmSub: arithModule.sub(a, b),
    jsSub: a - b,
    wasmMul: arithModule.mul(a, b),
    jsMul: a * b,
  };
});

// ─── Hex dump ───
const WASM_BYTES = new Uint8Array([
  0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x07, 0x01, 0x60, 0x02,
  0x7f, 0x7f, 0x01, 0x7f, 0x03, 0x04, 0x03, 0x00, 0x00, 0x00, 0x07, 0x13, 0x03,
  0x03, 0x61, 0x64, 0x64, 0x00, 0x00, 0x03, 0x73, 0x75, 0x62, 0x00, 0x01, 0x03,
  0x6d, 0x75, 0x6c, 0x00, 0x02, 0x0a, 0x19, 0x03, 0x07, 0x00, 0x20, 0x00, 0x20,
  0x01, 0x6a, 0x0b, 0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0x6b, 0x0b, 0x07, 0x00,
  0x20, 0x00, 0x20, 0x01, 0x6c, 0x0b,
]);
const hexDumpText = ref("");

// ─── WAT 源码 ───
type WatTab = "arith" | "fib" | "prime" | "matrix";
const watTabs: { key: WatTab; label: string; desc: string }[] = [
  { key: "arith", label: "算术", desc: "最简单的函数导出与 i32 运算" },
  { key: "fib", label: "斐波那契", desc: "局部变量与 loop/br_if 循环" },
  { key: "prime", label: "素数求和", desc: "嵌套循环与内存标记数组" },
  { key: "matrix", label: "矩阵乘法", desc: "线性内存读写与三层循环" },
];
const activeWat = ref<WatTab>("arith");
const WAT_SOURCES: Record<WatTab, string> = {
  arith: ARITH_WAT,
  fib: FIB_WAT,
  prime: PRIME_WAT,
  matrix: MATRIX_WAT,
};
const activeWatSource = computed(() => WAT_SOURCES[activeWat.value]);
const activeWatDesc = computed(
  () => watTabs.find((tab) => tab.key === activeWat.value)?.desc || ""
);

// ─── 实验：性能对比 ───
const benchRunning = ref(false);
const benchResults = ref<{ name: string; results: BenchmarkResult[] }[]>([]);
const fibN = ref(35);
const primeLimit = ref(50000);
const matrixSize = ref(80);
const loopCount = ref(1000);

const isWinner = (
  group: { results: BenchmarkResult[] },
  result: BenchmarkResult
) => {
  if (group.results.length < 2) return false;
  const min = Math.min(...group.results.map((item) => item.timeMs));
  return result.timeMs === min;
};

const runBenchmarks = async () => {
  benchRunning.value = true;
  benchResults.value = [];
  await new Promise((resolve) => window.setTimeout(resolve, 50));

  const groups: { name: string; results: BenchmarkResult[] }[] = [];

  const n = fibN.value;
  const fibRes: BenchmarkResult[] = [
    benchmark("JS 迭代", () => fibJS(n), loopCount.value),
  ];
  if (fibModule) {
    const wasmFib = fibModule;
    fibRes.push(benchmark("WASM 迭代", () => wasmFib.fib(n), loopCount.value));
  }
  groups.push({ name: `Fibonacci(${n})`, results: fibRes });

  const limit = primeLimit.value;
  const primeRes: BenchmarkResult[] = [
    benchmark("JS 素数求和", () => sumPrimesJS(limit), 1),
  ];
  if (primeModule) {
    const wasmPrime = primeModule;
    primeRes.push(
      benchmark("WASM 素数求和", () => wasmPrime.sumPrimes(limit), 1)
    );
  }
  groups.push({ name: `素数求和(≤${limit})`, results: primeRes });

  const sz = matrixSize.value;
  const matA = createMatrix(sz);
  const matB = createMatrix(sz);
  const matRes: BenchmarkResult[] = [
    benchmark("JS 矩阵乘法", () => matrixMulJS(matA, matB, sz), 1),
  ];
  if (matrixModule) {
    const wasmMat = matrixModule;
    matRes.push(
      benchmark(
        "WASM 矩阵乘法",
        () => {
          const buf = new Int32Array(wasmMat.mem.buffer);
          const aOff = 0;
          const bOff = sz * sz;
          const cOff = 2 * sz * sz;
          for (let i = 0; i < sz; i++) {
            for (let j = 0; j < sz; j++) {
              buf[aOff + i * sz + j] = matA[i][j];
              buf[bOff + i * sz + j] = matB[i][j];
            }
          }
          wasmMat.matMul(aOff * 4, bOff * 4, cOff * 4, sz);
          return buf[cOff];
        },
        1
      )
    );
  }
  groups.push({ name: `矩阵 ${sz}×${sz}`, results: matRes });

  const a = aInput.value;
  const b = bInput.value;
  const loop = loopCount.value;
  const arithRes: BenchmarkResult[] = [
    benchmark(
      "JS 循环运算",
      () => {
        let sum = 0;
        for (let i = 0; i < loop; i++) sum += a * b + a - b;
        return sum;
      },
      1
    ),
  ];
  if (arithModule) {
    const mod = arithModule;
    arithRes.push(
      benchmark(
        "WASM 循环运算",
        () => {
          let sum = 0;
          for (let i = 0; i < loop; i++) {
            sum += mod.mul(a, b) + mod.add(a, b) - mod.sub(a, b);
          }
          return sum;
        },
        1
      )
    );
  }
  groups.push({ name: `算术 ×${loop}`, results: arithRes });

  benchResults.value = groups;
  benchRunning.value = false;
  await nextTick();
  renderChart();
};

// ─── 图表绘制 ───
const chartCanvas = ref<HTMLCanvasElement | null>(null);

const renderChart = () => {
  const canvas = chartCanvas.value;
  if (!canvas || benchResults.value.length === 0) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = canvas.clientWidth;
  canvas.height = 280;

  const allTimes: number[] = [];
  benchResults.value.forEach((group) => {
    group.results.forEach((result) => allTimes.push(result.timeMs));
  });
  const maxTime = Math.max(...allTimes, 1);

  const padding = { top: 20, right: 20, bottom: 40, left: 140 };
  const chartW = canvas.width - padding.left - padding.right;
  const barH = 18;
  const gap = 6;
  const groupGap = 16;
  const colors = { js: "#6366f1", wasm: "#059669" };

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let y = padding.top;
  for (const group of benchResults.value) {
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 11px system-ui";
    ctx.textAlign = "right";
    ctx.fillText(group.name, padding.left - 10, y + barH);

    y += 4;
    for (const result of group.results) {
      const isWasm = result.name.includes("WASM");
      const color = isWasm ? colors.wasm : colors.js;
      const width = Math.max(2, (result.timeMs / maxTime) * chartW);

      y += barH + gap;
      ctx.fillStyle = color;
      ctx.fillRect(padding.left, y - barH + 2, width, barH - 2);

      ctx.fillStyle = "#334155";
      ctx.font = "11px system-ui";
      ctx.textAlign = "left";
      const label = `${result.name}: ${result.timeMs.toFixed(2)}ms`;
      ctx.fillText(label, padding.left + width + 6, y - 2);
    }
    y += groupGap;
  }
};

// ─── 初始化 ───
onMounted(async () => {
  try {
    loadingStatus.value = "正在加载算术模块...";
    arithModule = await createArithModule();

    loadingStatus.value = "正在编译 Fibonacci 模块...";
    fibModule = await createFibModule();

    loadingStatus.value = "正在编译素数模块...";
    primeModule = await createPrimeModule();

    loadingStatus.value = "正在编译矩阵模块...";
    matrixModule = await createMatrixModule();

    wasmReady.value = true;
    hexDumpText.value = hexDump(WASM_BYTES);
  } catch (error) {
    wasmError.value = (error as Error).message;
    console.error("WASM 初始化失败:", error);
  }
});
</script>

<template>
  <main class="wasm-page">
    <section class="hero">
      <p class="eyebrow">WebAssembly 教学</p>
      <h1>从字节码到调用：WASM 入门</h1>
      <p>
        用一页时间理解 WASM 的二进制结构、WAT 语法、JS
        调用方式、线性内存与性能取舍，并动手验证。
      </p>
      <nav class="toc" aria-label="课程目录">
        <a v-for="item in lessonLinks" :key="item.id" :href="`#${item.id}`">
          {{ item.label }}
        </a>
      </nav>
    </section>

    <div v-if="wasmError" class="error-banner">
      <strong>WASM 加载失败：</strong>{{ wasmError }}
      <p>交互实验依赖 WebAssembly 支持，课程内容仍可正常阅读。</p>
    </div>
    <div v-if="!wasmReady && !wasmError" class="loading-banner">
      <span class="spinner"></span>
      {{ loadingStatus }}
    </div>

    <section id="what" class="card lesson">
      <h2>1. WASM 是什么</h2>
      <p class="hint">
        WebAssembly
        是一种可移植的二进制指令格式，浏览器把它编译成接近原生的机器码执行。
        它不是用来取代 JavaScript，而是承接 CPU
        密集型任务：图像处理、音视频编解码、加解密、物理模拟等。
      </p>
      <ul class="point-list">
        <li>
          <strong>可移植</strong>：同一份 .wasm
          可以在浏览器、Node.js、边缘运行时中执行。
        </li>
        <li>
          <strong>沙箱安全</strong>：只能访问显式导入的内存/函数，不能直接操作
          DOM。
        </li>
        <li>
          <strong>与 JS 互补</strong>：JS 负责交互与调度，WASM 负责重计算。
        </li>
        <li>
          <strong>可被文本化</strong>：WAT 是 WASM 的文本格式，方便阅读与调试。
        </li>
      </ul>
      <div class="pipeline">
        <span>C / Rust / AssemblyScript</span>
        <span class="arrow">→</span>
        <span>WAT</span>
        <span class="arrow">→</span>
        <span>.wasm 字节码</span>
        <span class="arrow">→</span>
        <span>浏览器编译执行</span>
      </div>
    </section>

    <section id="binary" class="card lesson">
      <h2>2. 模块的二进制结构</h2>
      <p class="hint">
        一个 WASM 模块由魔数、版本号和若干段（section）组成。下面的算术模块只有
        71 字节，已经包含类型、函数、导出和代码四类信息。
      </p>
      <div class="table-wrap">
        <table class="lesson-table">
          <thead>
            <tr>
              <th>区域</th>
              <th>字节</th>
              <th>作用</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in binarySections" :key="item.area">
              <td>{{ item.area }}</td>
              <td>
                <code>{{ item.bytes }}</code>
              </td>
              <td>{{ item.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>完整字节转储（71 字节）</h3>
      <pre class="hex-dump">{{ hexDumpText }}</pre>
      <p class="note">
        对照上面的表格阅读：开头 8 字节是魔数与版本，之后每段都以「段 ID +
        段长度」开头。
      </p>
    </section>

    <section id="wat" class="card lesson">
      <h2>3. 读懂 WAT 语法</h2>
      <p class="hint">
        WAT（WebAssembly Text Format）是 WASM
        的可读形式。页面里的模块都在运行时通过
        <code>wabt</code> 从 WAT 编译成字节码，可以直接切换查看。
      </p>
      <div class="wat-tabs">
        <button
          v-for="tab in watTabs"
          :key="tab.key"
          type="button"
          :class="{ active: activeWat === tab.key }"
          @click="activeWat = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
      <p class="note">当前示例：{{ activeWatDesc }}</p>
      <pre class="wat-source"><code>{{ activeWatSource }}</code></pre>
      <div class="table-wrap">
        <table class="lesson-table">
          <thead>
            <tr>
              <th>指令</th>
              <th>含义</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in instructionNotes" :key="item.code">
              <td>
                <code>{{ item.code }}</code>
              </td>
              <td>{{ item.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="call" class="card lesson">
      <h2>4. 在 JS 中加载与调用</h2>
      <p class="hint">
        WASM 通过 <code>exports</code> 暴露函数与内存。浏览器推荐用
        <code>instantiateStreaming</code>，边下载边编译，减少等待。
      </p>
      <pre class="code-block"><code>{{ loadExample }}</code></pre>
      <div class="table-wrap">
        <table class="lesson-table">
          <thead>
            <tr>
              <th>WASM 类型</th>
              <th>JS 对应类型</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in typeMap" :key="item.wasm">
              <td>
                <code>{{ item.wasm }}</code>
              </td>
              <td>{{ item.js }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>动手实验：调用 i32 函数</h3>
      <p class="note">
        修改 A、B 观察结果。WASM 的 i32 是 32 位整数，非整数输入会被取整。
      </p>
      <div class="input-row">
        <label>A = <input v-model.number="aInput" type="number" /></label>
        <label>B = <input v-model.number="bInput" type="number" /></label>
      </div>
      <div v-if="arithResult" class="results-grid">
        <div class="result-item">
          <span class="label">WASM add</span>
          <span class="value">{{ arithResult.wasmAdd }}</span>
        </div>
        <div class="result-item">
          <span class="label">JS add</span>
          <span class="value">{{ arithResult.jsAdd }}</span>
        </div>
        <div class="result-item">
          <span class="label">WASM sub</span>
          <span class="value">{{ arithResult.wasmSub }}</span>
        </div>
        <div class="result-item">
          <span class="label">JS sub</span>
          <span class="value">{{ arithResult.jsSub }}</span>
        </div>
        <div class="result-item">
          <span class="label">WASM mul</span>
          <span class="value">{{ arithResult.wasmMul }}</span>
        </div>
        <div class="result-item">
          <span class="label">JS mul</span>
          <span class="value">{{ arithResult.jsMul }}</span>
        </div>
      </div>
    </section>

    <section id="memory" class="card lesson">
      <h2>5. 线性内存怎么用</h2>
      <p class="hint">
        WASM 只有一块连续的线性内存，以 64KiB 为一页。JS 通过 TypedArray 读写，
        所有地址都是字节偏移，因此 int32 的索引要乘以 4。
      </p>
      <pre class="code-block"><code>{{ memoryExample }}</code></pre>
      <ul class="point-list">
        <li>
          <code>memory.grow</code> 扩容后旧视图会失效，需要重新创建 TypedArray。
        </li>
        <li>字符串要手动编码为 UTF-8 写入内存，读回时再解码。</li>
        <li>频繁跨语言传数据时，优先传偏移量和长度，而不是复制大对象。</li>
      </ul>
    </section>

    <section id="bench" class="card benchmark-card lesson">
      <h2>6. 实验：性能对比</h2>
      <p class="hint">
        先猜一猜哪组更快，再运行实验验证。首次运行包含预热成本，多跑几次结果更稳定；
        小函数频繁调用时，JS 与 WASM 的差距可能反而缩小。
      </p>
      <div class="bench-config">
        <label
          >Fib N: <input v-model.number="fibN" type="number" min="5" max="45"
        /></label>
        <label
          >素数上限:
          <input
            v-model.number="primeLimit"
            type="number"
            min="100"
            max="500000"
        /></label>
        <label
          >矩阵阶数:
          <input v-model.number="matrixSize" type="number" min="10" max="200"
        /></label>
        <label
          >循环次数:
          <input
            v-model.number="loopCount"
            type="number"
            min="100"
            max="100000"
        /></label>
        <button
          type="button"
          :disabled="benchRunning || !wasmReady"
          @click="runBenchmarks"
        >
          {{ benchRunning ? "运行中..." : "运行实验" }}
        </button>
      </div>

      <div v-if="benchResults.length > 0" class="bench-output">
        <canvas ref="chartCanvas" class="bench-chart"></canvas>
        <div class="bench-table">
          <div
            v-for="group in benchResults"
            :key="group.name"
            class="bench-group"
          >
            <h3>{{ group.name }}</h3>
            <div
              v-for="result in group.results"
              :key="result.name"
              class="bench-row"
              :class="{ winner: isWinner(group, result) }"
            >
              <span
                class="bench-name"
                :class="result.name.includes('WASM') ? 'wasm' : 'js'"
              >
                {{ result.name }}
              </span>
              <span class="bench-time">{{ result.timeMs.toFixed(2) }} ms</span>
              <span v-if="result.value !== undefined" class="bench-val"
                >= {{ result.value }}</span
              >
              <span v-if="isWinner(group, result)" class="bench-badge"
                >最快</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="pitfalls" class="card lesson">
      <h2>7. 常见坑与最佳实践</h2>
      <ul class="point-list">
        <li v-for="item in pitfalls" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section id="practice" class="card lesson">
      <h2>8. 课后练习与延伸阅读</h2>
      <ol class="exercise-list">
        <li v-for="item in exercises" :key="item">{{ item }}</li>
      </ol>
      <div class="reading">
        <a
          href="https://developer.mozilla.org/zh-CN/docs/WebAssembly"
          target="_blank"
          rel="noopener noreferrer"
          >MDN · WebAssembly</a
        >
        <a
          href="https://webassembly.org/"
          target="_blank"
          rel="noopener noreferrer"
          >webassembly.org</a
        >
        <a
          href="https://github.com/WebAssembly/wabt"
          target="_blank"
          rel="noopener noreferrer"
          >WABT 工具链</a
        >
        <a
          href="https://developer.chrome.com/docs/devtools/memory-inspector/"
          target="_blank"
          rel="noopener noreferrer"
          >Chrome DevTools 内存调试</a
        >
      </div>
    </section>
  </main>
</template>

<style scoped>
.wasm-page {
  width: 100%;
  display: grid;
  gap: 1rem;
  animation: rise-in 0.5s var(--ease-out) both;
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 1.2rem;
  border-radius: var(--radius-xl);
  color: #fff;
  background: linear-gradient(136deg, #065f46, #059669 48%, #10b981);
  box-shadow: var(--shadow-lg);
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 84% 10%,
    rgba(255, 255, 255, 0.08),
    transparent 30%
  );
  pointer-events: none;
}
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  opacity: 0.7;
  font-weight: 600;
}
.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  margin: 0.3rem 0;
  letter-spacing: -0.03em;
}
.hero p {
  opacity: 0.85;
  font-size: 0.92rem;
}

.toc {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.85rem;
}
.toc a {
  padding: 0.22rem 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: var(--radius-pill);
  color: #fff;
  font-size: 0.78rem;
  background: rgba(255, 255, 255, 0.1);
  transition: all var(--duration-fast) var(--ease-out);
}
.toc a:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.error-banner {
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  color: #991b1b;
  font-size: 0.92rem;
}
.error-banner p {
  margin: 0.25rem 0 0;
  opacity: 0.7;
  font-size: 0.85rem;
}
.loading-banner {
  background: var(--bg-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
}
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-border);
  border-top-color: #059669;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  background: var(--surface-glass);
  scroll-margin-top: 1rem;
}
.card h2 {
  font-family: var(--font-display);
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
.card h3 {
  margin: 0.9rem 0 0.4rem;
  font-size: 0.92rem;
}
.hint {
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
  line-height: 1.65;
}
.note {
  margin-top: 0.5rem;
  font-size: 0.82rem;
  color: var(--color-text-secondary);
}

.point-list {
  display: grid;
  gap: 0.4rem;
  padding-left: 1.1rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}
.point-list strong {
  color: var(--color-heading);
}

.pipeline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.9rem;
  padding: 0.6rem 0.75rem;
  border: 1px dashed var(--color-border-hover);
  border-radius: var(--radius-sm);
  background: var(--bg-2);
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}
.pipeline .arrow {
  color: #059669;
  font-weight: 600;
}

.table-wrap {
  overflow-x: auto;
  margin: 0.5rem 0;
}
.lesson-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.lesson-table th,
.lesson-table td {
  padding: 0.45rem 0.55rem;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  vertical-align: top;
}
.lesson-table th {
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}
.lesson-table code,
.point-list code,
.hint code {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #047857;
  background: rgba(5, 150, 105, 0.08);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.code-block {
  margin: 0.5rem 0;
  padding: 0.8rem 1rem;
  border-radius: var(--radius-sm);
  background: #1e293b;
  color: #e2e8f0;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.6;
  overflow-x: auto;
}

.input-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
}
label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.92rem;
}
input {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.5rem;
  color: var(--color-text);
  background: var(--bg-0);
  font-size: 0.92rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}
.result-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.5rem;
  background: var(--bg-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}
.result-item .label {
  font-size: 11px;
  color: var(--color-text-secondary);
}
.result-item .value {
  font-size: 1rem;
  font-weight: 600;
  color: #059669;
}

.hex-dump {
  white-space: pre;
  border: 1px dashed var(--color-border-hover);
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  background: var(--bg-2);
  overflow-x: auto;
}

.wat-tabs {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}
.wat-tabs button {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  padding: 0.3rem 0.7rem;
  background: var(--bg-2);
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all var(--duration-fast) ease;
}
.wat-tabs button:hover {
  border-color: var(--color-border-hover);
  background: var(--accent-bg-subtle);
}
.wat-tabs button.active {
  border-color: #059669;
  background: rgba(5, 150, 105, 0.1);
  color: #059669;
  font-weight: 600;
}

.wat-source {
  white-space: pre;
  border: 1px solid var(--color-border);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  background: #1e293b;
  color: #e2e8f0;
  overflow-x: auto;
  line-height: 1.6;
  max-height: 400px;
  overflow-y: auto;
  margin: 0;
}
.wat-source code {
  color: #e2e8f0;
}

.benchmark-card {
  border-color: rgba(16, 185, 129, 0.3);
}
.bench-config {
  display: flex;
  gap: 0.75rem;
  align-items: end;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.bench-config label {
  flex: 1;
  min-width: 80px;
}
button {
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: var(--radius-pill);
  padding: 0.5rem 1rem;
  background: #059669;
  color: #fff;
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: 600;
  transition: all var(--duration-fast) ease;
  white-space: nowrap;
}
button:hover {
  background: #047857;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.bench-chart {
  width: 100%;
  height: 280px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #f8fafc;
  margin-bottom: 1rem;
}

.bench-table {
  display: grid;
  gap: 0.75rem;
}
.bench-group h3 {
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: var(--color-heading);
}
.bench-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
  font-size: 0.92rem;
}
.bench-row.winner {
  background: rgba(16, 185, 129, 0.08);
}
.bench-name {
  font-weight: 500;
  min-width: 120px;
}
.bench-name.wasm {
  color: #059669;
}
.bench-name.js {
  color: #6366f1;
}
.bench-time {
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--color-heading);
}
.bench-val {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
}
.bench-badge {
  margin-left: auto;
  background: #059669;
  color: #fff;
  font-size: 11px;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-pill);
  font-weight: 600;
}

.exercise-list {
  display: grid;
  gap: 0.4rem;
  padding-left: 1.2rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.reading {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.9rem;
}
.reading a {
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--bg-0);
  font-size: 0.82rem;
  transition: all var(--duration-fast) var(--ease-out);
}
.reading a:hover {
  border-color: #059669;
  background: rgba(5, 150, 105, 0.08);
  color: #047857;
}

@media (max-width: 640px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .bench-config {
    flex-direction: column;
  }
}
</style>
