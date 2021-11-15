var xkcdCommands = {
    
    goToRandomComic: function() {
        this.click('@randomBtn')

        return this
    }
};

module.exports = {
    url: 'https://www.xkcd.com/',
    commands: [xkcdCommands],
    elements: {
        body: {
            selector: 'body'
        },
        comicBlock: {
            selector: '#comic'
        },
        comicImg: {
            selector: '#comic > img'
        },
        randomBtn: {
            selector: '#middleContainer > ul:nth-child(2) > li:nth-child(3) > a'
        }
    }
}