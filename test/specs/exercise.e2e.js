import {username, password, expectedApplicationsPageRows} from './fixtures.js'
// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'

/*
Regulární výrazy - regular expressions - matches:
^  začátek řetězce (pozor v [] má jiný význam)
$ konec
. jakýkoliv znak
\d číslo
* 0 a více výskytů - řetězí se příklad pro jakýkoliv i nulový počet čísel: \d* 
? 0 nebo jeden výskyt - pokud očekáváme žádné nebo maximálně jedno číslo: \d?
+ jeden nebo více výskytu - nenulový počet čísel (jeden a více): \d+
{3,}  tři a více výskytů; {3} právě 3 výskyty, {1,3} jeden až 3 výskyty
| nebo
/g globální match - matchne všechny stringy
.* celý string

expect(element).toHaveText(/[a-zA-Z]/) text obsahuje pouze písmena a-z A-Z (bez diakritiky)
expect(element).toHaveText(/^Zapomněl.*heslo?$ /) text začíná__ cokoli__ __končí
 */

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


xdescribe('Login', async () => {
    beforeEach(async () =>{
        await browser.reloadSession()
        await browser.url('/prihlaseni')
    })

    it('login page with form is visible', async () => {
        const loginButton = await $('.btn-primary')
        const emailField = await $('#email')
        const passwordField = await $('#password')

        await expect(loginButton).toBeDisplayed()
        await expect(emailField).toBeDisplayed()
        await expect(passwordField).toBeDisplayed()
    })

    it('cannot log in without credentials', async()=>{
        // přihlášení bez vyplněných údajů
        const loginButton = await $('.btn-primary')
        await loginButton.click()
        await expect(loginButton).toBeDisplayed()
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
        await expect(errorField).toExist()

        await expect(loginButton).toBeDisplayed()
        await expect(emailField).toBeDisplayed()
        await expect(passwordField).toBeDisplayed()
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
        await expect(userLink).toHaveText('Lišák Admin')
    })

    it('log out & open main page', async()=>{
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

xdescribe('Applications table', async () => {
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

    it('Applications table is visible', async () => {
        const firstRecord = await $('#DataTables_Table_0').$('tbody').$('tr')
        await expect(firstRecord).toExist()
    })

    it('get all rows from Applications table', async () => {
        const firstRecord = await $('#DataTables_Table_0').$('tbody').$('tr')
        await firstRecord.waitForExist()
        let rowsApplicationTable = await $('#DataTables_Table_0').$('tbody').$$('tr')
        await expect(rowsApplicationTable).toBeElementsArrayOfSize(30)
    })

    it('Applications table has all data (name, date, payment, price)', async()=>{
        const firstRecord = await $('#DataTables_Table_0').$('tbody').$('tr')
        await firstRecord.waitForExist()

        let rowsApplicationTable = await $('#DataTables_Table_0').$('tbody').$$('tr')
        //let columnsApplicationTable = await $('#DataTables_Table_0').$('tbody').$$('td')
        for (let tr of rowsApplicationTable){
            let nameApplication = await tr.$$('td')[0]
            let dateApplication = await tr.$$('td')[1]
            let paymentApplicaton = await tr.$$('td')[2]
            let priceApplication = await tr.$$('td')[3]

            await expect(nameApplication).toHaveText(/[a-zA-Z]/)
            await expect(dateApplication).toHaveText(/\d{1,2}\.\d{1,2}\. - \d{1,2}\.\d{1,2}\.\d{4}/)
            await expect(paymentApplicaton).toHaveTextContaining(/Bankovní převod|Hotově|FKSP/)
            await expect(priceApplication).toHaveText(/\d Kč/)
        }
    })

    it('filter Applications table & get filtered data', async () => {
        //filtr tabulky a výpis dat
        let rowsApplicationTable = await $('#DataTables_Table_0').$('tbody').$$('tr')
        const filterField = $('.dataTables_filter').$('input.form-control')
        const filterProcessingInfoCard = $('#DataTables_Table_0_processing')

        await filterField.setValue('lee')
        await filterProcessingInfoCard.waitForDisplayed()
        await filterProcessingInfoCard.waitForDisplayed({reverse: true})

        rowsApplicationTable = await $('#DataTables_Table_0').$('tbody').$$('tr')
        //console.log('Přihlášky table rows - filtered: ' + await rowsApplicationTable.length)
        await expect(rowsApplicationTable).toBeElementsArrayOfSize(1)
        for (let tr of rowsApplicationTable){
            let nameApplication = await tr.$$('td')[0]
            await expect(nameApplication).toHaveText(/^lee.*/i)
        }        
    })
})
