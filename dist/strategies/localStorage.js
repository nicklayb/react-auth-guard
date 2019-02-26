var persistLocalStorage = function persistLocalStorage(key) {
  return {
    get: function get() {
      localStorage.getItem(key);
    },
    persist: function persist(token) {
      localStorage.setItem(key, token);
    },
    clear: function clear() {
      localStorage.removeItem();
    }
  };
};

export default persistLocalStorage;