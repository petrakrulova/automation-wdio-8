
import {username, password, userFullName} from './fixtures.js'

export function loginButton(){
    return $('.btn-primary')
}

export function emailField(){
    return $('#email')
}

export function passwordField(){
    return $('#email')
}

function userLink(){
    return $('.navbar-right').$('[data-toggle ="dropdown"]')
}


describe('Login', async () => {
    beforeEach(async () =>{
        await browser.reloadSession()
        await browser.url('/prihlaseni')
    })

    it('login page with form is visible', async () => {
        await expect(loginButton().toBeDisplayed())
        await expect(emailField().toBeDisplayed())
        await expect(passwordField().toBeDisplayed())
    })

    it('cannot log in without credentials', async()=>{
        // přihlášení bez vyplněných údajů
        await loginButton().click()
        await expect(loginButton().toBeDisplayed())
    })

    it('cannot log in with invalid email', async()=>{
        // přihlášení se špatnými údaji a chybová hláška
        await emailField().setValue(username)
        await passwordField().setValue('abc@gmail.com')
        await loginButton().click()
        //chyb.hláška

        const errorField = await $('.toast-error')
        await expect(errorField).toExist()

        await expect(loginButton().toBeDisplayed())
        await expect(emailField().toBeDisplayed())
        await expect(passwordField().toBeDisplayed())
    })
        
    it('log in with valid credentials', async()=>{
        //přihlášení se správnými údaji
        await emailField().setValue(username)
        await passwordField().setValue(password)
        await loginButton().click()
        //kontrola přihlášení
        await expect(userLink().toHaveText(userFullName))
    })

    it('log out & open main page', async()=>{
        //Přihlášení
        await emailField().setValue(username)
        await passwordField().setValue(password)
        await loginButton().click()
        //Odhlášení
        await userLink().click()
        const logoutLink = $('#logout-link')
        await logoutLink.click()
        
        //const linkToLoginPage = await $('.navbar-right').$('.nav-link')
        //await expect(linkToLoginPage).toHaveText('Přihlásit')

        await expect('.card').toBeDisplayed
        const headingMainPage = $('h1')
        await expect(headingMainPage).toHaveText('Vyberte období akce')
    })

    it('forgot password link has right link', async()=>{
        const forgotPasswordLink = await $('=Zapomněli jste své heslo?')
        await forgotPasswordLink.click()
        await expect(browser).toHaveUrl('https://team8-2022brno.herokuapp.com/zapomenute-heslo')
    })

})