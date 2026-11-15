# BukanLapak

A Bukalapak-style product management page built for a Web Programming course assignment. Written with React + Vite and plain CSS, with no UI libraries.

## Features

- Product list (ID, name, price in Rupiah)
- Add, edit, and delete products through pop-up dialogs
- Search products by name
- Product counter and an empty state when no search result matches

## Getting Started

```bash
bun install
bun run dev
```

Open `http://localhost:5173`. Or use `npm install --include=dev` and `npm run dev`.

Production build:

```bash
bun run build
```

## Structure

```
src/
  main.jsx               entry point
  App.jsx                main page and product state
  data.js                seed data, Rupiah formatter, ID generator
  index.css              all styling
  components/
    ProductCard.jsx      product card
    Modal.jsx            overlay and dialog wrapper
    ProductForm.jsx      add/edit product form
    DeleteDialog.jsx     delete confirmation
```

## Notes

Products are kept in React state only, so refreshing the page restores the list to the 5 seeded products. The logo and favicon come from bukalapak.com's favicon.
