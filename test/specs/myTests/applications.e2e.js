
import {username, password, expectedApplicationsPageRows} from '../fixtures.js'
//import {loginButton, emailField, passwordField} from './login.e2e.js'


async function openLoginPage(){
    await browser.reloadSession()
    await browser.url('/prihlaseni')
}

async function login(username, password){
    await $('#email').setValue(username)
    await $('#password').setValue(password)
    await $('.btn-primary').click()
}

async function goToApplications(){
    await $('=Přihlášky').click()
}

async function getfirstRecord(){
    return await $('#DataTables_Table_0').$('tbody').$('tr')
}

async function firstRecordVisible(){
    await getfirstRecord().toExist()
}

async function waitForTableToLoad(){
    await $('#DataTables_Table_0_processing').waitForDisplayed()
    await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true})
}

async function getTableRows(){
    return await $('#DataTables_Table_0').$('tbody').$$('tr')
}

async function searchInTable(text){
    await $('.dataTables_filter').$('input.form-control').setValue(text)
}



describe('Applications table', async () => {
    beforeEach(async () =>{
        await openLoginPage()
        //přihlášení uživatele
        await login(username,password)
        //Prihlasky page
        await goToApplications()
    })

    it('Applications table is visible', async () => {
        await expect (firstRecordVisible())
    })

    it('get all rows from Applications table', async () => {
        await expect (firstRecordVisible())
        await expect (getTableRows()).toBeElementsArrayOfSize(expectedApplicationsPageRows)
    })

    it('Applications table has all data (name, date, payment, price)', async()=>{
        await expect (firstRecordVisible())

        //let columnsApplicationTable = await $('#DataTables_Table_0').$('tbody').$$('td')
        for (let tr of await getTableRows()){
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
        await expect (firstRecordVisible())
        const unfilteredRows = await getTableRows()
        
        await searchInTable('lee')
        await waitForTableToLoad()
        const filteredRows = await getTableRows()
        //console.log('Přihlášky table rows - filtered: ' + await rowsApplicationTable.length)
        await expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length)
        for (let tr of await getTableRows()){
            let nameApplication = await tr.$$('td')[0]
            await expect(nameApplication).toHaveText(/^lee.*/i)
        }        
    })
})