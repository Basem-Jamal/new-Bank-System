class clsBankSystem {
    constructor() {
        this.CurrentAccount = JSON.parse(localStorage.getItem("current")) || null;


        this.showFormTransactions = document.querySelector('.transferSystem');
        this.effectBackground = document.querySelector('.backg');


        this.depositSend   = document.getElementById('deposit-send');
        this.depositCancel = document.getElementById('deposit-cancel');

        this.withdrawSend   = document.getElementById('withdraw-send');
        this.withdrawCancel = document.getElementById('withdraw-cancel');



        this.showFormTransactions.style.opacity = '0';
        this.showFormTransactions.style.visibility = 'hidden';
        this.showFormTransactions.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';

    }


    showInfoAccount () {
        let CurrentAccountNumber = document.getElementById('info-Current-accountNumber');
        let CurrentName          = document.getElementById('info-Current-name');
        let CurrentEmail         = document.getElementById('info-Current-email');

        if (this.CurrentAccount) {
            CurrentAccountNumber.textContent = this.CurrentAccount.accountNumber;
            CurrentName.textContent          = this.CurrentAccount.name;
            CurrentEmail.textContent         = this.CurrentAccount.email;
        }
        else {
            CurrentName.textContent = "";
            CurrentEmail.textContent = "";
            console.log('no Data');

        }

    }


    showInfoBalances () {
        let CurrentBalance  = document.getElementById('info-Current-balance');
        if (this.CurrentAccount) {
            CurrentBalance.textContent = "SAR " + this.CurrentAccount.balances.toFixed(2) ;
        }
        else {
            CurrentBalance.textContent = "";
            console.log('problem by info balance');
        }


    }

    deposit () {        
        document.getElementById('deposit-CurrentAccountNumber').value = this.CurrentAccount.accountNumber;
        
        this.depositSend.onclick = null;

        this.depositSend.onclick = () => {

            let amount = parseFloat(document.getElementById('deposit-amount').value);

            if (isNaN (amount) || amount <= 0) {
                alert("Please enter a valid deposit amount.");
                return;    
            }

            this.CurrentAccount.balances += amount;

            let clients = JSON.parse(localStorage.getItem('recordClients')) || [];
            
            for (let i = 0; i < clients.length; i++) {
                if (clients[i].accountNumber === this.CurrentAccount.accountNumber) {
                    clients[i].balances = this.CurrentAccount.balances;
                    break;
                }
            }

            localStorage.setItem('recordClients' , JSON.stringify(clients));
            localStorage.setItem('current' , JSON.stringify(this.CurrentAccount));
            
            alert("Deposit Successful!");
            this.showInfoBalances();
            document.getElementById('deposit-amount').value = '';

            this.showFormTransactions.style.opacity ='0';
            this.effectBackground.style.display     = 'none';

        }
        

    }

    
    withdraw () {
        document.getElementById('withdraw-CurrentAccountNumber').value = this.CurrentAccount.accountNumber;

        this.withdrawSend.onclick = null;

        this.withdrawSend.onclick = () => {

            let amount = parseFloat(document.getElementById('withdraw-amount').value);

            if (isNaN (amount) || amount <= 0 || amount > this.CurrentAccount.balances) {
                alert("Please enter a valid Withdraw amount.");
                return;    
            }

            this.CurrentAccount.balances -= amount;

            let clients = JSON.parse(localStorage.getItem('recordClients')) || [];
            
            for (let i = 0; i < clients.length; i++) {
                if (clients[i].accountNumber === this.CurrentAccount.accountNumber) {
                    clients[i].balances = this.CurrentAccount.balances;
                    break;
                }
            }

            localStorage.setItem('recordClients' , JSON.stringify(clients));
            localStorage.setItem('current' , JSON.stringify(this.CurrentAccount));
            
            alert("Withdraw Successful!");
            this.showInfoBalances();
            document.getElementById('withdraw-amount').value = '';

            this.showFormTransactions.style.opacity ='0';
            this.effectBackground.style.display     = 'none';

        }


    }

    hideAllTransactionForms() {
        const depositForm = document.querySelector('.formDeposit');
        const withdrawForm = document.querySelector('.formWithdraw');
        const transactionsForm = document.querySelector('.formTransactions');

        depositForm.style.opacity = '0';
        depositForm.style.display = 'none';

        withdrawForm.style.opacity = '0';
        withdrawForm.style.display = 'none';

        transactionsForm.style.opacity = '0';
        transactionsForm.style.display = 'none';

        this.showFormTransactions.style.opacity = '0';
        this.showFormTransactions.style.visibility = 'hidden';
        this.effectBackground.style.display = 'none';
    }

    showTransactionForm(type) {
        this.hideAllTransactionForms();
        console.log("Showing form: ", type);

        this.showFormTransactions.style.visibility = 'visible';
        this.showFormTransactions.style.opacity = '1';
        this.effectBackground.style.display = 'block';

        if (type === 'deposit') {
            const depositForm = document.querySelector('.formDeposit');
            depositForm.style.display = 'flex';
            setTimeout(() => depositForm.style.opacity = '1', 10);
            this.deposit();
        } else if (type === 'withdraw') {
            const withdrawForm = document.querySelector('.formWithdraw');
            withdrawForm.style.display = 'flex';
            setTimeout(() => withdrawForm.style.opacity = '1', 10);
            this.withdraw();
        }
    }


    transactions () {

        let btnDeposit = document.getElementById('deposit');
        let btnWithdra = document.getElementById('withdraw');

        btnDeposit.addEventListener('click', () => {
            this.showTransactionForm('deposit');
        });

        btnWithdra.addEventListener('click', () => {
            this.showTransactionForm('withdraw');
        });

        this.depositCancel.addEventListener('click', () => {
            this.hideAllTransactionForms();
        });

        this.withdrawCancel.addEventListener('click', () => {
            this.hideAllTransactionForms();
        });
    }



    systemTransaction () {


    }

    showMyData() {
        this.showInfoAccount();
        this.showInfoBalances();
    }
}

const bank = new clsBankSystem();
bank.showMyData();
bank.transactions();