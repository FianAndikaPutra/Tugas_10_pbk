<template>
  <div class="delivery-order-page">
    <!-- Header -->
    <header class="header">
      <div class="nav-container">
        <div class="logo">
          <div class="logo-icon">R</div>
          <span>garuda</span>
        </div>
        <nav class="nav-menu">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/tentang-kami" class="nav-link">Tentang Kami</router-link>
          <router-link to="/delivery-order" class="nav-link active">Delivery Order</router-link>
          <router-link to="/hubungi" class="nav-link">Hubungi Kami</router-link>
          <router-link to="/profil" class="nav-link">Profil</router-link>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Delivery Order</h1>
        <div class="breadcrumb">
          <router-link to="/" class="breadcrumb-link">HOME</router-link> > DELIVERY ORDER
        </div>
        <p class="hero-subtitle">Nikmati kelezatan masakan Minang & Melayu di rumah Anda</p>
      </div>
    </section>

    <!-- Admin Panel -->
    <section class="admin-panel" v-if="isAdmin">
      <div class="admin-container">
        <h2>Panel Admin</h2>
        <button @click="showAddMenuForm = !showAddMenuForm" class="admin-btn">
          {{ showAddMenuForm ? 'Tutup Form' : 'Tambah Menu Baru' }}
        </button>
        
        <!-- Add Menu Form -->
        <div v-if="showAddMenuForm" class="add-menu-form">
          <h3>Tambah Menu Baru</h3>
          <form @submit.prevent="addNewMenu" class="menu-form">
            <div class="form-row">
              <div class="form-group">
                <label>Nama Menu</label>
                <input v-model="newMenu.name" type="text" required />
              </div>
              
              <div class="form-group">
                <label>Kategori</label>
                <select v-model="newMenu.category" required>
                  <option value="">Pilih Kategori</option>
                  <option v-for="category in categories.filter(c => c !== 'Semua')" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>Harga</label>
                <input v-model.number="newMenu.price" type="number" min="0" required />
              </div>
              
              <div class="form-group">
                <label>Rating</label>
                <input v-model.number="newMenu.rating" type="number" min="1" max="5" step="0.1" required />
              </div>
            </div>
            
            <div class="form-group">
              <label>Deskripsi</label>
              <textarea v-model="newMenu.description" rows="3" required></textarea>
            </div>
            
            <div class="form-group">
              <label>URL Gambar (opsional)</label>
              <input v-model="newMenu.imageUrl" type="url" placeholder="https://example.com/image.jpg" />
            </div>
            
            <div class="form-actions">
              <button type="submit" class="submit-btn">Tambah Menu</button>
              <button type="button" @click="resetForm" class="cancel-btn">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Order Status Section -->
    <section class="order-status-section" v-if="currentOrder">
      <div class="status-container">
        <h2>Status Pesanan Anda</h2>
        <div class="order-tracking">
          <div class="order-info">
            <p><strong>Order ID:</strong> {{ currentOrder.id }}</p>
            <p><strong>Total:</strong> Rp {{ formatPrice(currentOrder.total) }}</p>
          </div>
          <div class="status-steps">
            <div 
              v-for="(step, index) in orderSteps" 
              :key="index"
              :class="['step', { active: index <= currentOrder.status }]"
            >
              <div class="step-icon">{{ step.icon }}</div>
              <div class="step-label">{{ step.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Menu Section -->
    <section class="menu-section">
      <div class="menu-container">
        <div class="menu-header">
          <h2>Menu Pilihan</h2>
          <button @click="isAdmin = !isAdmin" class="admin-toggle">
            {{ isAdmin ? 'Mode User' : 'Mode Admin' }}
          </button>
        </div>
        
        <div class="menu-categories">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = category"
            :class="['category-btn', { active: selectedCategory === category }]"
          >
            {{ category }}
          </button>
        </div>
        
        <div class="menu-grid">
          <div 
            v-for="item in filteredMenu" 
            :key="item.id"
            class="menu-item"
          >
            <div class="item-image">
              <img :src="item.image" :alt="item.name" />
              <div class="item-overlay">
                <button @click="addToCart(item)" class="add-btn">
                  <span>+</span>
                </button>
                <button v-if="isAdmin" @click="removeMenu(item)" class="remove-menu-btn">
                  <span>🗑️</span>
                </button>
              </div>
            </div>
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
              <div class="item-price">Rp {{ formatPrice(item.price) }}</div>
              <div class="item-rating">
                <span v-for="n in 5" :key="n" class="star">⭐</span>
                <span class="rating-text">({{ item.rating }})</span>
              </div>
              <div v-if="isAdmin" class="admin-info">
                <small>ID: {{ item.id }} | Kategori: {{ item.category }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cart Section -->
    <section class="cart-section" v-if="cart.length > 0">
      <div class="cart-container">
        <h2>Keranjang Belanja</h2>
        <div class="cart-items">
          <div 
            v-for="item in cart" 
            :key="item.id"
            class="cart-item"
          >
            <img :src="item.image" :alt="item.name" />
            <div class="item-details">
              <h4>{{ item.name }}</h4>
              <p>Rp {{ formatPrice(item.price) }}</p>
            </div>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item)" class="qty-btn">-</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="qty-btn">+</button>
            </div>
            <button @click="removeFromCart(item)" class="remove-btn">🗑️</button>
          </div>
        </div>
        <div class="cart-total">
          <h3>Total: Rp {{ formatPrice(cartTotal) }}</h3>
        </div>
      </div>
    </section>

    <!-- Order Form Section -->
    <section class="order-form-section" v-if="cart.length > 0">
      <div class="form-container">
        <h2>Informasi Pengiriman</h2>
        <form @submit.prevent="submitOrder" class="order-form">
          <div class="form-group">
            <label>Nama Lengkap</label>
            <input v-model="orderForm.name" type="text" required />
          </div>
          
          <div class="form-group">
            <label>Nomor Telepon</label>
            <input v-model="orderForm.phone" type="tel" required />
          </div>
          
          <div class="form-group">
            <label>Alamat Lengkap</label>
            <textarea v-model="orderForm.address" rows="3" required></textarea>
          </div>
          
          <div class="form-group">
            <label>Metode Pembayaran</label>
            <select v-model="orderForm.paymentMethod" required>
              <option value="">Pilih Metode Pembayaran</option>
              <option value="cod">Cash on Delivery (COD)</option>
              <option value="transfer">Transfer Bank</option>
              <option value="ewallet">E-Wallet</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Catatan Khusus</label>
            <textarea v-model="orderForm.notes" rows="2" placeholder="Contoh: Pedas sedang, tanpa cabai, dll"></textarea>
          </div>
          
          <div class="delivery-options">
            <h3>Pilihan Pengiriman</h3>
            <div class="delivery-choice">
              <label>
                <input type="radio" v-model="orderForm.deliveryType" value="standard" />
                <span>Standard (45-60 menit) - Gratis</span>
              </label>
              <label>
                <input type="radio" v-model="orderForm.deliveryType" value="express" />
                <span>Express (20-30 menit) - Rp 10.000</span>
              </label>
            </div>
          </div>
          
          <div class="order-summary">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>Rp {{ formatPrice(cartTotal) }}</span>
            </div>
            <div class="summary-row">
              <span>Ongkir:</span>
              <span>Rp {{ formatPrice(deliveryFee) }}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>Rp {{ formatPrice(grandTotal) }}</span>
            </div>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting">Memproses...</span>
            <span v-else>Pesan Sekarang</span>
          </button>
        </form>
      </div>
    </section>

    <!-- Empty Cart Message -->
    <section class="empty-cart" v-if="cart.length === 0">
      <div class="empty-content">
        <div class="empty-icon">🛒</div>
        <h3>Keranjang Belanja Kosong</h3>
        <p>Pilih menu favorit Anda untuk mulai berbelanja</p>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

// Data reaktif
const selectedCategory = ref('Semua')
const cart = ref([])
const currentOrder = ref(null)
const isSubmitting = ref(false)
const isAdmin = ref(false)
const showAddMenuForm = ref(false)

const categories = ref(['Semua', 'Minang', 'Melayu', 'Nasi', 'Ayam', 'Sapi', 'Seafood', 'Sayur', 'Minuman'])

const orderSteps = ref([
  { icon: '📋', label: 'Diterima' },
  { icon: '👨‍🍳', label: 'Dimasak' },
  { icon: '🏍️', label: 'Dikirim' },
  { icon: '✅', label: 'Selesai' }
])

// Form untuk menambah menu baru
const newMenu = ref({
  name: '',
  category: '',
  price: 0,
  description: '',
  imageUrl: '',
  rating: 4.5
})

const menuItems = ref([
  { 
    id: 1, 
    name: 'Rendang Daging', 
    category: 'Minang', 
    price: 45000, 
    description: 'Rendang daging sapi yang empuk dengan bumbu rempah tradisional',
    image: '/src/assets/download (5).jpeg',
    rating: 4.8
  },
  { 
    id: 2, 
    name: 'Gulai Ayam', 
    category: 'Minang', 
    price: 35000, 
    description: 'Gulai ayam dengan kuah santan yang gurih dan rempah yang kaya',
    image: '/src/assets/download (1).webp',
    rating: 4.6
  },
  { 
    id: 3, 
    name: 'Nasi Lemak', 
    category: 'Melayu', 
    price: 25000, 
    description: 'Nasi lemak dengan lauk lengkap, sambal, dan kerupuk',
    image: '/src/assets/download (2).webp',
    rating: 4.5
  },
  { 
    id: 4, 
    name: 'Sate Padang', 
    category: 'Minang', 
    price: 30000, 
    description: 'Sate daging dengan bumbu khas Padang yang pedas gurih',
    image: '/src/assets/OIP.webp',
    rating: 4.7
  },
  { 
    id: 5, 
    name: 'Ayam Penyet', 
    category: 'Ayam', 
    price: 28000, 
    description: 'Ayam goreng yang dipenyet dengan sambal terasi pedas',
    image: '/src/assets/download (4).webp',
    rating: 4.4
  },
  { 
    id: 6, 
    name: 'Ikan Asam Pedas', 
    category: 'Seafood', 
    price: 40000, 
    description: 'Ikan segar dengan kuah asam pedas yang menyegarkan',
    image: '/src/assets/OIP (1).webp',
    rating: 4.6
  },
  { 
    id: 7, 
    name: 'Es Teh Manis', 
    category: 'Minuman', 
    price: 8000, 
    description: 'Es teh manis segar untuk menemani makanan',
    image: '/src/assets/download (7).jpeg',
    rating: 4.2
  },
  { 
    id: 8, 
    name: 'Sayur Lodeh', 
    category: 'Sayur', 
    price: 20000, 
    description: 'Sayur lodeh dengan santan dan bumbu yang lezat',
    image: '/src/assets/download (6).webp',
    rating: 4.3
  }
])

const orderForm = ref({
  name: '',
  phone: '',
  address: '',
  paymentMethod: '',
  notes: '',
  deliveryType: 'standard'
})

// Computed properties
const filteredMenu = computed(() => {
  if (selectedCategory.value === 'Semua') {
    return menuItems.value
  }
  return menuItems.value.filter(item => item.category === selectedCategory.value)
})

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const deliveryFee = computed(() => {
  return orderForm.value.deliveryType === 'express' ? 10000 : 0
})

const grandTotal = computed(() => {
  return cartTotal.value + deliveryFee.value
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

const generateDefaultImage = (name, category) => {
  const colors = {
    'Minang': '#8B3000',
    'Melayu': '#FFFFFF',
    'Nasi': '#F5F5DC',
    'Ayam': '#FFD700',
    'Sapi': '#8B4513',
    'Seafood': '#FF4500',
    'Sayur': '#32CD32',
    'Minuman': '#8DA3B7'
  }
  
  const color = colors[category] || '#666666'
  const textColor = category === 'Melayu' ? '#333' : 'white'
  
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="150" fill="${color}"/>
      <circle cx="100" cy="75" r="40" fill="${color}99"/>
      <text x="100" y="80" text-anchor="middle" fill="${textColor}" font-size="10">${name}</text>
    </svg>
  `)}`
}

const addNewMenu = () => {
  if (!newMenu.value.name || !newMenu.value.category || !newMenu.value.price || !newMenu.value.description) {
    alert('Harap isi semua field yang wajib!')
    return
  }
  
  const newId = Math.max(...menuItems.value.map(item => item.id)) + 1
  const imageUrl = newMenu.value.imageUrl || generateDefaultImage(newMenu.value.name, newMenu.value.category)
  
  const menuItem = {
    id: newId,
    name: newMenu.value.name,
    category: newMenu.value.category,
    price: newMenu.value.price,
    description: newMenu.value.description,
    image: imageUrl,
    rating: newMenu.value.rating
  }
  
  menuItems.value.push(menuItem)
  
  // Reset form
  resetForm()
  showAddMenuForm.value = false
  
  alert(`Menu "${menuItem.name}" berhasil ditambahkan!`)
}

const resetForm = () => {
  newMenu.value = {
    name: '',
    category: '',
    price: 0,
    description: '',
    imageUrl: '',
    rating: 4.5
  }
}

const removeMenu = (item) => {
  if (confirm(`Apakah Anda yakin ingin menghapus menu "${item.name}"?`)) {
    const index = menuItems.value.findIndex(menu => menu.id === item.id)
    if (index > -1) {
      menuItems.value.splice(index, 1)
      
      // Remove from cart if exists
      const cartIndex = cart.value.findIndex(cartItem => cartItem.id === item.id)
      if (cartIndex > -1) {
        cart.value.splice(cartIndex, 1)
      }
      
      alert(`Menu "${item.name}" berhasil dihapus!`)
    }
  }
}

const addToCart = (item) => {
  const existingItem = cart.value.find(cartItem => cartItem.id === item.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.value.push({
      ...item,
      quantity: 1
    })
  }
}

const increaseQuantity = (item) => {
  item.quantity += 1
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1
  }
}

const removeFromCart = (item) => {
  const index = cart.value.findIndex(cartItem => cartItem.id === item.id)
  if (index > -1) {
    cart.value.splice(index, 1)
  }
}

const submitOrder = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create order
    const orderId = 'ORD' + Date.now()
    currentOrder.value = {
      id: orderId,
      items: [...cart.value],
      total: grandTotal.value,
      status: 0,
      customer: { ...orderForm.value }
    }
    
    // Clear cart and form
    cart.value = []
    orderForm.value = {
      name: '',
      phone: '',
      address: '',
      paymentMethod: '',
      notes: '',
      deliveryType: 'standard'
    }
    
    // Start order status simulation
    simulateOrderProgress()
    
    alert('Pesanan berhasil dibuat! Order ID: ' + orderId)
    
  } catch (error) {
    alert('Terjadi kesalahan saat memproses pesanan')
  } finally {
    isSubmitting.value = false
  }
}

const simulateOrderProgress = () => {
  const intervals = [30000, 60000, 90000] // 30s, 60s, 90s
  
  intervals.forEach((interval, index) => {
    setTimeout(() => {
      if (currentOrder.value) {
        currentOrder.value.status = index + 1
      }
    }, interval)
  })
}

// Lifecycle
onMounted(() => {
  console.log('Halaman Delivery Order dimuat')
})
</script>

<style scoped>
/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.delivery-order-page {
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

/* Admin Panel */
.admin-panel {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin: 2rem;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.admin-container h2 {
  color: #333;
  margin-bottom: 1rem;
}

.admin-btn {
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.admin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.add-menu-form {
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(248, 249, 250, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.menu-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.8rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.submit-btn {
  background: linear-gradient(45deg, #ff6b6b, #ee5a52);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.cancel-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #5a6268;
}

/* Menu Section */
.menu-section {
  padding: 3rem 2rem;
}

.menu-container {
  max-width: 1200px;
  margin: 0 auto;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.menu-header h2 {
  color: white;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.admin-toggle {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.admin-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.menu-categories {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.category-btn:hover,
.category-btn.active {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.menu-item {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.item-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.menu-item:hover .item-image img {
  transform: scale(1.1);
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-item:hover .item-overlay {
  opacity: 1;
}

.add-btn,
.remove-menu-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.remove-menu-btn {
  background: #dc3545;
}

.add-btn:hover {
  background: #ee5a52;
  transform: scale(1.1);
}

.remove-menu-btn:hover {
  background: #c82333;
  transform: scale(1.1);
}

.item-info {
  padding: 1.5rem;
}

.item-info h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.item-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.item-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 0.5rem;
}

.item-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.star {
  font-size: 0.8rem;
}

.rating-text {
  color: #666;
  font-size: 0.9rem;
}

.admin-info {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  color: #999;
}

/* Cart Section */
.cart-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin: 2rem;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.cart-container h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(248, 249, 250, 0.8);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  color: #333;
  margin-bottom: 0.25rem;
}

.item-details p {
  color: #666;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background: #ee5a52;
  transform: scale(1.1);
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
  color: #333;
}

.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #c82333;
  transform: scale(1.1);
}

.cart-total {
  text-align: right;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 10px;
  border: 2px solid rgba(255, 107, 107, 0.2);
}

.cart-total h3 {
  color: #ff6b6b;
  font-size: 1.5rem;
}

/* Order Form */
.order-form-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin: 2rem;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.order-form {
  display: grid;
  gap: 1.5rem;
}

.delivery-options {
  padding: 1rem;
  background: rgba(248, 249, 250, 0.8);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.delivery-options h3 {
  color: #333;
  margin-bottom: 1rem;
}

.delivery-choice {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #000;
}

.delivery-choice label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.delivery-choice label:hover {
  background: rgba(255, 107, 107, 0.1);
}

.order-summary {
  background: rgba(248, 249, 250, 0.8);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.2rem;
  color: #ff6b6b;
  border-top: 2px solid rgba(255, 107, 107, 0.2);
  padding-top: 0.5rem;
  margin-top: 1rem;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  color: white;
}

.empty-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.empty-content p {
  opacity: 0.9;
}

/* Order Status */
.order-status-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin: 2rem;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.status-container h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.order-tracking {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.order-info {
  background: rgba(248, 249, 250, 0.8);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.order-info p {
  margin-bottom: 0.5rem;
  color: #333;
}

.status-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.status-steps::before {
  content: '';
  position: absolute;
  top: 25px;
  left: 25px;
  right: 25px;
  height: 2px;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.step-icon {
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.step.active .step-icon {
  background: #4CAF50;
  color: white;
  transform: scale(1.1);
}

.step-label {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

.step.active .step-label {
  color: #4CAF50;
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .menu-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .quantity-controls {
    justify-content: center;
  }
  
  .status-steps {
    flex-direction: column;
    gap: 1rem;
  }
  
  .status-steps::before {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 1.5rem;
  }
  
  .menu-container,
  .cart-container,
  .form-container,
  .admin-container {
    padding: 1rem;
  }
  
  .menu-categories {
    flex-direction: column;
    align-items: center;
  }
  
  .category-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
