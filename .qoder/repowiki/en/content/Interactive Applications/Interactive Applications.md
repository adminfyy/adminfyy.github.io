# Interactive Applications

<cite>
**Referenced Files in This Document**
- [ticTacToe.ts](file://src/utils/ticTacToe.ts)
- [TicTacToeView.vue](file://src/views/TicTacToeView.vue)
- [AboutView.vue](file://src/views/AboutView.vue)
- [BlogDetailView.vue](file://src/views/BlogDetailView.vue)
- [canvas.ts](file://src/utils/canvas.ts)
- [CanvasView.vue](file://src/views/CanvasView.vue)
- [wasm.ts](file://src/utils/wasm.ts)
- [WasmView.vue](file://src/views/WasmView.vue)
- [overseasExport.ts](file://src/utils/overseasExport.ts)
- [OverseasExportView.vue](file://src/views/OverseasExportView.vue)
- [pretext.ts](file://src/utils/pretext.ts)
- [PretextView.vue](file://src/views/PretextView.vue)
- [ThreeView.vue](file://src/views/ThreeView.vue)
- [markdown.ts](file://src/utils/markdown.ts)
- [blog.json](file://src/mock/blog.json)
- [index.ts](file://src/router/index.ts)
- [ticTacToe.spec.ts](file://src/components/__tests__/ticTacToe.spec.ts)
- [canvas.spec.ts](file://src/components/__tests__/canvas.spec.ts)
- [wasm.spec.ts](file://src/components/__tests__/wasm.spec.ts)
- [overseasExport.spec.ts](file://src/components/__tests__/overseasExport.spec.ts)
- [pretext.spec.ts](file://src/components/__tests__/pretext.spec.ts)
- [three.spec.ts](file://src/components/__tests__/three.spec.ts)
- [AboutView.9029727f.css](file://docs/assets/AboutView.9029727f.css)
- [TicTacToeView.168a724c.css](file://docs/assets/TicTacToeView.168a724c.css)
- [CanvasView.66b274a8.css](file://docs/assets/CanvasView.66b274a8.css)
- [ThreeView.d9b7aeab.css](file://docs/assets/ThreeView.d9b7aeab.css)
- [BlogDetailView.ff86f6af.css](file://docs/assets/BlogDetailView.ff86f6af.css)
</cite>

## Update Summary
**Changes Made**
- Added comprehensive documentation for new interactive applications including enhanced Three.js 3D graphics with advanced WebGL rendering
- Documented comprehensive styling system with new CSS files (AboutView.9029727f.css, TicTacToeView.168a724c.css, CanvasView.66b274a8.css, ThreeView.d9b7aeab.css, BlogDetailView.ff86f6af.css)
- Enhanced blog functionality with improved markdown processing capabilities and advanced styling
- Updated project structure to reflect the expanded interactive applications suite with modern CSS architecture
- Added detailed coverage of advanced canvas techniques, 3D graphics programming, and comprehensive styling system

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Enhanced Styling System](#enhanced-styling-system)
7. [Dependency Analysis](#dependency-analysis)
8. [Performance Considerations](#performance-considerations)
9. [Troubleshooting Guide](#troubleshooting-guide)
10. [Conclusion](#conclusion)

## Introduction
This document presents the interactive applications section of the project, featuring eight distinct interactive demos that showcase modern web technologies with enhanced styling and comprehensive functionality. The applications include: Tic-Tac-Toe game logic and UI with improved styling, HTML5 Canvas drawing and animations, WebAssembly arithmetic and benchmarking, an overseas export toolkit, advanced canvas physics simulations, 3D WebGL graphics with Three.js, a sophisticated text layout system using Pretext.js, and an enhanced blog system with advanced markdown processing. Each demo demonstrates different aspects of web development including state management, user interaction flows, canvas manipulation techniques, WASM module loading and performance characteristics, practical utility applications, 3D graphics programming, advanced text rendering systems, and comprehensive styling architectures.

## Project Structure
The interactive applications are organized as Vue Single File Components (SFCs) under the views directory, each backed by dedicated utility modules in the utils directory. The routing system integrates these views under clean URLs for easy navigation, with lazy loading for optimal performance. The project now features a comprehensive styling system with dedicated CSS files for each major component.

```mermaid
graph TB
subgraph "Routing"
R["Router<br/>index.ts"]
end
subgraph "Views"
TTT["TicTacToeView.vue"]
ABOUT["AboutView.vue"]
BLOG["BlogDetailView.vue"]
CANV["CanvasView.vue"]
WASM["WasmView.vue"]
EXP["OverseasExportView.vue"]
PRETEXT["PretextView.vue"]
THREE["ThreeView.vue"]
end
subgraph "Utilities"
TTU["ticTacToe.ts"]
ABOUTU["AboutView.vue"]
BLOGU["BlogDetailView.vue"]
CANVU["canvas.ts"]
WASMU["wasm.ts"]
EXPU["overseasExport.ts"]
PRETEXTU["pretext.ts"]
MARKDOWN["markdown.ts"]
end
subgraph "Styling System"
CSS1["AboutView.9029727f.css"]
CSS2["TicTacToeView.168a724c.css"]
CSS3["CanvasView.66b274a8.css"]
CSS4["ThreeView.d9b7aeab.css"]
CSS5["BlogDetailView.ff86f6af.css"]
end
R --> TTT
R --> ABOUT
R --> BLOG
R --> CANV
R --> WASM
R --> EXP
R --> PRETEXT
R --> THREE
TTT --> TTU
ABOUT --> ABOUTU
BLOG --> BLOGU
CANV --> CANVU
WASM --> WASMU
EXP --> EXPU
PRETEXT --> PRETEXTU
BLOGU --> MARKDOWN
TTT --> CSS2
ABOUT --> CSS1
CANV --> CSS3
THREE --> CSS4
BLOG --> CSS5
```

**Diagram sources**
- [index.ts:1-77](file://src/router/index.ts#L1-L77)
- [TicTacToeView.vue:1-145](file://src/views/TicTacToeView.vue#L1-L145)
- [AboutView.vue:1-105](file://src/views/AboutView.vue#L1-L105)
- [BlogDetailView.vue:1-245](file://src/views/BlogDetailView.vue#L1-L245)
- [CanvasView.vue:1-328](file://src/views/CanvasView.vue#L1-L328)
- [WasmView.vue:1-424](file://src/views/WasmView.vue#L1-L424)
- [OverseasExportView.vue:1-399](file://src/views/OverseasExportView.vue#L1-L399)
- [PretextView.vue:1-462](file://src/views/PretextView.vue#L1-L462)
- [ThreeView.vue:1-429](file://src/views/ThreeView.vue#L1-L429)
- [ticTacToe.ts:1-55](file://src/utils/ticTacToe.ts#L1-L55)
- [canvas.ts:1-231](file://src/utils/canvas.ts#L1-L231)
- [wasm.ts:1-298](file://src/utils/wasm.ts#L1-L298)
- [overseasExport.ts:1-104](file://src/utils/overseasExport.ts#L1-L104)
- [pretext.ts:1-223](file://src/utils/pretext.ts#L1-L223)
- [markdown.ts:1-188](file://src/utils/markdown.ts#L1-L188)
- [AboutView.9029727f.css:1-2](file://docs/assets/AboutView.9029727f.css#L1-L2)
- [TicTacToeView.168a724c.css:1-2](file://docs/assets/TicTacToeView.168a724c.css#L1-L2)
- [CanvasView.66b274a8.css:1-2](file://docs/assets/CanvasView.66b274a8.css#L1-L2)
- [ThreeView.d9b7aeab.css:1-2](file://docs/assets/ThreeView.d9b7aeab.css#L1-L2)
- [BlogDetailView.ff86f6af.css:1-2](file://docs/assets/BlogDetailView.ff86f6af.css#L1-L2)

**Section sources**
- [index.ts:1-77](file://src/router/index.ts#L1-L77)

## Core Components
- **Enhanced Tic-Tac-Toe Game**: Improved styling system with gradient backgrounds, glass morphism effects, and responsive design. Features two modes (player vs player and player vs computer) with sophisticated AI strategy.
- **Professional About Page**: Comprehensive resume presentation with skill groups, work experience, and contact information using modern CSS variables and animations.
- **Advanced Blog System**: Enhanced markdown processing with comprehensive styling, reading time calculation, related posts, and responsive design with deep CSS styling.
- **Advanced Canvas Demos**: Sophisticated canvas utilities featuring particle physics, fractal tree generation, ripple wave interference, and vector field flow demonstrations with enhanced user interaction.
- **WebAssembly Demo**: Comprehensive WASM benchmarking with multiple modules (arithmetic, Fibonacci, prime sieve, matrix multiplication) and performance comparison tools.
- **Overseas Export Toolkit**: Practical calculator and checklist builder for international trade quoting and compliance with robust input validation.
- **3D Graphics**: Three.js integration with geometric animations, particle systems, and procedural terrain generation with advanced lighting and camera controls.
- **Text Layout System**: Pretext.js-powered text rendering with canvas integration, obstacle-aware text flow, virtual list height prediction, and performance benchmarks.

**Section sources**
- [TicTacToeView.vue:1-145](file://src/views/TicTacToeView.vue#L1-L145)
- [AboutView.vue:1-105](file://src/views/AboutView.vue#L1-L105)
- [BlogDetailView.vue:1-245](file://src/views/BlogDetailView.vue#L1-L245)
- [CanvasView.vue:1-328](file://src/views/CanvasView.vue#L1-L328)
- [WasmView.vue:1-424](file://src/views/WasmView.vue#L1-L424)
- [OverseasExportView.vue:1-399](file://src/views/OverseasExportView.vue#L1-L399)
- [PretextView.vue:1-462](file://src/views/PretextView.vue#L1-L462)
- [ThreeView.vue:1-429](file://src/views/ThreeView.vue#L1-L429)

## Architecture Overview
Each application follows a clear separation of concerns with specialized utility modules, comprehensive testing, and enhanced styling systems:

```mermaid
graph LR
subgraph "UI Layer"
V_TTT["TicTacToeView.vue"]
V_ABOUT["AboutView.vue"]
V_BLOG["BlogDetailView.vue"]
V_CANV["CanvasView.vue"]
V_WASM["WasmView.vue"]
V_EXP["OverseasExportView.vue"]
V_PRETEXT["PretextView.vue"]
V_THREE["ThreeView.vue"]
end
subgraph "Logic Layer"
U_TTT["ticTacToe.ts"]
U_ABOUT["AboutView.vue"]
U_BLOG["BlogDetailView.vue"]
U_CANV["canvas.ts"]
U_WASM["wasm.ts"]
U_EXP["overseasExport.ts"]
U_PRETEXT["pretext.ts"]
U_MARKDOWN["markdown.ts"]
end
subgraph "Styling Layer"
CSS_TTT["TicTacToeView.168a724c.css"]
CSS_ABOUT["AboutView.9029727f.css"]
CSS_BLOG["BlogDetailView.ff86f6af.css"]
CSS_CANV["CanvasView.66b274a8.css"]
CSS_THREE["ThreeView.d9b7aeab.css"]
end
subgraph "Testing Layer"
T_TTT["ticTacToe.spec.ts"]
T_ABOUT["AboutView.vue"]
T_BLOG["BlogDetailView.vue"]
T_CANV["canvas.spec.ts"]
T_WASM["wasm.spec.ts"]
T_EXP["overseasExport.spec.ts"]
T_PRETEXT["pretext.spec.ts"]
T_THREE["three.spec.ts"]
end
V_TTT --> U_TTT
V_ABOUT --> U_ABOUT
V_BLOG --> U_BLOG
V_CANV --> U_CANV
V_WASM --> U_WASM
V_EXP --> U_EXP
V_PRETEXT --> U_PRETEXT
V_THREE --> U_CANV
U_BLOG --> U_MARKDOWN
V_TTT --> CSS_TTT
V_ABOUT --> CSS_ABOUT
V_BLOG --> CSS_BLOG
V_CANV --> CSS_CANV
V_THREE --> CSS_THREE
U_CANV -.-> T_CANV
U_WASM -.-> T_WASM
U_PRETEXT -.-> T_PRETEXT
U_TTT -.-> T_TTT
U_EXP -.-> T_EXP
U_CANV -.-> T_THREE
```

**Diagram sources**
- [TicTacToeView.vue:1-145](file://src/views/TicTacToeView.vue#L1-L145)
- [AboutView.vue:1-105](file://src/views/AboutView.vue#L1-L105)
- [BlogDetailView.vue:1-245](file://src/views/BlogDetailView.vue#L1-L245)
- [CanvasView.vue:1-328](file://src/views/CanvasView.vue#L1-L328)
- [WasmView.vue:1-424](file://src/views/WasmView.vue#L1-L424)
- [OverseasExportView.vue:1-399](file://src/views/OverseasExportView.vue#L1-L399)
- [PretextView.vue:1-462](file://src/views/PretextView.vue#L1-L462)
- [ThreeView.vue:1-429](file://src/views/ThreeView.vue#L1-L429)
- [ticTacToe.ts:1-55](file://src/utils/ticTacToe.ts#L1-L55)
- [canvas.ts:1-231](file://src/utils/canvas.ts#L1-L231)
- [wasm.ts:1-298](file://src/utils/wasm.ts#L1-L298)
- [overseasExport.ts:1-104](file://src/utils/overseasExport.ts#L1-L104)
- [pretext.ts:1-223](file://src/utils/pretext.ts#L1-L223)
- [markdown.ts:1-188](file://src/utils/markdown.ts#L1-L188)
- [ticTacToe.spec.ts:1-32](file://src/components/__tests__/ticTacToe.spec.ts#L1-L32)
- [canvas.spec.ts:1-131](file://src/components/__tests__/canvas.spec.ts#L1-L131)
- [wasm.spec.ts:1-97](file://src/components/__tests__/wasm.spec.ts#L1-L97)
- [overseasExport.spec.ts:1-61](file://src/components/__tests__/overseasExport.spec.ts#L1-L61)
- [pretext.spec.ts:1-232](file://src/components/__tests__/pretext.spec.ts#L1-L232)
- [three.spec.ts:1-123](file://src/components/__tests__/three.spec.ts#L1-L123)

## Detailed Component Analysis

### Enhanced Tic-Tac-Toe Game
The game features a completely redesigned interface with modern CSS styling, gradient backgrounds, and glass morphism effects. The logic module defines types, win detection, draw detection, and a simple AI that prioritizes winning, blocking, center, corners, and otherwise random moves.

```mermaid
classDiagram
class TicTacToeUtils {
+Player
+Cell
+Board
+checkWinner(board) Player|null
+isDraw(board) boolean
+chooseComputerMove(board, ai, human) number|null
}
class TicTacToeView {
+mode
+board
+currentPlayer
+winner
+draw
+statusText
+resetGame()
+switchMode(mode)
+placeMove(index, player)
+togglePlayer()
+makeComputerMove()
+handleCellClick(index)
}
TicTacToeView --> TicTacToeUtils : "uses"
```

**Diagram sources**
- [ticTacToe.ts:1-55](file://src/utils/ticTacToe.ts#L1-L55)
- [TicTacToeView.vue:1-145](file://src/views/TicTacToeView.vue#L1-L145)

Key behaviors:
- Two game modes: pvp and pve. In pve, the human plays X; the computer plays O.
- Win/draw detection computed from the board state.
- Computer AI selects moves based on priority: win, block, center, corner, random.
- Enhanced UI with gradient backgrounds, glass morphism effects, and responsive design.
- Modern CSS architecture with CSS variables and animations.

User interaction patterns:
- Clicking a cell places the current player's mark if legal.
- Status text reflects current mode and whose turn it is.
- Reset button clears the board and sets the starting player.
- Hover effects and transitions for enhanced user experience.

Technical notes:
- The board is represented as a flat array of nine cells.
- The AI uses snapshots to test potential winning moves without mutating the real board.
- The view uses refs and computed properties for reactive state and derived values.
- Modern CSS Grid layout with responsive breakpoints.

Extensibility ideas:
- Add difficulty levels by adjusting AI move priority or introducing randomness.
- Add score tracking across multiple games.
- Local storage persistence for recent scores or preferences.
- Implement theme switching with CSS custom properties.

**Section sources**
- [ticTacToe.ts:1-55](file://src/utils/ticTacToe.ts#L1-L55)
- [TicTacToeView.vue:1-145](file://src/views/TicTacToeView.vue#L1-L145)
- [TicTacToeView.168a724c.css:1-2](file://docs/assets/TicTacToeView.168a724c.css#L1-L2)
- [ticTacToe.spec.ts:1-32](file://src/components/__tests__/ticTacToe.spec.ts#L1-L32)

### Professional About Page
The About page provides a comprehensive professional profile with modern styling, skill groups, and responsive design. Features multilingual content and structured presentation of professional information.

```mermaid
sequenceDiagram
participant User as "User"
participant View as "AboutView.vue"
participant CSS as "AboutView.9029727f.css"
User->>View : "Load About Page"
View->>View : "Initialize skillGroups and workContents"
View->>CSS : "Apply glass morphism styling"
CSS-->>User : "Render with gradient backgrounds"
User->>View : "Scroll through content"
View->>View : "Responsive layout adapts to screen size"
```

**Diagram sources**
- [AboutView.vue:1-105](file://src/views/AboutView.vue#L1-L105)
- [AboutView.9029727f.css:1-2](file://docs/assets/AboutView.9029727f.css#L1-L2)

Key features:
- Structured skill groups with chip-based display system.
- Professional profile section with headline and introduction.
- Engineering focus statements and work content presentation.
- Education and contact information with privacy considerations.
- Responsive design with mobile-first approach.

Styling innovations:
- Glass morphism effects with backdrop filters.
- Gradient backgrounds with radial gradients.
- CSS custom properties for consistent theming.
- Animation transitions for content appearance.
- Responsive typography with clamp() functions.

**Section sources**
- [AboutView.vue:1-105](file://src/views/AboutView.vue#L1-L105)
- [AboutView.9029727f.css:1-2](file://docs/assets/AboutView.9029727f.css#L1-L2)

### Enhanced Blog System
The blog system features comprehensive markdown processing, advanced styling, reading time calculation, and related posts functionality. The enhanced markdown processor supports tables, task lists, code blocks, and various formatting options.

```mermaid
sequenceDiagram
participant User as "User"
participant BlogView as "BlogDetailView.vue"
participant Markdown as "markdown.ts"
participant Mock as "blog.json"
User->>BlogView : "Navigate to /blog/ : slug"
BlogView->>Mock : "getBlogPostBySlug(slug)"
Mock-->>BlogView : "Return blog post data"
BlogView->>Markdown : "renderMarkdown(post.content)"
Markdown->>Markdown : "Process markdown syntax"
Markdown-->>BlogView : "Return HTML content"
BlogView->>BlogView : "Calculate reading time"
BlogView->>BlogView : "Generate related posts"
BlogView-->>User : "Display styled blog content"
```

**Diagram sources**
- [BlogDetailView.vue:1-245](file://src/views/BlogDetailView.vue#L1-L245)
- [markdown.ts:1-188](file://src/utils/markdown.ts#L1-L188)
- [blog.json:1-14](file://src/mock/blog.json#L1-L14)

Enhanced markdown processing capabilities:
- Code block preservation with language identification.
- Task list support with checkbox rendering.
- Table processing with header differentiation.
- Image embedding with alt text support.
- Blockquote styling and horizontal rules.
- Inline formatting (bold, italic, strikethrough).
- Heading hierarchy with semantic markup.

Advanced styling features:
- Deep CSS styling with :deep() selectors for nested components.
- Comprehensive typography system with font stacks.
- Code block styling with syntax highlighting classes.
- Table styling with hover effects and borders.
- Responsive design with mobile optimizations.
- Reading progress indicators and navigation.

**Section sources**
- [BlogDetailView.vue:1-245](file://src/views/BlogDetailView.vue#L1-L245)
- [markdown.ts:1-188](file://src/utils/markdown.ts#L1-L188)
- [BlogDetailView.ff86f6af.css:1-2](file://docs/assets/BlogDetailView.ff86f6af.css#L1-L2)
- [blog.json:1-14](file://src/mock/blog.json#L1-L14)

### Advanced Canvas Physics System
The canvas utilities provide sophisticated physics simulations including gravity fields, fractal tree generation, ripple wave interference, and vector field flow demonstrations. The view composes these into interactive demos with mouse events and animation loops.

```mermaid
sequenceDiagram
participant User as "User"
participant View as "CanvasView.vue"
participant Ctx as "Canvas Context"
participant Utils as "canvas.ts"
User->>View : "Mouse Move/Drag"
View->>View : "handleGravityMove()/onFlowMouseDown()"
View->>Utils : "updateGravityBodies()/updateFlowParticles()"
Utils-->>Ctx : "drawGravityBodies()/drawFlowParticles()"
User->>View : "Click/Ripple"
View->>Utils : "createRipple()"
Utils-->>Ctx : "drawRipples()"
User->>View : "Tab Switch"
View->>View : "stopAll()/startAnimation()"
```

**Diagram sources**
- [CanvasView.vue:53-60](file://src/views/CanvasView.vue#L53-L60)
- [CanvasView.vue:95-116](file://src/views/CanvasView.vue#L95-L116)
- [CanvasView.vue:133-143](file://src/views/CanvasView.vue#L133-L143)
- [CanvasView.vue:185-202](file://src/views/CanvasView.vue#L185-L202)
- [canvas.ts:45-71](file://src/utils/canvas.ts#L45-L71)
- [canvas.ts:198-219](file://src/utils/canvas.ts#L198-L219)

Canvas manipulation techniques:
- Mouse event handlers convert client coordinates to canvas-relative positions with proper scaling.
- Physics simulations use mathematical models: gravitational force F = G/(d²), vector field angles, and trigonometric functions.
- Motion trails created using coordinate history arrays with alpha blending for visual effects.
- Screen wrapping implemented for boundary conditions in particle systems.
- Multi-layer rendering with semi-transparent overlays for particle trails and glow effects.

Data flow:
- The view maintains per-tab state with initialization flags and animation control.
- Each demo initializes its canvas size and context on mount, then runs independent RAF loops.
- Lazy initialization ensures optimal performance by only creating resources when needed.

Extensibility ideas:
- Add collision detection between different particle types.
- Implement particle spawning based on time or user input.
- Create custom brush tools for drawing with physics properties.
- Add sound effects synchronized with particle interactions.

**Section sources**
- [canvas.ts:1-231](file://src/utils/canvas.ts#L1-L231)
- [CanvasView.vue:1-328](file://src/views/CanvasView.vue#L1-L328)
- [CanvasView.66b274a8.css:1-2](file://docs/assets/CanvasView.66b274a8.css#L1-L2)
- [canvas.spec.ts:1-131](file://src/components/__tests__/canvas.spec.ts#L1-L131)

### WebAssembly Integration and Benchmarking
The WASM demo provides comprehensive benchmarking across multiple algorithms and data structures, demonstrating performance comparisons between JavaScript and WebAssembly implementations.

```mermaid
sequenceDiagram
participant View as "WasmView.vue"
participant WASM as "wasm.ts"
participant WABT as "wabt"
participant VM as "WebAssembly.Instance"
View->>WASM : "createArithModule()"
WASM->>VM : "instantiate(ARITH_WASM_BYTES)"
VM-->>WASM : "WasmArithModule {add, sub, mul}"
View->>WASM : "createFibModule()"
WASM->>WABT : "parseWat(FIB_WAT)"
WABT-->>WASM : "toBinary()"
WASM->>VM : "instantiate(buffer)"
VM-->>WASM : "WasmFibModule {fib}"
View->>View : "runBenchmarks()"
View->>WASM : "benchmark('WASM fib', () => fib(n), loops)"
WASM-->>View : "BenchmarkResult {timeMs, value}"
View->>View : "renderChart()"
```

**Diagram sources**
- [wasm.ts:45-48](file://src/utils/wasm.ts#L45-L48)
- [wasm.ts:178-181](file://src/utils/wasm.ts#L178-L181)
- [wasm.ts:188-191](file://src/utils/wasm.ts#L188-L191)
- [WasmView.vue:82-152](file://src/views/WasmView.vue#L82-L152)
- [WasmView.vue:157-206](file://src/views/WasmView.vue#L157-L206)

Implementation highlights:
- Multiple WASM modules compiled at runtime using WABT (WebAssembly Binary Toolkit).
- Arithmetic module with pre-compiled bytes for immediate instantiation.
- Fibonacci sequence calculation with iterative algorithm in both JS and WASM.
- Prime number sieve implementation demonstrating algorithmic complexity.
- Matrix multiplication with manual memory management and linear addressing.
- Comprehensive benchmarking framework with statistical analysis.

Memory and performance:
- WASM instantiation occurs once and results are cached in Vue refs.
- Linear memory management for matrix operations with careful offset calculations.
- Performance.now() provides precise timing measurements for micro-benchmarks.
- Memory dumps show actual WASM bytecode for educational purposes.

Extensibility ideas:
- Add SIMD support for vectorized operations.
- Implement threading for CPU-intensive calculations.
- Create custom WASM modules for specialized algorithms.
- Add visualization of memory layouts and register states.

**Section sources**
- [wasm.ts:1-298](file://src/utils/wasm.ts#L1-L298)
- [WasmView.vue:1-424](file://src/views/WasmView.vue#L1-L424)
- [wasm.spec.ts:1-97](file://src/components/__tests__/wasm.spec.ts#L1-L97)

### Overseas Export Tools
The export toolkit computes international trade pricing and generates a compliance checklist based on market and product attributes.

```mermaid
flowchart TD
Start(["Inputs: Costs, Rates, Exchange"]) --> Calc["calculateOverseasQuote()"]
Calc --> Metrics["EXW, FOB, CIF, Landed,<br/>Wholesale, Retail"]
Metrics --> Market["buildExportChecklist()"]
Market --> List["Market-specific + Product-specific + Incoterm notes"]
List --> Copy["Copy Summary to Clipboard"]
Copy --> End(["Done"])
```

**Diagram sources**
- [overseasExport.ts:38-64](file://src/utils/overseasExport.ts#L38-L64)
- [overseasExport.ts:66-103](file://src/utils/overseasExport.ts#L66-L103)
- [OverseasExportView.vue:23-43](file://src/views/OverseasExportView.vue#L23-L43)

Key features:
- Robust numeric guards against invalid inputs (e.g., zero exchange rate).
- Percent conversion helpers and rounding utilities.
- Dynamic checklist items based on target market, incoterms, battery inclusion, and trademark presence.

Extensibility ideas:
- Add currency conversion helpers.
- Integrate with external APIs for real-time rates and HS codes.
- Export checklist to PDF or shareable link.

**Section sources**
- [overseasExport.ts:1-104](file://src/utils/overseasExport.ts#L1-L104)
- [OverseasExportView.vue:1-399](file://src/views/OverseasExportView.vue#L1-L399)
- [overseasExport.spec.ts:1-61](file://src/components/__tests__/overseasExport.spec.ts#L1-L61)

### 3D Graphics with Three.js
The Three.js integration provides interactive 3D scenes with geometric animations, particle systems, and procedural terrain generation with enhanced styling and user interaction.

```mermaid
sequenceDiagram
participant View as "ThreeView.vue"
participant THREE as "Three.js"
participant Renderer as "WebGLRenderer"
participant Scene as "Scene"
View->>THREE : "new WebGLRenderer()"
THREE-->>View : "Renderer with antialiasing"
View->>THREE : "new Scene() + new PerspectiveCamera()"
View->>View : "buildGeometric()/buildParticles()/buildTerrain()"
View->>THREE : "new Geometry + Material + Mesh"
View->>Renderer : "render(scene, camera)"
View->>View : "requestAnimationFrame(animate)"
```

**Diagram sources**
- [ThreeView.vue:279-313](file://src/views/ThreeView.vue#L279-L313)
- [ThreeView.vue:55-63](file://src/views/ThreeView.vue#L55-L63)
- [ThreeView.vue:198-265](file://src/views/ThreeView.vue#L198-L265)

Advanced 3D techniques:
- Geometric animations with parametric surfaces and orbital mechanics.
- Particle systems using BufferGeometry for GPU-accelerated rendering.
- Procedural terrain generation with mathematical functions and vertex manipulation.
- Real-time lighting with ambient, directional, and point light sources.
- Camera controls with mouse drag orbit and auto-rotation.
- Enhanced viewport styling with gradient backgrounds and glass effects.

Scene composition:
- Multiple scene modes with lazy loading and resource cleanup.
- Dynamic geometry creation and modification during runtime.
- Performance monitoring with FPS counter and frame statistics.
- Responsive design with automatic resize handling.

Extensibility ideas:
- Add post-processing effects and shaders.
- Implement physics-based animations with Cannon.js.
- Create interactive lighting controls and environment maps.
- Add VR/AR support for immersive experiences.

**Section sources**
- [ThreeView.vue:1-429](file://src/views/ThreeView.vue#L1-L429)
- [ThreeView.d9b7aeab.css:1-2](file://docs/assets/ThreeView.d9b7aeab.css#L1-L2)
- [three.spec.ts:1-123](file://src/components/__tests__/three.spec.ts#L1-L123)

### Pretext.js Text Layout System
The Pretext.js integration demonstrates advanced text measurement and layout without DOM reflow, showcasing performance benefits and international text support.

```mermaid
sequenceDiagram
participant View as "PretextView.vue"
participant Pretext as "@chenglou/pretext"
participant Canvas as "Canvas Context"
View->>Pretext : "prepareWithSegments(text, font)"
Pretext-->>View : "PreparedTextWithSegments"
View->>Pretext : "layoutWithLines(prepared, maxWidth, lineHeight)"
Pretext-->>View : "LayoutResult {lines, height, lineCount}"
View->>Canvas : "renderTextOnCanvas(ctx, result)"
Canvas-->>View : "Visual text rendering"
View->>View : "flowTextAroundObstacle()"
View->>Pretext : "layoutNextLineRange() + materializeLineRange()"
Pretext-->>View : "FlowLine[] with x offsets"
```

**Diagram sources**
- [pretext.ts:41-65](file://src/utils/pretext.ts#L41-L65)
- [pretext.ts:76-104](file://src/utils/pretext.ts#L76-L104)
- [pretext.ts:114-120](file://src/utils/pretext.ts#L114-L120)
- [pretext.ts:131-163](file://src/utils/pretext.ts#L131-L163)
- [PretextView.vue:30-44](file://src/views/PretextView.vue#L30-L44)
- [PretextView.vue:56-93](file://src/views/PretextView.vue#L56-L93)

Text processing capabilities:
- Multilingual support with CJK, Arabic, emoji, and bidirectional text.
- Grapheme-accurate segmentation using Intl.Segmenter.
- Variable-width text flow around obstacles with dynamic width adjustment.
- Height prediction for virtualized lists without DOM measurement.
- Shrink-wrap optimization for balanced text containers.

Performance optimization:
- Zero DOM reflow with pure arithmetic layout calculations.
- Binary search algorithms for optimal width determination.
- Cached measurements and prepared text segments for repeated use.
- Efficient line range materialization for incremental rendering.

Extensibility ideas:
- Add custom typography engines and font loading.
- Implement text selection and editing capabilities.
- Create SVG and WebGL text rendering pipelines.
- Add text animation and morphing effects.

**Section sources**
- [pretext.ts:1-223](file://src/utils/pretext.ts#L1-L223)
- [PretextView.vue:1-462](file://src/views/PretextView.vue#L1-L462)
- [pretext.spec.ts:1-232](file://src/components/__tests__/pretext.spec.ts#L1-L232)

## Enhanced Styling System
The project now features a comprehensive styling architecture with dedicated CSS files for each major component, utilizing modern CSS features and design patterns.

### CSS Architecture Patterns
- **CSS Custom Properties**: Centralized design tokens for consistent theming across components.
- **Glass Morphism Effects**: Backdrop filters and transparency for modern UI elements.
- **Gradient Backgrounds**: Radial and linear gradients for visual depth and engagement.
- **Responsive Design**: Mobile-first approach with adaptive layouts and breakpoints.
- **Animation Transitions**: Smooth entrance animations and hover effects.

### Component-Specific Styling
- **TicTacToeView**: Gradient hero section, glass panel styling, and interactive cell states.
- **AboutView**: Skill chip system, responsive grid layouts, and professional typography.
- **BlogDetailView**: Deep CSS styling for markdown content, responsive tables, and reading experience.
- **CanvasView**: Dark-themed canvases with gradient overlays and interactive controls.
- **ThreeView**: Glass viewport cards, gradient hero sections, and performance badges.

### Modern CSS Features
- **CSS Grid**: Complex layouts with automatic placement and alignment.
- **Flexbox**: Flexible component arrangements and responsive behavior.
- **Custom Properties**: Dynamic theming and consistent design tokens.
- **Animations**: Entrance animations and interactive feedback.
- **Media Queries**: Responsive breakpoints for mobile and desktop optimization.

**Section sources**
- [TicTacToeView.168a724c.css:1-2](file://docs/assets/TicTacToeView.168a724c.css#L1-L2)
- [AboutView.9029727f.css:1-2](file://docs/assets/AboutView.9029727f.css#L1-L2)
- [BlogDetailView.ff86f6af.css:1-2](file://docs/assets/BlogDetailView.ff86f6af.css#L1-L2)
- [CanvasView.66b274a8.css:1-2](file://docs/assets/CanvasView.66b274a8.css#L1-L2)
- [ThreeView.d9b7aeab.css:1-2](file://docs/assets/ThreeView.d9b7aeab.css#L1-L2)

## Dependency Analysis
The interactive applications demonstrate a modular architecture with specialized dependencies and enhanced styling:

```mermaid
graph LR
TTT["TicTacToeView.vue"] --> TTU["ticTacToe.ts"]
ABOUT["AboutView.vue"] --> ABOUTU["AboutView.vue"]
BLOG["BlogDetailView.vue"] --> BLOGU["BlogDetailView.vue"]
CANV["CanvasView.vue"] --> CANVU["canvas.ts"]
WASM["WasmView.vue"] --> WASMU["wasm.ts"]
EXP["OverseasExportView.vue"] --> EXPU["overseasExport.ts"]
PRETEXT["PretextView.vue"] --> PRETEXTU["pretext.ts"]
THREE["ThreeView.vue"] --> CANVU
BLOGU --> MARKDOWN["markdown.ts"]
R["Router index.ts"] --> TTT
R --> ABOUT
R --> BLOG
R --> CANV
R --> WASM
R --> EXP
R --> PRETEXT
R --> THREE
TTT --> CSS_TTT["TicTacToeView.168a724c.css"]
ABOUT --> CSS_ABOUT["AboutView.9029727f.css"]
BLOG --> CSS_BLOG["BlogDetailView.ff86f6af.css"]
CANV --> CSS_CANV["CanvasView.66b274a8.css"]
THREE --> CSS_THREE["ThreeView.d9b7aeab.css"]
```

**Diagram sources**
- [index.ts:1-77](file://src/router/index.ts#L1-L77)
- [TicTacToeView.vue:1-145](file://src/views/TicTacToeView.vue#L1-L145)
- [AboutView.vue:1-105](file://src/views/AboutView.vue#L1-L105)
- [BlogDetailView.vue:1-245](file://src/views/BlogDetailView.vue#L1-L245)
- [CanvasView.vue:1-328](file://src/views/CanvasView.vue#L1-L328)
- [WasmView.vue:1-424](file://src/views/WasmView.vue#L1-L424)
- [OverseasExportView.vue:1-399](file://src/views/OverseasExportView.vue#L1-L399)
- [PretextView.vue:1-462](file://src/views/PretextView.vue#L1-L462)
- [ThreeView.vue:1-429](file://src/views/ThreeView.vue#L1-L429)
- [ticTacToe.ts:1-55](file://src/utils/ticTacToe.ts#L1-L55)
- [canvas.ts:1-231](file://src/utils/canvas.ts#L1-L231)
- [wasm.ts:1-298](file://src/utils/wasm.ts#L1-L298)
- [overseasExport.ts:1-104](file://src/utils/overseasExport.ts#L1-L104)
- [pretext.ts:1-223](file://src/utils/pretext.ts#L1-L223)
- [markdown.ts:1-188](file://src/utils/markdown.ts#L1-L188)

**Section sources**
- [index.ts:1-77](file://src/router/index.ts#L1-L77)

## Performance Considerations
- **Canvas demos**: Use requestAnimationFrame for smooth animations, minimize overdraw with selective clearing, implement lazy initialization for resource-heavy demos.
- **WASM**: Instantiate modules once and reuse exports, use linear memory efficiently for large datasets, implement proper error handling for unsupported browsers.
- **3D graphics**: Optimize geometry with BufferGeometry, use instancing for particle systems, implement level-of-detail scaling, leverage GPU acceleration.
- **Text layout**: Cache prepared text segments, use binary search for optimal width calculations, avoid DOM measurements in favor of arithmetic layout.
- **Tic-Tac-Toe**: Keep board updates minimal with computed properties, use reactive refs for state management.
- **Export toolkit**: Defer expensive calculations with computed properties, implement input validation to prevent unnecessary recomputation.
- **Blog system**: Optimize markdown processing with efficient regex patterns, cache processed content, implement virtual scrolling for long articles.
- **Styling system**: Minimize CSS specificity conflicts, use CSS custom properties for efficient theming, implement critical CSS for above-the-fold content.

## Troubleshooting Guide
Common issues and resolutions:

**Canvas-related problems:**
- Canvas not responding to mouse events: Ensure proper event handler attachment and coordinate transformation.
- Particle system flickering: Adjust alpha blending and trail lengths, implement proper motion blur techniques.
- Memory leaks: Clean up RAF loops and clear intervals on component unmount.

**WASM integration issues:**
- WASM instantiation errors: Verify browser support and module compilation success.
- Memory access violations: Check array bounds and proper offset calculations.
- Performance degradation: Profile memory usage and optimize data structures.

**3D graphics problems:**
- Three.js not rendering: Verify WebGL support and proper scene setup.
- Performance issues: Reduce polygon counts, implement frustum culling, optimize materials.
- Lighting artifacts: Check normal calculations and light positioning.

**Text layout issues:**
- Incorrect text measurement: Verify font loading and text preparation steps.
- International text display problems: Ensure proper Unicode handling and font fallbacks.
- Performance bottlenecks: Use caching and avoid frequent re-layout calculations.

**Blog system issues:**
- Markdown rendering failures: Verify regex patterns and escape sequences.
- Missing content: Check slug matching and data fetching logic.
- Styling conflicts: Use :deep() selectors for nested component styling.

**Styling system problems:**
- CSS not applying: Verify scoped styling and component mounting order.
- Responsive issues: Check media query breakpoints and viewport units.
- Theme inconsistencies: Ensure CSS custom property usage and fallback values.

**Section sources**
- [canvas.spec.ts:1-131](file://src/components/__tests__/canvas.spec.ts#L1-L131)
- [wasm.spec.ts:1-97](file://src/components/__tests__/wasm.spec.ts#L1-L97)
- [overseasExport.spec.ts:1-61](file://src/components/__tests__/overseasExport.spec.ts#L1-L61)
- [pretext.spec.ts:1-232](file://src/components/__tests__/pretext.spec.ts#L1-L232)
- [three.spec.ts:1-123](file://src/components/__tests__/three.spec.ts#L1-L123)

## Conclusion
The interactive applications showcase a comprehensive suite of modern web technologies with enhanced styling and functionality, demonstrating practical implementations of game logic, advanced canvas physics, WebAssembly benchmarking, international trade utilities, 3D graphics programming, sophisticated text layout systems, and comprehensive blog functionality. The project now features a mature styling architecture with dedicated CSS files for each component, utilizing modern CSS features like custom properties, glass morphism effects, and responsive design patterns. Each component emphasizes modularity, reactivity, testability, and performance while pushing the boundaries of what's possible in the browser. The extensive testing coverage ensures reliability across different scenarios and edge cases. The provided extension points enable developers to add new features, optimize performance, integrate with backend services, and create entirely new interactive experiences with the enhanced styling system and advanced functionality.