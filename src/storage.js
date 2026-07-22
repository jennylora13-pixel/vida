/* ==========================================================
   Armazenamento — usa window.storage (ambiente Artifact) quando
   existir; caso contrário, cai no localStorage do navegador.
   Assim o mesmo código roda no Claude e num deploy comum.
   ========================================================== */

const temStorageNativo =
  typeof window !== "undefined" &&
  window.storage &&
  typeof window.storage.get === "function" &&
  typeof window.storage.set === "function";

export const storage = {
  async get(chave) {
    if (temStorageNativo) return window.storage.get(chave);
    try {
      const value = window.localStorage.getItem(chave);
      return value == null ? null : { value };
    } catch (e) {
      return null;
    }
  },
  async set(chave, valor) {
    if (temStorageNativo) return window.storage.set(chave, valor);
    try {
      window.localStorage.setItem(chave, valor);
      return true;
    } catch (e) {
      return false;
    }
  },
};
