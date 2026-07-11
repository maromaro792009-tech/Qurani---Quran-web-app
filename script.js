const test = document.querySelector(".test")
const cardsArea = document.querySelector(".cards-area")
const searchBtn = document.querySelector(".search-btn")
const searchArea = document.querySelector(".search-area")
const searchInput = document.querySelector(".search")
const exitBtn = document.querySelector(".exit-btn")
let audioIsPlaying = false
searchBtn.addEventListener("click", () => {
    if (!audioIsPlaying) {
    searchArea.classList.toggle("appear")
    if (searchArea.classList.contains("appear")) {
    setTimeout(() => {
        searchInput.click()
        searchInput.focus()
    }, 100)
  }
  } else {
    alert("لا يمكنك البحث أثناء تشغيل السورة")
  }
})

exitBtn.addEventListener("click", () => {
    searchArea.classList.remove("appear")
})

document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-area") && !e.target.closest(".search-btn")) {
        searchArea.classList.remove("appear")
    }
})
function rerender(one) {
    const surah = document.createElement("article")
    const btn = document.createElement("button")
    const names = document.createElement("div")
    const surahNum = document.createElement("section")
    const surahName = document.createElement("section")
    surah.classList.add("surah")
    btn.classList.add("listen")
    surahNum.classList.add("surah-num")
    surahName.classList.add("surah-name")
    names.classList.add("names")
    btn.innerHTML = '<svg class="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>'
    surahName.textContent = one.name_arabic
    surahNum.textContent = `.${one.number}`
    btn.dataset.id = one.number
    let audio = new Audio(`${one.audio.example_audio}`)
    btn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play()
            audioIsPlaying = true
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z"/></svg>'
        } else {
            audio.pause()
            audioIsPlaying = false
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>'
        }
    })
    audio.addEventListener("ended", () => {
        btn.innerHTML = '<svg class="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>'
        
    })
    names.append(surahName, surahNum)
    surah.append(btn, names)
    cardsArea.append(surah)
}

async function startApp() {
    const res = await fetch("https://ummahapi.com/api/quran/surahs?reciter=alafasy")
    const info = await res.json()
    info.data.surahs.forEach(one => {
        rerender(one)
    })
    searchInput.addEventListener("input", () => {
        let value = info.data.surahs.filter(val => val.name_arabic.includes(searchInput.value))
        cardsArea.innerHTML = ""
        value.forEach(search => {
            rerender(search)
        })
    })
}

startApp()
