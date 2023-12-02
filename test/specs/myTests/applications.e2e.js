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

        for (const tr of rows){
            // console.log(tr.date)
            await expect(tr.name).toMatch(/[a-zA-Z]/);
            await expect(tr.date).toMatch(/\d{1,2}\.\d{1,2}\. - \d{1,2}\.\d{1,2}\.\d{4}/)
            await expect(tr.paymentType).toMatch(/Bankovní převod|Hotově|FKSP/)
            await expect(tr.toPay).toMatch(/\d Kč/)
        }
    })

    it('filter Applications table & get filtered data', async () => {
        const unfilteredRows = await ApplicationsPage.getTableData()
        const searchText = 'lee'
        await ApplicationsPage.searchInTable(searchText)
        const filteredRows = await ApplicationsPage.getTableData()
        expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length)

        for (const tr of filteredRows){
            await expect(tr.name.toLowerCase()).toContain(searchText)
        } 
    })
})