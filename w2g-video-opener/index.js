let videos = null
let currentVideo = 0

// Adds an observer to the "Choose file" button
const uploadButton = document.getElementById("upload-txt-btn")
const amountOfVideosTxt = document.getElementById("amount-videos")
const uploadButtonDiv = document.getElementById("file-upload-btn")

uploadButton.addEventListener("change", evento => {
    var fileNotParsed = uploadButton.files[0]
    fileNotParsed.text()
        .then(text => {
            videos = text
                .split("\n")
                .map(removeBreakline)
                .map(trimAll)
                .filter(nonEmptyElements)
            console.log(videos)

            currentVideo = 0
            amountOfVideosTxt.innerHTML = `Amount of Videos: ${videos.length}`
            uploadButtonDiv.hidden = true
            showButtons()
            updateButtons()
        })
        .catch(err => window.alert("An error ocurred. File not read | Error " + err))
})

// Array cleaning functions
const removeBreakline = videoUrl => videoUrl.replace("\r", "")
const trimAll = element => element.trim()
const nonEmptyElements = element => element != null && element != undefined && element != ""

// Shows the previous, current and next button
function showButtons() {
    const elements = document.querySelectorAll("#nav-buttons")
    console.log(elements)
    elements.forEach(element => element.hidden = false)
}

// Defines the buttons' text
function updateButtons() {
    updatePreviousBtnTxt()
    updateCurrentBtnTxt()
    updateNextBtnTxt()
}

function updatePreviousBtnTxt() {
    const previousBtn = document.getElementById("previous-video")
    const prevNonExistent = currentVideo - 1 < 0
    let btnString = null

    if (prevNonExistent) {
        btnString = `Previous video - / ${videos.length}`
        previousBtn.disabled = true
    } else {
        btnString = `Previous video ${currentVideo} / ${videos.length}`
        previousBtn.disabled = false
    }

    previousBtn.innerHTML = btnString
}

function updateCurrentBtnTxt() {
    const currentBtn = document.getElementById("current-video")
    currentBtn.innerHTML = `Open current video ${currentVideo + 1} / ${videos.length}`
}

function updateNextBtnTxt() {
    const nextBtn = document.getElementById("next-video")
    const nextNonExistent = currentVideo + 1 == videos.length
    let btnString = null

    if (nextNonExistent) {
        btnString = `Next video - / ${videos.length}`
        nextBtn.disabled = true
    } else {
        btnString = `Next video ${currentVideo + 2} / ${videos.length}`
        nextBtn.disabled = false
    }

    nextBtn.innerHTML = btnString
}

// Defines the button actions
function prevBtn() {
    currentVideo--
    updateButtons()
    console.log(currentVideo)
}

function currentBtn() {
    window.open(videos[currentVideo])
    console.log(currentVideo)
}

function nextBtn() {
    currentVideo++
    updateButtons()
    console.log(currentVideo)
}