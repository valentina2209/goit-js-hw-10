import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let countdownInterval = null;

// Налаштування flatpickr

flatpickr(datePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
                position: "topRight"
            });
            startButton.disabled = true;
        } else {
            userSelectedDate = selectedDate;
            startButton.disabled = false;
        }
    }
});

// Функція конвертації мс у дні, години, хвилини, секунди

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

// Форматування чисел з додаванням 0

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

// Функція оновлення таймера

function updateTimerDisplay({ days, hours, minutes, seconds }) {
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
}

// Запуск таймера

function startCountdown() {
    startButton.disabled = true;
    datePicker.disabled = true;

    countdownInterval = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = userSelectedDate - currentTime;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            datePicker.disabled = false;
            return;
        }

        updateTimerDisplay(convertMs(timeDifference));
    }, 1000);
}

startButton.addEventListener("click", startCountdown);
