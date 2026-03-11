import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";

const targetElement = document.getElementById("app");

if (!targetElement) {
  throw new Error("Elemen dengan id 'app' tidak ditemukan!");
}

// Cara render (mount) khusus untuk Svelte 5
const app = mount(App, {
  target: targetElement,
});

export default app;
