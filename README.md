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

Run `npm run dev` and open `/admin` to manage the demo catalog, categories, gallery, and customer reviews. Admin products appear on the homepage and `/products`; categories added in admin become product-catalog filters. Built-in categories are All Collections, Men's Shoes / Slippers, Women's Shoes / Slippers, Sports Shoes / Slippers, Kids Shoes / Slippers, School Shoes / Slippers, and Casual & Formal. The fixed WhatsApp button opens +91 9449632966 with the name, SKU, category, price, stock, and description pre-filled. The separate image action shares the image and product details through the browser share sheet when supported; otherwise it copies or downloads the image for attachment to the fixed chat. Gallery uploads appear in the homepage gallery. Catalog data is stored in this browser; uploaded images use IndexedDB. Customer reviews stay hidden from the storefront until approved and sync across open tabs on the same origin.

Open `/products` to browse the catalog by category, search products, and sort by price. The page uses the same browser-stored catalog as the admin dashboard.

This dashboard is a frontend prototype, not an authenticated admin system. Replace the browser-storage operations in `src/utils/adminStorage.js` with Spring Boot API calls and add server-side authentication and authorization before production use.
