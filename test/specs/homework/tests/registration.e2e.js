import RegistrationPage from '../pageObjects/registration.page.js'
import LoginPage from '../../../pageobjects/login.page.js'

let nameText = 'Kryšpín Vopršálek'
let passwordText = '12345CosToHonzo'

async function errorMessage(errText){
    for await (const err of RegistrationPage.errorText){
        await expect(err).toHaveText(errText)
    }
}

describe('Homework', async () => {

    beforeEach(async()=>{
        await LoginPage.open()
        await RegistrationPage.open()
    })

    it('all registration form inputs enabled', async () => {
        //console.log(await nameInput.getAttribute('name') + await nameInput.isEnabled())
        await expect(RegistrationPage.nameInput).toBeEnabled()
        await expect(RegistrationPage.emailInput).toBeEnabled()
        await expect(RegistrationPage.passwordInput).toBeEnabled()
        await expect(RegistrationPage.checkPasswordInput).toBeEnabled()
        await expect(RegistrationPage.registrationBtn).toBeEnabled()
    })
    
    it('register new user with valid credentials', async () => {
        const randomNumber = Math.floor(Math.random() * 10000)
        let emailText = 'kryspin.v' + randomNumber + '@gmail.com'
        await RegistrationPage.register(nameText,emailText, passwordText, passwordText)
        await expect(await RegistrationPage.getCurrentUsername()).toEqual(nameText)
    })

    it('cannot register user with existing email', async () => {
        let emailText = 'kryspin.v8@gmail.com'
        await RegistrationPage.register(nameText,emailText, passwordText, passwordText)
        await errorMessage((/.*email.*exist.*/i))
    })

    it('cannot register user with invalid password', async () => {
        let emailText = 'kryspin.v888@gmail.com'
        let passwordText = '12345'
        await RegistrationPage.register(nameText,emailText, passwordText, passwordText)
        await errorMessage(/.*heslo.*čísl/i)
    })
})
