class RegistrationPage {

    constructor(){
        this.url = `/registrace`
    }
    
    get nameInput(){return $('#name')}
    get emailInput(){return $('#email')}
    get passwordInput(){return $('#password')}
    get checkPasswordInput(){return $('#password-confirm')}
    get registrationBtn(){return $('.btn-primary')}
    get userLink(){return $('.navbar-right').$('[data-toggle ="dropdown"]')}
    get errorText(){return $$('.invalid-feedback')}
    
    async open(){
        await browser.url(this.url)
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