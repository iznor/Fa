const puppeteer = require('puppeteer')
require("isomorphic-fetch")

const rtlRange = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC'
const ltrRange =
    'A-Za-z\u00C0-\u00D6\u00D8-\u00F6' +
    '\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C' +
    '\uFE00-\uFE6F\uFEFD-\uFFFF'

/* eslint-disable no-misleading-character-class */
const rtl = new RegExp('^[^' + ltrRange + ']*[' + rtlRange + ']')
const ltr = new RegExp('^[^' + rtlRange + ']*[' + ltrRange + ']')

function direction(value) {
    const source = String(value || '')
    return rtl.test(source) ? 'rtl' : ltr.test(source) ? 'ltr' : 'neutral'
}
function parse(str) {
    if(!str) return null
    const parts = []

    let dir = direction(str[0])
    function addPart(j, i) {
        const part = str.substring(j, i)
        parts.push(direction(part) === "rtl" ? [...part].reverse().join("") : part)
    }
    str = str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    for (let i = 0, j = 0; i < str.length; i++) {
        newDir = direction(str[i])
        if (newDir !== dir && newDir !== "neutral") {
            addPart(j, i)
            j = i
            dir = newDir
        } else if (i === str.length - 1) {
            addPart(j, i + 1)
        }
    }
    return parts.join(" ").trim()
}

async function scrape() {
    async function gotoMusicMainPage() {
        await page.goto('https://music.youtube.com/moods_and_genres');
        // await page.screenshot({ path: 'example.png' });
        await page.waitForSelector('#items > ytmusic-navigation-button-renderer', {
            visible: true,
        });
    }
    async function waitContent() {
        await page.waitForFunction(() =>
            document.querySelectorAll('#content,#contents').length
        );
    }
    async function waitNavigation() {
        await page.waitForNavigation();
        await waitContent()
    }
    let data = {
        artists: []

    }
    const browser = await puppeteer.launch({
        args: [
            '--ignore-certificate-errors',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1920,1080',
            "--disable-accelerated-2d-canvas",
            "--disable-gpu"
        ],
        ignoreHTTPSErrors: true,
        headless: false,
    });
    const page = await browser.newPage();


    for (let i = 0; i < 10; i++) {
        await gotoMusicMainPage()
        await page.evaluate((i) => { document.querySelector(`#items > ytmusic-navigation-button-renderer:nth-child(${i + 1})`).click() }, i)
        await waitNavigation()
        await page.evaluate(() => document.querySelector(`#items > ytmusic-two-row-item-renderer:nth-child(1) > a > ytmusic-item-thumbnail-overlay-renderer`).click());
        await waitNavigation()
        const genre = await page.evaluate(() => document.querySelector(`#header > ytmusic-detail-header-renderer > div > div.metadata.style-scope.ytmusic-detail-header-renderer > h2 > yt-formatted-string`).textContent)
        const links = [...new Set(await page.evaluate(() => {
            let elements = Array.from(document.querySelectorAll('#contents > ytmusic-responsive-list-item-renderer'));
            let links = elements.map(element => {
                return element.querySelector(`div.flex-columns.style-scope.ytmusic-responsive-list-item-renderer > div.secondary-flex-columns.style-scope.ytmusic-responsive-list-item-renderer > yt-formatted-string.flex-column.style-scope.ytmusic-responsive-list-item-renderer.complex-string > a`).href
            })
            return links;
        }))];
        for (let i = 0; i < links.length; i++) {
            await page.goto(links[i]);
            await waitContent()
            const artist = parse(await page.evaluate(() =>{
                const el=document.querySelector(`#header > ytmusic-immersive-header-renderer > div > div > div > yt-formatted-string`)
                if(el) return el.textContent
                return null
            }))
            if(!artist) continue
            await page.evaluate(() => document.querySelector(`#header > ytmusic-immersive-header-renderer > div > div > div > yt-formatted-string`).textContent)
            const songs = [...new Set(await page.evaluate((genre) => {
                let elements = Array.from(document.querySelectorAll('#contents > ytmusic-responsive-list-item-renderer'));
                let songs = elements.map(element => {
                    const singles = Array.from(document.querySelectorAll('#items > ytmusic-two-row-item-renderer'));
                    const song = element.querySelector(`div.flex-columns.style-scope.ytmusic-responsive-list-item-renderer > div.secondary-flex-columns.style-scope.ytmusic-responsive-list-item-renderer > yt-formatted-string:nth-child(2) > a`)
                    const index = singles.findIndex(x => {
                        const el = x.querySelector("div.details.style-scope.ytmusic-two-row-item-renderer > div > yt-formatted-string > a")
                        if (!el) return false
                        return el.textContent === song.textContent
                    })
                    if (index !== -1) {
                        const el = singles[index].querySelector("div.details.style-scope.ytmusic-two-row-item-renderer > span > yt-formatted-string")
                        if (el) {
                            return { song_name: song.textContent, genre: [genre], link: song.href, release_date: el.textContent.replace("Album • ", ""), description: " " }
                        }
                        return
                    }
                    return
                })
                return songs.filter(n => n);
            }, genre))].map(song => { return { song_name: parse(song.song_name), genre: song.genre, link: song.link, release_date: song.release_date, description: song.description } })

            if (songs.length) {
                const index = data.artists.indexOf(artist)
                if (index !== -1) {
                    data.artists[index].songs = [...data.artists[index].songs, ...songs].filter((song, index, self) =>
                        index === self.findIndex((s) => (
                            s.song_name === song.song_name
                        ))
                    )
                } else {
                    data.artists.push({ artist_name: parse(artist), songs: songs, bio: " " })
                }
            }
        }
        await fetch("https://fa-musicapi.herokuapp.com/api/scraper", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(res => res.json()).then(console.log).catch(e => console.log(e))
        data={
            artists: []
    
        }
    }

    await browser.close()
}

scrape()