const persistLocalStorage = key => ({
  get() {
    localStorage.getItem(key)
  },
  persist(token) {
    localStorage.setItem(key, token)
  },
  clear() {
    localStorage.removeItem(key)
  },
})

export default persistLocalStorage
