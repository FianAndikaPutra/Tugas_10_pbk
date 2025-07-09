<template>
  <div class="profile-page">
    <!-- Header -->
    <header class="header">
      <div class="nav-container">
        <div class="logo">
          <div class="logo-icon">R</div>
          <span>garuda</span>
        </div>
        <nav class="nav-menu">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">Home</router-link>
          <router-link to="/tentang-kami" class="nav-link" :class="{ active: $route.path === '/tentang-kami' }">Tentang Kami</router-link>
          <router-link to="/delivery-order" class="nav-link" :class="{ active: $route.path === '/delivery-order' }">Delivery Order</router-link>
          <router-link to="/hubungi" class="nav-link" :class="{ active: $route.path === '/hubungi-kami' }">Hubungi Kami</router-link>
          <router-link to="/profil" class="nav-link" :class="{ active: $route.path === '/profil' }">Profil</router-link>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Profil & Pengaturan</h1>
        <div class="breadcrumb">
          <router-link to="/" class="breadcrumb-link">HOME</router-link> > PROFIL
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button 
          class="tab-btn"
          :class="{ active: activeTab === 'profile' }"
          @click="setActiveTab('profile')"
        >
          <i class="fas fa-user"></i> Profil Saya
        </button>
        <button 
          class="tab-btn"
          :class="{ active: activeTab === 'settings' }"
          @click="setActiveTab('settings')"
        >
          <i class="fas fa-cog"></i> Pengaturan
        </button>
        <button 
          class="tab-btn"
          :class="{ active: activeTab === 'notifications' }"
          @click="setActiveTab('notifications')"
        >
          <i class="fas fa-bell"></i> Notifikasi
        </button>
        <button 
          class="tab-btn"
          :class="{ active: activeTab === 'security' }"
          @click="setActiveTab('security')"
        >
          <i class="fas fa-shield-alt"></i> Keamanan
        </button>
      </div>

      <!-- Profile Section -->
      <div v-if="activeTab === 'profile'" class="profile-section">
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">
              <img :src="userProfile.avatar" :alt="userProfile.name" v-if="userProfile.avatar">
              <div class="avatar-placeholder" v-else>
                <i class="fas fa-user"></i>
              </div>
              <button class="change-avatar-btn" @click="changeAvatar">
                <i class="fas fa-camera"></i>
              </button>
            </div>
            <div class="profile-info">
              <h2>{{ userProfile.name }}</h2>
              <p class="email">{{ userProfile.email }}</p>
              <p class="member-since">Member sejak {{ formatDate(userProfile.joinDate) }}</p>
              <div class="profile-stats">
                <div class="stat">
                  <span class="stat-number">{{ userProfile.totalOrders }}</span>
                  <span class="stat-label">Total Pesanan</span>
                </div>
                <div class="stat">
                  <span class="stat-number">{{ userProfile.loyaltyPoints }}</span>
                  <span class="stat-label">Poin Loyalitas</span>
                </div>
                <div class="stat">
                  <span class="stat-number">{{ userProfile.favoriteItems }}</span>
                  <span class="stat-label">Menu Favorit</span>
                </div>
              </div>
            </div>
          </div>

          <div class="profile-form">
            <h3>Informasi Pribadi</h3>
            <form @submit.prevent="updateProfile">
              <div class="form-grid">
                <div class="form-group">
                  <label>Nama Lengkap</label>
                  <input 
                    type="text" 
                    v-model="editProfile.name" 
                    :disabled="!isEditing"
                    class="form-input"
                  >
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    v-model="editProfile.email" 
                    :disabled="!isEditing"
                    class="form-input"
                  >
                </div>
                <div class="form-group">
                  <label>Nomor Telepon</label>
                  <input 
                    type="tel" 
                    v-model="editProfile.phone" 
                    :disabled="!isEditing"
                    class="form-input"
                  >
                </div>
                <div class="form-group">
                  <label>Tanggal Lahir</label>
                  <input 
                    type="date" 
                    v-model="editProfile.birthDate" 
                    :disabled="!isEditing"
                    class="form-input"
                  >
                </div>
                <div class="form-group span-2">
                  <label>Alamat</label>
                  <textarea 
                    v-model="editProfile.address" 
                    :disabled="!isEditing"
                    class="form-textarea"
                    rows="3"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label>Kota</label>
                  <input 
                    type="text" 
                    v-model="editProfile.city" 
                    :disabled="!isEditing"
                    class="form-input"
                  >
                </div>
                <div class="form-group">
                  <label>Kode Pos</label>
                  <input 
                    type="text" 
                    v-model="editProfile.zipCode" 
                    :disabled="!isEditing"
                    class="form-input"
                  >
                </div>
              </div>
              
              <div class="form-actions">
                <button 
                  type="button" 
                  class="edit-btn"
                  v-if="!isEditing"
                  @click="startEditing"
                >
                  <i class="fas fa-edit"></i> Edit Profil
                </button>
                <div v-else class="edit-actions">
                  <button type="submit" class="save-btn">
                    <i class="fas fa-save"></i> Simpan
                  </button>
                  <button type="button" class="cancel-btn" @click="cancelEditing">
                    <i class="fas fa-times"></i> Batal
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Settings Section -->
      <div v-if="activeTab === 'settings'" class="settings-section">
        <div class="settings-card">
          <h3>Pengaturan Umum</h3>
          
          <div class="setting-item">
            <div class="setting-info">
              <h4>Bahasa</h4>
              <p>Pilih bahasa yang ingin digunakan</p>
            </div>
            <select v-model="settings.language" class="setting-select">
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
              <option value="ms">Bahasa Melayu</option>
            </select>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h4>Tema</h4>
              <p>Pilih tema tampilan aplikasi</p>
            </div>
            <select v-model="settings.theme" class="setting-select">
              <option value="light">Terang</option>
              <option value="dark">Gelap</option>
              <option value="auto">Otomatis</option>
            </select>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h4>Mata Uang</h4>
              <p>Pilih mata uang untuk tampilan harga</p>
            </div>
            <select v-model="settings.currency" class="setting-select">
              <option value="IDR">Rupiah (IDR)</option>
              <option value="USD">Dollar (USD)</option>
              <option value="MYR">Ringgit (MYR)</option>
            </select>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h4>Simpan Riwayat Pesanan</h4>
              <p>Simpan riwayat pesanan untuk referensi di masa depan</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.saveOrderHistory">
              <span class="slider"></span>
            </label>
          </div>

          <button class="save-settings-btn" @click="saveSettings">
            <i class="fas fa-save"></i> Simpan Pengaturan
          </button>
        </div>
      </div>

      <!-- Notifications Section -->
      <div v-if="activeTab === 'notifications'" class="notifications-section">
        <div class="notifications-card">
          <h3>Pengaturan Notifikasi</h3>
          
          <div class="notification-group">
            <h4>Notifikasi Email</h4>
            
            <div class="notification-item">
              <div class="notification-info">
                <h5>Promo & Penawaran</h5>
                <p>Dapatkan info tentang promo dan penawaran khusus</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notifications.email.promotions">
                <span class="slider"></span>
              </label>
            </div>

            <div class="notification-item">
              <div class="notification-info">
                <h5>Status Pesanan</h5>
                <p>Notifikasi tentang status pesanan Anda</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notifications.email.orderStatus">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <div class="notification-group">
            <h4>Notifikasi Push</h4>
            
            <div class="notification-item">
              <div class="notification-info">
                <h5>Pesanan Siap</h5>
                <p>Notifikasi ketika pesanan Anda sudah siap</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notifications.push.orderReady">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <button class="save-notifications-btn" @click="saveNotifications">
            <i class="fas fa-save"></i> Simpan Pengaturan Notifikasi
          </button>
        </div>
      </div>

      <!-- Security Section -->
      <div v-if="activeTab === 'security'" class="security-section">
        <div class="security-card">
          <h3>Keamanan Akun</h3>
          
          <div class="security-item">
            <div class="security-info">
              <h4>Ganti Password</h4>
              <p>Perbarui password untuk keamanan akun yang lebih baik</p>
            </div>
            <button class="change-password-btn" @click="showChangePassword = true">
              <i class="fas fa-key"></i> Ganti Password
            </button>
          </div>

          <div class="security-item">
            <div class="security-info">
              <h4>Autentikasi Dua Faktor</h4>
              <p>Tambahkan lapisan keamanan ekstra dengan 2FA</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="security.twoFactor">
              <span class="slider"></span>
            </label>
          </div>

          <button class="save-security-btn" @click="saveSecurity">
            <i class="fas fa-save"></i> Simpan Pengaturan Keamanan
          </button>
        </div>
      </div>
    </section>

    <!-- Change Password Modal -->
    <div v-if="showChangePassword" class="modal-overlay" @click="showChangePassword = false">
      <div class="modal-content" @click.stop>
        <h3>Ganti Password</h3>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label>Password Lama</label>
            <input type="password" v-model="passwordForm.oldPassword" class="form-input" required>
          </div>
          <div class="form-group">
            <label>Password Baru</label>
            <input type="password" v-model="passwordForm.newPassword" class="form-input" required>
          </div>
          <div class="form-group">
            <label>Konfirmasi Password Baru</label>
            <input type="password" v-model="passwordForm.confirmPassword" class="form-input" required>
          </div>
          <div class="modal-actions">
            <button type="submit" class="save-btn">
              <i class="fas fa-save"></i> Simpan
            </button>
            <button type="button" class="cancel-btn" @click="showChangePassword = false">
              <i class="fas fa-times"></i> Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Get current route
const route = useRoute()

// Data reaktif
const activeTab = ref('profile')
const isEditing = ref(false)
const showChangePassword = ref(false)

// User Profile Data
const userProfile = reactive({
  name: 'Ahmad Rizki',
  email: 'ahmad.rizki@email.com',
  phone: '08123456789',
  birthDate: '1990-05-15',
  address: 'Jl. Sudirman No. 123, Pekanbaru',
  city: 'Pekanbaru',
  zipCode: '28000',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  joinDate: new Date('2023-01-15'),
  totalOrders: 45,
  loyaltyPoints: 1250,
  favoriteItems: 8
})

const editProfile = reactive({
  name: userProfile.name,
  email: userProfile.email,
  phone: userProfile.phone,
  birthDate: userProfile.birthDate,
  address: userProfile.address,
  city: userProfile.city,
  zipCode: userProfile.zipCode
})

// Settings Data
const settings = reactive({
  language: 'id',
  theme: 'light',
  currency: 'IDR',
  saveOrderHistory: true
})

// Notifications Data
const notifications = reactive({
  email: {
    promotions: true,
    orderStatus: true
  },
  push: {
    orderReady: true
  }
})

// Security Data
const security = reactive({
  twoFactor: false
})

// Password Form
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Methods
const setActiveTab = (tab) => {
  activeTab.value = tab
}

const startEditing = () => {
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
  // Reset form
  Object.assign(editProfile, {
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    birthDate: userProfile.birthDate,
    address: userProfile.address,
    city: userProfile.city,
    zipCode: userProfile.zipCode
  })
}

const updateProfile = () => {
  Object.assign(userProfile, editProfile)
  isEditing.value = false
  alert('Profil berhasil diperbarui!')
}

const changeAvatar = () => {
  // Simulasi upload avatar
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        userProfile.avatar = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

const saveSettings = () => {
  alert('Pengaturan berhasil disimpan!')
}

const saveNotifications = () => {
  alert('Pengaturan notifikasi berhasil disimpan!')
}

const saveSecurity = () => {
  alert('Pengaturan keamanan berhasil disimpan!')
}

const changePassword = () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert('Password baru tidak cocok!')
    return
  }
  
  if (passwordForm.newPassword.length < 6) {
    alert('Password minimal 6 karakter!')
    return
  }

  // Reset form
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  showChangePassword.value = false
  alert('Password berhasil diubah!')
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
}

// Lifecycle
onMounted(() => {
  console.log('Halaman Profil dimuat')
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23654321"/><circle cx="200" cy="150" r="80" fill="%23ff6b35" opacity="0.3"/><circle cx="800" cy="600" r="120" fill="%23ffa726" opacity="0.2"/><rect x="100" y="400" width="200" height="100" fill="%23ffffff" opacity="0.1" rx="10"/><rect x="700" y="200" width="300" height="150" fill="%23ffffff" opacity="0.1" rx="10"/><circle cx="1000" cy="300" r="60" fill="%23ff6b35" opacity="0.4"/></svg>');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  font-family: 'Arial', sans-serif;
  color: white;
}

/* Header */
.header {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  padding: 20px 40px;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 2rem;
}

.logo {
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.8rem;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
   transition: all 0.3s ease;
}


.logo span {
  font-size: 1.8rem;
  font-weight: 600;
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 25px;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  position: relative;
  background: transparent;
  border: 2px solid transparent;
}

.nav-link:hover {
  background: rgba(255, 107, 53, 0.1);
  border-color: rgba(255, 107, 53, 0.3);
  transform: translateY(-2px);
}
.nav-link.active {
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(255, 107, 53, 0.4);
  transform: translateY(-1px);
}
.nav-link.active:hover {
  background: rgba(255, 107, 53, 0.3);
  border-color: rgba(255, 107, 53, 0.7);
}

.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
}
.hero-content {
  max-width: 800px;
  margin: 0 auto;
}
.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  animation: fadeInUp 1s ease-out;
}
.breadcrumb {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease-out 0.2s both;
}
.breadcrumb-link {
  color: #ffa726;
  text-decoration: none;
  transition: color 0.3s ease;
}
.breadcrumb-link:hover {
   color: #ff6b35;
}
.main-content {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.tab-navigation {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}
.tab-btn {
  background: rgba(255, 107, 53, 0.1);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
} 
.tab-btn.active {
  background: rgba(255, 107, 53, 0.3);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  
}
.tab-btn:hover {
  background: rgba(255, 107, 53, 0.2);
  transform: translateY(-2px);
}
.tab-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.profile-section, .settings-section, .notifications-section, .security-section {
  margin-bottom: 40px;
}
.profile-card, .settings-card, .notifications-card, .security-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.profile-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;  
}
.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 3rem;
  font-weight: bold;
}
.change-avatar-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(255, 107, 53, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.change-avatar-btn:hover {
  background: rgba(255, 107, 53, 1);
  transform: scale(1.1);
}
.change-avatar-btn:active {
  transform: scale(1);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.profile-info {
  flex: 1;
}
.profile-info h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: 600;
}
.profile-info .email {
  font-size: 1.2rem;
  color: #ff6b35;
  margin-bottom: 5px;
}
.profile-info .member-since {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 15px;
}
.profile-stats {
  display: flex;
  gap: 20px;
}
.profile-stats .stat {
  text-align: center;
}
.profile-stats .stat .stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6b35;
}
.profile-stats .stat .stat-label {
  font-size: 1rem;
  color: #ccc;
}
.profile-form {
  margin-top: 20px;
}
.profile-form h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-weight: 600;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group span {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 5px;
}
.form-input, .form-textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
} 
.form-input:focus, .form-textarea:focus {
  border-color: #ff6b35;
  outline: none;
}
.form-textarea {
  resize: none;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}
.edit-btn, .save-btn, .cancel-btn {
  background: rgba(255, 107, 53, 0.8);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.edit-btn:hover, .save-btn:hover, .cancel-btn:hover {
  background: rgba(255, 107, 53, 1);
  transform: translateY(-2px);
}
.edit-btn:active, .save-btn:active, .cancel-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.edit-actions {
  display: flex;
  gap: 10px;
}
.save-btn {
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  color: white;
}
.save-btn:hover {
  background: linear-gradient(135deg, #ff4500, #ff6b35);
  transform: translateY(-2px);
}
.save-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.edit-btn {
  background: rgba(255, 107, 53, 0.8);
  color: white;
}
.edit-btn:hover {
  background: rgba(255, 107, 53, 1);
  transform: translateY(-2px);
}
.edit-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 5px rgba(0, 0, 0.2);
}
.cancel-btn {
  background: rgba(255, 107, 53, 0.5);
  color: white;
}
.cancel-btn:hover {
  background: rgba(255, 107, 53, 0.8);
  transform: translateY(-2px);
}
.cancel-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 5px rgba(0, 0, 0.2);
}
.form-actions .edit-btn {
  background: rgba(255, 107, 53, 0.8);
  color: white;
}
.form-actions .edit-btn:hover {
  background: rgba(255, 107, 53, 1);
  transform: translateY(-2px);
}
.form-actions .edit-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 5px rgba(0, 0, 0.2);
}
.form-actions .save-btn {
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  color: white;
}

.form-actions .save-btn:hover {
  background: linear-gradient(135deg, #ff4500, #ff6b35);
  transform: translateY(-2px);
}
.form-actions .save-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 5px rgba(0, 0, 0.2);
}
.form-actions .cancel-btn {
  background: rgba(255, 107, 53, 0.5);
  color: white;
}

.form-actions .cancel-btn:hover {
  background: rgba(255, 107, 53, 0.8);
  transform: translateY(-2px);
}
.form-actions .cancel-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 5px rgba(0, 0, 0.2);
}
.save-settings-btn, .save-notifications-btn, .save-security-btn {
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}
.save-settings-btn:hover, .save-notifications-btn:hover, .save-security-btn:hover {
  background: linear-gradient(135deg, #ff4500, #ff6b35);
  transform: translateY(-2px);  
}
.save-settings-btn:active, .save-notifications-btn:active, .save-security-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-left: 10px;
}
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggle-switch .slider {
  position: absolute;
  cursor: pointer;  
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}
.toggle-switch .slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
.toggle-switch input:checked + .slider {
  background-color: #ff6b35;
}
.toggle-switch input:checked + .slider:before {
  transform: translateX(26px);
}
.toggle-switch .slider:active:before {
  width: 30px;
}
.toggle-switch .slider:active {
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
}
.setting-item, .notification-item, .security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.setting-item:last-child, .notification-item:last-child, .security-item:last-child {
  border-bottom: none;
}
.setting-info, .notification-info, .security-info {
  flex: 1;
  margin-right: 20px;
}
.setting-info h4, .notification-info h5, .security-info h4 {
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: 600;
}
.setting-info p, .notification-info p, .security-info p {
  font-size: 0.9rem;
  color: #ccc;
}
.notification-group {   
  margin-bottom: 20px;
}
.notification-group h4 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 600;
}
.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.notification-item:last-child {
  border-bottom: none;
}
.notification-info {
  flex: 1;  
  margin-right: 20px;
}
.notification-info h5 {
  font-size: 1rem;
  margin-bottom: 5px;
  font-weight: 600;
}
.notification-info p {
  font-size: 0.9rem;
  color: #ccc;
}
.notification-item label {
  display: flex;
  align-items: center;
}
.notification-item label .toggle-switch {
  margin-left: 10px;
}
.notification-item label .toggle-switch input {
  width: 0;
  height: 0;
  opacity: 0;
}   
.notification-item label .toggle-switch .slider {
  position: relative;
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}
.notification-item label .toggle-switch .slider:before {
  content: "";
  position: absolute;
  width: 16px;  
  height: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}
.notification-item label .toggle-switch input:checked + .slider {
  background-color: #ff6b35;
}
.notification-item label .toggle-switch input:checked + .slider:before {
  transform: translateX(20px);
}
.notification-item label .toggle-switch .slider:active:before {
  width: 18px;
  height: 18px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
}
.notification-item label .toggle-switch .slider:active {
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
}
.save-notifications-btn {
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}
.save-notifications-btn:hover {
  background: linear-gradient(135deg, #ff4500, #ff6b35);
  transform: translateY(-2px);
}
.save-notifications-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.security-item:last-child {
  border-bottom: none;
}
.security-info {
  flex: 1;
  margin-right: 20px;
}
.security-info h4 {
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: 600; 
}
.security-info p {
  font-size: 0.9rem;
  color: #ccc;
}
.security-item button {
  background: rgba(255, 107, 53, 0.8);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.security-item button:hover {
  background: rgba(255, 107, 53, 1);
  transform: translateY(-2px);
}
.security-item button:active {
  transform: translateY(0);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.security-item .toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-left: 10px;
}           
.security-item .toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.security-item .toggle-switch .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}
.security-item .toggle-switch .slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
.security-item .toggle-switch input:checked + .slider {
  background-color: #ff6b35;
}
.security-item .toggle-switch input:checked + .slider:before {
  transform: translateX(26px);
}
.security-item .toggle-switch .slider:active:before {
  width: 30px;
}
.security-item .toggle-switch .slider:active {
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.modal-content {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  color: #333;  
}
.modal-content.danger {
  background: rgba(255, 0, 0, 0.9);
  color: white;
}
.modal-content h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-weight: 600;
}
.modal-content p {
  font-size: 1rem;
  margin-bottom: 20px;
}
.modal-content .form-group {
  margin-bottom: 15px;
}
.modal-content .form-group label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #555;
}
.modal-content .form-input, .modal-content .form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;      
}
.modal-content .form-input:focus, .modal-content .form-textarea:focus {
  border-color: #ff6b35;
  outline: none;
}
.modal-content .form-textarea {
  resize: none;
}
.modal-actions {  
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}
.modal-actions .save-btn, .modal-actions .cancel-btn, .modal-actions .delete-btn {
  background: rgba(255, 107, 53, 0.8);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.modal-actions .save-btn:hover, .modal-actions .cancel-btn:hover, .modal-actions .delete-btn:hover {
  background: rgba(255, 107, 53, 1);
  transform: translateY(-2px);
}
.modal-actions .save-btn:active, .modal-actions .cancel-btn:active, .modal-actions .delete-btn:active {
  transform: translateY(0); 
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.modal-actions .delete-btn {
  background: rgba(255, 0, 0, 0.8);
  color: white;
}
.modal-actions .delete-btn:hover {
  background: rgba(255, 0, 0, 1);
  transform: translateY(-2px);
}
.modal-actions .delete-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.close-modal-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.close-modal-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}
.close-modal-btn:active {
  transform: scale(1);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.delete-confirmation {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.delete-confirmation label {
  font-size: 0.9rem;
  color: #555;
}
.delete-confirmation input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;   
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}
.delete-confirmation input:focus {
  border-color: #ff6b35;
  outline: none;
}
.delete-confirmation input[type="text"] {
  width: 100%;
}
.delete-confirmation input[type="text"]:invalid {
  border-color: red;
}
.delete-confirmation input[type="text"]:valid {
  border-color: green;
}
.delete-confirmation .error {
  color: red;
  font-size: 0.9rem;
  display: none;
}
.delete-confirmation input[type="text"]:invalid + .error {
  display: block;
}
.delete-confirmation input[type="text"]:valid + .error {
  display: none;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>