
//todo: check last id (from obj array)
let widgetId = 0;

$(".widget.append").click(() => {
    const thisWidgetId = widgetId;
    $(".dashboard").append(`\
        <div id="w-${thisWidgetId}" class="widget">
            <div class="container visible">
                <div class="background"></div>
                <h1>Top 5 Songs By Eminem:</h1>
                <div class="content">CONTENT FROM DATABASE</div>
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
                        <div class="category choice">CHOOSE</div>
                    </div>
                    <div class="row">
                        <div class="category">By</div>
                        <div class="category choice">CHOOSE</div>
                    </div>
                    <div class="row">
                        <div class="category">Choose</div>
                        <div class="category choice">ARTIST/GENRE</div>
                    </div>
                </div>
                <div class="row">
                    <div class="button-container back-button"></div>
                    <div class="button-container done-button"></div>
                </div>
            </div>
        </div>
        `);
    let randomColor = colorBank[Math.trunc(Math.random() * colorBank.length)];
    let randomBackground = backgroundBank[Math.trunc(Math.random() * backgroundBank.length)];

    const getWidget=(element)=>element.target.parentElement.parentElement.parentElement
    const flip = (element)=>{
        const widget=getWidget(element);
        widget.classList.contains("edit")?widget.classList.remove("edit"):widget.classList.add("edit")
        const hide=widget.querySelector('.hide')
        const visible=widget.querySelector('.visible')
        visible.classList.replace('visible','hide');
        hide.classList.replace('hide','visible');
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
            const widget=getWidget(element);
            widget.parentElement.removeChild(widget)

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
    ++widgetId;
});

