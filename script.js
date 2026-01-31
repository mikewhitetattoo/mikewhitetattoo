// FAQ – smooth animation
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const content = item.querySelector('.faq-content');
      const icon = btn.querySelector('.icon');

      item.classList.toggle('open');

      if (item.classList.contains('open')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.textContent = '−';
      } else {
        content.style.maxHeight = null;
        icon.textContent = '+';
      }
    });
  });
});

/* ===== GALLERY MODAL ===== */

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const gridImages = document.querySelectorAll('.grid img');

let currentIndex = 0;
let startX = 0;

// OPEN
gridImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    modalImg.src = img.src;
    modal.style.display = 'flex';
requestAnimationFrame(() => {
      modal.classList.add('active');
    });
  });
});

// CLOSE
document.querySelector('.close').addEventListener('click', () => {
  modal.classList.remove('active');
setTimeout(() => {
  modal.style.display = 'none';
}, 300);
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
});

// SHOW IMAGE
function showImage(index) {
  modalImg.style.opacity = 0;
  modalImg.style.transform = 'scale(0.98)';

  setTimeout(() => {
    modalImg.src = gridImages[index].src;
    modalImg.style.opacity = 1;
    modalImg.style.transform = 'scale(1)';
  }, 200);
}

// NAVIGATION
function nextImage() {
  currentIndex = (currentIndex + 1) % gridImages.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + gridImages.length) % gridImages.length;
  showImage(currentIndex);
}

document.querySelector('.modal-arrow.right').addEventListener('click', nextImage);
document.querySelector('.modal-arrow.left').addEventListener('click', prevImage);

// KEYBOARD
document.addEventListener('keydown', e => {
  if (modal.style.display !== 'flex') return;

  if (e.key === 'Escape') {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
    return; // ⬅️ ważne
  }

  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

// SWIPE (MOBILE)
modal.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

modal.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextImage();
  if (endX - startX > 50) prevImage();
});

// HAMBURGER MENU
const burger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// CLOSE MOBILE MENU AFTER CLICK
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// CLOSE MENU WHEN CLICKING OUTSIDE
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

// ===== FORM SUBMIT FLAG (BEFORE PAGE RELOAD) =====
const form = document.querySelector('.form-card');

if (form) {
  const submitBtn = form.querySelector('.submit');

  form.addEventListener('submit', () => {
    localStorage.setItem('formSubmitted', 'true');

    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending…';
  });
}


// ===== DATE / TIME – CLICK WHOLE FIELD =====
document.querySelectorAll('input[type="date"], input[type="time"]').forEach(input => {
  input.addEventListener('click', () => {
    input.showPicker?.();
  });

  input.addEventListener('focus', () => {
    input.showPicker?.();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero')?.classList.add('loaded');

  // ⏳ dajemy chwilę po redirect Static Forms
 setTimeout(() => {
  const popup = document.getElementById('successPopup');

  if (localStorage.getItem('formSubmitted') === 'true' && popup) {
    popup.classList.add('visible');
    localStorage.removeItem('formSubmitted');
  }
}, 300);

document.querySelector('.popup-btn')?.addEventListener('click', () => {
  document.getElementById('successPopup')?.classList.remove('visible');
});

});

document.addEventListener('DOMContentLoaded', () => {
  const cookieInfo = document.getElementById('cookie-info');
  const cookieOk = document.getElementById('cookie-ok');

  if (!cookieInfo || !cookieOk) return;

  if (!localStorage.getItem('cookieInfoSeen')) {
    requestAnimationFrame(() => {
      cookieInfo.classList.add('visible');
    });
  }

  cookieOk.addEventListener('click', () => {
    cookieInfo.classList.remove('visible');

    setTimeout(() => {
      localStorage.setItem('cookieInfoSeen', 'true');
      cookieInfo.remove();
    }, 450);
  });
});

function showFormMessage(text) {
  const message = document.querySelector('.form-message');
  if (!message) return;

  message.textContent = text;
  message.classList.add('visible');

  setTimeout(() => {
    message.classList.remove('visible');
  }, 4000);
}


// UPLOAD SLOTS WITH IMAGE PREVIEW

document.querySelectorAll('.upload-slot').forEach(slot => {
  const input = slot.querySelector('input[type="file"]');
  const removeBtn = slot.querySelector('.remove');

  input.addEventListener('change', () => {
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      input.value = '';
      return;
    }

    // remove old preview if exists
    const oldPreview = slot.querySelector('img.preview');
    if (oldPreview) oldPreview.remove();

    const img = document.createElement('img');
    img.className = 'preview';
    img.src = URL.createObjectURL(file);

    slot.appendChild(img);
    slot.classList.add('filled');
  });

  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    input.value = '';
    slot.classList.remove('filled');

    const preview = slot.querySelector('img.preview');
    if (preview) preview.remove();
  });
});
