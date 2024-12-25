// JavaScript for BOB AYAKKABI 


const products = [
    { id: 1, name: "Siyah Spor Ayakkabı", category: "Spor", price: 2999, image: "images/erkekspor42.jpg" },
    { id: 2, name: "Beyaz Spor Ayakkabısı", category: "Spor", price: 2999, image: "images/kadinspor82.jpg" },
    { id: 3, name: "Siyah Bot", category: "Bot", price: 3999, image: "images/kadinbot42.jpg" },
    { id: 4, name: "Pembe Spor Ayakkabısı", category: "Spor", price: 1999, image: "images/kadinspor9.jpg" },
  ];
  
  let cart = []; // Sepet için boş bir dizi
  
  // DOM Elements
  const productList = document.querySelector("#product-list");
  const cartList = document.querySelector("#cart-list");
  const searchInput = document.querySelector("#search-input");
  const filterSelect = document.querySelector("#category-filter");
  const cartIcon = document.querySelector("#cart-icon");
  
  // Functions
  
  // Ürünleri listele
  function displayProducts(productArray) {
    productList.innerHTML = ""; // Önce içeriği temizle
    productArray.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");
      productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Fiyat: ${product.price} TL</p>
        <button class="add-to-cart" data-id="${product.id}">Sepete Ekle</button>
      `;
      productList.appendChild(productItem);
    });
  }
  
  // Sepete ürün ekle
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const cartItem = cart.find((item) => item.id === productId);
  
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    displayCart();
  }
  
  // Sepetten ürün sil
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    displayCart();
  }
  
  // Sepeti göster
  function displayCart() {
    cartList.innerHTML = ""; // Önce içeriği temizle
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>Fiyat: ${item.price} TL</p>
        <p>Adet: ${item.quantity}</p>
        <button class="remove-from-cart" data-id="${item.id}">Kaldır</button>
      `;
      cartList.appendChild(cartItem);
    });
  }
  
  // Ürünleri filtrele
  function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = filterSelect.value;
  
    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchText);
      const matchesCategory = selectedCategory === "Tümü" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  
    displayProducts(filteredProducts);
  }
  
  // Sepet sayfasına git
  function navigateToCart() {
    window.location.href = "images/sepet.jpg.svg";
  }
  
  // Event Listeners
  productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const productId = parseInt(e.target.dataset.id);
      addToCart(productId);
    }
  });
  
  cartList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-from-cart")) {
      const productId = parseInt(e.target.dataset.id);
      removeFromCart(productId);
    }
  });
  
  searchInput.addEventListener("input", filterProducts);
  filterSelect.addEventListener("change", filterProducts);
  cartIcon.addEventListener("click", navigateToCart);
  
  // Sayfa yüklendiğinde başlangıç ürünlerini göster
  displayProducts(products);
  