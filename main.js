// Получаем элементы DOM
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

// Функция для открытия модального окна
function openModal() {
    lastActive = document.activeElement;
    dlg.showModal();
    // Устанавливаем фокус на первое поле формы
    dlg.querySelector('input, select, textarea, button')?.focus();
}

// Функция для закрытия модального окна
function closeModal() {
    dlg.close('cancel');
}

// Обработчик отправки формы
function handleSubmit(e) {
    // 1) Сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
    
    // 2) Проверка встроенных ограничений
    if (!form.checkValidity()) {
        e.preventDefault();
        
        // Показываем сообщения об ошибках
        form.reportValidity();
        
        // Подсветка проблемных полей для доступности
        [...form.elements].forEach(el => {
            if (el.willValidate) {
                el.toggleAttribute('aria-invalid', !el.checkValidity());
            }
        });
        return;
    }
    
    // 3) Успешная отправка (без сервера)
    e.preventDefault();
    alert('Сообщение успешно отправлено!');
    dlg.close('success');
    form.reset();
}

// Навешиваем обработчики событий
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
form.addEventListener('submit', handleSubmit);

// Обработчик закрытия модального окна
dlg.addEventListener('close', () => {
    lastActive?.focus();
});

// Добавляем маску для телефона (дополнительная функция)
const phone = document.getElementById('phone');
if (phone) {
    phone.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        if (value.startsWith('7') || value.startsWith('8')) {
            value = value.substring(1);
        }
        
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        let formattedValue = '+7 (';
        
        if (value.length > 0) {
            formattedValue += value.substring(0, 3);
        }
        
        if (value.length > 3) {
            formattedValue += ') ' + value.substring(3, 6);
        }
        
        if (value.length > 6) {
            formattedValue += '-' + value.substring(6, 8);
        }
        
        if (value.length > 8) {
            formattedValue += '-' + value.substring(8, 10);
        }
        
        this.value = formattedValue;
    });
}