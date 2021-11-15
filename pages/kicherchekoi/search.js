var kcCommands = {
    
    search: function(text) {
        this.setValue('@searchBar', text)
        this.click('@searchButton')

        return this
    },

    setCategory: function(category) {
        this
            .click('@searchCategory')
            .waitForElementVisible('.menu-categories')
            .click('link text', category)
            .waitForElementNotVisible('.menu-categories')

        return this
    },

    setDepartment: function(department) {
        this.setValue('@searchDepartment', department)

        return this
    }
};

module.exports = {
    url: 'https://kicherchekoi.com/petites-annonces-gratuites/toute-la-france',
    commands: [kcCommands],
    elements: {
        body: {
            selector: 'body'
        },
        noResultMessage: {
            selector: '.search-no-result-message'
        },
        searchBar: {
            selector: '#search_q'
        },
        searchButton: {
            selector: '#search-form > div.col-md-1 > div > div:nth-child(2) > div > button'
        },
        searchCategory: {
            selector: '#category-select'
        },
        searchDepartment: {
            selector: '#location'
        },
        searchResults: {
            selector: '.box-search-results'
        },
        titleOnly: {
            selector: '#titleonly'
        }

    }
}