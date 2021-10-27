const form = document.querySelector('#searchForm')
const showSection = document.querySelector('#shows')
form.addEventListener('submit', async function (e) {
    e.preventDefault()
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config)
    makeImages(res.data)
    form.elements.query.value = ''
})

const makeImages = (shows) => {
    for (let child of showSection.children) {
        showSection.removeChild(child)
    }
    for (let res of shows) {
        if (res.show.image) {
            const img = document.createElement('IMG');
            img.src = res.show.image.medium;
            showSection.append(img)
        }
    }
}


