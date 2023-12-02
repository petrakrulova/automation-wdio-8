
import {username, password, userFullName} from './../fixtures.js'
import LoginPage from '../../pageobjects/login.page.js'

async function loginPageVisible(){
    await expect(LoginPage.loginButton.toBeDisplayed())
    await expect(LoginPage.emailField.toBeDisplayed())
    await expect(LoginPage.passwordField.toBeDisplayed())
}

describe('Login', async () => {
    beforeEach(async () =>{
        await LoginPage.open()
    })

    it('login page with form is visible', async () => {
        await loginPageVisible()
    })

    it('cannot log in without credentials', async()=>{
        // přihlášení bez vyplněných údajů
        await LoginPage.loginButton.click()
        await expect(LoginPage.loginButton.toBeDisplayed())
    })

    it('cannot log in with invalid email', async()=>{
        // přihlášení se špatnými údaji a chybová hláška
        await LoginPage.login('invalid@email.com', password)
        //chyb.hláška
        await expect(LoginPage.errorField).toExist()
        await loginPageVisible()
    })

    it('cannot log in with invalid password', async()=>{
        // přihlášení se špatnými údaji a chybová hláška
        await LoginPage.login(username, 'invalid')
        //chyb.hláška
        await expect(LoginPage.errorField).toBeDisplayed()
        await loginPageVisible()
    })
        
    it('log in with valid credentials', async()=>{
        //přihlášení se správnými údaji
        await LoginPage.login(username, password)
        //kontrola přihlášení
        await expect(await LoginPage.getCurrentUsername()).toEqual(userFullName)
    })

    it('log out & open main page', async()=>{
        //Přihlášení
        await LoginPage.login(username, password)
        //Odhlášení
        await LoginPage.logout()
        await expect('.card').toBeDisplayed
        await expect(LoginPage.mainHeading).toHaveText('Vyberte období akce')
    })

    it('forgot password link has right link', async()=>{
        await LoginPage.forgotPasswordLink.click()
        await expect(browser).toHaveUrl('https://team8-2022brno.herokuapp.com/zapomenute-heslo')
    })

})