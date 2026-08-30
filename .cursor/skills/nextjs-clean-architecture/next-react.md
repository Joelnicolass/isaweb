# Next.js 16 / React 19 — patrones para Vintta

Leer este archivo al implementar fetch, mutaciones, `Suspense`, cache o al decidir `"use client"`. Las reglas duras están en [SKILL.md](SKILL.md).

Docs locales: `node_modules/next/dist/docs/01-app/`. Canónico: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components), [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache), [Server Actions](https://nextjs.org/docs/app/guides/server-actions).

## 1. Dónde va `"use client"`

```
app/page.tsx              RSC — fetch + composición
presentation/sections/X   RSC si no hay estado/GSAP/VM
presentation/sections/Y   "use client" en la View que llama al ViewModel
presentation/components/ui/*   sin directiva (átomo puro)
```

`"use client"` marca un **boundary de módulo**: todo lo que ese archivo importa entra al bundle cliente. No hace falta repetirlo en los hijos.

```tsx
// page.tsx — RSC
const products = await useCases.getFeaturedProducts();
return (
  <section>
    <h1>{t("headline")}</h1>          {/* shell / RSC */}
    <ProductCatalog products={products} />  {/* client leaf */}
  </section>
);
```

Si un layout/section es 90% estático y 10% interactivo, extraer el 10% a su propia View+ViewModel. No contaminar el padre.

**Providers de context:** Client Component que solo envuelve `children` (el resto del árbol sigue siendo RSC).

## 2. Composición RSC dentro de client (slots)

El client **no importa** Server Components. Los recibe como `children` (u otro slot) desde un padre RSC:

```tsx
// Modal.tsx — "use client"
export function Modal({ children }: { children: React.ReactNode }) { /* ... */ }

// page.tsx — RSC
<Modal>
  <ServerCart />  {/* se renderiza en el server; el payload RSC llega como slot */}
</Modal>
```

Usar esto cuando un island (header compacto, modal, tabs) deba envolver contenido que no necesita JS.

## 3. Datos: lecturas

| Caso | Dónde | Cómo |
|------|--------|------|
| Listado / detalle | `app/**/page.tsx` | `await useCases.xxx()` |
| Varias fuentes | page | `Promise.all([useCases.a(), useCases.b()])` |
| Stream hacia un client | page pasa `Promise`; View usa `use(promise)` | React 19 `use()` |
| Lectura inicial en cliente | **prohibido** | ni `useEffect`, ni fetch en el VM |

`params` y `searchParams` son `Promise<>`. Await **dentro** del componente que los consume. No await de `searchParams` (ni `useSearchParams()`) en un layout compartido sin `Suspense`.

```tsx
export default function Page(props: { searchParams: Promise<{ q?: string }> }) {
  return (
    <>
      <CatalogHeader />
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogResults searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}
```

`generateStaticParams` para params enumerables (locales, slugs conocidos) → `await params` entra al shell.

## 4. Datos: mutaciones (Server Actions)

Archivo en `app/` (o colocalizado a la ruta) con `'use server'` a nivel archivo. Llama usecases vía `core/di`. Trata cada action como endpoint público: validar input, no confiar en el cliente.

```ts
// src/app/[locale]/actions/subscribe.ts
"use server";

import { useCases } from "@/core/di";

export async function subscribeNewsletter(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  await useCases.subscribe(email);
}
```

La page (RSC) pasa la action como prop (referencia serializable). El ViewModel usa `useActionState` / `useFormStatus` / `useOptimistic`. La View renderiza `<form action={vm.action}>`.

- No usar Server Actions para lecturas.
- No paralelizar actions desde el cliente con `Promise.all` (Next las serializa). Paralelizar *dentro* de una sola action si hace falta.
- Tras mutar: `updateTag` (el usuario debe ver su write) o `revalidatePath`. `revalidateTag(tag, 'max')` es stale-while-revalidate (no re-render inmediato).

## 5. Suspense y shell

Objetivo: el contenido estable pinta ya; lo per-request stream-ea.

- Bajar el `<Suspense>` hasta el read que lo justifica. Un boundary que envuelve la page entera deja un shell vacío.
- El LCP (headline, hero image) **fuera** del boundary.
- `cookies()` / `headers()` no se await-ean en el layout raíz; se pasan como Promise a un hijo con `Suspense`.
- Fallbacks reutilizan el loading UI del feature (`styles.ts` + skeleton), no un `fallback={null}` que deja el shell en blanco.

Esto deja el código listo para Cache Components / PPR sin activar el flag todavía.

## 6. Cache (cuando `cacheComponents: true`)

Hoy el flag está **off**. No encenderlo sin pedido del usuario. Si se activa, o al escribir código a prueba de futuro:

- `"use cache"` lo más cerca del I/O: datasource o wrapper en `core/di.ts`. **Nunca** en domain ni en presentation.
- Domain sigue puro (testeable sin Next).
- Todo scope `"use cache"` es `async` y declara `cacheLife('hours' | 'days' | 'max' | …)` explícito. No dejar el default implícito.
- `cacheTag('products')` en el mismo scope. Invalidar desde la Server Action.
- No leer `cookies()` / `headers()` / `searchParams` **dentro** de `"use cache"`. Leer afuera y pasar valores como argumentos.
- `"use cache: private"` solo si el dato es per-session y no se puede refactorizar a args.
- Verificar cache bajo `next start`, no solo `next build` (un `cookies()` oculto pasa el build y revienta en request).

Adopción completa: skill oficial [next-cache-components-adoption](https://github.com/vercel/next.js/tree/canary/skills/next-cache-components-adoption). Optimizar el shell: [next-cache-components-optimizer](https://github.com/vercel/next.js/tree/canary/skills/next-cache-components-optimizer). Prefetch: [next-partial-prefetching-adoption](https://github.com/vercel/next.js/tree/canary/skills/next-partial-prefetching-adoption).

## 7. I/O no determinista en RSC

`Date.now()`, `new Date()`, `Math.random()`, `crypto.randomUUID()` en page/layout rompen el prerender.

- Mismo valor para todos → función `"use cache"` (cuando el flag exista).
- Valor per-request → `await connection()` de `next/server` dentro de un hijo envuelto en `Suspense`.

## 8. React 19 en presentation

| API | Uso |
|-----|-----|
| `use(promise)` | Unwrap en Client Component. En RSC: `await`. |
| `useActionState` | Estado de form + action en el ViewModel. |
| `useFormStatus` | Pending del `<form>` ancestro (átomo de submit). |
| `useOptimistic` | UI optimista en el ViewModel tras una action. |
| `ref` | Prop normal. Prohibido `forwardRef`. |
| `<Activity>` | Lo usa Next con Cache Components. No envolver rutas a mano. |
| Compiler | Ya on. Sin `useMemo`/`useCallback`/`memo` salvo GSAP o bailout. |

GSAP y libs que exigen identidad estable de callbacks: documentar el `useCallback` en el hook de `animations/`.

## 9. i18n en RSC vs client

- RSC: `getTranslations` / `setRequestLocale` (pages y layouts).
- Client View: `useTranslations`.
- No convertir una View en client solo por i18n: si no hay VM/GSAP/estado, la View es RSC y usa `getTranslations` (pasado desde la page o llamado en un async Server Component).

## 10. Checklist rápido

- [ ] ¿La page es `"use client"`? → partir el island.
- [ ] ¿Un átomo de `ui/` tiene `"use client"` sin estado propio? → quitarlo.
- [ ] ¿El ViewModel fetch-ea? → subir la lectura a la page/usecase.
- [ ] ¿Hay `useEffect` de carga inicial? → RSC + props.
- [ ] ¿`searchParams` / `cookies` await-eados en el layout? → hijo + `Suspense`.
- [ ] ¿`useMemo` nuevo? → ¿el compiler no basta? ¿es GSAP?
- [ ] ¿Mutación por Route Handler + fetch cliente? → Server Action.
