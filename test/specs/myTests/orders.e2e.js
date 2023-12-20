/*
Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové Objednávky pro MŠ/ZŠ
Po kliknutí na Pro učitele > Objednávka pro MŠ/ZŠ se otevře formulář, kde může uživatel vyplnit detail objednávky
Po vyplnění IČO do formuláře objednávky se automaticky načte jméno odběratele a adresa odběratele z ARESu
Uživatel může odeslat vyplněnou objednávku na příměstský tábor
Objednávku nelze odeslat pokud není řádně vyplněna
 */


import OrdersPage from '../../pageobjects/orders.page.js'

const orderH1Text = 'Nová objednávka'
const orderFormText = 'Objednávka akce'
const messageARES = 'Data z ARESu úspěšně načtena'
const clientName = 'Czechitas z.ú.'
const clientAdress = 'Praha'
const orderCreatedToastMessage = 'Objednávka byla úspěšně uložena'
const orderCreatedMainText = 'Děkujeme za objednávku'

describe('Objednávky pro MŠ/ZŠ', async() => {

    beforeEach(async()=>{
        await OrdersPage.openOrderForm()
    })

    describe('Menu Pro Učitelé', async()=>{
        
        it('menu Pro učitelé obsahuje formulář pro Objednávky MŠ/ZŠ', async() => {
            await expect (await OrdersPage.mainHeading).toHaveText(orderH1Text)
            await expect(await OrdersPage.contentHeadingH3).toHaveText(orderFormText)
        })
    })

    describe('nová objednávka',async()=>{

        beforeEach(async()=>{
            await OrdersPage.ICOfilling()
        })

        it('vyplněním IČO do formuláře se automaticky načte jméno a adresa odběratele z ARESu', async()=>{
            await expect(await OrdersPage.getErrorMessage()).toContain(messageARES)
            await expect(await OrdersPage.inputClient).toHaveValue(clientName)
            await expect(await OrdersPage.inputAddress).toHaveValueContaining(clientAdress)
        })

        it('špatně vyplněnou objednávku nelze odeslat', async()=>{
            await expect(await OrdersPage.getErrorMessage()).toContain(messageARES)
            await OrdersPage.fillFormMainData()
            //missing phone data
            await OrdersPage.inputPhone.clearValue()
            await OrdersPage.fillTownCampData()
            await OrdersPage.submitBtn.click()

            await expect (await OrdersPage.mainHeading).toHaveText(orderH1Text)
            await expect(await OrdersPage.contentHeadingH3).toHaveText(orderFormText)
        })

        it('správně vyplněná objednávka pro Příměstský tábor se uloží', async()=>{
            await expect(await OrdersPage.getErrorMessage()).toContain(messageARES)
            await OrdersPage.fillFormMainData()
            await OrdersPage.fillTownCampData()
            await OrdersPage.submitBtn.click()

            await expect(await OrdersPage.getErrorMessage()).toContain(orderCreatedToastMessage)
            await expect(await OrdersPage.contentHeadingH3).toHaveText(orderCreatedMainText)
        })

        it('správně vyplněná objednávka pro Školu v přírodě se uloží', async()=>{
            await expect(await OrdersPage.getErrorMessage()).toContain(messageARES)
            await OrdersPage.fillFormMainData()
            await OrdersPage.fillNatureSchoolData()
            console.log(await OrdersPage.submitBtn.getValue())
            await OrdersPage.submitBtn.click()

            await expect(await OrdersPage.getErrorMessage()).toContain(orderCreatedToastMessage)
            await expect(await OrdersPage.contentHeadingH3).toHaveText(orderCreatedMainText)
        })

    })
    
})