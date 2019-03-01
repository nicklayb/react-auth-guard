var persistLocalStorage = function persistLocalStorage(key) {
  return {
    get: function get() {
      return localStorage.getItem(key);
    },
    persist: function persist(token) {
      localStorage.setItem(key, token);
    },
    clear: function clear() {
      localStorage.removeItem(key);
    }
  };
};

export default persistLocalStorage;