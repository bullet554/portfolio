class BankAccount {
    #balance;

    constructor(initialBalance = 0) {
        if (initialBalance < 0) {
            throw new Error('Отрицательный баланс для инициализации счета!');
        }
        this.#balance = initialBalance;
    }

    get balance() {
        return this.#balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return true;
        }
        throw new Error('Сумма должна быть положительной!');
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
            return true;
        }
        throw new Error('Недостаточно средств для снятия или неверная сумма!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let account = null;
    let currentUser = null;

    const balanceDisplay = document.getElementById('balance');
    const amountInput = document.getElementById('amount');
    const depositButton = document.getElementById('deposit');
    const withdrawButton = document.getElementById('withdraw');
    const messages = document.getElementById('messages');

    const authForm = document.createElement('div');
    authForm.innerHTML = `
    <h1>Авторизация</h1>
    <div class="form">
        <input type="text" id="username" placeholder="Логин">
        <input type="password" id="password" placeholder="Пароль">
        <button id="loginBtn">Войти</button>
        <button id="registerBtn">Зарегистрироваться</button>
    </div>
  `;
    document.querySelector('.container').prepend(authForm);

    const usernameInput = document.getElementById('username');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

    const showMessage = (text, type = 'info') => {
        const message = document.createElement('div');
        message.classList.add('message', type);
        message.textContent = text;
        messages.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
    };

    const updateBalance = () => {
        if (account) {
            balanceDisplay.textContent = account.balance;
        }
    };

    loginBtn.addEventListener('click', async () => {
        const username = usernameInput.value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            showMessage('Введите имя пользователя и пароль', 'error');
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                currentUser = data.user;
                account = new BankAccount(data.user.balance);
                updateBalance();
                showMessage(`Добро пожаловать, ${username}!`, 'success');

                authForm.style.display = 'none';
            } else {
                showMessage(data.message, 'error');
            }
        } catch (error) {
            showMessage('Ошибка подключения к серверу', 'error');
        }
    });

    registerBtn.addEventListener('click', async () => {
        const username = usernameInput.value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            showMessage('Введите имя пользователя и пароль', 'error');
            return;
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                currentUser = data.user;
                account = new BankAccount(data.user.balance);
                updateBalance();
                showMessage('Регистрация успешна!', 'success');

                // Скрываем форму авторизации после регистрации
                authForm.style.display = 'none';
            } else {
                showMessage(data.message, 'error');
            }
        } catch (error) {
            showMessage('Ошибка подключения к серверу', 'error');
        }
    });

    const handleDeposit = async () => {
        if (!currentUser) {
            showMessage('Авторизуйтесь для выполнения операций', 'error');
            return;
        }

        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            showMessage('Введите корректную сумму', 'error');
            return;
        }

        try {
            account.deposit(amount);
            updateBalance();

            await fetch('/update-balance', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: currentUser.username,
                    amount: amount
                })
            });

            showMessage(`Успешно внесено ${amount} ₽`, 'success');
        } catch (error) {
            showMessage(error.message, 'error');
        }
    };

    const handleWithdraw = async () => {
        if (!currentUser) {
            showMessage('Авторизуйтесь для выполнения операций', 'error');
            return;
        }

        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            showMessage('Введите корректную сумму', 'error');
            return;
        }

        try {
            account.withdraw(amount);
            updateBalance();

            await fetch('/update-balance', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: currentUser.username,
                    amount: -amount
                })
            });

            showMessage(`Успешно снято ${amount} ₽`, 'success');
        } catch (error) {
            showMessage(error.message, 'error');
        }
    };

    depositButton.addEventListener('click', handleDeposit);
    withdrawButton.addEventListener('click', handleWithdraw);
});