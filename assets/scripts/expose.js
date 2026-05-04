// expose.js

window.addEventListener('DOMContentLoaded', init);

const HORN_ASSETS = {
  'air-horn': {
    img: 'assets/images/air-horn.svg',
    audio: 'assets/audio/air-horn.mp3',
    alt: 'Air horn',
  },
  'car-horn': {
    img: 'assets/images/car-horn.svg',
    audio: 'assets/audio/car-horn.mp3',
    alt: 'Car horn',
  },
  'party-horn': {
    img: 'assets/images/party-horn.svg',
    audio: 'assets/audio/party-horn.mp3',
    alt: 'Party horn',
  },
};

function volumeToIconPaths(level) {
  const v = Number(level);
  if (v === 0) {
    return {
      src: 'assets/icons/volume-level-0.svg',
      alt: 'Volume level 0',
    };
  }
  if (v >= 1 && v < 33) {
    return {
      src: 'assets/icons/volume-level-1.svg',
      alt: 'Volume level 1',
    };
  }
  if (v >= 33 && v < 67) {
    return {
      src: 'assets/icons/volume-level-2.svg',
      alt: 'Volume level 2',
    };
  }
  return {
    src: 'assets/icons/volume-level-3.svg',
    alt: 'Volume level 3',
  };
}

function init() {
  const hornImg = document.querySelector('#expose img');
  const hornSelect = document.getElementById('horn-select');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const playButton = document.querySelector('#expose button');
  const audio = document.querySelector('#expose audio');

  const JSConfetti = window.JSConfetti;
  const jsConfetti = typeof JSConfetti === 'function' ? new JSConfetti() : null;

  function applyVolumeFromSlider() {
    const level = volumeSlider.value;
    audio.volume = Number(level) / 100;
    const { src, alt } = volumeToIconPaths(level);
    volumeIcon.src = src;
    volumeIcon.alt = alt;
  }

  function onHornChange() {
    const key = hornSelect.value;
    const config = HORN_ASSETS[key];
    if (!config) {
      return;
    }
    hornImg.src = config.img;
    hornImg.alt = config.alt;
    audio.src = config.audio;
  }

  hornSelect.addEventListener('change', onHornChange);
  volumeSlider.addEventListener('input', applyVolumeFromSlider);
  applyVolumeFromSlider();

  playButton.addEventListener('click', () => {
    const key = hornSelect.value;
    if (!HORN_ASSETS[key]) {
      return;
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});

    if (key === 'party-horn' && jsConfetti) {
      jsConfetti.addConfetti();
    }
  });
}
