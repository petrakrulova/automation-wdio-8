describe('Homework', async () => {

    beforeEach(async()=>{
        await browser.reloadSession()
        await browser.url(`/registrace`)
    })

    it('open registration page', async () => {
        const nameInput = await $('#name')
        //console.log(await nameInput.getAttribute('name') + await nameInput.isEnabled())
        await expect(nameInput).toBeEnabled()

        const emailInput= await $('#email')
        //console.log (await emailInput.getAttribute(`name`) + await emailInput.isEnabled())
        await expect(emailInput).toBeEnabled()

        const passwordInput = await $('#password')
        //console.log (await passwordInput.getAttribute('name') + await passwordInput.isEnabled())
        await expect(passwordInput).toBeEnabled()

        const checkPasswordInput = await $('#password-confirm')
        //console.log(await checkPasswordInput.getAttribute('name') + await checkPasswordInput.isEnabled())
        await expect(checkPasswordInput).toBeEnabled()

        const registrationBtn = await $('.btn-primary')
        //console.log(await registrationBtn.getText() + await registrationBtn.isEnabled())
        await expect(registrationBtn).toBeEnabled()
    })
    
    xit('register new user with valid credentials', async () => {
        const nameInput = await $('#name')
        const emailInput= await $('#email')
        const passwordInput = await $('#password')
        const checkPasswordInput = await $('#password-confirm')
        const registrationBtn = await $('.btn-primary')

        await nameInput.setValue('Kryšpín Vopršálek')
        await emailInput.setValue('kryspin.v85@gmail.com')
        await passwordInput.setValue('12345CosToHonzo')
        await checkPasswordInput.setValue('12345CosToHonzo')
        await registrationBtn.click()
        const userLink = await $('.navbar-right').$('[data-toggle ="dropdown"]')
        //console.log('User is logged in: ' + await userLink.getText())
        await expect(userLink).toHaveText('Kryšpín Vopršálek')
    })

    it('cannot register user with existing email', async () => {
        const nameInput = await $('#name')
        const emailInput= await $('#email')
        const passwordInput = await $('#password')
        const checkPasswordInput = await $('#password-confirm')
        const registrationBtn = await $('.btn-primary')

        await nameInput.setValue('Kryšpín Vopršálek')
        await emailInput.setValue('kryspin.v8@gmail.com')
        await passwordInput.setValue('12345CosToHonzo')
        await checkPasswordInput.setValue('12345CosToHonzo')
        await registrationBtn.click()

        const invalidCredentials = await $$('.invalid-feedback')
        for await (const inp of invalidCredentials){
            //console.log(await inp.getText())
            await expect(inp).toHaveText(/.*email.*exist.*/i)
        }
    })

    it('cannot register user with invalid password', async () => {
        const nameInput = await $('#name')
        const emailInput= await $('#email')
        const passwordInput = await $('#password')
        const checkPasswordInput = await $('#password-confirm')
        const registrationBtn = await $('.btn-primary')

        await nameInput.setValue('Kryšpín Vopršálek')
        await emailInput.setValue('kryspin.v888@gmail.com')
        await passwordInput.setValue('12345')
        await checkPasswordInput.setValue('12345')
        await registrationBtn.click()
        
        const invalidCredentials = await $$('.invalid-feedback')
        for await (const inp of invalidCredentials){
            //console.log(await inp.getText())
            await expect(inp).toHaveText(/.*heslo.*čísl/i)
        }
    })
})
