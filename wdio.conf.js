import fs from 'fs';
import {ReportAggregator} from 'wdio-html-nice-reporter';
import allure from 'allure-commandline';
import allureReporter from '@wdio/allure-reporter'
import video from 'wdio-video-reporter';


const passedDirectory = 'screenshots/passed';
const failedDirectory = 'screenshots/failed';
const reportsDirectory = './reports/html-reports/';
const htmlFailedDir = './reports/html-reports/screenshots/failed'
const htmlPassedDir = './reports/html-reports/screenshots/passed'

const allureTmpDirectory = './.tmp/allure';
const allureReportDirectory = './reports/allure';

function createIfNotExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function deleteFiles(dir) {
    fs.rm(dir, { recursive: true }, err => {
        if (err) console.log(err);
    });
}

export const config = {
    // automationProtocol: 'devtools',
    runner: 'local',
    specs: [
        './test/specs/*.e2e.js'
    ],
    exclude: [
        './test/specs/examples/**/*.js'
    ],
    suites: {
        exercise: ['./test/specs/exercise.e2e.js'],
        applications: ['./test/specs/myTests/applications.e2e.js'],
        login: ['./test/specs/myTests/login.e2e.js'],
        orders: ['./test/specs/myTests/orders.e2e.js'],
        homework: ['./test/specs/homework/tests/registration.e2e.js']
        // lesson_01: ['./test/specs/examples/lesson-01/**/*.e2e.js'],
        // lesson_02: ['./test/specs/examples/lesson-02/**/*.e2e.js'],
        // lesson_03: ['./test/specs/examples/lesson-03/**/*.e2e.js'],
        // lesson_04: ['./test/specs/examples/lesson-04/**/*.e2e.js'],
        // lesson_05: ['./test/specs/examples/lesson-05/**/*.e2e.js'],
        // lesson_07: ['./test/specs/examples/lesson-07/**/*.e2e.js'],
        // lesson_08: ['./test/specs/examples/lesson-08/**/*.e2e.js'],
        // lesson_09: ['./test/specs/examples/lesson-09/**/*.e2e.js'],
        //lesson_10: ['./test/specs/examples/lesson-10/**/*.e2e.js'],
        // lesson_11: ['./test/specs/examples/lesson-11/**/*.e2e.js']
        


    },
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--window-size=1920,1080',
                '--headless',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-infobars'
            ]
        },
        "moz:firefoxOptions": {
            // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
            args: [
                // '-headless'
            ]
        }
    }],
    logLevel: 'silent',
    bail: 0,
    baseUrl: 'https://team8-2022brno.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'chromedriver',
        'geckodriver'
    ],
    framework: 'mocha',
    reporters: [
        'spec',
        ["html-nice", {
            outputDir: reportsDirectory,
            filename: 'report.html',
            reportTitle: 'Czechitas Automatizované Testování',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: true
        }],
        [video, {
            outputDir: allureTmpDirectory,
            saveAllVideos: true,        // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }],
        ['allure', {
            outputDir: allureTmpDirectory,
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            addConsoleLogs: true,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    /*
    Definice potřebných hooků pro report (screenshots)
    */
    /*
    onPrepare: (config, capabilities) => {
        deleteFiles("screenshots");
    },

    afterTest: (test, context, { error, result, duration, passed, retries }) => {
        const screenshotName = (`${test.parent}__${test.title}.png`).replace(/ /g, '_');
        if (passed === true) {
            createIfNotExists(passedDirectory);
            browser.saveScreenshot( `${passedDirectory}/${screenshotName}`);
        } else {
            createIfNotExists(failedDirectory);
            browser.saveScreenshot(`${failedDirectory}/${screenshotName}`);
        }
    },*/

    /*
    Hooks: html report
    */
   /*
    onPrepare: (config, capabilities) => {
        deleteFiles('html-reports')
        let reportAggregator = new ReportAggregator({
            outputDir: reportsDirectory,
            filename: 'report.html',
            reportTitle: 'Czechitas Test Automation',
            browserName : capabilities.browserName,
            collapseTests: true,
        });
        reportAggregator.clean() ;
        global.reportAggregator = reportAggregator;
    },
    onComplete: async (exitCode, config, capabilities, results) => {
        await reportAggregator.createReport();
    },
    afterTest: async (test, context, { error, result, duration, passed, retries }) => {
        const screenshotName = (`./${test.parent}__${test.title}.png`).replace(/ /g, '_');
        if (passed === true) {
            createIfNotExists(htmlPassedDir);
            await browser.saveScreenshot( `${htmlPassedDir}/${screenshotName}`);
        } else {
            createIfNotExists(htmlFailedDir);
            browser.saveScreenshot(`${htmlFailedDir}/${screenshotName}`);
        }
    },*/

    /*
    Hooks: allure report
    */
    /*
    onPrepare: (config, capabilities) => {
        // remove previous tmp files
        fs.rmdir(allureTmpDirectory, { recursive: true }, err => {
            if (err) console.log(err);
        });
    },
    onComplete: () => {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', '--clean', allureTmpDirectory, '--output', allureReportDirectory]);
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 5000);
            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout);
                if (exitCode !== 0) return reject(reportError);
                console.log('Allure report successfully generated');
                resolve()
            });
        });
    }*/
}
