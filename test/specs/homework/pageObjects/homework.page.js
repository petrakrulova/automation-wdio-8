import AppPage from '../../../pageobjects/app.page.js'

class RegistrationPage extends AppPage {

    constructor(){
        super('/')
    }
    
    get nameInput(){return $('#name')}
    get emailInput(){return $('#email')}
    get passwordInput(){return $('#password')}
    get checkPasswordInput(){return $('#password-confirm')}
    get registrationBtn(){return $('.btn-primary')}
    get errorText(){return $$('.invalid-feedback')}
    
    async open(){
        await $('*=Zaregistrujte se').click()
    }

    async register(nameText, emailText, passwordText, checkPasswordText){
        this.nameInput.setValue(nameText)
        this.emailInput.setValue(emailText)
        this.passwordInput.setValue(passwordText)
        this.checkPasswordInput.setValue(checkPasswordText)
        this.registrationBtn.click()
    }

}

export default new RegistrationPage()