class AppPage {
    constructor(url){
        this._url = url
    }

    get userLink(){ return $('.navbar-right').$('[data-toggle ="dropdown"]') }
    get logoutLink(){ return $('#logout-link') }
    get errorField(){ return $('.toast-message') }
    get mainHeading(){ return $('h1')}
    get contentHeadingH3() {return $('h3')}
    get menuLeft() {return $('.navbar-nav')}
    get forTeachersLink() {return this.menuLeft.$('*=Pro učitelé')}

    async open(){
        await browser.open(url)
    }

    async getCurrentUsername(){
        return this.userLink.getText()
    }

    async getErrorMessage(){
        return await this.errorField.getText()
    }

    async logout(){
        await this.userLink.click()
        await this.logoutLink.click()
    }
}

export default AppPage