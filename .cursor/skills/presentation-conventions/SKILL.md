---
name: presentation-conventions
description: Convenciones MVVM de la capa presentation en Vintta — Views puras (RSC por defecto), ViewModel como custom hook en la hoja client, cero literales, UI atómica, React 19 (use, useActionState, ref), i18n, GSAP. Usar siempre que se cree o modifique UI, layout, sections o ViewModels en src/presentation.
---

# Presentation conventions (Vintta) — MVVM

Prioridad: **componentes puros (UI)** + **ViewModel como custom hook**. La View no decide; el ViewModel sí. Los literales no viven en el JSX.

Respeta clean architecture: presentation importa `domain` (entities) y `shared`. Nunca `data/` ni `core/di`. Ver `.cursor/skills/nextjs-clean-architecture/SKILL.md` y `.cursor/skills/nextjs-clean-architecture/next-react.md`.

## MVVM

| Pieza | Qué es | Dónde |
|-------|--------|--------|
| **Model** | Entities de domain recibidas por props | No se redefine en presentation |
| **View** | JSX + i18n (`getTranslations` en RSC, `useTranslations` en client) | `Nombre.tsx` |
| **ViewModel** | Custom hook: estado, derivados, comandos, refs, anima | `use-nombre-view-model.ts` |

```
app/page.tsx (RSC)  --entities + actions-->  View
                                              |  RSC si no hay estado
                                              |  "use client" si hay ViewModel
                                         useXxxViewModel()
                                              |
                                         UI pura (atoms, sin directiva)
```

### Cuándo hay ViewModel

- **Obligatorio** en sections y layouts con estado, datos derivados, handlers o refs de animación.
- **Prohibido** en UI atómica pura (`components/ui/*`): esos componentes solo reciben props y renderizan.

### Contrato del ViewModel

Archivo `use-{nombre}-view-model.ts`. Export `use{Nombre}ViewModel`. Tipo de retorno en `types.ts` (`{Nombre}ViewModel`).

El hook:

- Recibe el Model (props/entities y, si hay, la Server Action) y expone `{ ...estadoDeVista, ...comandos }`.
- Posee `useState` / `useRef` / derivados / handlers. Forms: `useActionState` / `useOptimistic`. Unwrap de Promise: `use()`.
- Compone hooks de `presentation/animations/hooks`.
- **No** retorna JSX, **no** contiene classNames ni copy, **no** importa `data/` ni `core/di`, **no** llama usecases, **no** hace fetch/`useEffect` de carga.
- **No** se exporta en el barrel: es privado de la View.

La View:

- Llama `const vm = useXxxViewModel(props)` y renderiza.
- Puede usar `useTranslations` / `getTranslations`.
- **No** usa `useState`, **no** filtra/deriva datos, **no** arma handlers inline con lógica.

```tsx
// use-product-catalog-view-model.ts
export function useProductCatalogViewModel({ products }: ProductCatalogProps): ProductCatalogViewModel {
  const [filter, setFilter] = useState(ProductCategoryFilter.All);
  const visible = filter === ProductCategoryFilter.All
    ? products
    : products.filter((p) => p.category === filter);
  const scope = useRef<HTMLDivElement>(null);
  useStaggerMount(scope, `[${DataAttr.Card}]`, [filter]);
  return { scope, filter, setFilter, visible, filters: PRODUCT_FILTERS };
}

// ProductCatalog.tsx — View pura
export function ProductCatalog(props: ProductCatalogProps) {
  const vm = useProductCatalogViewModel(props);
  const t = useTranslations("products");
  return ( /* solo JSX leyendo vm + t + s */ );
}
```

## Estructura por unidad

Cada UI, layout o section vive en su carpeta kebab-case:

```
src/presentation/sections/product-catalog/
  ProductCatalog.tsx                    # View
  use-product-catalog-view-model.ts     # ViewModel (si aplica)
  types.ts
  constants.ts
  styles.ts
  utils.ts                              # helpers puros (si aplica)
  index.ts                              # API pública: View + tipos. NUNCA el ViewModel.
```

Crear cada archivo en cuanto exista ese tipo de valor. No dejar literales “mientras tanto” en el `.tsx`. No crear archivos vacíos.

UI atómica (`components/ui/button/`): `Button.tsx` + `types` / `constants` / `styles` / `utils` + barrel. Sin ViewModel y **sin `"use client"`** salvo que el átomo tenga estado propio.

## Capas internas de presentation

```
presentation/
  components/ui/*/          # Átomos puros (props in, JSX out)
  components/layout/*/      # Header, Footer… View + ViewModel si hay estado
  sections/*/               # View + ViewModel
  animations/
    gsap.ts                 # ÚNICO registro de plugins
    hooks/                  # Hooks reutilizables de animación
  shared/                   # Solo attrs/constantes de presentation (DataAttr)
```

## Cero literales en componentes

Prohibido en `*.tsx` de presentation:

| Literal | Destino |
|---------|---------|
| className string (`"flex gap-4"`) | `styles.ts` |
| copy / aria labels en crudo | `messages/*.json` + `useTranslations` |
| variantes, tones, filtros, ids | `enum` en `constants.ts` |
| números mágicos (width, delay, z-index) | `constants.ts` |
| src de imagen, href, sizes | `constants.ts` o `shared/site` |
| selectores, config de animación local | `constants.ts` |
| helpers / mapeos | `utils.ts` |
| props e interfaces | `types.ts` |

Excepciones: `className={s.x}` / `cn(s.x, className)` para composición en átomos; `ColorSwatch` con hex dinámico de dominio.

`style={{...}}` prohibido en views. Tailwind solo en `styles.ts`.

Preferir `enum` sobre `as const`. Objetos `as const` solo si el enum no aporta.

## Server first / client leaf

- View **sin** ViewModel, sin GSAP y sin handlers = Server Component (`async` + `getTranslations` si hace falta). No agregar `"use client"` por i18n.
- View **con** ViewModel = único `"use client"` del feature. Es la hoja. El page/layout padre sigue siendo RSC y le pasa entities (y actions) serializables.
- Átomos sin directiva. Si un padre client los importa, entran al bundle; si un padre server los importa, siguen RSC.
- Anidar RSC dentro de un island: slots (`children`), no importar el Server Component desde el archivo client.
- `ref` es prop (React 19). Prohibido `forwardRef`.
- React Compiler on: no `useMemo` / `useCallback` / `React.memo` salvo GSAP o bailout documentado.
- Pending de navegación: preferir APIs de Next (`useLinkStatus`) antes de estado local.

## UI pura (átomos)

`components/ui/*` son tontos y reutilizables:

- Solo props. Sin `useState`, sin fetch, sin ViewModel, sin entidades de dominio salvo que el átomo exista para mostrarlas (`ProductCard`).
- Copy entra por `children` o props ya resueltas por la View (o `getTranslations` si el átomo es RSC).
- Variantes vía enum + mapa en `styles.ts` (ver `button/`).
- `useFormStatus` es la excepción válida en un átomo de submit (lee el `<form>` ancestro; no guarda estado propio).

## Reglas duras

1. **Textos**: solo `next-intl`. Prohibido copy hardcodeado en JSX.
2. **Literales**: ver tabla. Nada mágico en el `.tsx`.
3. **Estilos**: `styles.ts` + Tailwind. Sin `style={{...}}` (excepción: `ColorSwatch`).
4. **GSAP**: prohibido importar `gsap` / `useGSAP` / plugins fuera de `presentation/animations/**`.
5. **Pureza**: átomos stateless; sections/layouts sin estado local — el estado va al ViewModel.
6. **Client leaf**: `"use client"` solo en la View que usa el ViewModel (o GSAP). Nunca en pages ni en átomos sin estado.
7. **Naming**: carpetas kebab-case; componentes PascalCase; ViewModel `useXxxViewModel`.
8. **Barrels**: exportan View + tipos/enums públicos. No exportan el ViewModel ni `styles`.
9. **Imports**: `@/presentation/sections/hero`, `@/presentation/components/ui/button`.

## Animaciones

- Registrar plugins una sola vez en `animations/gsap.ts`.
- Reutilizar hooks de `animations/hooks/` antes de crear uno local.
- La ViewModel (o el átomo animado, si no hay VM) llama al hook; la View no importa GSAP.
- Respetar `MOTION_QUERIES` / `prefers-reduced-motion` dentro de los hooks.

## i18n

- Locale default `es`, `localePrefix: 'as-needed'`.
- Namespaces por feature en `messages/es.json`.
- Contenido de dominio (productos, FAQs, pasos) no se traduce en presentation; solo copy de UI.
- Keys de traducción pueden vivir en `constants.ts` (`labelKey`); el string traducido se resuelve en la View.
- View RSC: `getTranslations`. View client: `useTranslations`. No marcar client solo para traducir.

## Checklist antes de terminar UI

- [ ] ¿La View tiene `useState` o lógica derivada? → mover al ViewModel.
- [ ] ¿Hay un className/string/número en el `.tsx`? → `styles.ts` / `constants.ts`.
- [ ] ¿Un átomo de `ui/` tiene estado, fetch o `"use client"` innecesario? → extraer / quitar.
- [ ] ¿El ViewModel importa `data/` o `core/di`, o fetch-ea? → los datos y actions entran por props.
- [ ] ¿El barrel exporta el ViewModel? → no.
- [ ] ¿`"use client"` está en la page o en un padre que podría seguir siendo RSC? → bajar el boundary.
- [ ] ¿Hay `useMemo`/`useCallback`/`forwardRef`? → compiler / `ref` prop.
