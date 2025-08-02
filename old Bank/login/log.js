class clsRegistration {
    constructor ( accountNumber ,name , email , password , balances) {
        
        this.accountNumber = accountNumber;
        this.name          = name;
        this.email         = email;
        this.password      = password;
        this.balances      = balances;
    }
}
  
let baseAccountNumber = "SA" + 100020001000;
let accountIncrement = Number(localStorage.getItem("accountIncrement")) || 1;


class LoginPage {
    constructor () {
        this.CurrentAccount;
        this.NewClients = [];
        let rawClients = JSON.parse(localStorage.getItem("recordClients")) || [];

        this.OldClients = Array.isArray (rawClients) ? rawClients : [];

        this.loginSubmit = document.getElementById('log-submit');
        this.signSubmit = document.getElementById('sign-submit');

    }

    verificationSignUp (name , email , password) {
        if (name.trim() === "" || email.trim() === "" || password.trim() ==="") {
            alert("All fields are required.");
            return false;
        };

        return true

    }

    verificationLogin (email , password) {

        for (let cil of this.OldClients) {
            if (cil.email === email && cil.password === password ) {
                return cil;
            }
        }

        return null;
    }
    verification (email) {
            
        for (let cli of this.OldClients) {
            if (cli.email == email) {
                alert("Email already exists!");
                return false;
            }
        };
        return true

    }
    registration () {
        let name     = document.getElementById ('sign-name');
        let email    = document.getElementById ('sign-email');
        let password = document.getElementById ('sign-password');
        let balances = 0;

        if (!this.verificationSignUp(name.value , email.value,  password.value)) {
            return;
        }


        if (!this. verification(email.value.toLowerCase())) {
            return;
        }
        
        let finalAccountNumber = baseAccountNumber +  accountIncrement++;
        localStorage.setItem("accountIncrement", accountIncrement);  // ⬅️ أضف هذا السطر

        let newClient = new clsRegistration (finalAccountNumber, name.value , email.value.toLowerCase() , password.value , balances);
        this.NewClients.push(newClient);
        this.save();
        alert("Registration successful!");
        name.value     ="";
        email.value    ="";
        password.value ="";

    }

    login () {
        let email    = document.getElementById ('log-email');
        let password = document.getElementById ('log-password');
        
        let user = this.verificationLogin(email.value , password.value);
        if (user) {
            this.CurrentAccount = user;
            this.saveCurrent();
            window.location.href = '/main/main.html'
        }
        else {
            alert("Incorrect email or password");
            return;
        }    
        
    }
    handle () {
        let formSign = document.querySelector('.signUp');
        let formLoign = document.querySelector('.login');
        let btnBackToLogin  = document.querySelector('.btn-login');
        let btnSign = document.querySelector('.btn-sign');
 
        formSign.style.display  = 'none';

        btnSign.addEventListener('click' , () => {
            formLoign.style.display  = 'none';
            formSign.style.display  = 'flex';


        })

        btnBackToLogin .addEventListener('click' , () => {
            formSign.style.display  = 'none';
            formLoign.style.display  = 'flex';

        })

        
        this.loginSubmit.addEventListener('click' , (e) => {
            e.preventDefault();
            this.login();

        })
        this.signSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            this.registration();
        });

    }
    save () {
        let allClients = this.OldClients.concat(this.NewClients);
        localStorage.setItem("recordClients", JSON.stringify(allClients));

        this.OldClients = allClients;
        this.NewClients = [];
    }

    saveCurrent () {
        localStorage.setItem("current" , JSON.stringify(this.CurrentAccount));
    }
}
// this.ClientRegistration

const BNK = new LoginPage ();

BNK.handle();