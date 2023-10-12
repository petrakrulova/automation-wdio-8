describe('Homework', async () => {

    it('should open registration page and find elements', async () => {

        await browser.reloadSession()

        await browser.url(`/registrace`)

        const selectorNamesInp = $('#name')
        console.log(await selectorNamesInp.getAttribute('name'))

        const selectorEmailInp = $('#email')
        console.log (await selectorEmailInp.getAttribute(`name`))

        const selectorPasswordInp = $('#password')
        console.log (await selectorPasswordInp.getAttribute('name'))

        const selectorCheckPasswordInp = $('#password-confirm')
        console.log(await selectorCheckPasswordInp.getAttribute('name'))

        const selectorRegistrationBtn = $('.btn-primary')
        console.log(await selectorRegistrationBtn.getText())
    })

})
