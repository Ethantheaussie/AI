const tracks = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Song1"
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Song2"
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Song3"
  },
  {
    title: "Song 4",
    artist: "Artist 4",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://via.placeholder.com/150/FFA500/FFFFFF?text=Song4"
  },
  {
    title: "Song 5",
    artist: "Artist 5",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "https://via.placeholder.com/150/800080/FFFFFF?text=Song5"
  },
  {
    title: "Song 6",
    artist: "Artist 6",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover: "https://via.placeholder.com/150/FFC0CB/333333?text=Song6"
  }
];

const audio = document.getElementById('audio');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const coverEl = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const playlistEl = document.getElementById('playlist');

let currentIndex = 0;

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  titleEl.textContent = track.title;
  artistEl.textContent = track.artist;
  coverEl.src = track.cover;
  updateActiveTrack();
}

function updateActiveTrack() {
  const items = playlistEl.querySelectorAll('li');
  items.forEach((item, idx) => {
    item.classList.toggle('active', idx === currentIndex);
  });
}

function playTrack() {
  audio.play();
  playBtn.textContent = 'Pause';
}

function pauseTrack() {
  audio.pause();
  playBtn.textContent = 'Play';
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentIndex);
  playTrack();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playTrack();
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

tracks.forEach((track, index) => {
  const li = document.createElement('li');
  li.textContent = `${track.title} - ${track.artist}`;
  li.addEventListener('click', () => {
    currentIndex = index;
    loadTrack(index);
    playTrack();
  });
  playlistEl.appendChild(li);
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});

loadTrack(currentIndex);
