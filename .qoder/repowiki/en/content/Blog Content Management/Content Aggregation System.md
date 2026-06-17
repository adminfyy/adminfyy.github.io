# Content Aggregation System

<cite>
**Referenced Files in This Document**
- [blogPosts.ts](file://src/utils/blogPosts.ts)
- [blog.json](file://src/mock/blog.json)
- [vite.config.ts](file://vite.config.ts)
- [config.ts](file://vdocs/.vuepress/config.ts)
- [README.md](file://vdocs/blog/README.md)
- [mediator-pattern.md](file://vdocs/blog/mediator-pattern.md)
- [publish-subscribe.md](file://vdocs/blog/publish-subscribe.md)
- [Mediator.md](file://pattern/Mediator.md)
- [Observer.js](file://pattern/Observer.js)
- [Observer.html](file://pattern/Observer.html)
- [Publish.js](file://pattern/Publish.js)
- [HomeView.vue](file://src/views/HomeView.vue)
- [BlogDetailView.vue](file://src/views/BlogDetailView.vue)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)

## Introduction
This document explains the content aggregation system that dynamically collects, processes, and unifies blog posts from multiple sources. It focuses on:
- Vite's glob import mechanism for discovering pattern files (MD/JS/HTML) and VuePress documentation files
- Seed data integration from mock JSON
- Unified data structure creation and retrieval APIs
- Examples for extending the system with new content sources and configuring glob patterns

The system consolidates content from three distinct sources into a single BlogPost interface, enabling consistent rendering and navigation across the application.

## Project Structure
The content aggregation system spans three primary areas:
- Pattern directory: MD/JS/HTML files under `/pattern`
- VuePress documentation: MD files under `/vdocs/blog`
- Mock seed data: JSON array under `/src/mock/blog.json`

```mermaid
graph TB
subgraph "Pattern Source (/pattern)"
P1["Mediator.md"]
P2["Observer.js"]
P3["Observer.html"]
P4["Publish.js"]
end
subgraph "VuePress Docs (/vdocs/blog)"
V1["README.md"]
V2["mediator-pattern.md"]
V3["publish-subscribe.md"]
end
subgraph "Mock Seed (/src/mock)"
M1["blog.json"]
end
subgraph "Aggregation Engine (src/utils)"
U1["blogPosts.ts"]
end
P1 --> U1
P2 --> U1
P3 --> U1
P4 --> U1
V1 --> U1
V2 --> U1
V3 --> U1
M1 --> U1
```

**Diagram sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)
- [Mediator.md](file://pattern/Mediator.md)
- [Observer.js](file://pattern/Observer.js)
- [Observer.html](file://pattern/Observer.html)
- [Publish.js](file://pattern/Publish.js)
- [README.md](file://vdocs/blog/README.md)
- [mediator-pattern.md](file://vdocs/blog/mediator-pattern.md)
- [publish-subscribe.md](file://vdocs/blog/publish-subscribe.md)
- [blog.json](file://src/mock/blog.json)

**Section sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)
- [vite.config.ts](file://vite.config.ts)
- [config.ts](file://vdocs/.vuepress/config.ts)

## Core Components
The aggregation engine is implemented in a single TypeScript module that:
- Discovers files via Vite's import.meta.glob
- Normalizes filenames and extracts metadata
- Strips markdown formatting for excerpts
- Builds a unified BlogPost array with source tagging

Key exports:
- getAllBlogPosts(): Returns the aggregated list
- getBlogPostBySlug(slug): Retrieves a post by its slug
- getBlogStats(): Provides counts per source

Processing pipeline highlights:
- Pattern files: Raw content ingestion with category derived from file extension
- VuePress files: Markdown title extraction, filtering of index page
- Seed data: Iterative mapping with generated slugs

**Section sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)

## Architecture Overview
The system uses Vite's compile-time glob imports to statically bundle content, ensuring fast runtime access and predictable builds.

```mermaid
sequenceDiagram
participant Vite as "Vite Build"
participant GlobP as "import.meta.glob('/pattern/*.{md,js,html}')"
participant GlobV as "import.meta.glob('/vdocs/blog/*.md')"
participant Engine as "blogPosts.ts"
participant View as "HomeView.vue / BlogDetailView.vue"
Vite->>GlobP : Resolve pattern files
Vite->>GlobV : Resolve VuePress files
GlobP-->>Engine : Raw content map
GlobV-->>Engine : Raw content map
Engine->>Engine : Normalize titles, extract excerpts, build BlogPost[]
View->>Engine : getAllBlogPosts(), getBlogPostBySlug(), getBlogStats()
Engine-->>View : Unified BlogPost[] and helpers
```

**Diagram sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)
- [HomeView.vue](file://src/views/HomeView.vue)
- [BlogDetailView.vue](file://src/views/BlogDetailView.vue)

## Detailed Component Analysis

### Vite Glob Import Mechanism
- Pattern files: import.meta.glob('/pattern/*.{md,js,html}', { as: 'raw', eager: true })
- VuePress files: import.meta.glob('/vdocs/blog/*.md', { as: 'raw', eager: true })
- Behavior: Eager loading bundles content at build time; raw strings are returned for direct consumption

Configuration context:
- Vite resolves aliases and outputs to the docs directory for static hosting

**Section sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)
- [vite.config.ts](file://vite.config.ts)

### Pattern Directory Files (MD/JS/HTML)
- Discovery: All files matching the pattern are collected
- Normalization: Titles derived from filenames; categories reflect file extensions
- Excerpts: Generated by stripping markdown formatting and truncating to a fixed length
- Content: Raw file content preserved for downstream rendering

Representative files:
- Design pattern explanations and examples in MD
- JavaScript implementations in JS
- HTML demonstrations in HTML

**Section sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)
- [Mediator.md](file://pattern/Mediator.md)
- [Observer.js](file://pattern/Observer.js)
- [Observer.html](file://pattern/Observer.html)
- [Publish.js](file://pattern/Publish.js)

### VuePress Blog Markdown Files
- Discovery: All MD files under the blog directory
- Filtering: README.md excluded from the feed to avoid duplication with the index
- Title extraction: Uses the first markdown heading when present; falls back to filename normalization
- Category: Standardized to a fixed category for blog entries
- Content: Full markdown content for rendering

**Section sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)
- [README.md](file://vdocs/blog/README.md)
- [mediator-pattern.md](file://vdocs/blog/mediator-pattern.md)
- [publish-subscribe.md](file://vdocs/blog/publish-subscribe.md)
- [config.ts](file://vdocs/.vuepress/config.ts)

### Mock Seed Data
- Source: JSON array with title/content pairs
- Processing: Iterative mapping to BlogPost with generated slugs and a fixed category
- Purpose: Enables quick prototyping and testing without external sources

**Section sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)
- [blog.json](file://src/mock/blog.json)

### Unified Data Structure Creation
The system creates a normalized BlogPost interface with:
- id: Unique identifier combining source and path/index
- slug: URL-friendly identifier derived from title/path
- title: Extracted from markdown headers or filename
- category: Source-specific taxonomy
- excerpt: Cleaned plaintext preview
- content: Raw content for rendering
- source: One of 'vdocs', 'pattern', or 'seed'

```mermaid
flowchart TD
Start(["Start Aggregation"]) --> LoadP["Load Pattern Files<br/>import.meta.glob(...)"]
Start --> LoadV["Load VuePress Files<br/>import.meta.glob(...)"]
Start --> LoadS["Load Seed Data<br/>blog.json"]
LoadP --> NormalizeP["Normalize Titles<br/>Strip Extensions"]
NormalizeP --> ExcerptP["Generate Excerpts<br/>Strip Markdown"]
ExcerptP --> BuildPP["Build Pattern Posts<br/>with source='pattern'"]
LoadV --> FilterV["Filter Index Page<br/>Exclude README.md"]
FilterV --> TitleV["Extract First Heading<br/>Fallback to Filename"]
TitleV --> ExcerptV["Generate Excerpts"]
ExcerptV --> BuildVP["Build VuePress Posts<br/>with source='vdocs'"]
LoadS --> ExcerptS["Generate Excerpts"]
ExcerptS --> BuildSP["Build Seed Posts<br/>with source='seed'"]
BuildPP --> Merge["Merge All Posts"]
BuildVP --> Merge
BuildSP --> Merge
Merge --> Export["Export getAllBlogPosts()<br/>getBlogPostBySlug()<br/>getBlogStats()"]
```

**Diagram sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)

**Section sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)

### Runtime Usage in Views
- HomeView.vue: Displays featured posts, full list, and statistics
- BlogDetailView.vue: Renders selected post content and related articles

**Section sources**
- [HomeView.vue](file://src/views/HomeView.vue)
- [BlogDetailView.vue](file://src/views/BlogDetailView.vue)

## Dependency Analysis
The aggregation module depends on:
- Pattern files and VuePress files discovered via Vite globs
- Mock seed data imported as JSON
- Utility functions for markdown cleaning and slug generation

```mermaid
graph LR
BP["blogPosts.ts"] --> PAT["Pattern Files (/pattern)"]
BP --> VDOCS["VuePress Files (/vdocs/blog)"]
BP --> SEED["Seed Data (/src/mock/blog.json)"]
BP --> UTIL["Utility Functions<br/>normalizeTitle / slugify / stripMarkdown / toExcerpt"]
```

**Diagram sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)

**Section sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)

## Performance Considerations
- Eager glob loading: Ensures zero runtime fetch overhead; content is bundled at build time
- Raw string handling: Reduces parsing cost during runtime
- Efficient excerpt generation: Single pass cleaning with regex replacements
- Slug generation: Lightweight normalization suitable for large catalogs

## Troubleshooting Guide
Common issues and resolutions:
- Missing content after adding files:
  - Verify glob patterns match new files and are placed under the expected directories
  - Confirm eager loading does not cause bundling errors
- Incorrect titles or excerpts:
  - For VuePress files, ensure the first heading exists or rely on filename fallback
  - For pattern files, confirm filenames are descriptive and free of special characters
- Slug conflicts:
  - Review slug generation rules and adjust titles to avoid duplicates
- Build failures:
  - Check Vite configuration for alias correctness and output directory alignment

**Section sources**
- [blogPosts.ts](file://src/utils/blogPosts.ts)
- [vite.config.ts](file://vite.config.ts)

## Conclusion
The content aggregation system leverages Vite's glob imports to unify diverse content sources into a cohesive BlogPost model. By normalizing titles, generating excerpts, and tagging sources, it enables consistent presentation and navigation. Extending the system involves adding new glob patterns and ensuring content conforms to the unified structure.