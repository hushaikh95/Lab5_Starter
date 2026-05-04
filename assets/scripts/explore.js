// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const faceImg = document.querySelector('#explore img');
  const textArea = document.getElementById('text-to-speak');
  const voiceSelect = document.getElementById('voice-select');
  const talkButton = document.querySelector('#explore button');

  const smiling = 'assets/images/smiling.png';
  const smilingOpen = 'assets/images/smiling-open.png';

  function populateVoices() {
    const previous = voiceSelect.value;
    const voices = speechSynthesis.getVoices();
    while (voiceSelect.options.length > 1) {
      voiceSelect.remove(1);
    }
    for (const voice of voices) {
      const option = document.createElement('option');
      option.value = voice.voiceURI;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(option);
    }
    if (previous && previous !== 'select') {
      const match = Array.from(voiceSelect.options).some(
        (opt) => opt.value === previous
      );
      if (match) {
        voiceSelect.value = previous;
      }
    }
  }

  populateVoices();
  speechSynthesis.addEventListener('voiceschanged', populateVoices);

  function setFace(open) {
    faceImg.src = open ? smilingOpen : smiling;
    faceImg.alt = open ? 'Smiling face with mouth open' : 'Smiling face';
  }

  talkButton.addEventListener('click', () => {
    const text = textArea.value.trim();
    if (!text || voiceSelect.value === 'select') {
      return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const uri = voiceSelect.value;
    const voice = speechSynthesis.getVoices().find((v) => v.voiceURI === uri);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setFace(true);
    utterance.onend = () => setFace(false);
    utterance.onerror = () => setFace(false);

    speechSynthesis.speak(utterance);
  });
}
