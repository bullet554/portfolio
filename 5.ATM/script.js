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
    const account = new BankAccount(500);
    const balanceDisplay = document.getElementById('balance');
    const amountInput = document.getElementById('amount');
    const depositButton = document.getElementById('deposit');
    const withdrawButton = document.getElementById('withdraw');
    const messages = document.getElementById('messages');

    balanceDisplay.textContent = account.balance;

    const updateBalance = () => {
        balanceDisplay.textContent = account.balance;
    };

    const showMessage = (text, type = 'info') => {
        const message = document.createElement('div');
        message.classList.add('message', type);
        message.textContent = text;
        messages.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
    };

    depositButton.addEventListener('click', () => {
        try {
            const amount = parseFloat(amountInput.value);
            if (!isNaN(amount)) {
                account.deposit(amount);
                updateBalance();
                showMessage(`Успешно внесено ${amount} ₽`, 'success');
            } else {
                showMessage('Введите корректную сумму', 'error');
            }
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });

    withdrawButton.addEventListener('click', () => {
        try {
            const amount = parseFloat(amountInput.value);
            if (!isNaN(amount)) {
                account.withdraw(amount);
                updateBalance();
                showMessage(`Успешно снято ${amount} ₽`, 'success');
            } else {
                showMessage('Введите корректную сумму', 'error');
            }
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });
});
