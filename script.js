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
  form.addEventListener('submit', () => {
    localStorage.setItem('formSubmitted', 'true');
  });
}


// ===== FILE UPLOAD (MAX 3 IMAGES, ADD / REMOVE) =====

const fileInputs = [
  document.getElementById('referenceImage1'),
  document.getElementById('referenceImage2'),
  document.getElementById('referenceImage3')
];

const fileList = document.querySelector('.file-list');

fileInputs.forEach(input => {
  input.addEventListener('change', () => {
    if (!input.files[0]) return;

    if (input.files[0].size > 5 * 1024 * 1024) {
      showFormMessage('Each image must be smaller than 5MB.');
      input.value = '';
      return;
    }

    renderFileList();
  });
});

function renderFileList() {
  fileList.innerHTML = '';

  fileInputs.forEach((input, index) => {
    if (input.files[0]) {
      const li = document.createElement('li');
      li.textContent = `Image ${index + 1}: ${input.files[0].name}`;
      fileList.appendChild(li);
    }
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
    const message = document.querySelector('.form-message');

    if (localStorage.getItem('formSubmitted') === 'true' && message) {
      message.textContent =
        "Thank you for your request! I’ll get back to you as soon as possible.";
      message.classList.add('visible');

      message.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        message.classList.remove('visible');
      }, 4000);

      localStorage.removeItem('formSubmitted');
    }
  }, 300); // ⬅️ KLUCZOWE
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

function showFormMessage(text) {
  const message = document.querySelector('.form-message');
  if (!message) return;

  message.textContent = text;
  message.classList.add('visible');

  setTimeout(() => {
    message.classList.remove('visible');
  }, 4000);
}

document.querySelectorAll('.remove-file').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.input);
    if (input) {
      input.value = '';
      renderFileList();
    }
  });
});

