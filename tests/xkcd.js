module.exports = {
  'Demo test xkcd.com' : async function(browser) {
    const favoriteComic = {
      url: 'https://xkcd.com/538/',
      imgTitle: 'Actual actual reality: nobody cares about his secrets.  (Also, I would be hard-pressed to find that wrench for $5.)',
      imgSrc: 'https://imgs.xkcd.com/comics/security.png'
    }

    const xkcd = browser.page.xkcd()

    // Check if we on a home page. There is no unique element for home page, so we just check that 
    // block with comic is here. We can also click Next button and check that image doesnt
    // change, but I think this is an overkill
    await xkcd
      .navigate()
      .waitForElementVisible('@body')
      .assert.titleContains('xkcd')
      .assert.visible('@comicBlock')

    // Go to random page and make sure, than new comic has different src attribute
    // which means we have different comic loaded
    const homeComicUrl = await xkcd.getAttribute('@comicImg', 'src')

    await xkcd
      .click('@randomBtn')
      .waitForElementVisible('@comicImg')
      .assert.not.urlEquals('https://xkcd.com/')
      .assert.not.attributeEquals('@comicImg', 'src', homeComicUrl.value)

    // Go to specific page and check that showed comic is correct
    await xkcd
      .navigate(favoriteComic.url)
      .waitForElementVisible('@body')
      .assert.attributeEquals('@comicImg', 'src', favoriteComic.imgSrc)
      .assert.attributeEquals('@comicImg', 'title', favoriteComic.imgTitle)

    browser.end()
  }
};