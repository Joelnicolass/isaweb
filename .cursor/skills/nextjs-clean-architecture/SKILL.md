---
name: nextjs-clean-architecture
description: Arquitectura clean domain-data-presentation para Next.js 16 (App Router) y React 19 — Server Components, client leaves, Cache Components, Server Actions. Usar siempre que se cree o modifique código en este proyecto — entities, repositorios, usecases, datasources, ViewModels, componentes o páginas.
---

# Clean Architecture en Next.js (domain-data-presentation)

Prioridad: **escalabilidad**. Cada feature nuevo debe poder agregarse sin romper capas, sin atajos y sin filtrar DTOs ni reglas de negocio hacia la UI.

Stack: Next.js 16 App Router + React 19. Server Components por defecto. `reactCompiler: true` ya está en `next.config.ts`. Detalle de APIs: [next-react.md](next-react.md). Presentation es MVVM: `.cursor/skills/presentation-conventions/SKILL.md`.

## Estructura de carpetas

```
src/
  app/            # Routing + composition (RSC). Llama usecases y Server Actions; renderiza Views.
  core/
    di.ts         # Composition root: instancia repos de data e inyecta en usecases de domain.
  domain/
    entities/     # Tipos del negocio. Sin I/O, sin React, sin Next, sin librerías de UI.
    repositories/ # Contratos. Solo tipos de domain.
    usecases/     # Funciones puras (repo, args) => Promise<...>. Única API de domain.
  data/
    datasources/  # I/O crudo. Devuelven DTOs. Aquí (o en di) vive "use cache" si aplica.
    dtos/         # Formas externas. Nunca salen de data.
    mappers/      # DTO -> entity de domain.
    repositories/ # Implementaciones de domain/repositories.
  presentation/   # MVVM. Views RSC por defecto; client solo en la hoja interactiva.
  i18n/
  shared/         # Solo transversales (cn, formatPrice, nav global). No es cajón de feature.
```

## Regla de dependencias (solo hacia adentro)

```
app  →  core/di + presentation + domain (tipos)
presentation  →  domain (entities/tipos) + shared     NUNCA data, NUNCA core/di
data          →  domain + shared
domain        →  nada
core/di.ts    →  único puente domain ↔ data
```

- `domain` no importa de NINGUNA otra capa ni de React/Next.
- `presentation` y `app` nunca importan `data/` (ni DTOs, ni repos concretos, ni datasources).
- ViewModels no llaman usecases ni `core/di`. Los datos llegan por props (entities) desde RSC en `app/`.
- Server Actions viven en `app/` (composition). La page las pasa como prop a la View. Presentation no importa `core/di`.
- `shared/` no depende de domain/data/presentation. Si un valor es de un feature, vive en ese feature.

## Escalabilidad: receta de un feature

No saltear capas aunque el feature sea chico. Orden:

1. **Entity** en `domain/entities` (si es un concepto de negocio nuevo).
2. **Contrato** en `domain/repositories`.
3. **Usecase(s)** en `domain/usecases` — toda regla de negocio vive acá.
4. **data**: DTO + mapper + datasource + implementación del repo.
5. **Cablear** en `core/di.ts`.
6. **Page (RSC)** en `app/`: `await useCases.xxx()` (o `Promise.all`) y pasar **entities** a la View.
7. **Mutación** (si hay): Server Action en `app/` que llama usecases vía `di`; la page la pasa a la View.
8. **presentation**: View RSC si es estática; View + ViewModel (`"use client"`) solo en la hoja interactiva.

Cambiar de JSON local a API/Tienda Nube = solo `data` + `di`. Domain, app y presentation no cambian.

## Qué va en cada capa

| Capa | Sí | No |
|------|----|----|
| domain | entidades, contratos, reglas | React, Next, fetch, Tailwind, DTOs, `"use cache"` |
| data | I/O, DTOs, mappers, `"use cache"` cerca del I/O | JSX, next-intl, lógica de UI |
| presentation | View, ViewModel, UI pura, i18n, GSAP en `animations/` | DTOs, repos, usecases, `core/di`, fetch |
| app | rutas, `setRequestLocale`, fetch vía `useCases`, Server Actions, `Suspense`, componer Views | estado de UI, classNames, copy hardcodeado, import de `data/` |
| shared | utilidades y constantes realmente globales | constantes de un section/componente |

Filtro de catálogo ya cargado en cliente → ViewModel (estado de UI).  
“Productos featured” / “por categoría” desde fuente de datos → usecase.  
Submit de formulario → Server Action + usecase. Nunca `fetch` desde el ViewModel.

## Lineamientos Next.js 16 / React 19

Reglas duras. El resto (patrones, Suspense, cache, actions) está en [next-react.md](next-react.md).

1. **RSC por defecto.** Pages, layouts y Views sin estado son Server Components. `async` cuando leen datos o `params`.
2. **`"use client"` es una hoja.** Solo donde hay estado, efectos, GSAP, browser APIs o un ViewModel. Nunca en `page.tsx` / `layout.tsx`. Empujar el boundary lo más abajo posible.
3. **Átomos (`components/ui/*`) sin `"use client"`** salvo que el átomo mismo necesite estado. Un padre client los arrastra al bundle; un padre server los mantiene RSC.
4. **Datos solo en servidor.** Pages (o Server Actions) llaman usecases. Prohibido `useEffect` + fetch, SWR/React Query para lecturas iniciales, o ViewModel que hable con `data/`.
5. **Props serializables** en el boundary RSC → client: entities, primitivos, Server Action refs. No funciones de dominio, no class instances, no Symbols.
6. **Slots:** el Client Component recibe `children` (u otros slots) para anidar UI server-rendered. El client no importa RSC.
7. **`params` / `searchParams` son `Promise<>`.** Await en un hijo, no bloquear el layout entero. `searchParams` detrás de `Suspense`.
8. **`use()`** (React 19): solo en Client Components para unwrappear una Promise pasada desde el server. En RSC se usa `await`.
9. **Lecturas en paralelo:** `Promise.all([useCases.a(), useCases.b()])` en la page. No waterfalls.
10. **Mutaciones = Server Actions** (`"use server"`). Formularios: `action={...}` + `useActionState` / `useFormStatus` / `useOptimistic` en el ViewModel. No Route Handlers para forms de UI.
11. **React Compiler está on.** No agregar `useMemo` / `useCallback` / `React.memo` salvo bailout del compiler o identidad referencial exigida por GSAP.
12. **React 19:** `ref` es una prop (no `forwardRef`). Context solo en un Client provider que reciba `children`.
13. **Sin I/O no determinista en RSC** (`Date.now()`, `Math.random()`, `crypto.randomUUID()`) a nivel de page/layout. Ver [next-react.md](next-react.md).
14. **No exportar** `dynamic` / `revalidate` / `fetchCache` en segmentos. Son incompatibles con Cache Components (Next 16).
15. **No activar** `cacheComponents` ni `partialPrefetching` salvo pedido explícito. Escribir el código *compatible* con ese modelo (puntos 7, 13, 14).

Docs versionadas: `node_modules/next/dist/docs/`. Skills oficiales de adopción (no copiar el playbook entero): [vercel/next.js/skills](https://github.com/vercel/next.js/tree/canary/skills).

## Convenciones

- Archivos kebab-case (`product-repository.ts`), componentes PascalCase (`ProductCard.tsx`).
- Entities: tipos/interfaces inmutables; sin clases con lógica salvo necesidad real.
- Usecases: `(repo, args) => Promise<...>` — testeables sin Next ni React.
- Un concepto de negocio nuevo no se modela como prop suelta en un `.tsx`. Empieza en domain.
- Copy de UI: `next-intl`. Contenido de dominio: `data/`.
- Imágenes: `next/image`, assets en `public/images`.
- GSAP solo en `presentation/animations`. Views no importan `gsap`.
