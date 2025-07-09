import { mount } from '@vue/test-utils'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import Login from './src/components/Login.vue'
import { createTestingPinia } from '@pinia/testing'

describe('Login.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Login, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
        })]
      }
    })
  })

  test('should render login button', () => {
    expect(wrapper.find('button').exists()).toBe(true)
  })

  test('should handle login form submission', async () => {
    // Ambil elements
    const emailInput = wrapper.get('[data-test="email"]')
    const passwordInput = wrapper.get('[data-test="password"]')
    const loginButton = wrapper.get('[data-test="login-button"]')

    // Set values
    await emailInput.setValue('admin@mail.com')
    await passwordInput.setValue('123456')
    
    // Trigger click
    await loginButton.trigger('click')

    // Ambil store yang digunakan dalam komponen
    const userStore = wrapper.vm.userStore

    // Expect userStore.login sudah dipanggil
    expect(userStore.login).toHaveBeenCalled()
    expect(userStore.login).toHaveBeenCalledWith({
      name: 'Admin',
      email: 'admin@mail.com'
    })
  })
})