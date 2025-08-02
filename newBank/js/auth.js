class clsRegistration {
    constructor ( accountNumber ,name , email , password , balances) {
        
        this.accountNumber = accountNumber;
        this.name          = name;
        this.email         = email;
        this.password      = password;
        this.balances      = balances;
    }
}

let count = 0;

class clsLogin {
    constructor () {
        this.current;
        this.rawClients = JSON.parse(localStorage.getItem("recordsUsers")) || [];

    }

    #_save () {
        localStorage.setItem('recordsUsers' , JSON.stringify(this.rawClients));
        alert('Successfully registered!');

    }
    #_saveCurrentUser () {
        localStorage.setItem('currentUser' , JSON.stringify(this.current));
    }

    #_registrationVerification (email) {
        
        const found = this.rawClients.some(client => client.email.toLowerCase() === email);
        return found;
    }

    #_loginVerification (email , password) {

        const found = this.rawClients.find(user => user.email.toLowerCase() === email && user.password === password );
        return found;
    }
    register () {

        const login_form = document.getElementById('login-form');
        const sign_form  = document.getElementById('sign-form');

        let name     = document.getElementById ('sign-name').value.trim();
        let email    = document.getElementById ('sign-email').value.trim().toLowerCase();
        let password = document.getElementById ('sign-password').value.trim();
        let balances = 0;

        login_form.style.display = 'none';

        if (!name || !email || !password) {
            alert("All fields are required!");
            sign_form.style.display = 'block';

            return;
        }
        
        
        if (this.#_registrationVerification(email)) {
            alert('Email already exists!');
            sign_form.style.display = 'block';

            return;
        }
        
        document.getElementById('sign-name').value = "";
        document.getElementById('sign-email').value = "";
        document.getElementById('sign-password').value = "";
        

        let finalAccountNumber;

        do {
            finalAccountNumber = Math.floor(10000 + Math.random() * 90000);

        }while (this.rawClients.some(user => user.accountNumber === finalAccountNumber));


        let newUser = new clsRegistration (finalAccountNumber, name , email , password , balances)
        this.rawClients.push (newUser);
        

        this.#_save();

        // تصفير الحقول بعد نجاح التسجيل فقط
        document.getElementById('sign-name').value = "";
        document.getElementById('sign-email').value = "";
        document.getElementById('sign-password').value = "";

        login_form.style.display = 'block';
        sign_form.style.display = 'none';

    }

    
    login () {
        let email    = document.getElementById ('login-email').value.trim().toLowerCase();
        let password     = document.getElementById ('login-password').value.trim();

        if (!email || !password) {
            alert("All fields are required!");
            return;
        }

        const foundUser = this.#_loginVerification(email , password)

        if (!foundUser) {
            alert('Incorrect email or password!');
            document.getElementById('login-password').value = "";
            return;
        }

        this.current = foundUser;   // مهم جداً
        this.#_saveCurrentUser();

        window.location.href = '/newBank/dashboard.html';
    }
    events () {
        const login_form = document.getElementById('login-form');
        const sign_form  = document.getElementById('sign-form');

        const To_SignUp  = document.getElementById('auth-footer-SignUp');
        const To_Login   = document.getElementById('auth-footer-Login');

        const btnLogin  = document.getElementById ('btnLogin');
        const btnSignUp  = document.getElementById ('btnSignUp');

        sign_form.style.display = 'none';

        To_SignUp.addEventListener ('click' , () => {
            login_form.style.display = 'none';
            sign_form.style.display = 'block';
        })

        To_Login.addEventListener ('click' , () => {
            login_form.style.display = 'block';
            sign_form.style.display = 'none';
        })

        btnLogin.addEventListener ('click' , (e) => {
            e.preventDefault(); // ← هذا ضروري
            this.login();

        })      

        btnSignUp.addEventListener ('click' , (e) => {
            e.preventDefault(); // ← هذا ضروري
            this.register();
        })

    }


}
const startAuth = new clsLogin ();

startAuth.events();
