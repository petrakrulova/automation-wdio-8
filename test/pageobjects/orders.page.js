
import { ICO, substituteDirector, nameSurname, phone, email, startDate, endDate, age, studentsNumber, teachersNumber, endTime, startTime} from '../specs/fixtures.js'
import AppPage from './app.page.js'

class OrdersPage extends AppPage {

    constructor() {
        super('/')
    }

    get ordersSchoolsLink() {return this.menuLeft.$('*=Objednávka pro MŠ/ZŠ')}
    //main form data
    get inputICO() {return $('#ico')}
    get inputClient() {return $('#client')}
    get inputAddress() {return $('#address')}
    get inputSubstituteDirector() {return $('#substitute')} 
    get inputName() {return $('#contact_name')} 
    get inputPhone() {return $('#contact_tel')}
    get inputEmail() {return $('#contact_mail')}
    get inputStartDate(){return $('#start_date_1')}
    get inputEndDate() {return $('#end_date_1')}
    get submitBtn() {return $('.btn-primary')}
    get orderServiceLink() {return $('#nav-tab')}
    
    //town camp data
    get townCampLink() {return this.orderServiceLink.$('#nav-home-tab')}
    // get inputCampDatePart(){return $('#camp-date_part')}
    get inputStudentsNumber() {return $('#camp-students')}
    get inputAge() {return $('#camp-age')}
    get inputTeachersNumber() {return $('#camp-adults')}

    //nature school data
    get natureSchoolLink(){return this.orderServiceLink.$('#nav-profile-tab')}
    get inputNatureStudentNumber(){return $('#nature-students')}
    get inputNatureAge(){return $('#nature-age')}
    get inputNatureTeachersnumber(){return $('#nature-adults')}
    get inputNatureStartTime(){return $('#nature-start_time')}
    get inputNatureStartHour(){return this.inputNatureStartTime.$('.flatpickr-hour')}
    get inputNatureStartMinute(){return this.inputNatureStartTime.$('.flatpickr-minute')}
    // get inputMealsStart(){return $('#nature-start_food')}
    get inputNatureEndTime(){return $('#nature-end_time')}
    get inputNatureEndHour(){return this.inputNatureEndTime.$('.flatpickr-hour')}
    get inputNatureEndMinute(){return this.inputNatureEndTime.$('.flatpickr-minute')}
    // get inputMealsEnd(){return $('#nature-end_food')}

    get saveOrderBtn(){return this.$('')}

    async openOrderForm(){
        await browser.reloadSession()
        await browser.url('/')
        await this.forTeachersLink.click()
        await this.ordersSchoolsLink.click()
    }

    async ICOfilling(){
        await this.inputICO.setValue(ICO)
        await browser.keys('Enter')
    }

    async fillFormMainData(){
        await this.inputSubstituteDirector.setValue(substituteDirector)
        await this.inputName.setValue(nameSurname)
        await this.inputPhone.setValue(phone)
        await this.inputEmail.setValue(email)
        await this.inputStartDate.setValue(startDate)
        await this.inputEndDate.setValue(endDate)
    }

    async fillTownCampData(){
        await this.townCampLink.click()
        await this.inputStudentsNumber.setValue(studentsNumber)
        await this.inputAge.setValue(age)
        await this.inputTeachersNumber.setValue(teachersNumber)
    }

    async fillNatureSchoolData(){
        await this.natureSchoolLink.click()
        await this.inputNatureStudentNumber.setValue(studentsNumber)
        await this.inputNatureAge.setValue(age)
        await this.inputNatureTeachersnumber.setValue(teachersNumber)
        await this.inputNatureStartTime.setValue(startTime)
        await browser.keys('Enter')
        // await this.inputNatureStartHour.setValue(startHour)
        // await this.inputNatureStartMinute.setValue(startMinute)
        await this.inputNatureEndTime.setValue(endTime)
        await browser.keys('Enter')
        // await this.inputNatureEndHour.setValue(endHour)
        // await this.inputNatureEndMinute.setValue(endMinute)
    }

}

export default new OrdersPage()