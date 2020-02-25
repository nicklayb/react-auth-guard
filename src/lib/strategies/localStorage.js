const persistLocalStorage = key => ({
  get() {
    return new Promise(resolve => resolve(localStorage.getItem(key)))
  },
  persist(token) {
    localStorage.setItem(key, token)
  },
  clear() {
    localStorage.removeItem(key)
  },
})

export default persistLocalStorage
