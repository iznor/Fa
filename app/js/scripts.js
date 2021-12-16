let colorBank =
    [
        '#e2b699b7',
        '#e2ce99b7',
        '#d2e299b7',
        '#aee299b7',
        '#99e2d0b7',
        '#99bfe2b7',
        '#9e99e2b7',
        '#af99e2b7',
        '#e299dcb7',
        '#e29999b7'
    ];

let backgroundBank = 
    [
        'url("../assets/img/random-backgrounds/Woman_singer_icon.svg")',
        'url("../assets/img/random-backgrounds/arnold-schwarzenegger-stencil.svg")',
        'url("../assets/img/random-backgrounds/jimi-hendrix-stencil.svg")',
        'url("../assets/img/random-backgrounds/kanye-west-stencil.svg")',
        'url("../assets/img/random-backgrounds/leonardo-dicaprio-stencil.svg")',
        'url("../assets/img/random-backgrounds/monalisa-stencil.svg")',
        'url("../assets/img/random-backgrounds/musician-vector-free.svg")',
        'url("../assets/img/random-backgrounds/nelson-mandela-stencil.svg")',
        'url("../assets/img/random-backgrounds/peter-pan-stencil.svg")',
        'url("../assets/img/random-backgrounds/thanksgiving-owl-stencil.svg")'
    ];

let widgetId = 0;

$(".widget.append").click(() => {
    $(".dashboard").append(`\
        <div id="w-${widgetId}" class="widget">
            <div class="background"></div>
            <h1>Top 5 Songs By Eminem:</h1>
            <div class="content">CONTENT FROM DATABASE</div>
            <div class="row">
                <div class="button-container delete-button"></div>
                <div class="button-container edit-button"></div>
            </div>
        </div>`);
    let randomColor = colorBank[Math.trunc(Math.random() * colorBank.length)];
    let randomBackground = backgroundBank[Math.trunc(Math.random() * backgroundBank.length)];
    $(`#w-${widgetId}`)
        .css("background-color",`${randomColor}`)
    $(`#w-${widgetId} .background`)
        .css("background-image",`${randomBackground}`)   
    ++widgetId;
});

$('.button-container .edit-button')
    .click(()=>{
        alert("Edit")
    })
$('.button-container.delete-button')
    .click(()=>{
        alert("Delete")
    })
$('.button-container.back-button')
    .click(()=>{
        alert("Back")
    })
$('.button-container.done-button')
    .click(()=>{
        alert("Done")
    })