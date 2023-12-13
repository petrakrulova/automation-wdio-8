import AppPage from './app.page.js'

class ApplicationsPage extends AppPage {

    constructor() {
        super('/')
    }

    get table(){return $('.dataTable')}
    get rows(){return this.table.$('tbody').$$('tr')}
    get oneRow(){return this.table.$('tbody').$('tr')}
    get loading(){return $('#DataTables_Table_0_processing')}
    get searchingField(){return $('.dataTables_filter').$('input.form-control')}

    async open(){
        await $('*=Přihlášky').click()
    }

    async firstRecordVisible(){
        await this.oneRow.toExist()
    }

    async waitForTableToLoad(){
        await browser.pause(1500)
        //await this.loading.waitForDisplayed()
        await this.loading.waitForDisplayed({ reverse: true})
    }

    async searchInTable(searchText){
        await this.searchingField.setValue(searchText)
    }
    
    async getTableData(){
        await this.waitForTableToLoad()
        return this.rows.map(async row => {
            return new TableRow(row)
        })

        // let tableData = []
        // for (const tr of await this.rows){
        //     const cols = await tr.$$('td')
        //     const getColumnValues = {
        //         name: await cols[0].getText(),
        //         date: await cols[1].getText(),
        //         paymentType: await cols[2].getText(),
        //         toPay: await cols[3].getText()
        //     }
        //     await tableData.push(getColumnValues)
        // }
        // return await tableData

    }

}

class TableRow {
    constructor(rowElement){
        this.rowElement = rowElement
    }

    async getValues(){
         const cols = this.rowElement.$$('td')
         return {
            name: await cols[0].getText(),
            date: await cols[1].getText(),
            paymentType: await cols[2].getText(),
            toPay: await cols[3].getText()
         }
    }

    async getInfo(){
        await this.rowElement.$('[data-can="view"]').click()
        return new ApplicationDetailsPage()
    }
}

class ApplicationDetailsPage{
    get detailsTable() { return $('.table-twocols') }

    async getDetails() {
        return Promise.all(await (this.detailsTable.$$('tr')).map(async row => {
            return Promise.all(await (row.$$('td')).map(async col => {
                return await col.getText()
            }))
        }))

        // let rows = []
        // for (const row of await this.detailsTable.$$('tr')) {
        //     let cols = []
        //     for (const col of await row.$$('td')) {
        //         cols.push(await col.getText());
        //     }
        //     rows.push(cols);
        // }
        // return rows;
    }
}


export default new ApplicationsPage()
