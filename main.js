// Image viewer: click any gallery photo to open it full size.
// Navigation stays inside the project the photo belongs to.
// The viewer is built on first use, so the page itself carries no empty
// image or stray buttons for crawlers, readers or browsers without JS.
let viewer, viewerImg, viewerCap;
let group = [];
let index = 0;

function buildViewer() {
  viewer = document.createElement('dialog');
  viewer.id = 'viewer';
  viewer.setAttribute('aria-label', 'Image viewer');
  viewerImg = document.createElement('img');
  viewerCap = document.createElement('p');
  viewerCap.className = 'viewer__cap mono';
  viewer.append(viewerImg, viewerCap);

  const button = (cls, label, text, onClick) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `viewer__btn ${cls}`;
    b.setAttribute('aria-label', label);
    b.textContent = text;
    b.addEventListener('click', onClick);
    viewer.append(b);
  };
  button('viewer__prev', 'Previous image', '←', () => show(index - 1));
  button('viewer__next', 'Next image', '→', () => show(index + 1));
  button('viewer__close', 'Close', '×', closeViewer);

  // Escape closes the dialog natively; this keeps the page unlocked in that case too.
  viewer.addEventListener('close', () => document.body.classList.remove('locked'));
  // Clicking the empty area around the photo closes the viewer.
  viewer.addEventListener('click', e => { if (e.target === viewer) closeViewer(); });
  // Arrow keys step through photos.
  viewer.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
    else return;
    e.preventDefault();
  });
  document.body.append(viewer);
}

function show(i) {
  index = (i + group.length) % group.length;
  const img = group[index];
  viewerImg.src = img.dataset.full;
  viewerImg.alt = img.alt;
  const cap = img.closest('figure').querySelector('figcaption');
  viewerCap.textContent = `${index + 1} / ${group.length}${cap ? ' · ' + cap.textContent : ''}`;
}

function open(img) {
  if (!viewer) buildViewer();
  group = [...img.closest('.gallery').querySelectorAll('img[data-full]')];
  show(group.indexOf(img));
  viewer.showModal();
  document.body.classList.add('locked');
}

function closeViewer() {
  viewer.close();
  document.body.classList.remove('locked');
}

document.querySelectorAll('.gallery img[data-full]').forEach(img => {
  img.addEventListener('click', () => open(img));
});

// Pause any other video when one starts, so two never play over each other.
const videos = document.querySelectorAll('video[controls]');
videos.forEach(v => v.addEventListener('play', () => {
  videos.forEach(other => { if (other !== v) other.pause(); });
}));
