import {username, password} from './fixtures.js'
// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'

describe('Czechitas Login Page', async () => {

    it('should open login page', async () => {

        await browser.reloadSession();

        await browser.url('/prihlaseni');
    });

    it(`get loginPage screenshot`, async () => {
        await browser.reloadSession();

        await browser.url(`/prihlaseni`);

        //const windowSize = await browser.getWindowSize();
        //console.log(`Velikost okna: šířka ${windowSize.width}, výška ${windowSize.height}`);

        //await browser.saveScreenshot(`login_page.png`);

        //await browser.pause(5000);

        /*** Selektory ***/
        /* tagy */

        const tagForm = $('form');
        console.log(await tagForm.getTagName());

        const tagInput = $('input');
        console.log(await tagInput.getTagName());

        const tagButton = $('button');
        console.log(await tagButton.getTagName());

        /* ID */
        const emailID = $('#email');
        console.log(await emailID.getTagName());

        const passwID = $('#password');
        console.log(await passwID.getTagName());

        /* class */
        const submBtnClass = $('.btn-primary');
        console.log(await submBtnClass.getTagName());

        /* atributy */
        const nameAttrib = $('[name="email"]');
        console.log(await nameAttrib.getTagName());

        const passwAttrib = $('[type="password"]');
        console.log(await passwAttrib.getTagName());

        const elementContainsAss = $('[type*="ass"]');
        console.log(await elementContainsAss.getTagName());

        const elementEndsWord = $('[type$="word"]');
        console.log(await elementEndsWord.getTagName());

        const elementBeginsPass = $('[type^="pass"]');
        console.log(await elementBeginsPass.getTagName());

        /* combination */
        const elementTagInputIdEmail = $('input#email');
        console.log(await elementTagInputIdEmail.getTagName());

        const elementTagInputAttribTypePassw = $('input[type="password"]');
        console.log(await elementTagInputAttribTypePassw.getTagName());

        const elementTagBtnClassBtnPrim = $('button.btn-primary');
        console.log(await elementTagBtnClassBtnPrim.getTagName());

        /* řetězení (chain) */
        const chainInputWithWord = $('div').$('form').$('input[type$="word"]');
        console.log(await chainInputWithWord.getTagName());

        /* WDIO selectors */
        const elementByText = $('=Zapomněli jste své heslo?');
        console.log(await elementByText.getTagName());

    })

});
