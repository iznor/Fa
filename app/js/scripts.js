
//todo: check last id (from obj array)
let widgetId = 0;

let currentCustomization;

$(".widget.append").click(() => {
    let bySelection;
    const thisWidgetId = widgetId;
    $(".dashboard").append(`\
        <div id="w-${thisWidgetId}" class="widget">
            <div class="container visible">
                <div class="background"></div>
                <h1>New Widget</h1>
                <div class="content">customize your widget !</div>
                <div class="row">
                    <div class="button-container delete-button"></div>
                    <div class="button-container edit-button"></div>
                </div>
            </div>
           
            <div class="container hide">
                <h1>Customize:</h1>
                <div class="content">
                    <div class="row">
                        <div class="category">Top</div>
                        <div class="category choice">
                            <select id="${widgetId}-choose-top" name="choose-top">
                                <option value="news">News</option>
                                <option value="songs">3 Songs</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="category">By</div>
                        <div class="category choice">
                            <select id="${widgetId}-choose-by" name="choose-by">
                                <option value="artist">Artist</option>
                                <option value="genre">Genre</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="category">Choose</div>
                        <div class="category choice">
                            <select id="${widgetId}-choose-what" name="choose-what">
                                <option value="artist">Choose</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="button-container back-button"></div>
                </div>
            </div>
        </div>
        `);
    let randomColor = colorBank[Math.trunc(Math.random() * colorBank.length)];
    let randomBackground = backgroundBank[Math.trunc(Math.random() * backgroundBank.length)];

    const getWidget = (element) => element.target.parentElement.parentElement.parentElement
    const flip = (element) => {
        const widget = getWidget(element);
        widget.classList.contains("edit") ? widget.classList.remove("edit") : widget.classList.add("edit")
        const hide = widget.querySelector('.hide')
        const visible = widget.querySelector('.visible')
        visible.classList.replace('visible', 'hide');
        hide.classList.replace('hide', 'visible');
    }
    $(`#w-${widgetId}`)
        .css("background-color", `${randomColor}`)
    $(`#w-${widgetId} .background`)
        .css("background-image", `${randomBackground}`)

    $('.button-container.edit-button')
        .off()
        .on('click', (element) => {
            flip(element)
        })
    $('.button-container.delete-button')
        .off()
        .click((element) => {
            const result = confirm("Warning! Delete ?");
            if (result) {
                const widget = getWidget(element);
                widget.parentElement.removeChild(widget)
            }
        })
    $('.button-container.back-button')
        .off()
        .click((element) => {
            flip(element)
        })

    $('.button-container.done-button')
        .off()
        .click(() => {
            alert("Done")
        })

    $(`#${widgetId}-choose-top`)
        .on("change", () => {
            alert("FUCK");
        })

    $(`#${widgetId}-choose-by`)

        .on("change", (element) => {
            bySelection = element.target.selectedOptions[0].value;
            console.log(bySelection);
            if (bySelection == 'artist') {
                $(`#${widgetId - 1}-choose-what`).html(`
                <option value="artist-name">Loading...</option>
                `)
                fetch('https://fa-musicapi.herokuapp.com/api/artists')
                    .then((res) => res.json()).then(res => {
                        $(`#${widgetId - 1}-choose-what`).html(`
                        <option value=${res[0].artist_id}>${res[0].artist_name}</option>
                        `)
                        res.slice(1, res.length).forEach(element => {
                            console.log(widgetId + element.artist_name);
                            $(`#${widgetId - 1}-choose-what`).append(`
                            <option value=${element.artist_id}>${element.artist_name}</option>
                            `)
                        });
                    })
            } else if (bySelection == 'genre') {
                $(`#${widgetId - 1}-choose-what`).html(`
                <option value="artist-name">Loading...</option>
                `)
                fetch('https://fa-musicapi.herokuapp.com/api/genres')
                    .then((res) => res.json()).then(res => {
                        $(`#${widgetId - 1}-choose-what`).html(`
                    <option value="${res[0].genre_id}">${res[0].genre_name}</option>
                    `)
                        res.slice(1, res.length).forEach(element => {
                            console.log(widgetId + element.genre_name);
                            $(`#${widgetId - 1}-choose-what`).append(`
                        <option value=${element.genre_id}>${element.genre_name}</option>
                        `)
                        });
                    })
            }
        })

    $(`#${widgetId}-choose-what`)
        .on("change", (element) => {
            if (bySelection == 'artist') {
                let artistId = element.target.selectedOptions[0].value

                fetch(`https://fa-musicapi.herokuapp.com/api/songs/artist/${artistId}`)
                    .then((res) => res.json()).then(res => {
                        console.log(res);
                    });

            }
            else if (bySelection == 'genre') {
                let genreId = element.target.selectedOptions[0].value
                console.log(genreId);
                fetch(`https://fa-musicapi.herokuapp.com/api/songs/genre/${genreId}`)
                    .then((res) => res.json()).then(res => {
                        console.log(res);
                    });
            }
        })

    ++widgetId;
});

