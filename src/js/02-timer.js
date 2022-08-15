import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let dateDifferenceInMs = (Date.parse(selectedDates[0])) - (Date.now());
    // If chosen date is in the past or in the future, but 100 and more days after Date.now()
    if (dateDifferenceInMs <= 0 || dateDifferenceInMs >= 8640000000) {
      
      refs.startBtn.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future but not later then 100 days after today')
    
    }
      else {
      refs.startBtn.disabled = false;
      Notiflix.Notify.success(`Please press "start" button to start timer`)
      }
  },
};

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
  timerDaysField: document.querySelector('span[data-days]'),
  timerHoursField: document.querySelector('span[data-hours]'),
  timerMinutesField: document.querySelector('span[data-minutes]'),
  timerSecondsField: document.querySelector('span[data-seconds]')
};

// Add event Listenet to the 'start' btn:
refs.startBtn.addEventListener('click', onTimerStar);

// Disabled start btn after page reloading and befor right date choosing:
refs.startBtn.disabled = true;
intervalId = null;

// flatpickr library need:
let chosenDate = flatpickr(refs.dateInput, options);


function onTimerStar() {
  
  intervalId = setInterval(() => {
    
    let dateDifferenceInMs = (Date.parse(chosenDate.selectedDates[0])) - (Date.now());
    
    const { days, hours, minutes, seconds } = convertMs(dateDifferenceInMs);
    // If chosen date is in the past we can't start the timer:
    if (dateDifferenceInMs <= 0) {
      clearInterval(intervalId)
    //If chosen date is in the future, we are starting timer and changing clockFace 
    } else {
        refs.timerDaysField.innerHTML = days;
        refs.timerHoursField.innerHTML = hours;
        refs.timerMinutesField.innerHTML = minutes;
        refs.timerSecondsField.innerHTML = seconds;
    }  
      
  }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// Add '0' before a number of days, hours, minutes and seconds if it's not two-digital number
function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}