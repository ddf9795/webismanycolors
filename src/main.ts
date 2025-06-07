import './reset.css';
import './main.css';

let secret = 1;
let activeSecrets = 0;
const secret1 = document.getElementsByClassName('wuhh')[0] as HTMLImageElement;
const secret2 = document.getElementsByClassName('wuhh')[1] as HTMLImageElement;
const secret3 = document.getElementsByClassName('wuhh')[2] as HTMLImageElement;
const secret4 = document.getElementsByClassName('wuhh')[3] as HTMLImageElement;
const autoMode = document.getElementById('auto-toggle') as HTMLInputElement;
const colorOptions = document.getElementById('color-options') as HTMLDivElement;
const colorToggles = document.querySelectorAll('input[name="color"]');
const blackColorToggle = colorToggles[0] as HTMLInputElement;
const visOptions = document.getElementById('vis-options') as HTMLDivElement;
const visToggles = document.querySelectorAll('input[name="vis"]');
const normalVisToggle = visToggles[0] as HTMLInputElement;

let bgColor = 'black';
let invertSetpiece = false;

let autoColor = 'black';
let autoInversion = false;

const playButton = document.querySelector('#play-button') as HTMLButtonElement;
const mainVolumeSlider = document.querySelector(
  '#main-volume-slider',
) as HTMLInputElement;
const mainSeekSlider = document.querySelector(
  '#main-seek-slider',
) as HTMLInputElement;
mainSeekSlider.value = '0';
autoMode.checked = true;
blackColorToggle.checked = true;
normalVisToggle.checked = true;

const canvas = document.getElementById('animation') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

const audioElement = document.getElementById('music') as HTMLAudioElement;
let duration = -1;

const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const audioContext = new AudioContext();
const audioSource = audioContext.createMediaElementSource(audioElement);
const gainNode = audioContext.createGain();
gainNode.gain.value = parseFloat(mainVolumeSlider.value);

const analyserNode = audioContext.createAnalyser();

audioSource
  .connect(analyserNode)
  .connect(gainNode)
  .connect(audioContext.destination);

analyserNode.fftSize = 512;
let fftDataArray = new Uint8Array(analyserNode.frequencyBinCount);

let setpiece = new Image(256, 256);

var optionModal = document.getElementById('options-modal') as HTMLDivElement;
var optionBtn = document.getElementById('options-button') as HTMLButtonElement;
var optionSpan = document.getElementsByClassName('close')[0] as HTMLSpanElement;

optionBtn.onclick = function () {
  optionModal.style.display = 'block';
};

optionSpan.onclick = function () {
  optionModal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == optionModal) {
    optionModal.style.display = 'none';
  }
  if (event.target == creditModal) {
    creditModal.style.display = 'none';
  }
};

var creditModal = document.getElementById('credit-modal') as HTMLDivElement;
var creditBtn = document.getElementById('credits-button') as HTMLButtonElement;
var creditSpan = document.getElementsByClassName('close')[1] as HTMLSpanElement;

creditBtn.onclick = function () {
  creditModal.style.display = 'block';
};

creditSpan.onclick = function () {
  creditModal.style.display = 'none';
};

const bufferSetpieces = () => {
  setTimeout(function () {
    setpiece.src = './img/setpiece.png';
    context.drawImage(
      setpiece,
      canvas.width / 2 - 128,
      canvas.height / 2 - 128,
    );
  }, 500);
  setpiece.src = './img/invert_setpiece.png';
  context.drawImage(setpiece, canvas.width / 2 - 128, canvas.height / 2 - 128);
};

window.addEventListener('load', bufferSetpieces);

const toggleManualOptions = () => {
  if (autoMode.checked == false) {
    colorOptions.style.visibility = 'visible';
    visOptions.style.visibility = 'visible';

    changeBackgroundColor;
  } else {
    colorOptions.style.visibility = 'hidden';
    visOptions.style.visibility = 'hidden';
    bgColor = autoColor;
    invertSetpiece = autoInversion;
  }
};

autoMode.addEventListener('input', toggleManualOptions);

const changeBackgroundColor = () => {
  let manualColorToggle = document.querySelector(
    'input[name="color"]:checked',
  ) as HTMLInputElement;

  switch (manualColorToggle.value) {
    case 'black':
      bgColor = 'black';
      invertSetpiece = false;
      break;
    case 'red':
      bgColor = 'red';
      invertSetpiece = true;
      break;
    case 'yellow':
      bgColor = 'yellow';
      invertSetpiece = true;
      break;
    case 'green':
      bgColor = 'lime';
      invertSetpiece = true;
      break;
    case 'cyan':
      bgColor = 'cyan';
      invertSetpiece = true;
      break;
    case 'blue':
      bgColor = 'blue';
      invertSetpiece = true;
      break;
  }
};

colorToggles.forEach((toggle) => {
  toggle.addEventListener('input', changeBackgroundColor);
});

const clear = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100;
  context.resetTransform();
  context.fillStyle = bgColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
};

const draw = () => {
  let manualVisToggle = document.querySelector(
    'input[name="vis"]:checked',
  ) as HTMLInputElement;

  if (invertSetpiece) {
    setpiece.src = './img/invert_setpiece.png';
  } else {
    setpiece.src = './img/setpiece.png';
  }
  analyserNode.getByteFrequencyData(fftDataArray);
  let bar_offset = 0;
  let bar = 1;
  fftDataArray.forEach((element) => {
    //Black at beginning and end of song
    if (
      ((parseFloat(mainSeekSlider.value) < 41 ||
        parseFloat(mainSeekSlider.value) >= 160.25) &&
        autoMode.checked == true) ||
      (autoMode.checked == false && manualVisToggle.value == 'normal')
    ) {
      if (element > 0) {
        context.beginPath();
        context.lineWidth = 5;
        if (invertSetpiece) {
          context.strokeStyle = 'black';
        } else {
          context.strokeStyle = 'white';
        }
        context.moveTo(bar_offset, canvas.height);
        context.lineTo(
          bar_offset,
          canvas.height - canvas.height * (element / 255),
        );
        context.stroke();
      }
      bar_offset += canvas.width / 215;
    }

    //Red - radius around outside of setpiece, going inwards
    else if (
      (parseFloat(mainSeekSlider.value) >= 41 &&
        parseFloat(mainSeekSlider.value) < 81 &&
        autoMode.checked == true) ||
      (autoMode.checked == false && manualVisToggle.value == 'radial-in')
    ) {
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(bar_offset + parseFloat(mainSeekSlider.value) * 0.075);
      if (element > 0) {
        let distance;
        if (canvas.width > canvas.height) {
          distance = canvas.width;
        } else {
          distance = canvas.height;
        }
        context.beginPath();
        context.lineWidth = 5;
        if (invertSetpiece) {
          context.strokeStyle = 'black';
        } else {
          context.strokeStyle = 'white';
        }
        context.moveTo(distance, 0);
        context.lineTo(distance * 0.5 - distance * 0.5 * (element / 255), 0);
        context.stroke();
      }
      context.restore();
      bar_offset += 2 * (Math.PI / 180);
    }

    //Green - Alternating between left and right / top and bottom of screen
    else if (
      (parseFloat(mainSeekSlider.value) >= 81 &&
        parseFloat(mainSeekSlider.value) < 121 &&
        autoMode.checked == true) ||
      (autoMode.checked == false && manualVisToggle.value == 'alt-1')
    ) {
      if (element > 0) {
        let distance;
        if (canvas.width > canvas.height) {
          distance = canvas.width;
        } else {
          distance = canvas.height;
        }

        context.beginPath();
        context.lineWidth = 3;
        if (invertSetpiece) {
          context.strokeStyle = 'black';
        } else {
          context.strokeStyle = 'white';
        }

        //Do it slightly differently on depending on whether the canvas is wider or taller
        if (canvas.width > canvas.height) {
          if (bar % 2 == 0) {
            context.moveTo(distance, bar_offset);
            context.lineTo(distance - distance * (element / 255), bar_offset);
            context.stroke();
          } else {
            context.moveTo(0, bar_offset);
            context.lineTo(distance * (element / 255), bar_offset);
            context.stroke();
          }
          bar_offset += canvas.width / 215;
          bar += 1;
        } else {
          if (bar % 2 == 0) {
            context.moveTo(bar_offset, distance);
            context.lineTo(bar_offset, distance - distance * (element / 255));
            context.stroke();
          } else {
            context.moveTo(bar_offset, 0);
            context.lineTo(bar_offset, distance * (element / 255));
            context.stroke();
          }
          bar_offset += canvas.height / 215;
          bar += 1;
        }
      }
    }

    //Cyan - Rotated version of Green
    else if (
      (parseFloat(mainSeekSlider.value) >= 121 &&
        parseFloat(mainSeekSlider.value) < 128 &&
        autoMode.checked == true) ||
      (autoMode.checked == false && manualVisToggle.value == 'alt-2')
    ) {
      if (element > 0) {
        let distance;
        if (canvas.width > canvas.height) {
          distance = canvas.height;
        } else {
          distance = canvas.width;
        }

        context.beginPath();
        context.lineWidth = 3;
        if (invertSetpiece) {
          context.strokeStyle = 'black';
        } else {
          context.strokeStyle = 'white';
        }

        //Do it slightly differently on depending on whether the canvas is wider or taller
        if (canvas.width < canvas.height) {
          if (bar % 2 == 0) {
            context.moveTo(distance, bar_offset);
            context.lineTo(distance - distance * (element / 255), bar_offset);
            context.stroke();
          } else {
            context.moveTo(0, bar_offset);
            context.lineTo(distance * (element / 255), bar_offset);
            context.stroke();
          }
          bar_offset += canvas.width / 215;
          bar += 1;
        } else {
          if (bar % 2 == 0) {
            context.moveTo(bar_offset, distance);
            context.lineTo(bar_offset, distance - distance * (element / 255));
            context.stroke();
          } else {
            context.moveTo(bar_offset, 0);
            context.lineTo(bar_offset, distance * (element / 255));
            context.stroke();
          }
          bar_offset += canvas.height / 95;
          bar += 1;
        }
      }
    }

    //Blue - Radius from around setpiece, going outwards
    else if (
      (parseFloat(mainSeekSlider.value) >= 128 &&
        parseFloat(mainSeekSlider.value) < 160.25 &&
        autoMode.checked == true) ||
      (autoMode.checked == false && manualVisToggle.value == 'radial-out')
    ) {
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(-(bar_offset + parseFloat(mainSeekSlider.value) * 0.075));
      if (element > 0) {
        context.beginPath();
        context.lineWidth = 5;
        if (invertSetpiece) {
          context.strokeStyle = 'black';
        } else {
          context.strokeStyle = 'white';
        }
        context.moveTo(200, 0);
        context.lineTo(200 + 300 * (element / 255), 0);
        context.stroke();
      }
      context.restore();
      bar_offset += 2 * (Math.PI / 180);
    }
  });
  context.drawImage(setpiece, canvas.width / 2 - 128, canvas.height / 2 - 128);
};

const render = () => {
  clear();
  draw();
  window.requestAnimationFrame(render);
  if (secret % 6 == 0) {
    activeSecrets += 1;
    secret = 1;
    switch (activeSecrets) {
      case 1:
        secret1.style.visibility = 'visible';
        break;
      case 2:
        secret2.style.visibility = 'visible';
        break;
      case 3:
        secret3.style.visibility = 'visible';
        break;
      case 4:
        secret4.style.visibility = 'visible';
        break;
      default:
        secret1.style.visibility = 'hidden';
        secret2.style.visibility = 'hidden';
        secret3.style.visibility = 'hidden';
        secret4.style.visibility = 'hidden';
        activeSecrets = 0;
        break;
    }
  }
};

const play = () => {
  audioElement.play();
  playButton.dataset.playing = 'true';
  playButton.innerText = 'Pause';
};

const pause = () => {
  audioElement.pause();
  playButton.dataset.playing = 'false';
  playButton.innerText = 'Play';
};

playButton.addEventListener('click', () => {
  if (audioContext!.state === 'suspended') {
    audioContext!.resume();
  }

  if (playButton.dataset.playing === 'false') {
    play();
  } else if (playButton.dataset.playing === 'true') {
    pause();
  }
});

mainVolumeSlider.addEventListener('input', () => {
  gainNode!.gain.value = parseFloat(mainVolumeSlider.value);
});

audioElement.addEventListener('timeupdate', () => {
  let manualColorToggle = document.querySelector(
    'input[name="color"]:checked',
  ) as HTMLInputElement;

  mainSeekSlider.value = audioElement.currentTime.toString();
  //   console.log(mainSeekSlider.value);
  const knownDuration = audioElement.duration;
  if (knownDuration !== duration) {
    duration = knownDuration;
    mainSeekSlider.max = knownDuration.toString();
  }

  //Color coding checks
  if (
    (parseFloat(mainSeekSlider.value) < 41 && autoMode.checked == true) ||
    (autoMode.checked == false && manualColorToggle.value == 'black')
  ) {
    bgColor = 'black';
    invertSetpiece = false;

    autoColor = 'black';
    autoInversion = false;
  } else if (
    (parseFloat(mainSeekSlider.value) >= 41 &&
      parseFloat(mainSeekSlider.value) < 79 &&
      autoMode.checked == true) ||
    (autoMode.checked == false && manualColorToggle.value == 'red')
  ) {
    bgColor = 'red';
    invertSetpiece = true;

    autoColor = 'red';
    autoInversion = true;
  } else if (
    (parseFloat(mainSeekSlider.value) >= 79 &&
      parseFloat(mainSeekSlider.value) < 81 &&
      autoMode.checked == true) ||
    (autoMode.checked == false && manualColorToggle.value == 'yellow')
  ) {
    bgColor = 'yellow';
    invertSetpiece = true;

    autoColor = 'yellow';
    autoInversion = true;
  } else if (
    (parseFloat(mainSeekSlider.value) >= 81 &&
      parseFloat(mainSeekSlider.value) < 121 &&
      autoMode.checked == true) ||
    (autoMode.checked == false && manualColorToggle.value == 'green')
  ) {
    bgColor = 'lime';
    invertSetpiece = true;

    autoColor = 'lime';
    autoInversion = true;
  } else if (
    (parseFloat(mainSeekSlider.value) >= 121 &&
      parseFloat(mainSeekSlider.value) < 128 &&
      autoMode.checked == true) ||
    (autoMode.checked == false && manualColorToggle.value == 'cyan')
  ) {
    bgColor = 'cyan';
    invertSetpiece = true;

    autoColor = 'cyan';
    autoInversion = true;
  } else if (
    (parseFloat(mainSeekSlider.value) >= 128 &&
      parseFloat(mainSeekSlider.value) < 160.25 &&
      autoMode.checked == true) ||
    (autoMode.checked == false && manualColorToggle.value == 'blue')
  ) {
    bgColor = 'blue';
    invertSetpiece = true;

    autoColor = 'blue';
    autoInversion = true;
  } else if (parseFloat(mainSeekSlider.value) >= 160.25) {
    bgColor = 'black';
    invertSetpiece = false;

    autoColor = 'black';
    autoInversion = false;
  }
});

mainSeekSlider.addEventListener('input', () => {
  const targetTime = parseFloat(mainSeekSlider.value);
  audioElement.currentTime = targetTime;
});

audioElement.addEventListener('ended', () => {
  pause();
});

canvas.addEventListener('click', function () {
  secret += 1;
});

window.requestAnimationFrame(render);
