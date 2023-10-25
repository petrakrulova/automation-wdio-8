import {username, password, expectedApplicationsPageRows} from './fixtures.js'
// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'

xdescribe('old bad FUJ test', async () => {

    it('should open login page', async () => {

        await browser.reloadSession()
        await browser.url('/prihlaseni')
    
        //velikost okna
        const windowSize = await browser.getWindowSize();
        console.log(`Velikost okna: šířka ${windowSize.width}, výška ${windowSize.height}`);
        
        //screenshot
        await browser.saveScreenshot(`login_page.png`)

        //Selektory//
        //tagy //
        const loginForm = await $('form')
        //console.log(await loginForm.getTagName())

        const tagInput = await $('input')
        //console.log(await tagInput.getTagName())

        const tagButton = await $('button')
        //console.log(await tagButton.getTagName())

        // ID //
        const emailField = await $('#email')
        //console.log(await emailID.getTagName())
        const passwordField = await $('#password')
        //console.log(await passwID.getTagName())

        // class //
        const loginButton = await $('.btn-primary')
        //console.log(await submBtnClass.getTagName())

        // atributy //
        //const emailFieldByAttribute = $('[name="email"]')
        //console.log(await emailFieldByAttribute.getTagName())
        //const passwordFieldByAttribute = $('[type="password"]')
        //console.log(await passwordFieldByAttribute.getTagName())

        const elementContainsText = await $('[type*="ass"]')
        //console.log(await elementContainsAss.getTagName())

        const elementEndsText = await $('[type$="word"]')
        //console.log(await elementEndsWord.getTagName())

        const elementBeginsText = await $('[type^="pass"]')
        //console.log(await elementBeginsPass.getTagName())

        // combination //
        const elementTagInputIdEmail = await $('input#email')
        //console.log(await elementTagInputIdEmail.getTagName())

        const elementTagInputAttribTypePassw = await $('input[type="password"]')
        //console.log(await elementTagInputAttribTypePassw.getTagName())

        const elementTagBtnClassBtnPrim = await $('button.btn-primary')
        //console.log(await elementTagBtnClassBtnPrim.getTagName())

        // řetězení (chain) //
        const chainInputWithWord = await $('div').$('form').$('input[type$="word"]')
        //console.log(await chainInputWithWord.getTagName())

        // WDIO selectors //
        const forgotPasswordLink = await $('=Zapomněli jste své heslo?')
        // const elementByText = $('*=Zapomněl')
        console.log(await forgotPasswordLink.getTagName())

        // $$ selektor více elementů + cykly//
        const buttons = await $$('button')

        rows.forEach(async (row) => {
            console.log(await row.getHTML()) 
        })

        for await (const button of buttons) {
            console.log(await button.getHTML());
        }

        //viditelnost a editovatelnost prvků //
        console.log(await emailField.isDisplayed())
        console.log(await passwordField.isDisplayed())
        console.log(await emailField.isEnabled())
        console.log(await passwordField.isEnabled())

        console.log(await loginButton.getText())

        console.log(await forgotPasswordLink.getAttribute('href'))

        // přihlášení uživatele //
        await emailField.setValue(username)
        await passwordField.setValue(password)

        await loginButton.click()

        const prihlaskyLink = await $('=Přihlášky')
        await prihlaskyLink.waitForExist()

        const userLink = await $('.nav').$('a.dropdown-toggle')
        console.log(await userLink.getText())

        // výpis řádků z tabulky přihlášek //
        await prihlaskyLink.click()
        const prihlaskyTable = await $('#DataTables_Table_0')

        const firstRecord = await $('#DataTables_Table_0').$('tbody').$('tr')
        await firstRecord.waitForExist()

        let rowsInPrihlaskyTable = await $('#DataTables_Table_0').$('tbody').$$('tr')
        console.log(await rowsInPrihlaskyTable.length)
        for await (let tr of rowsInPrihlaskyTable){
            console.log(await tr.getText())
        }

        // filtr a znovuvypsání dat //
        const filterField = $('.dataTables_filter').$('input.form-control')
        const filterProcessingInfoCard = $('#DataTables_Table_0_processing')

        await filterField.setValue('lee')
        await filterProcessingInfoCard.waitForDisplayed()
        await filterProcessingInfoCard.waitForDisplayed({reverse: true})
        rowsInPrihlaskyTable = await $('#DataTables_Table_0').$('tbody').$$('tr')
        for await (let tr of rowsInPrihlaskyTable){
           console.log(await tr.getText())
        }
     
    })
})


describe('Login', async () => {
    beforeEach(async () =>{
        await browser.reloadSession()
        await browser.url('/prihlaseni')
    })

    it('login page is visible', async () => {
        const loginButton = await $('.btn-primary')
        console.log('User is on login page: ' + await loginButton.isDisplayed())
    })

    it('cannot log in without credentials', async()=>{
        // přihlášení bez vyplněných údajů
        const loginButton = await $('.btn-primary')
        await loginButton.click()
        console.log('User is still on login page: ' + await loginButton.isDisplayed())
    })

    it('cannot log in with invalid email', async()=>{
        // přihlášení se špatnými údaji a chybová hláška
        const emailField = await $('#email')
        const passwordField = await $('#password')
        const loginButton = await $('.btn-primary')

        await emailField.setValue(username)
        await passwordField.setValue('abc@gmail.com')
        await loginButton.click()
        //chyb.hláška
        const errorField = await $('.toast-error')
        console.log('Error in login data: ' + await errorField.waitForExist())
        console.log('User is still on login page: ' + await loginButton.isDisplayed())
    })
        
    it('log in with valid credentials', async()=>{
        //přihlášení se správnými údaji
        const loginButton = await $('.btn-primary')
        const emailField = await $('#email')
        const passwordField = await $('#password')
        await emailField.setValue(username)
        await passwordField.setValue(password)
        await loginButton.click()
        //kontrola přihlášení
        const userLink = await $('.navbar-right').$('[data-toggle ="dropdown"]')
        console.log('User is logged in: ' + await userLink.getText())
    })

    it('log out & open login page', async()=>{
        //Přihlášení
        const loginButton = await $('.btn-primary')
        const emailField = await $('#email')
        const passwordField = await $('#password')
        await emailField.setValue(username)
        await passwordField.setValue(password)
        await loginButton.click()
        //Odhlášení
        const userLink = await $('.navbar-right').$('[data-toggle ="dropdown"]')
        await userLink.click()
        const logoutLink = $('#logout-link')
        logoutLink.click()
        console.log('User is logged out: ' + await loginButton.isDisplayed())
    })
})

describe('Prihlasky table', async () => {
    beforeEach(async () =>{
        await browser.reloadSession()
        await browser.url('/prihlaseni')
        //přihlášení uživatele
        const loginButton = await $('.btn-primary')
        const emailField = await $('#email')
        const passwordField = await $('#password')
        await emailField.setValue(username)
        await passwordField.setValue(password)
        await loginButton.click()
        //Prihlasky page
        const prihlaskyLink = await $('=Přihlášky')
        await prihlaskyLink.click()
    })

    it('Prihlasky table is visible', async () => {
        const firstRecord = await $('#DataTables_Table_0').$('tbody').$('tr')
        console.log('User can see Prihlasky table: ' + await firstRecord.waitForExist())
    })

    it('get all rows from Prihlasky table', async () => {
        const firstRecord = await $('#DataTables_Table_0').$('tbody').$('tr')
        console.log('User can see Prihlasky table: ' + await firstRecord.waitForExist())
        let rowsInPrihlaskyTable = await $('#DataTables_Table_0').$('tbody').$$('tr')
        console.log('Přihlášky table rows: ' + await rowsInPrihlaskyTable.length)
    })

    it('filter Prihlasky table & get filtered data', async () => {
        //filtr tabulky a výpis dat
        let rowsInPrihlaskyTable = await $('#DataTables_Table_0').$('tbody').$$('tr')
        const filterField = $('.dataTables_filter').$('input.form-control')
        const filterProcessingInfoCard = $('#DataTables_Table_0_processing')

        await filterField.setValue('lee')
        await filterProcessingInfoCard.waitForDisplayed()
        await filterProcessingInfoCard.waitForDisplayed({reverse: true})
        rowsInPrihlaskyTable = await $('#DataTables_Table_0').$('tbody').$$('tr')
        console.log('Přihlášky table rows - filtered: ' + await rowsInPrihlaskyTable.length)
        for await (let tr of rowsInPrihlaskyTable){
            console.log(await tr.getText())
        }
            
    })
})
