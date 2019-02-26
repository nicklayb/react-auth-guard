const persistLocalStorage = key => ({
  get() {
    localStorage.getItem(key)
  },
  persist(token) {
    localStorage.setItem(key, token)
  },
  clear() {
    localStorage.removeItem()
  },
})

export default persistLocalStorage
