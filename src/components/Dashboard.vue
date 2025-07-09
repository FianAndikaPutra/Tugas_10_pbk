<template>
  <div class="home-page">
    <!-- Header -->
    <header class="header">
      <div class="nav-container">
      <div class="logo">
        <div class="logo-icon">R</div>
        <span>garuda</span>
      </div>
      <nav class="nav-menu">
        <router-link to="/" class="nav-link active">Home</router-link>
        <router-link to="/tentang-kami" class="nav-link">Tentang Kami</router-link>
        <router-link to="/delivery-order" class="nav-link">Delivery Order</router-link>
        <router-link to="/hubungi" class="nav-link">Hubungi Kami</router-link>
        <router-link to="/profil" class="nav-link">Profil</router-link>
      </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Restoran Garuda</h1>
        <p class="hero-subtitle">Cita Rasa Autentik Minang & Melayu Sejak 1976</p>
        <div class="hero-description">
          <p>Nikmati pengalaman kuliner tak terlupakan dengan hidangan khas Minang dan Melayu yang diolah dengan resep turun-temurun dan bahan-bahan pilihan terbaik.</p>
        </div>

      </div>
      <div class="hero-image">
        <div class="food-display">
          <div class="food-item" v-for="food in featuredFoods" :key="food.id">
            <div class="food-icon">{{ food.icon }}</div>
            <span class="food-name">{{ food.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Menu Section -->
    <section class="featured-menu">
      <div class="container">
        <div class="section-header">
          <h2>Menu Unggulan</h2>
          <p>Hidangan spesial yang menjadi favorit pelanggan</p>
        </div>
        <div class="menu-grid">
          <div 
            v-for="menu in menuUnggulan" 
            :key="menu.id"
            class="menu-card"
            @click="showMenuDetail(menu)"
          >
            <div class="menu-image">
              <div class="menu-icon">{{ menu.icon }}</div>
              <div class="menu-price">{{ formatPrice(menu.price) }}</div>
            </div>
            <div class="menu-info">
              <h3>{{ menu.name }}</h3>
              <p>{{ menu.description }}</p>
              <div class="menu-rating">
                <span class="stars">★★★★★</span>
                <span class="rating-text">({{ menu.rating }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-choose-us">
      <div class="container">
        <div class="section-header">
          <h2>Mengapa Memilih Garuda?</h2>
          <p>Pengalaman puluhan tahun dalam menyajikan cita rasa autentik</p>
        </div>
        <div class="features-grid">
          <div 
            v-for="feature in whyChooseUs" 
            :key="feature.id"
            class="feature-card"
          >
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div 
            v-for="stat in statistics" 
            :key="stat.id"
            class="stat-item"
          >
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="testimonial-section">
      <div class="container">
        <div class="section-header">
          <h2>Kata Pelanggan</h2>
          <p>Testimoni dari pelanggan setia kami</p>
        </div>
        <div class="testimonial-container">
          <div class="testimonial-grid">
            <div 
              v-for="testimonial in testimonials" 
              :key="testimonial.id"
              class="testimonial-card"
            >
              <div class="testimonial-content">
                <div class="quote-icon">"</div>
                <p>{{ testimonial.content }}</p>
                <div class="testimonial-rating">
                  <div class="stars">★★★★★</div>
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">{{ testimonial.author.charAt(0) }}</div>
                  <div class="author-info">
                    <h4>{{ testimonial.author }}</h4>
                    <span>{{ testimonial.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <div class="logo-icon">G</div>
              <span>garuda</span>
            </div>
            <p>Restoran Garuda - Menyajikan cita rasa autentik Minang & Melayu sejak 1976</p>
          </div>
          <div class="footer-section">
            <h3>Kontak</h3>
            <p>📍 Jalan Pemuda No. 20 Medan</p>
            <p>📞 0812-3456-7890</p>
            <p>✉️ info@garudarestoran.com</p>
          </div>
          <div class="footer-section">
            <h3>Jam Buka</h3>
            <p>Senin - Minggu</p>
            <p>10:00 - 22:00 WIB</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Restoran Garuda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Data reaktif
const featuredFoods = ref([
  { id: 1, name: 'Rendang', icon: '🍖' },
  { id: 2, name: 'Gulai', icon: '🍛' },
  { id: 3, name: 'Sate Padang', icon: '🍢' },
  { id: 4, name: 'Nasi Kapau', icon: '🍚' }
])

const menuUnggulan = ref([
  {
    id: 1,
    name: 'Rendang Daging',
    description: 'Daging sapi yang dimasak dengan bumbu rempah khas Minang hingga empuk dan berwarna cokelat kehitaman',
    price: 45000,
    rating: '4.9',
    icon: '🍖',
    image: '/images/rendang-daging.jpg'
  },
  {
    id: 2,
    name: 'Gulai Ayam',
    description: 'Ayam kampung yang dimasak dengan santan dan rempah-rempah pilihan, cita rasa gurih dan pedas',
    price: 35000,
    rating: '4.8',
    icon: '🍛'
  },
  {
    id: 3,
    name: 'Sate Padang',
    description: 'Sate daging sapi dengan kuah kental berwarna kuning yang kaya akan rempah-rempah',
    price: 25000,
    rating: '4.7',
    icon: '🍢'
  },
  {
    id: 4,
    name: 'Nasi Lemak',
    description: 'Nasi putih dengan berbagai lauk pauk, disajikan dengan sambal dan kerupuk',
    price: 40000,
    rating: '4.8',
    icon: '🍚'
    
  }
])

const whyChooseUs = ref([
  {
    id: 1,
    icon: '👨‍🍳',
    title: 'Chef Berpengalaman',
    description: 'Dimasak oleh chef berpengalaman dengan resep turun-temurun yang autentik'
  },
  {
    id: 2,
    icon: '🌿',
    title: 'Bahan Segar',
    description: 'Menggunakan bahan-bahan segar dan berkualitas tinggi yang dipilih secara selektif'
  },
  {
    id: 3,
    icon: '🏆',
    title: 'Cita Rasa Terjamin',
    description: 'Kelezatan yang konsisten dengan standar kualitas tinggi sejak tahun 1976'
  },
  {
    id: 4,
    icon: '🚚',
    title: 'Delivery Cepat',
    description: 'Layanan antar makanan yang cepat dan higienis ke seluruh kota Medan'
  }
])

const statistics = ref([
  { id: 1, value: '49', label: 'Tahun Pengalaman' },
  { id: 2, value: '1000+', label: 'Pelanggan Setia' },
  { id: 3, value: '50+', label: 'Menu Spesial' },
  { id: 4, value: '100%', label: 'Cita Rasa Autentik' }
])

const testimonials = ref([
  {
    id: 1,
    content: 'Rendang di Garuda benar-benar autentik! Rasanya seperti buatan nenek di kampung. Sudah langganan di sini sejak 10 tahun lalu.',
    author: 'Siti Aminah',
    location: 'Medan'
  },
  {
    id: 2,
    content: 'Pelayanan yang ramah dan makanan yang lezat. Sate Padangnya juara banget, kuahnya kental dan bumbu meresap sempurna.',
    author: 'Budi Santoso',
    location: 'Medan'
  },
  {
    id: 3,
    content: 'Tempat favorit untuk makan keluarga. Semua menu enak dan porsinya pas. Harga juga masih terjangkau.',
    author: 'Maria Simbolon',
    location: 'Medan'
  }
])

// Methods
const lihatMenu = () => {
  console.log('Navigasi ke halaman menu')
}

const pesanSekarang = () => {
  console.log('Navigasi ke halaman pemesanan')
}

const showMenuDetail = (menu) => {
  console.log('Menampilkan detail menu:', menu.name)
}


const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

const startTestimonialSlider = () => {
  // Auto slider dihapus untuk layout grid
}

const stopTestimonialSlider = () => {
  // Auto slider dihapus untuk layout grid
}

// Lifecycle
onMounted(() => {
  console.log('Halaman Home dimuat')
})

onUnmounted(() => {
  // Cleanup jika diperlukan
})
</script>

<style scoped>
.home-page {
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

/* Logo */
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

/* Navigation Menu */
.nav-menu {
  list-style: none;
  display: flex;
  gap: 25px;
  margin: 0;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  position: relative;
  background: transparent;
  border: 2px solid transparent;
  color: #ffffff;
  font-weight: bold;
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 2rem 4rem;
  color: white;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  animation: fadeInLeft 1s ease-out;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  background: linear-gradient(45deg, #ffa726, #ff6b35);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #ffa726;
  font-weight: 300;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.5);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid #ffa726;
}

.btn-secondary:hover {
  background: #ffa726;
  color: white;
  transform: translateY(-2px);
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInRight 1s ease-out;
}

.food-display {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 400px;
}

.food-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.food-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.food-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.food-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  color: white;
}

.section-header h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffa726, #ff6b35);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-header p {
  font-size: 1.2rem;
  opacity: 0.8;
}

/* Featured Menu Section */
.featured-menu {
  padding: 6rem 0;
  background: rgba(0, 0, 0, 0.3);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.menu-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.menu-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.menu-image {
  background: linear-gradient(135deg, #ff6b35, #ffa726);
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
}

.menu-icon {
  font-size: 4rem;
}

.menu-price {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #ff6b35;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
}

.menu-info {
  padding: 2rem;
}

.menu-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.menu-info p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.menu-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  color: #ffa726;
}

.rating-text {
  color: #666;
  font-size: 0.9rem;
}

/* Why Choose Us Section */
.why-choose-us {
  padding: 6rem 0;
  background: rgba(0, 0, 0, 0.5);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffa726;
}

.feature-card p {
  line-height: 1.6;
  opacity: 0.9;
}

/* Stats Section */
.stats-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #333, #555);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  color: white;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: #ffa726;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Testimonial Section */
.testimonial-section {
  padding: 6rem 0;
  background: rgba(0, 0, 0, 0.7);
}

.testimonial-container {
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  align-items: start;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: fit-content;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.testimonial-content {
  text-align: center;
  position: relative;
}

.quote-icon {
  font-size: 3rem;
  color: #ffa726;
  margin-bottom: 1rem;
  line-height: 1;
}

.testimonial-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.testimonial-rating {
  margin-bottom: 1.5rem;
}

.testimonial-rating .stars {
  color: #ffa726;
  font-size: 1.2rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ff6b35, #ffa726);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.3rem;
}

.author-info {
  text-align: left;
}

.author-info h4 {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
}

.author-info span {
  color: #666;
  font-size: 0.9rem;
}

/* Footer */
.footer {
  background: #222;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: #ffa726;
  margin-bottom: 1rem;
}

.footer-section p {
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.footer-logo .logo-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.footer-logo span {
  font-size: 1.5rem;
  font-weight: bold;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #444;
  opacity: 0.7;
}

/* Animations */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@media (max-width: 768px) {
  .hero-content {
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .menu-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .testimonial-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-description {
    font-size: 0.9rem;
  }

  .btn-primary, .btn-secondary {
    padding: 10px 20px;
    font-size: 1rem;
  }

  .menu-card {
    padding: 1.5rem;
  }

  .menu-info h3 {
    font-size: 1.2rem;
  }
}
</style>
