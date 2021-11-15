var tlHomeCommands = {
    typeInReactInput: function(selectorType, selector, text) {
        this.api
            .click(selectorType, selector)
            .keys(text)
            // click header to get read of dropdown list. ENTER works too, but it choose first search option which is not what we want
            .click('.Header-module__root')

        return this
    },

    pickHour: function(hour, minutes) {
        this.setValue('@hourSelect', hour)
        this.setValue('@minuteSelect', minutes)
        
        return this
    },

    pickADateInNextMonth: async function(day) {
        this
            .click('@dateInput')
            .waitForElementVisible('._e5765fNaN')
            
        var nextMonth = await this.getAttribute('div._i6lz8s:nth-child(2) > div:nth-child(1) > h3:nth-child(2)', 'title')
        nextMonth = `${nextMonth.value.split(' ')[0]} ${day}, 2021`

        this.findElements('link text', '24', async function(results) {
            for (const element of results.value) {
                const title = await this.elementIdAttribute(element.getId(), 'title')

                if (title.value === nextMonth) {
                    await this.elementIdClick(element.getId())
                    break
                }
            }
        })

        return this
    },

    acceptCookieIfAny: function() {
        this.findElement('#onetrust-banner-sdk', function(result) {
            if (result.value.ELEMENT) {
                this.click('#onetrust-accept-btn-handler')
            }
        })

        return this
    },

    skipUpdateMessage: function(){
        this.findElement('._jyf67fe', function(result) {
            if (result.value.ELEMENT) {
                this.click('._1mw23jrNaN')
            }
        })

        return this
    },

    changeLanguage: function() {
        this
            .click('@languageBtn')
            .waitForElementVisible('div.CurrencyAndLanguagePicker-module__pickers:nth-child(1) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)')
            .click('div.CurrencyAndLanguagePicker-module__pickers:nth-child(1) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1) option[value=en-gb]')

        return this 
    }
};

module.exports = {
    url: 'https://trainline.fr',
    commands: [tlHomeCommands],
    elements: {
        body: {
            selector: 'body'
        },
        cookieAcceptBtn: {
            selector: '#onetrust-accept-btn-handler'
        },
        languageBtn: {
            selector: 'button.Button-module__root:nth-child(2)'
        },
        fromInput: {
            // since this is a React app, Inputs here cannot be used as usual input, means you can't hust
            // type inside it or set value (you can in general, outside Nightwatch Js). So we forced to use
            // divs that wraps this inputs. That applies for all inputs here
            selector: 'div._e296pg:nth-child(2) > div:nth-child(1) > label:nth-child(1) > div:nth-child(2) > div:nth-child(1)'
        },
        toInput: {
            // css is unreliable, because it generated randomly
            selector: '/html/body/div[2]/div/div[1]/main/div[2]/div[4]/div/div/div[1]/section/form/div[1]/div[2]/div/label/div[2]/div'
        },
        dateInput: {
            selector: '._1nwhvmf'
        },
        hourSelect: {
            selector: 'div._oiwlgb2:nth-child(1) > select:nth-child(1)'
        },
        minuteSelect: {
            selector: 'div._oiwlgb2:nth-child(2) > select:nth-child(1)'
        },
        getTicketsBtn: {
            selector: '._1kmf9x23'
        }
    }
}