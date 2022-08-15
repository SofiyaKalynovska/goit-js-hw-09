
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]')
}
let colorSwitcherId = null;
let isColorSwitcherActive = false;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick)

function onStartBtnClick() {

  refs.startBtn.disabled = true
  console.log('Start btn has just clicked!')

  colorSwitcherId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor()
  }, 1000)
}

function onStopBtnClick() {
  if (refs.startBtn.disabled) {
    refs.startBtn.disabled = false;
    console.log('Now color switcher is stopped');

    clearInterval(colorSwitcherId)
  }
    else {
      console.log('You can not click on stop btn')
      return;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
