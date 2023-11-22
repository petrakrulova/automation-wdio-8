class LoginPage {

    constructor() {
        this.url = '/prihlaseni';
    }

    get loginButton(){ return $('.btn-primary') }
    get emailField(){ return $('#email') } 
    get passwordField(){ return $('#password') }
    get userLink(){ return $('.navbar-right').$('[data-toggle ="dropdown"]') }
    get errorField(){ return $('.toast-message') }
    get logoutLink(){ return $('#logout-link') }
    get forgotPasswordLink(){return $('=Zapomněli jste své heslo?')} 

    async open(){
        await browser.reloadSession()
        await browser.url(this.url)
    }

    async login(username, password){
        await this.emailField.setValue(username)
        await this.passwordField.setValue(password)
        await this.loginButton.click()
    }

    async logout(){
        await this.userLink.click()
        await this.logoutLink.click()
    }

}

export default new LoginPage();
