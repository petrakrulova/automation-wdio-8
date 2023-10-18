describe('Homework', async () => {

    it('should open registration page, fill inputs and confirm registration', async () => {

        await browser.reloadSession()

        await browser.url(`/registrace`)

        const nameInput = $('#name')
        console.log(await nameInput.getAttribute('name'))

        const emailInput= $('#email')
        console.log (await emailInput.getAttribute(`name`))

        const passwordInput = $('#password')
        console.log (await passwordInput.getAttribute('name'))

        const checkPasswordInput = $('#password-confirm')
        console.log(await checkPasswordInput.getAttribute('name'))

        const registrationBtn = $('.btn-primary')
        console.log(await registrationBtn.getText())

        await nameInput.setValue('Kryšpín Vopršálek')
        await emailInput.setValue('kryspin.v88@gmail.com')
        await checkPasswordInput.setValue(emailInput)
        await registrationBtn.click()
    })

})
