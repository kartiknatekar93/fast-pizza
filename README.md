# Fast React Pizza

A pizza ordering app. Browse the menu, add pizzas to a cart, place an order with an optional priority upgrade, and track it by order ID.

**Live demo:** https://yourpizzamania.netlify.app/  
**Repo:** (https://github.com/kartiknatekar93/fast-pizza)



## Features

- Menu loaded from an API, with sold-out handling
- Cart with add, remove, and quantity controls
- Order form with validation (name, phone, address, priority toggle)
- Address autofill using the browser's geolocation
- Order tracking by ID, with the ability to upgrade to priority
- Migrated from JavaScript to TypeScript

## Tech stack

| Area | Tools |
|---|---|
| UI | React, Vite |
| Language | TypeScript |
| Routing and data | React Router (loaders and actions) |
| State | Redux Toolkit |
| Styling | Tailwind CSS |

## How it works

- **Server data via React Router:** loaders fetch the menu and orders before the page renders, avoiding render-then-fetch waterfalls. Actions handle order submission, and `useFetcher` updates an order without navigating.
- **Client state via Redux Toolkit:** a `cart` slice (add, delete, increase and decrease quantity, clear) with selectors for totals, and a `user` slice for the name and address.
- **Async geolocation:** `createAsyncThunk` handles the address lookup with pending, fulfilled, and rejected states, including the case where the user denies permission.
- **Cart through the order form:** the cart is serialized as JSON in a hidden input, then parsed and validated in the action.
- **Clearing the cart after an order:** the action runs outside React, so it imports the store and dispatches directly.

## TypeScript migration

Migrated file by file: Redux slices, router loaders and actions, and components. Typing the app surfaced real bugs, including a `pizzaId` number/string mismatch, stale state in the search component, and a component whose name shadowed the global `Error` class.

## Design decisions and trade-offs

- **Redux Toolkit for a small app:** the cart is global (header, menu, cart page), and Redux gives predictable updates, selectors, and devtools. Cost: boilerplate. Context or Zustand would also work.
- **Loaders and actions instead of React Query:** fetching starts before render and mutations are simple. Cost: no caching or background refetch, and the app is tied to the router.
- **Server state in loaders, client state in Redux:** avoids copying server data into the store.
- **Cart in memory only:** it is lost on refresh. Persisting it would need schema handling and server-side price re-validation.
- **Prices sent from the client:** fine for a demo, but a real backend must recompute totals.

## Getting started

```bash
git clone <repo-url>
cd react-fast-pizza
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Possible improvements

- Persist the cart (localStorage) with price re-validation
- Unit tests for the cart slice and selectors, integration tests with MSW
- Schema validation for the order form (Zod)
- Optimistic updates for quantity changes
- Accessibility audit

## Credits

Built while following a React course, then extended with a full TypeScript migration and: <list anything else you changed>.
