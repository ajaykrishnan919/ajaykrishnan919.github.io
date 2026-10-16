// Image viewer: click any gallery photo to open it full size.
// Navigation stays inside the project the photo belongs to.
const viewer = document.getElementById('viewer');
const viewerImg = viewer.querySelector('img');
const viewerCap = viewer.querySelector('.viewer__cap');

let group = [];
let index = 0;

function show(i) {
  index = (i + group.length) % group.length;
  const img = group[index];
  viewerImg.src = img.dataset.full;
  viewerImg.alt = img.alt;
  const cap = img.closest('figure').querySelector('figcaption');
  viewerCap.textContent = `${index + 1} / ${group.length}${cap ? ' · ' + cap.textContent : ''}`;
}

function open(img) {
  group = [...img.closest('.gallery').querySelectorAll('img[data-full]')];
  show(group.indexOf(img));
  viewer.showModal();
  document.body.classList.add('locked');
}

document.querySelectorAll('.gallery img[data-full]').forEach(img => {
  img.addEventListener('click', () => open(img));
});

viewer.querySelector('.viewer__prev').addEventListener('click', () => show(index - 1));
viewer.querySelector('.viewer__next').addEventListener('click', () => show(index + 1));
function closeViewer() {
  viewer.close();
  document.body.classList.remove('locked');
}

viewer.querySelector('.viewer__close').addEventListener('click', closeViewer);
// Escape closes the dialog natively; this keeps the page unlocked in that case too.
viewer.addEventListener('close', () => document.body.classList.remove('locked'));
// Clicking the empty area around the photo closes the viewer.
viewer.addEventListener('click', e => { if (e.target === viewer) closeViewer(); });

// Arrow keys step through photos; Escape is handled by <dialog> itself.
viewer.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') show(index - 1);
  else if (e.key === 'ArrowRight') show(index + 1);
  else return;
  e.preventDefault();
});

// Pause any other video when one starts, so two never play over each other.
const videos = document.querySelectorAll('video[controls]');
videos.forEach(v => v.addEventListener('play', () => {
  videos.forEach(other => { if (other !== v) other.pause(); });
}));
