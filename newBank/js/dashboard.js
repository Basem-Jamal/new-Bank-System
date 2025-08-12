class clsTransactions {
    constructor (id , type, amount, date, description) {
        this._id          = id;
        this._type        = type;
        this._amount      = amount;
        this._date        = date;
        this._description = description;
    }
}




class BankDashboard {
    constructor (userData) {


        this._accountNumber = userData.accountNumber;
        this._name          = userData.name;
        this._email         = userData.email;
        this._password      = userData.password;
        this._balance       = userData.balance;

        this._transactions = userData.transactions || [];

    }

    saveData () {
        const userData = {
            accountNumber: this._accountNumber,
            name: this._name,
            email: this._email,
            password: this._password,
            balance: this._balance,
            transactions: this._transactions
        };
        localStorage.setItem ('currentUser' ,JSON.stringify(userData));
    }   
    deposit () {
        const amountInput        = document.getElementById('tepy-input');
        const btnAddAmount  = document.getElementById('add-amount');

        btnAddAmount.addEventListener('click', (e) => {
            e.preventDefault();

            const amountValue = parseFloat (amountInput.value);

            if (isNaN(amountValue) || amountValue <= 0) {
                alert("الرجاء إدخال مبلغ صحيح");
                return
            }

            this._balance += amountValue;

            const newTx = new clsTransactions (
                Date.now(),
                'deposit',
                amountValue,
                new Date().toLocaleDateString(),
                'إيداع مبلغ مصاريف شخصية'
            )

            this._transactions.push(newTx);
            
            this.saveData();

            document.querySelector('.currentDepoists').textContent = this._balance;

            amountInput.value = '';
            
            alert("تم الإداع بنجاح");
        })
        this.renderAllData();


    }
    events () {
        const recent_transactions     = document.querySelector('.recent-transactions');
        const fatherTransaction_table = document.querySelector('.transactions');
        const depositForm             = document.querySelector('.depoist');
        const navControl              = document.getElementById('navControl-home')
        const navDeposit              = document.getElementById('navDeposit');
        const btnLoguot               = document.querySelector('.logout-btn');

        depositForm.style.display = 'none';
        fatherTransaction_table.style.display = 'none';


        navControl.addEventListener('click' , function () {
            recent_transactions.style.display = 'grid';
            fatherTransaction_table.style.display = 'none';
            depositForm.style.display = 'none';
        })


        navDeposit.addEventListener('click' ,  () => {
            recent_transactions.style.display = 'none';
            fatherTransaction_table.style.display = 'flex';
            depositForm.style.display = 'flex';

        })

        btnLoguot.addEventListener ('click' , (e) => {
            e.preventDefault();
            this.loguot();
        })
    }
    renderAllData () {
        const show_ME_name             = document.querySelector('.user-name');
        const user_avatar_now          = document.querySelector('.user-avatar-now');
        const show_ME_accounNum        = document.querySelector('.user-account');


        show_ME_name.textContent = this._name;
        user_avatar_now.textContent = this._name[0];
        show_ME_accounNum.textContent =  "SA-"+ this._accountNumber;


        document.querySelector('.currentDepoists').textContent = this._balance;

        this.events ();

    }   
    



    loguot () {
        localStorage.removeItem('currentUser');
        window.location.href = '/newBank/login.html';
    }
}


const currentUserJSON = localStorage.getItem('currentUser');

if (currentUserJSON) {
    const currentUser = JSON.parse (currentUserJSON);

    const bankSystem = new BankDashboard(currentUser);

    bankSystem.renderAllData();
    

} else {
    console.log ('لم يتم تحميل البيانات!');

    window.location.href = '/newBank/login.html';
}

