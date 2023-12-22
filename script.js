document.addEventListener('DOMContentLoaded', init);

function init() {
    const form = document.getElementById('transactionForm');
    const transactionList = document.getElementById('transactionList');
    const balanceAmount = document.getElementById('balanceAmount');

    let transactions = [];

    form.addEventListener('submit', addTransaction);

    function addTransaction(event) {
        event.preventDefault();

        const text = document.getElementById('text').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (text.trim() === '' || isNaN(amount)) {
            alert('Please enter valid text and amount');
            return;
        }

        const transaction = {
            id: generateID(),
            text,
            amount
        };

        transactions.push(transaction);

        updateTransactions();
        updateBalance();

        form.reset();
    }

    function generateID() {
        return Math.floor(Math.random() * 1000000000);
    }

    function updateTransactions() {
        transactionList.innerHTML = '';
        transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.className = 'transaction-item';
            listItem.innerHTML = `
                <span>${transaction.text}</span>
                <span> &#8377${transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}</span>
                <button onclick="deleteTransaction(${transaction.id})">X</button>
            `;
            transactionList.appendChild(listItem);
        });
    }

    function updateBalance() {
        const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
        balanceAmount.textContent = total;
    }

    window.deleteTransaction = function(id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateTransactions();
        updateBalance();
    }
}
