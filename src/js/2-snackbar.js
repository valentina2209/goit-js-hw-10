// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Отримуємо доступ до форми
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
    event.preventDefault();

    //Отримуємо значення delay та state із форми
    const delay = Number(event.currentTarget.delay.value);
    //Для радіокнопок можна отримати вибране значення через RadioNodeList
    const state = event.currentTarget.state.value;

    // Створюємо проміс, який через delay мілісекунд виконається або відхилиться
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })
    .then(ms => {
        const message = `✅ Fulfilled promise in ${ms}ms`;
        iziToast.success({
            title: 'Success',
            message,
            position: 'topRight',
        });
    })
    .catch(ms => {
        const message = `❌ Rejected promise in ${ms}ms`;
        iziToast.error({
            title: 'Error',
            message,
            position: 'topRight',
        });

    });
})
