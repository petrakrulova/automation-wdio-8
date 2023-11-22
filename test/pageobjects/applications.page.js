class ApplicationsPage {

    constructor() {
        this.url = '/admin/prihlasky';
    }

    get table(){return $('.dataTable')}
    get rows(){return this.table.$('tbody').$$('tr')}
    get firstRecord(){return this.table.$('tbody').$('tr')}
    get loading(){return $('#DataTables_Table_0_processing')}
    get searchingField(){return $('.dataTables_filter').$('input.form-control')}

    async open(){
        await browser.url(this.url)
    }

    async firstRecordVisible(){
        await this.firstRecord.toExist()
    }

    async waitForTableToLoad(){
        await browser.pause(1500)
        //await this.loading.waitForDisplayed()
        await this.loading.waitForDisplayed({ reverse: true})
    }

    async searchInTable(searchText){
        await this.searchingField.setValue(searchText)
    }
    
    async getTableRows(){
        await this.waitForTableToLoad()
        return this.rows
    }
}

export default new ApplicationsPage();
