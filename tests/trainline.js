
var assert = require('assert')

// browser.keys does not work inside PageObject
function typeInReactInput(browser, selectorType, selector, text) {
    browser
        .click(selectorType, selector)
        .keys(text)
        .click('.Header-module__root')  // click header to get read of dropdown list. ENTER works too, but it choose first search option which is not what we want
}

module.exports = {
    'Demo test trainline.com' : async function(browser) {
        const tlHome = browser.page.trainline.home()

        tlHome
            .navigate()
            .acceptCookieIfAny()
        
        // Page that was provided in exercies return different layouts in different times,
        // So in order to get consistant layout, I change language - this will redirect
        // to same page with same layout all the time
        tlHome
            .skipUpdateMessage()
            .changeLanguage()
        
        tlHome
            .typeInReactInput('css selector', tlHome.elements.fromInput.selector, 'Paris')
            .typeInReactInput('xpath', tlHome.elements.toInput.selector, 'Angers')
        
        await tlHome.pickADateInNextMonth(24)

        const expectedTime = '16:30'
        var hour, minute
        [hour, minute] = expectedTime.split(':')

        const expectedDepartStation = 'MONTPARNASSE'
        const expectedArriveStation = 'ANGERS SAINT LAUD'

        tlHome
            .pickHour(hour, minute)
            .click('@getTicketsBtn')

        const tlResults = browser.page.trainline.results()

        tlResults.waitForElementVisible('@resultsBox')
        
        const train = await tlResults.findTrain(expectedTime)

        // Currently this would fail because there is not train at exactly 16:30
        assert.notStrictEqual(
            train,
            null,
            `findTrain return null which means there is no train with depart time that equals ${expectedTime}`
        )

        const trainInfo = await tlResults.getInfoFromTrainCard()

        assert.strictEqual(
            trainInfo.departStation,
            expectedDepartStation,
            `Expected depart station to be - ${expectedDepartStation} - got this: - ${trainInfo.departStation}`
        )
        
        assert.strictEqual(
            trainInfo.arriveStation,
            expectedArriveStation,
            `Expect arrive station to be - ${expectedArriveStation} - got this: - ${trainInfo.arriveStation}`
        )

        browser.end()
    }
  };