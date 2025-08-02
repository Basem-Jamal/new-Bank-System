class BankDashboard {
    constructor ( accountNumber , name , email , password , balance ) {
        this._accountNumber = accountNumber;
        this._name          = name;
        this._email         = email;
        this._password      = password;
        this._balance       = balance;
    }

    renderAllData () {
        const show_ME_name      = document.querySelector('.user-name');
        const user_avatar_now   = document.querySelector('.user-avatar-now');
        const show_ME_accounNum = document.querySelector('.user-account');



        show_ME_name.textContent = this._name;
        user_avatar_now.textContent = this._name[0];
        show_ME_accounNum.textContent =  "SA-"+ this._accountNumber;
    }   
}


const currentUserJSON = localStorage.getItem('currentUser');

if (currentUserJSON) {
    const currentUser = JSON.parse (currentUserJSON);

    const bankSystem = new BankDashboard(currentUser.accountNumber , currentUser.name , currentUser.email , currentUser.password , currentUser.balance);

    bankSystem.renderAllData();

} else {
    console.log ('لم يتم تحميل البيانات!');

    window.location.href = '/newBank/login.html';
}

