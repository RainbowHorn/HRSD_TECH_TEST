module.exports = {
    'Demo test kicherchekoi.com' : async function(browser) {
        const kcHome = browser.page.kicherchekoi.home()

        // Home page to advert page
        await kcHome
            .navigate()
            .waitForElementVisible('@body')
            .click('@advert')

        const kcSearch = browser.page.kicherchekoi.search()
        const textToSearch = 'mario kart'

        // Searching for Mario Kart
        await kcSearch
            .assert.visible('@searchBar')
            .search(textToSearch)
            .assert.not.visible('@noResultMessage')
            .assert.visible('@searchResults')

        const searchObj = {
            text: 'mariokart64',
            category: 'Moto / Scooter / Quad',
            department: '75018'
        }

        // Searching for mariokart64 with different parameters
        await kcSearch
            .click('@titleOnly')
            .setCategory(searchObj.category)
            .setDepartment(searchObj.department)
            .search(searchObj.text)
            .assert.visible('@noResultMessage')

        browser.end()
    }
  };