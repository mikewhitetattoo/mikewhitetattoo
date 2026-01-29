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

  if (e.key === 'Escape') modal.style.display = 'none';
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

const form = document.querySelector('.form-card');
const message = document.querySelector('.form-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('.submit');
  submitBtn.classList.add('loading');
  submitBtn.textContent = 'SENDING…';

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Send failed');
    }

    // ✅ SUKCES
    message.textContent =
      "Thank you for your request! I’ll get back to you as soon as possible.";
    message.classList.add('visible');

    form.reset();
    selectedFiles = [];
    fileList.innerHTML = '';

    submitBtn.classList.remove('loading');
    submitBtn.textContent = 'SEND REQUEST';

    message.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // smooth hide
    setTimeout(() => {
      message.classList.remove('visible');
    }, 4000);

  } catch (error) {
    alert('Something went wrong. Please try again.');
    submitBtn.classList.remove('loading');
    submitBtn.textContent = 'SEND REQUEST';
  }
});

// ===== FILE UPLOAD (MAX 3 IMAGES, ADD / REMOVE) =====

const fileInput = document.getElementById('referenceImages');
const fileList = document.querySelector('.file-list');

let selectedFiles = [];

fileInput.addEventListener('change', () => {
  const newFiles = Array.from(fileInput.files);

  for (let file of newFiles) {
    if (selectedFiles.length >= 3) {
      showFormMessage('You can upload up to 3 images only.');
      break;
    }

    if (file.size > 5 * 1024 * 1024) {
      showFormMessage('Each image must be smaller than 5MB.');
      continue;
    }

    selectedFiles.push(file);
  }

  renderFileList();
  fileInput.value = ''; // ⬅️ kluczowe
});

function renderFileList() {
  fileList.innerHTML = '';

  selectedFiles.forEach((file, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${file.name}
      <button type="button" data-index="${index}">✕</button>
    `;
    fileList.appendChild(li);
  });

  fileList.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      selectedFiles.splice(index, 1);
      renderFileList();
    });
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

window.addEventListener('load', () => {
  document.querySelector('.hero').classList.add('loaded');
});

