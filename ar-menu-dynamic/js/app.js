// --- 1. TABLE DETECTION ---
const params = new URLSearchParams(window.location.search);
if (params.has('table')) {
    localStorage.setItem('table_number', params.get('table'));
}
const currentTable = localStorage.getItem('table_number') || "Walk-in";

// --- 2. CART SYSTEM ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
    const item = getItemById(id);
    if (!item) {
        console.error('Item not found:', id);
        return;
    }
    
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    
    // Show notification
    showNotification(`${item.name} added to cart!`);
    
    // Trigger Upsell if recommendations exist
    if (item.recommendations && item.recommendations.length > 0) {
        setTimeout(() => {
            showUpsellModal(item.recommendations);
        }, 500);
    }
}

function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function getCartItemCount(itemId) {
    return cart.filter(item => item.id === itemId).length;
}

function updateCartUI() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = cart.length;
        
        // Animate badge
        if (cart.length > 0) {
            badge.style.transform = 'scale(1.2)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// --- 3. UPSELL MODAL ---
function showUpsellModal(recIds) {
    // Don't show if modal already exists
    if (document.querySelector('.upsell-modal')) return;
    
    const modal = document.createElement('div');
    modal.className = 'upsell-modal';
    
    let htmlContent = `
        <div class="upsell-content">
            <h3>🍔 Make it a Combo!</h3>
            <p style="color: #6c757d; margin-bottom: 20px;">Complete your meal with these perfect pairings:</p>
            <div class="upsell-grid">
    `;
    
    recIds.forEach(id => {
        const item = getItemById(id);
        if (item) {
            htmlContent += `
                <div class="upsell-item" onclick="addUpsellItem('${item.id}', this)">
                    <img src="${item.image}" alt="${item.name}">
                    <div style="flex: 1;">
                        <strong style="color: var(--dark); font-size: 1.05em;">${item.name}</strong>
                        <br>
                        <span style="color: var(--primary); font-weight: 700;">Rs. ${item.price}</span>
                    </div>
                    <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9em;">
                        Add +
                    </button>
                </div>
            `;
        }
    });
    
    htmlContent += `
            </div>
            <button class="btn-close" onclick="closeUpsellModal()">No Thanks, Continue</button>
        </div>
    `;
    
    modal.innerHTML = htmlContent;
    modal.onclick = (e) => {
        if (e.target === modal) closeUpsellModal();
    };
    
    document.body.appendChild(modal);
}

function addUpsellItem(id, element) {
    addToCart(id);
    element.style.opacity = '0.5';
    element.querySelector('button').innerText = '✓ Added';
    element.onclick = null;
}

function closeUpsellModal() {
    const modal = document.querySelector('.upsell-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s';
        setTimeout(() => modal.remove(), 300);
    }
}

// --- 4. NOTIFICATION SYSTEM ---
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// --- 5. SMOOTH SCROLL FOR CATEGORIES ---
function smoothScrollToCategory(categoryId) {
    const element = document.getElementById(categoryId);
    if (element) {
        const offset = 120; // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// --- 6. SEARCH FUNCTIONALITY (Optional Enhancement) ---
function searchMenu(query) {
    query = query.toLowerCase();
    const results = [];
    
    for (const category in MENU_DATA) {
        MENU_DATA[category].forEach(item => {
            if (item.name.toLowerCase().includes(query) || 
                (item.description && item.description.toLowerCase().includes(query))) {
                results.push(item);
            }
        });
    }
    
    return results;
}

// --- 7. INITIALIZE ---
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    
    // Add smooth scroll to category tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const category = tab.getAttribute('data-category');
            if (category) {
                smoothScrollToCategory(category);
            }
        });
    });
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(120%); }
    }
    
    .cart-badge {
        transition: transform 0.2s;
    }
`;
document.head.appendChild(style);