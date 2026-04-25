// ============================================
//   LuxeEstate - Premium Real Estate Website
//   script.js
// ============================================

// ── PROPERTY DATA ──
const properties = [
  {
    id: 1, type: 'penthouse',
    img: 'images/prop-penthouse1.jpg',
    badge: 'For Sale', featured: 'New Listing',
    price: '$4,200,000', name: 'Sky Penthouse Residence',
    location: 'Manhattan, New York',
    beds: 4, baths: 4, sqft: '3,800'
  },
  {
    id: 2, type: 'villa',
    img: 'images/prop-villa1.jpg',
    badge: 'For Sale', featured: 'Premium',
    price: '$7,850,000', name: 'Sunrise Villa Estate',
    location: 'Palm Beach, Florida',
    beds: 6, baths: 5, sqft: '6,200'
  },
  {
    id: 3, type: 'apartment',
    img: 'images/prop-appartment1.jpg',
    badge: 'For Rent', featured: '',
    price: '$8,500/mo', name: 'Lakeview Modern Apartment',
    location: 'Chicago, Illinois',
    beds: 2, baths: 2, sqft: '1,450'
  },
  {
    id: 4, type: 'villa',
    img: 'images/prop-villa2.jpg',
    badge: 'For Sale', featured: 'Hot Deal',
    price: '$3,100,000', name: 'Hillside Private Villa',
    location: 'Los Angeles, California',
    beds: 5, baths: 4, sqft: '4,500'
  },
  {
    id: 5, type: 'apartment',
    img: 'images/prop-apartment2.jpg',
    badge: 'For Rent', featured: '',
    price: '$5,200/mo', name: 'Downtown Luxury Suite',
    location: 'Miami, Florida',
    beds: 1, baths: 1, sqft: '980'
  },
  {
    id: 6, type: 'penthouse',
    img: 'images/prop-penthouse2.jpg',
    badge: 'For Sale', featured: 'Exclusive',
    price: '$9,500,000', name: 'Grand Rooftop Penthouse',
    location: 'San Francisco, California',
    beds: 5, baths: 5, sqft: '5,100'
  }
];

let wishlist = new Set();

// ── BUILD PROPERTY CARD HTML ──
function buildCard(p) {
  const heart = wishlist.has(p.id) ? 'active' : '';
  const featured = p.featured ? `<div class="prop-featured">${p.featured}</div>` : '';
  const rentClass = p.badge === 'For Rent' ? 'rent' : '';
  return `
    <div class="col-md-6 col-lg-4 fade-up prop-item" data-type="${p.type}">
      <div class="property-card" onclick="openProperty(${p.id})">
        <div class="property-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy"/>
          <div class="prop-badge ${rentClass}">${p.badge}</div>
          ${featured}
          <div class="prop-heart ${heart}" onclick="toggleWishlist(event, ${p.id})">
            <i class="fas fa-heart"></i>
          </div>
        </div>
        <div class="property-body">
          <div class="prop-price">${p.price}</div>
          <div class="prop-name">${p.name}</div>
          <div class="prop-location"><i class="fas fa-location-dot"></i>${p.location}</div>
          <div class="prop-specs">
            <div class="spec"><i class="fas fa-bed"></i>${p.beds} Beds</div>
            <div class="spec"><i class="fas fa-bath"></i>${p.baths} Baths</div>
            <div class="spec"><i class="fas fa-vector-square"></i>${p.sqft} sqft</div>
          </div>
        </div>
      </div>
    </div>`;
}

// ── RENDER PROPERTIES ──
function renderProperties(filter) {
  const grid = document.getElementById('propertyGrid');
  const filtered = filter === 'all' ? properties : properties.filter(p => p.type === filter);
  grid.innerHTML = filtered.map(buildCard).join('');
  observeFadeUp();
}

// ── FILTER BUTTONS ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProperties(btn.dataset.filter);
  });
});

// ── SEARCH TABS ──
document.querySelectorAll('.search-tabs .nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.search-tabs .nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ── TOGGLE WISHLIST ──
function toggleWishlist(e, id) {
  e.stopPropagation();
  const el = e.currentTarget;
  if (wishlist.has(id)) {
    wishlist.delete(id);
    el.classList.remove('active');
    showToast('Removed from wishlist');
  } else {
    wishlist.add(id);
    el.classList.add('active');
    showToast('Added to wishlist ❤️');
  }
}

// ── OPEN PROPERTY (MODAL) ──
function openProperty(id) {
  const p = properties.find(x => x.id === id);
  if (!p) return;
  document.querySelector('#contactModal .modal-title').textContent = `Inquire: ${p.name}`;
  new bootstrap.Modal(document.getElementById('contactModal')).show();
}

// ── LOAD MORE ──
function loadMore(e) {
  e.preventDefault();
  showToast('All properties are currently loaded');
}

// ── NAVBAR SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ── SEARCH HANDLER ──
function handleSearch() {
  const loc    = document.getElementById('searchLocation').value.trim();
  const type   = document.getElementById('searchType').value;
  const budget = document.getElementById('searchBudget').value;
  if (!loc && !type && !budget) {
    showToast('Please enter at least one search criteria');
    return;
  }
  showToast(`Searching properties${loc ? ' in ' + loc : ''}…`);
  document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
}

// ── COUNTER ANIMATION ──
let counted = false;

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    let curr = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      curr = Math.min(curr + step, target);
      el.textContent = curr.toLocaleString() + (target >= 100 ? '+' : '');
      if (curr >= target) clearInterval(timer);
    }, 25);
  });
}

window.addEventListener('scroll', () => {
  if (!counted && window.scrollY > 100) {
    animateCounters();
    counted = true;
  }
});

// ── FADE UP SCROLL OBSERVER ──
function observeFadeUp() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => {
    el.classList.remove('visible');
    obs.observe(el);
  });
}

// ── EMAIL SUBSCRIBE ──
function subscribeEmail() {
  const email = document.getElementById('ctaEmail').value.trim();
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address');
    return;
  }
  document.getElementById('ctaEmail').value = '';
  showToast("Welcome! You're now on our exclusive list ✨");
}

// ── CONTACT FORM SUBMIT ──
function submitContact() {
  bootstrap.Modal.getInstance(document.getElementById('contactModal')).hide();
  showToast('Request received! An agent will contact you within 24 hours.');
}

// ── SHOW TOAST NOTIFICATION ──
function showToast(msg) {
  document.getElementById('toastMsg').textContent = msg;
  new bootstrap.Toast(document.getElementById('liveToast'), { delay: 3500 }).show();
}

// ── INITIALISE ON PAGE LOAD ──
renderProperties('all');
observeFadeUp();