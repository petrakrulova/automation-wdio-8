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

    it('get all rows from Applications table', async () => {
        await expect (ApplicationsPage.getTableRows()).toBeElementsArrayOfSize(expectedApplicationsPageRows)
    })

    it('Applications table has all data (name, date, payment, price)', async()=>{
        for (let tr of await ApplicationsPage.rows){
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
        const unfilteredRows = await ApplicationsPage.getTableRows()
        
        const searchText = 'lee'
        await ApplicationsPage.searchInTable(searchText)

        const filteredRows = await ApplicationsPage.getTableRows()
        expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length)

        for (let tr of filteredRows){
            let nameApplication = await tr.$$('td')[0]
            await expect(nameApplication).toHaveTextContaining(searchText, { ignoreCase: true })
        } 
    })
})