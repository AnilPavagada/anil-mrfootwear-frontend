# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Admin dashboard prototype

Run `npm run dev` and open `/admin` to manage the demo catalog, categories, gallery, and customer reviews. Admin products appear in the homepage collection, and gallery uploads appear in the homepage gallery. Catalog data is stored in this browser; uploaded images use IndexedDB. Customer reviews stay hidden from the storefront until approved and sync across open tabs on the same origin.

This dashboard is a frontend prototype, not an authenticated admin system. Replace the browser-storage operations in `src/utils/adminStorage.js` with Spring Boot API calls and add server-side authentication and authorization before production use.
