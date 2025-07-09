
<!-- src/components/Login.vue -->
<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo">
          <span class="logo-icon">R</span>
          <span class="logo-text">garuda</span>
        </div>
        <h2>{{ isRegisterMode ? 'Daftar Akun' : 'Selamat Datang' }}</h2>
        <p>{{ isRegisterMode ? 'Silakan buat akun baru' : 'Silakan login untuk melanjutkan' }}</p>
      </div>
      
      <!-- Login Form -->
      <form v-if="!isRegisterMode" @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username atau Email</label>
          <input 
            type="text" 
            id="username"
            v-model="username"
            placeholder="Masukkan username atau email (admin)"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password"
            v-model="password"
            placeholder="Masukkan password (admin123)"
            required
          >
        </div>
        
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe">
            <span>Ingat saya</span>
          </label>
          <a href="#" class="forgot-password">Lupa password?</a>
        </div>
        
        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Masuk</span>
        </button>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        
        <!-- Demo credentials info -->
        <div class="demo-info">
          <p><strong>Demo Login:</strong></p>
          <p>Username/Email: admin</p>
          <p>Password: admin123</p>
        </div>
      </form>
      
      <!-- Register Form -->
      <form v-else @submit.prevent="handleRegister" class="login-form">
        <div class="form-group">
          <label for="reg-fullname">Nama Lengkap</label>
          <input 
            type="text" 
            id="reg-fullname"
            v-model="registerData.fullName"
            placeholder="Masukkan nama lengkap"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="reg-email">Email</label>
          <input 
            type="email" 
            id="reg-email"
            v-model="registerData.email"
            placeholder="Masukkan email"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="reg-username">Username</label>
          <input 
            type="text" 
            id="reg-username"
            v-model="registerData.username"
            placeholder="Masukkan username"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="reg-password">Password</label>
          <input 
            type="password" 
            id="reg-password"
            v-model="registerData.password"
            placeholder="Masukkan password (min. 6 karakter)"
            required
            minlength="6"
          >
        </div>
        
        <div class="form-group">
          <label for="reg-confirm-password">Konfirmasi Password</label>
          <input 
            type="password" 
            id="reg-confirm-password"
            v-model="registerData.confirmPassword"
            placeholder="Masukkan ulang password"
            required
          >
        </div>
        
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="registerData.agreeTerms" required>
            <span>Saya setuju dengan <a href="#" class="terms-link">syarat dan ketentuan</a></span>
          </label>
        </div>
        
        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="isLoading">Mendaftar...</span>
          <span v-else>Daftar</span>
        </button>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
      </form>
      
      <div class="login-footer">
        <p v-if="!isRegisterMode">
          Belum punya akun? 
          <a href="#" @click="toggleMode" class="toggle-link">Daftar di sini</a>
        </p>
        <p v-else>
          Sudah punya akun? 
          <a href="#" @click="toggleMode" class="toggle-link">Masuk di sini</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const isRegisterMode = ref(false)
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Register data
const registerData = ref({
  fullName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

// FAKE API DATA - Data user palsu
const fakeUsersAPI = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    fullName: 'Administrator',
    role: 'admin',
    isActive: true,
    avatar: 'https://via.placeholder.com/150/FF6B35/FFFFFF?text=A',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: null,
    profile: {
      phone: '+62812345678',
      address: 'Jakarta, Indonesia',
      birthDate: '1990-01-01',
      gender: 'male'
    }
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    password: 'password123',
    fullName: 'User Demo',
    role: 'user',
    isActive: true,
    avatar: 'https://via.placeholder.com/150/35C3F7/FFFFFF?text=U',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: null,
    profile: {
      phone: '+62812345679',
      address: 'Surabaya, Indonesia',
      birthDate: '1995-05-15',
      gender: 'female'
    }
  }
]

// Simulasi API call dengan Promise
const fakeAPICall = (endpoint, options = {}) => {
  return new Promise((resolve, reject) => {
    // Simulasi delay network
    setTimeout(() => {
      if (endpoint === 'users') {
        if (options.method === 'POST') {
          // Simulasi create user
          const newUser = {
            ...options.body,
            id: fakeUsersAPI.length + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          fakeUsersAPI.push(newUser)
          resolve({ ok: true, json: () => Promise.resolve(newUser) })
        } else {
          // Simulasi get users
          resolve({ ok: true, json: () => Promise.resolve(fakeUsersAPI) })
        }
      } else if (endpoint === 'loginAttempts') {
        // Simulasi log login attempt
        resolve({ ok: true, json: () => Promise.resolve({ success: true }) })
      } else {
        reject(new Error('Endpoint not found'))
      }
    }, 800) // Simulasi delay 800ms
  })
}

// Methods
const toggleMode = () => {
  isRegisterMode.value = !isRegisterMode.value
  clearMessages()
  clearForms()
}

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const clearForms = () => {
  username.value = ''
  password.value = ''
  registerData.value = {
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  }
}

const validateRegisterForm = () => {
  if (!registerData.value.fullName.trim()) {
    errorMessage.value = 'Nama lengkap harus diisi'
    return false
  }
  
  if (!registerData.value.email.trim()) {
    errorMessage.value = 'Email harus diisi'
    return false
  }
  
  if (!registerData.value.username.trim()) {
    errorMessage.value = 'Username harus diisi'
    return false
  }
  
  if (registerData.value.password.length < 6) {
    errorMessage.value = 'Password minimal 6 karakter'
    return false
  }
  
  if (registerData.value.password !== registerData.value.confirmPassword) {
    errorMessage.value = 'Konfirmasi password tidak cocok'
    return false
  }
  
  if (!registerData.value.agreeTerms) {
    errorMessage.value = 'Anda harus menyetujui syarat dan ketentuan'
    return false
  }
  
  return true
}

// LOGIN HANDLER DENGAN FAKE API
const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Username dan password harus diisi'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    console.log('Attempting login with:', {
      username: username.value,
      password: password.value
    })
    
    // Panggil fake API
    const response = await fakeAPICall('users')
    const users = await response.json()
    
    console.log('Users from fake API:', users)
    
    // Cari user berdasarkan username/email dan password
    const user = users.find(u => {
      const matchesCredentials = (u.username === username.value || u.email === username.value) && 
                                u.password === password.value
      const isActive = u.isActive === true
      
      console.log('Checking user:', {
        user: u.username,
        matchesCredentials,
        isActive
      })
      
      return matchesCredentials && isActive
    })
    
    console.log('Found user:', user)
    
    if (user) {
      // Login berhasil
      const loginData = {
        userId: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        loginTime: new Date().toISOString()
      }
      
      console.log('Login successful, saving data:', loginData)
      
      // Simpan session
      if (rememberMe.value) {
        localStorage.setItem('userToken', `token-${user.id}-${Date.now()}`)
        localStorage.setItem('userData', JSON.stringify(loginData))
      } else {
        sessionStorage.setItem('isLoggedIn', 'true')
        sessionStorage.setItem('userData', JSON.stringify(loginData))
      }
      
      // Log login attempt dengan fake API
      try {
        await fakeAPICall('loginAttempts', {
          method: 'POST',
          body: {
            id: Math.random().toString(36).substr(2, 4),
            email: user.email,
            username: user.username,
            success: true,
            ipAddress: '127.0.0.1',
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
          }
        })
      } catch (logError) {
        console.warn('Failed to log login attempt:', logError)
      }
      
      // Tampilkan pesan sukses
      successMessage.value = `Selamat datang, ${user.fullName}!`
      
      // Redirect ke dashboard
      console.log('Starting redirect process...')
      
      setTimeout(async () => {
        try {
          console.log('Attempting router.push to /dashboard')
          await router.push('/dashboard')
          console.log('Router redirect successful!')
        } catch (routerError) {
          console.error('Router redirect failed:', routerError)
          
          // Fallback: gunakan window.location
          console.log('Using window.location fallback')
          window.location.href = '/dashboard'
        }
      }, 1500)
      
    } else {
      // Login gagal
      errorMessage.value = 'Username/email atau password salah'
      console.log('Login failed: User not found or invalid credentials')
    }
    
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Terjadi kesalahan saat login. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

// REGISTER HANDLER DENGAN FAKE API
const handleRegister = async () => {
  if (!validateRegisterForm()) {
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    // Cek apakah username atau email sudah ada
    const response = await fakeAPICall('users')
    const existingUsers = await response.json()
    
    const userExists = existingUsers.some(user => 
      user.username === registerData.value.username || 
      user.email === registerData.value.email
    )
    
    if (userExists) {
      errorMessage.value = 'Username atau email sudah terdaftar'
      return
    }
    
    // Buat user baru
    const newUser = {
      fullName: registerData.value.fullName,
      email: registerData.value.email,
      username: registerData.value.username,
      password: registerData.value.password,
      role: 'user',
      avatar: `https://via.placeholder.com/150/FF6B35/FFFFFF?text=${registerData.value.fullName.charAt(0).toUpperCase()}`,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null,
      profile: {
        phone: '',
        address: '',
        birthDate: '',
        gender: ''
      }
    }
    
    // Kirim ke fake API
    const createResponse = await fakeAPICall('users', {
      method: 'POST',
      body: newUser
    })
    
    if (createResponse.ok) {
      successMessage.value = 'Registrasi berhasil! Anda sekarang dapat login.'
      
      // Auto switch ke mode login setelah 2 detik
      setTimeout(() => {
        isRegisterMode.value = false
        clearMessages()
        clearForms()
        // Pre-fill username untuk kemudahan
        username.value = registerData.value.username
      }, 2000)
    } else {
      throw new Error('Gagal membuat akun')
    }
    
  } catch (error) {
    console.error('Register error:', error)
    errorMessage.value = 'Registrasi gagal. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

// Check if already logged in
onMounted(() => {
  const isLoggedIn = localStorage.getItem('userToken') || sessionStorage.getItem('isLoggedIn')
  if (isLoggedIn) {
    console.log('User already logged in, redirecting to dashboard')
    router.push('/dashboard')
  }
})
</script>
<style scoped>
.login-container {
  background-image: url('C:/Users/PianTOLL/tugas10/src/assets/download.jpeg');
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f87103 0%, #d69954 100%);
  padding: 2rem;
}

.overlay {
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.logo-icon {
  background: #ff6b35;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
}

.logo-text {
  color: #333;
  font-size: 2rem;
  font-weight: 600;
}

.login-header h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.login-header p {
  color: #666;
  margin-bottom: 0;
}

.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #ff6b35;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #666;
  font-size: 0.9rem;
}

.remember-me input {
  width: auto;
  margin: 0;
}

.forgot-password, .terms-link {
  color: #ff6b35;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover, .terms-link:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(45deg, #ff6b35, #ff8c35);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  background: linear-gradient(45deg, #ff5722, #ff7722);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background: #ffebee;
  border-radius: 5px;
  font-size: 0.9rem;
}

.success-message {
  color: #27ae60;
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background: #e8f5e8;
  border-radius: 5px;
  font-size: 0.9rem;
}

.login-footer {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #e1e5e9;
}

.login-footer p {
  color: #666;
  margin: 0;
}

.toggle-link {
  color: #ff6b35;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.toggle-link:hover {
  text-decoration: underline;
}

.demo-info {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ff6b35;
}

.demo-info p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.demo-info strong {
  color: #ff6b35;
}

/* Responsive */
@media (max-width: 480px) {
  .login-container {
    padding: 1rem;
  }
  
  .login-card {
    padding: 2rem;
    max-height: 95vh;
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .logo-text {
    font-size: 1.5rem;
  }
  
  .login-header h2 {
    font-size: 1.5rem;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .remember-me {
    align-self: flex-start;
  }
}
</style>
