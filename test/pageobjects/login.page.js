import AppPage from './app.page.js'

class LoginPage extends AppPage {

    constructor() {
        super()
        this.url = '/prihlaseni'
    }

    get loginButton(){ return $('.btn-primary') }
    get emailField(){ return $('#email') } 
    get passwordField(){ return $('#password') }
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

}

export default new LoginPage()
