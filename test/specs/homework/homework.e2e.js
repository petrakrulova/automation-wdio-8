
async function openRegistrationPage(){
    await browser.reloadSession()
    await browser.url(`/registrace`)
}

function nameInput(){return $('#name')}
async function nameInputSet(text){
    await nameInput().setValue(text)
}

function emailInput(){return $('#email')}
async function emailInputSet(text){
    await emailInput().setValue(text)
}

function passwordInput(){return $('#password')}
async function passwordInputSet(text){
    await passwordInput().setValue(text)
}

function checkPasswordInput(){return $('#password-confirm')}
async function checkPasswordInputSet(text){
    await checkPasswordInput().setValue(text)
}

function registrationBtn(){return $('.btn-primary')}


function userLink(){return $('.navbar-right').$('[data-toggle ="dropdown"]')}


async function errorText(text){
    const invalidCredentials = await $$('.invalid-feedback')
    for await (const inp of invalidCredentials){
        //console.log(await inp.getText())
        await expect(inp).toHaveText(text)
    }
}

describe('Homework', async () => {

    beforeEach(async()=>{
        await openRegistrationPage()
    })

    it('open registration page', async () => {
        //console.log(await nameInput.getAttribute('name') + await nameInput.isEnabled())
        await expect(nameInput()).toBeEnabled()
        await expect(emailInput()).toBeEnabled()
        await expect(passwordInput()).toBeEnabled()
        await expect(checkPasswordInput()).toBeEnabled()
        await expect(registrationBtn()).toBeEnabled()
    })
    
    xit('register new user with valid credentials', async () => {
        await nameInputSet('Kryšpín Vopršálek')
        await emailInputSet('kryspin.v85@gmail.com')
        await passwordInputSet('12345CosToHonzo')
        await checkPasswordInputSet('12345CosToHonzo')
        await registrationBtn().click()
        //console.log('User is logged in: ' + await userLink.getText())
        await expect(userLink()).toHaveText('Kryšpín Vopršálek')
    })

    it('cannot register user with existing email', async () => {
        await nameInputSet('Kryšpín Vopršálek')
        await emailInputSet('kryspin.v8@gmail.com')
        await passwordInputSet('12345CosToHonzo')
        await checkPasswordInputSet('12345CosToHonzo')
        await registrationBtn().click()

        await errorText((/.*email.*exist.*/i))
    })

    it('cannot register user with invalid password', async () => {

        await nameInputSet('Kryšpín Vopršálek')
        await emailInputSet('kryspin.v888@gmail.com')
        await passwordInputSet('12345')
        await checkPasswordInputSet('12345')
        await registrationBtn().click()
        
        await errorText((/.*heslo.*čísl/i))
    })
})
