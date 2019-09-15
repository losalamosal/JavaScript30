const player = Array.from(document.getElementsByClassName("player__video"))[0];
const progress = Array.from(document.getElementsByClassName("progress"))[0];
const progressf = Array.from(document.getElementsByClassName("progress__filled"))[0];
const button = Array.from(document.getElementsByClassName("player__button"))[0];
const sliders = Array.from(document.getElementsByClassName("player__slider"));
const play = Array.from(document.getElementsByClassName("player__button.toggle"))[0];
const skips = Array.from(document.getElementsByClassName("player__button")).slice(1);

let interval;

function togglePlay() {
  if (player.paused) {
    interval = window.setInterval(updateProgressBar, 1000);
    player.play();
  } else {
    window.clearInterval(interval);
    player.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  button.innerText = icon;
}

function skipVideo() {
  player.currentTime += parseFloat(this.dataset.skip);
}

function updateSlider() {
  player[this.name] = parseFloat(this.value);
}

function percentPlayed() {
  return 100.0 * parseFloat(player.currentTime)/parseFloat(player.duration);
}

function updateProgressBar() {
  console.log(percentPlayed());
  console.log(percentPlayed().toString() + '%');
  if (player.play) {
    progressf.style.flexBasis = percentPlayed().toString() + '%';
  }
}

function prepProgressBar(e) {
  console.log(e);
  progress.addEventListener('mousemove', moveProgressBar);
}

function moveProgressBar(e) {
  console.log(e.offsetX, e.offsetY);
  per = parseFloat(e.offsetX) / parseFloat(progress.clientWidth) * 100.0;
  console.log(per);
  adjustVideoAndBar(per)
}

function finishProgressBar(e) {
  console.log("mouseup");
  progress.removeEventListener('mousemove', moveProgressBar);
  per = parseFloat(e.offsetX) / parseFloat(progress.clientWidth) * 100.0;
  console.log(per);
  adjustVideoAndBar(per)
}

function adjustVideoAndBar(percent) {
  player.currentTime = parseFloat(player.duration) * percent / 100.0;
  progressf.style.flexBasis = percent.toFixed().toString() + '%';
}

player.addEventListener('click', togglePlay);
player.addEventListener('play', updateButton);
player.addEventListener('pause', updateButton);
button.addEventListener('click', togglePlay);
skips[0].addEventListener('click', skipVideo);
skips[1].addEventListener('click', skipVideo);
sliders[0].addEventListener('click', updateSlider);
sliders[1].addEventListener('click', updateSlider);
sliders[0].addEventListener('mousemove', updateSlider);
sliders[1].addEventListener('mousemove', updateSlider);
progress.addEventListener('mousedown', prepProgressBar);
progress.addEventListener('mouseup', finishProgressBar);
