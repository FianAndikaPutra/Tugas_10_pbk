<template>
  <div class="tentang-kami-page">
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
        <h1>Tentang Kami</h1>
        <div class="breadcrumb">
          <router-link to="/" class="breadcrumb-link">HOME</router-link> > TENTANG KAMI
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="about-header">
        <div class="about-title">Restoran Garuda</div>
        <div class="about-subtitle">Tentang Kami</div>
      </div>

      <div class="about-content">
        <p class="about-text">
          <span class="highlight">Restoran Garuda</span> merupakan perusahaan swasta yang terbentuk perorangan. 
          Didirikan pada tanggal <span class="highlight">{{ tanggalBerdiri }}</span> berlokasi di 
          {{ alamatPusat }}, yang kemudian ditetapkan sebagai Rumah Makan Garuda I sekaligus sebagai 
          kantor pusat dan administrasinya. Pada awalnya restoran ini hanya berupa rumah makan yang 
          diberi nama <span class="highlight">'Rumah Makan dan Buffet Garuda'</span>.
        </p>

        <p class="about-text">
          Rumah Makan Garuda bergerak dibidang mengelolah makanan yang spesifik yaitu 
          <span class="highlight">{{ spesialisasi.join(' dan ') }}</span>, dimana alasan untuk mendirikan 
          rumah makan ini adalah merupakan hasil survey bahwa masih kurangnya sarana rumah makan terutama 
          yang menyediakan makanan spesifik {{ spesialisasi.join(' dan ') }} dikota Medan. Dengan melihat 
          kesempatan inilah, maka didirikanlah <span class="highlight">Rumah Makan Garuda pada tahun {{ tahunBerdiri }}</span>.
        </p>

        <p class="about-text">
          Bidang usaha ini terus berkembang hingga saat ini, dimana terdapat beberapa usaha sejenis yang 
          dikelola oleh pihak lain. Dengan komitmen untuk terus memberikan pelayanan terbaik dan cita rasa 
          autentik, Restoran Garuda telah menjadi salah satu destinasi kuliner terpercaya di kota Medan 
          untuk menikmati hidangan khas {{ spesialisasi.join(' dan ') }}.
        </p>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-container">
        <div 
          v-for="stat in statistics" 
          :key="stat.id"
          class="stat-item"
          @click="showStatDetail(stat)"
        >
          <div class="stat-number">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Vision Mission Section -->
    <section class="vision-mission">
      <div class="vm-container">
        <div class="vm-item">
          <h3>Visi Kami</h3>
          <p>{{ visi }}</p>
        </div>
        <div class="vm-item">
          <h3>Misi Kami</h3>
          <ul>
            <li v-for="misi in misiList" :key="misi">{{ misi }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Data reaktif
const tanggalBerdiri = ref('9 Oktober 1976')
const tahunBerdiri = ref(1976)
const alamatPusat = ref('Jalan Pemuda No. 20 Medan')
const spesialisasi = ref(['Minang', 'Melayu'])

const statistics = ref([
  { id: 1, value: '49', label: 'Tahun Pengalaman' },
  { id: 2, value: '1000+', label: 'Pelanggan Setia' },
  { id: 3, value: '50+', label: 'Menu Spesial' },
  { id: 4, value: '100%', label: 'Cita Rasa Autentik' }
])

const visi = ref('Menjadi restoran terdepan dalam menyajikan hidangan khas Minang dan Melayu dengan cita rasa autentik dan pelayanan terbaik di Indonesia.')

const misiList = ref([
  'Menyajikan hidangan berkualitas tinggi dengan bahan-bahan segar dan bumbu autentik',
  'Memberikan pelayanan yang ramah dan profesional kepada setiap pelanggan',
  'Melestarikan warisan kuliner tradisional Minang dan Melayu',
  'Terus berinovasi dalam pengembangan menu dan pelayanan',
  'Menciptakan pengalaman kuliner yang tak terlupakan bagi setiap pengunjung'
])

// Computed properties
const pengalamanTahun = computed(() => {
  const currentYear = new Date().getFullYear()
  return currentYear - tahunBerdiri.value
})

// Methods
const hubungiKami = () => {
  // Implementasi hubungi kami
  alert('Hubungi kami di: 0812-3456-7890')
}

const showStatDetail = (stat) => {
  console.log('Menampilkan detail:', stat.label)
}

// Lifecycle
onMounted(() => {
  // Update statistik tahun pengalaman secara real-time
  statistics.value[0].value = pengalamanTahun.value.toString()
  
  console.log('Halaman Tentang Kami dimuat')
})
</script>

<style scoped>
.tentang-kami-page {
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

.nav-link.router-link-active {
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

/* Content Section */
.content-section {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
}

.about-header {
  text-align: left;
  margin-bottom: 3rem;
  animation: fadeInLeft 1s ease-out;
}

.about-title {
  font-size: 4rem;
  color: #ffa726;
  font-style: italic;
  margin-bottom: 1rem;
  opacity: 0.8;
  background: linear-gradient(45deg, #ffa726, #ff6b35);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.about-subtitle {
  font-size: 2.5rem;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 2rem;
}

.about-content {
  background-color: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1.5rem;
  text-align: justify;
}

.highlight {
  color: #ff6b35;
  font-weight: bold;
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, #333, #555);
  color: white;
  padding: 3rem 0;
  margin-top: 4rem;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.stat-item:hover {
  transform: translateY(-5px);
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: #ffa726;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.2rem;
  color: #ccc;
}

/* Vision Mission Section */
.vision-mission {
  background-color: white;
  padding: 4rem 0;
  margin-top: 4rem;
}

.vm-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 3rem;
  padding: 0 2rem;
}

.vm-item {
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.vm-item h3 {
  color: #ff6b35;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.vm-item p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
}

.vm-item ul {
  list-style: none;
  padding-left: 0;
}

.vm-item li {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
}

.vm-item li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #ff6b35;
  font-weight: bold;
}

/* Animations */
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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .about-title {
    font-size: 2.5rem;
  }

  .about-subtitle {
    font-size: 1.8rem;
  }

  .about-content {
    padding: 2rem;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .vm-container {
    grid-template-columns: 1fr;
  }
}
</style>
