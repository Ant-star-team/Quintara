// storageShim.js
// Polyfills the same window.storage.{get,set,delete,list} interface
// that Claude artifacts provide, but backed by real browser localStorage.
// This lets App.jsx run unchanged outside the Claude.ai sandbox.

if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    async get(key) {
      const raw = localStorage.getItem(key);
      if (raw === null) throw new Error("Key not found: " + key);
      return { key, value: raw, shared: false };
    },
    async set(key, value) {
      localStorage.setItem(key, value);
      return { key, value, shared: false };
    },
    async delete(key) {
      const existed = localStorage.getItem(key) !== null;
      localStorage.removeItem(key);
      return { key, deleted: existed, shared: false };
    },
    async list(prefix) {
      const keys = Object.keys(localStorage).filter(k => !prefix || k.startsWith(prefix));
      return { keys, prefix, shared: false };
    }
  };
}
