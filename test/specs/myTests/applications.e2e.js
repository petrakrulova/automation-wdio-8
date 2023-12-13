import {username, password, expectedApplicationsPageRows} from './../fixtures.js'
import LoginPage from '../../pageobjects/login.page.js'
import ApplicationsPage from '../../pageobjects/applications.page.js'

describe('Applications table', async () => {
    beforeEach(async () =>{
        await LoginPage.open()
        await LoginPage.login(username, password)
        await ApplicationsPage.open()
    })

    it('Applications table is visible', async () => {
        await expect (ApplicationsPage.firstRecordVisible())
    })

    it('count of loaded rows is correct', async () => {
        await expect ((await ApplicationsPage.getTableData()).length).toEqual(expectedApplicationsPageRows)
    })

    it('Applications table has all data (name, date, payment, price)', async()=>{
        const rows = await ApplicationsPage.getTableData()
        // console.log(rows)

        for (const row of rows){

            const values = await row.getValues()
            // console.log(tr.date)
            await expect(values.name).toMatch(/[a-zA-Z]/);
            await expect(values.date).toMatch(/\d{1,2}\.\d{1,2}\. - \d{1,2}\.\d{1,2}\.\d{4}/)
            await expect(values.paymentType).toMatch(/Bankovní převod|Hotově|FKSP/)
            await expect(values.toPay).toMatch(/\d Kč/)
        }
    })

    it('filter Applications table & get filtered data', async () => {
        const searchText = 'lee'
        const unfilteredRows = await ApplicationsPage.getTableData()
        await ApplicationsPage.searchInTable(searchText)
        const filteredRows = await ApplicationsPage.getTableData()
        expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length)

        for (const row of filteredRows){
            const values = await row.getValues()
            await expect(values.name.toLowerCase()).toContain(searchText)
        } 
    })

    it('open application details', async() =>{
        //vybere třetí přihlášku
        const thirdRow = (await ApplicationsPage.getTableData())[4]
        // const [lastName, firstName, secondName] = (await thirdRow.getValues()).name.split(' ')
        const [lastName, firstName] = (await thirdRow.getValues()).name.split(' ')

        //otevře stránku s detaily přihlášky
        const applicationDetailsPage = await thirdRow.getInfo()
        const applicationDetails = await applicationDetailsPage.getDetails()

        // await expect (applicationDetails).toContainEqual(['Křestní jméno žáka:', [firstName, secondName].join(' ')])
        await expect (applicationDetails).toContainEqual(['Křestní jméno žáka:', firstName])
        await expect (applicationDetails).toContainEqual(['Příjmení žáka:', lastName])
    })
})