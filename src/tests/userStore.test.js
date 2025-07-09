import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from './src/stores/user.js'

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('login updates user and isLoggedIn', () => {
    const store = useUserStore()
    store.login({ name: 'Admin', email: 'admin@mail.com' })

    expect(store.user).toEqual({ name: 'admin', email: 'admin@mail.com' })
    expect(store.isLoggedIn).toBe(true)
  })

  test('logout resets user and isLoggedIn', () => {
    const store = useUserStore()
    store.login({ name: 'Admin' })
    store.logout()

    expect(store.user).toBe(null)
    expect(store.isLoggedIn).toBe(false)
  })
})
