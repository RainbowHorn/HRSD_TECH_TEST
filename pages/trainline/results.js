var tlResultsCommands = {
    findTrain: async function(departTime) {
        // this is a special div with best value offer. When it appears, all other results also will be here
        this.waitForElementVisible('._nbof5m')

        // this row of results with all text. We will trim it later
        const trainTimeDivs = await this.findElements('div._19sm4pk')

        const expectedTrain = null
        for (const timeDivId of trainTimeDivs.value) {
            const trainText = await this.api.elementIdText(timeDivId.getId())
            // times.push(time.value.split('\n')[0])
            trainTime = trainText.value.split('\n')[0]

            if (trainTime === departTime) {
                expectedTrain = await this.api.elementId(timeDivId.getId())
                expectedTrain.click()
                break
            }
            
        }

        return expectedTrain
    },

    getInfoFromTrainCard: async function() {
        const departStation = await this.getText('._1x7766d > div:nth-child(1) > div:nth-child(2) > div:nth-child(3)')
        const arriveStation = await this.getText('._1x7766d > div:nth-child(1) > div:nth-child(4) > div:nth-child(3)')

        return {
            departStation,
            arriveStation
        }
    }
}

module.exports = {
    url: 'https://www.thetrainline.com/book/results',
    commands: [tlResultsCommands],
    elements: {
        body: {
            selector: 'body'
        },
        resultsBox: {
            selector: '._n1fpiu'
        }
    }
}