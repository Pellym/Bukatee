console.log("JS loaded!");
const products = {
  sweaters: Array.from({ length: 20 }, (_, i) => ({
    name: `Sweater ${i+1}`,
    price: 1200 + i * 10,
    img: `images/sweater${i+1}.jpg`
  })),
  tshirts: Array.from({ length: 20 }, (_, i) => ({
    name: `T-Shirt ${i+1}`,
    price: 650 + i * 5,
    img: `images/tshirt${i+1}.jpg`
  })),
  jeans: Array.from({ length: 20 }, (_, i) => ({
    name: `Jeans ${i+1}`,
    price: 999 + i * 15,
    img: `images/jeans${i+1}.jpg`
  })),
  sneakers: Array.from({ length: 20 }, (_, i) => ({
    name: `Sneakers ${i+1}`,
    price: 2800 + i * 20,
    img: `images/sneakers${i+1}.jpg`
  })),
};

// Cart array
let cart = [];

// Add to cart function
function addToCart(product) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartDisplay();
}

// Render products into the page
function renderProducts(category, containerId) {
  const container = document.getElementById(containerId);
  products[category].forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h2>${p.name}</h2>
      <p>R${p.price}</p>
      <label>Size:
        <select>
          <option value="S">S</option>
          <option value="M" selected>M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </label>
      <button>Add to Cart</button>
    `;

    const btn = card.querySelector("button");
    const sizeSelect = card.querySelector("select");
    btn.addEventListener("click", () => {
      addToCart({ ...p, size: sizeSelect.value });
      showAlert(`${p.name} (Size: ${sizeSelect.value}) added to cart`);
    });

    container.appendChild(card);
  });
}
function showAlert(message) {
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "20px";
  alertDiv.style.right = "20px";
  alertDiv.style.background = "#4CAF50";
  alertDiv.style.color = "#fff";
  alertDiv.style.padding = "10px 20px";
  alertDiv.style.borderRadius = "5px";
  alertDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  alertDiv.style.zIndex = "1000";

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 2000);
}


// Update cart display
function updateCartDisplay() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "<h3>Your Cart</h3>";

  if (cart.length === 0) {
    cartDiv.innerHTML += "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    cartDiv.innerHTML += `
      <p>${item.name} (${item.size}) x${item.qty} = R${itemTotal}</p>
    `;
    total += itemTotal;
  });

  cartDiv.innerHTML += `<p><strong>Total: R${total}</strong></p>`;
}

// When page loads
document.addEventListener("DOMContentLoaded", () => {
  // Render each category
  renderProducts("sweaters", "sweaters-container");
  renderProducts("tshirts", "tshirts-container");
  renderProducts("jeans", "jeans-container");
  renderProducts("sneakers", "sneakers-container");

  function calculateTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

  // Show empty cart initially
  updateCartDisplay();

  document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const orderData = {
        fullName: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        address: document.getElementById("address").value.trim(),
        paymentMethod: document.getElementById("payment").value,
        totalPrice: calculateTotal(),
        cart: cart
    };
  })
})