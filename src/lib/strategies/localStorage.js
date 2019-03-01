const persistLocalStorage = key => ({
  get() {
    return localStorage.getItem(key)
  },
  persist(token) {
    localStorage.setItem(key, token)
  },
  clear() {
    localStorage.removeItem(key)
  },
})

export default persistLocalStorage
