<template>
  <div class="hubungi-kami-page">
    <!-- Header -->
    <header class="header">
      <div class="nav-container">
        <div class="logo">
          <div class="logo-icon">R</div>
          <span>garuda</span>
        </div>
        <nav class="nav-menu">
          <router-link to="/dashboard" class="nav-link">Home</router-link>
          <router-link to="/tentang-kami" class="nav-link">Tentang Kami</router-link>
          <router-link to="/delivery-order" class="nav-link">Delivery Order</router-link>
          <router-link to="/hubungi" class="nav-link active">Hubungi Kami</router-link>
          <router-link to="/profil" class="nav-link">Profil</router-link>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Hubungi Kami</h1>
        <div class="breadcrumb">
          <router-link to="/" class="breadcrumb-link">HOME</router-link> > HUBUNGI KAMI
        </div>
        <p class="hero-subtitle">Kami siap melayani Anda dengan sepenuh hati</p>
      </div>
    </section>

    <!-- Contact Info Section -->
    <section class="contact-info-section">
      <div class="container">
        <div class="section-header">
          <h2>Informasi Kontak</h2>
          <p>Berbagai cara untuk menghubungi Restoran Garuda</p>
        </div>
        
        <div class="contact-grid">
          <div 
            v-for="(info, index) in contactInfo" 
            :key="index"
            class="contact-card"
            @click="handleContactClick(info)"
          >
            <div class="contact-icon">
              <i :class="info.icon"></i>
            </div>
            <div class="contact-content">
              <h3>{{ info.title }}</h3>
              <p class="contact-main">{{ info.content }}</p>
              <p class="contact-detail">{{ info.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="contact-form-section" ref="formSection">
      <div class="container">
        <div class="form-container">
          <div class="form-header">
            <h2>Kirim Pesan</h2>
            <p>Sampaikan pertanyaan, saran, atau kritik Anda kepada kami</p>
          </div>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="nama">Nama Lengkap *</label>
                <input 
                  type="text" 
                  id="nama" 
                  v-model="formData.nama"
                  :class="{ 'error': errors.nama }"
                  placeholder="Masukkan nama lengkap Anda"
                  required
                />
                <span v-if="errors.nama" class="error-message">{{ errors.nama }}</span>
              </div>
              
              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email"
                  :class="{ 'error': errors.email }"
                  placeholder="contoh@email.com"
                  required
                />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="telepon">Nomor Telepon</label>
                <input 
                  type="tel" 
                  id="telepon" 
                  v-model="formData.telepon"
                  placeholder="08xx-xxxx-xxxx"
                />
              </div>
              
              <div class="form-group">
                <label for="subjek">Subjek *</label>
                <select 
                  id="subjek" 
                  v-model="formData.subjek"
                  :class="{ 'error': errors.subjek }"
                  required
                >
                  <option value="">Pilih subjek</option>
                  <option value="reservasi">Reservasi Meja</option>
                  <option value="catering">Layanan Catering</option>
                  <option value="menu">Pertanyaan Menu</option>
                  <option value="delivery">Delivery Order</option>
                  <option value="komplain">Komplain</option>
                  <option value="saran">Saran</option>
                  <option value="lainnya">Lainnya</option>
                </select>
                <span v-if="errors.subjek" class="error-message">{{ errors.subjek }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="pesan">Pesan *</label>
              <textarea 
                id="pesan" 
                v-model="formData.pesan"
                :class="{ 'error': errors.pesan }"
                placeholder="Tuliskan pesan Anda di sini..."
                rows="5"
                required
              ></textarea>
              <span v-if="errors.pesan" class="error-message">{{ errors.pesan }}</span>
            </div>

            <button 
              type="submit" 
              class="submit-btn"
              :disabled="loading"
            >
              <span v-if="loading" class="loading-spinner"></span>
              <span v-else>
                <i class="fas fa-paper-plane"></i>
                Kirim Pesan
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="container">
        <div class="map-header">
          <h2>Lokasi Kami</h2>
          <p>Kunjungi langsung Restoran Garuda di lokasi berikut</p>
        </div>
        
        <div class="map-container">
          <div class="map-placeholder">
            <div class="map-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <h3>Restoran Garuda</h3>
            <p>Jalan Pemuda No. 20 Medan</p>
            <p>Sumatera Utara, Indonesia</p>
            <button class="map-btn" @click="openMaps">
              <i class="fas fa-directions"></i>
              Buka di Google Maps
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Pesan Berhasil Dikirim!</h3>
        <p>Terima kasih atas pesan Anda. Tim kami akan segera merespons dalam 1x24 jam.</p>
        <button @click="closeModal" class="modal-btn">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HubungiKami',
  data() {
    return {
      formData: {
        nama: '',
        email: '',
        telepon: '',
        subjek: '',
        pesan: ''
      },
      errors: {
        nama: '',
        email: '',
        subjek: '',
        pesan: ''
      },
      loading: false,
      showSuccessModal: false,
      contactInfo: [
        {
          icon: 'fas fa-map-marker-alt',
          title: 'Alamat',
          content: 'Jalan Pemuda No. 20 Medan',
          detail: 'Sumatera Utara, Indonesia',
          type: 'address'
        },
        {
          icon: 'fas fa-phone',
          title: 'Telepon',
          content: '(061) 4567-890',
          detail: 'WhatsApp: 0812-3456-7890',
          type: 'phone'
        },
        {
          icon: 'fas fa-envelope',
          title: 'Email',
          content: 'info@restorangaruda.com',
          detail: 'booking@restorangaruda.com',
          type: 'email'
        },
        {
          icon: 'fas fa-clock',
          title: 'Jam Buka',
          content: 'Senin - Minggu',
          detail: '10:00 - 22:00 WIB',
          type: 'hours'
        }
      ]
    }
  },
  methods: {
    validateForm() {
      let isValid = true
      
      // Reset errors
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = ''
      })
      
      // Validate nama
      if (!this.formData.nama.trim()) {
        this.errors.nama = 'Nama lengkap wajib diisi'
        isValid = false
      }
      
      // Validate email
      if (!this.formData.email.trim()) {
        this.errors.email = 'Email wajib diisi'
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
        this.errors.email = 'Format email tidak valid'
        isValid = false
      }
      
      // Validate subjek
      if (!this.formData.subjek) {
        this.errors.subjek = 'Subjek wajib dipilih'
        isValid = false
      }
      
      // Validate pesan
      if (!this.formData.pesan.trim()) {
        this.errors.pesan = 'Pesan wajib diisi'
        isValid = false
      } else if (this.formData.pesan.trim().length < 10) {
        this.errors.pesan = 'Pesan minimal 10 karakter'
        isValid = false
      }
      
      return isValid
    },

    async submitForm() {
      if (!this.validateForm()) return
      
      this.loading = true
      
      try {
        // Simulasi pengiriman form
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Reset form
        Object.keys(this.formData).forEach(key => {
          this.formData[key] = ''
        })
        
        this.showSuccessModal = true
        
        console.log('Form submitted successfully')
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.')
      } finally {
        this.loading = false
      }
    },

    handleContactClick(info) {
      switch (info.type) {
        case 'phone':
          window.open(`tel:${info.content}`, '_self')
          break
        case 'email':
          window.open(`mailto:${info.content}`, '_self')
          break
        case 'address':
          this.openMaps()
          break
        default:
          break
      }
    },

    openMaps() {
      const address = encodeURIComponent('Jalan Pemuda No. 20 Medan, Sumatera Utara')
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
    },

    scrollToForm() {
      this.$refs.formSection?.scrollIntoView({ behavior: 'smooth' })
    },

    closeModal() {
      this.showSuccessModal = false
    }
  },

  mounted() {
    console.log('Halaman Hubungi Kami dimuat')
  }
}
</script>

<style scoped>
/* Import FontAwesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.hubungi-kami-page {
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23654321"/><circle cx="200" cy="150" r="80" fill="%23ff6b35" opacity="0.3"/><circle cx="800" cy="600" r="120" fill="%23ffa726" opacity="0.2"/><rect x="100" y="400" width="200" height="100" fill="%23ffffff" opacity="0.1" rx="10"/><rect x="700" y="200" width="300" height="150" fill="%23ffffff" opacity="0.1" rx="10"/><circle cx="1000" cy="300" r="60" fill="%23ff6b35" opacity="0.4"/></svg>');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  font-family: 'Arial', sans-serif;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

.logo:hover .logo-icon {
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.5);
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


/* Hero Section */
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-top: 1rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.4s both;
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

/* Contact Info Section */
.contact-info-section {
  padding: 6rem 0;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #ff6b35;
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.2rem;
  color: #666;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.contact-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(255, 107, 53, 0.2);
  border-color: #ff6b35;
}

.contact-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.contact-content h3 {
  font-size: 1.5rem;
  color: #ff6b35;
  margin-bottom: 1rem;
}

.contact-main {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.contact-detail {
  color: #666;
  font-size: 1rem;
}

/* Contact Form Section */
.contact-form-section {
  padding: 6rem 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 3rem;
}

.form-header h2 {
  font-size: 2.5rem;
  color: #ff6b35;
  margin-bottom: 1rem;
}

.form-header p {
  font-size: 1.1rem;
  color: #666;
}

.contact-form {
  color: #333;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff6b35;
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.2);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #e53e3e;
}

.error-message {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.submit-btn {
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  color: white;
  padding: 1.2rem 3rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem auto 0;
  min-width: 200px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Map Section */
.map-section {
  padding: 6rem 0;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
}

.map-header {
  text-align: center;
  margin-bottom: 3rem;
}

.map-header h2 {
  font-size: 2.5rem;
  color: #ff6b35;
  margin-bottom: 1rem;
}

.map-header p {
  font-size: 1.2rem;
  color: #666;
}

.map-container {
  max-width: 800px;
  margin: 0 auto;
}

.map-placeholder {
  background: white;
  border-radius: 15px;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 2px dashed #ddd;
}

.map-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  border-radius: 50%;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.map-placeholder h3 {
  font-size: 1.8rem;
  color: #ff6b35;
  margin-bottom: 1rem;
}

.map-placeholder p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.map-btn {
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.map-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

/* Success Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  max-width: 500px;
  margin: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: scaleIn 0.3s ease;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.modal-content h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

.modal-content p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.modal-btn {
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.modal-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { 
    opacity: 0;
    transform: scale(0.9);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
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
</style>