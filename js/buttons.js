for(let movie of film.buttons){
    movie.onclick = function(){
        film.writeStorage(this.value)
        film.render()
    }
}

film.pageNum.textContent = film.data.page

film.next.onclick = () => {
    film.data.page = film.writeStorage(film.data.last, film.data.page+1)
    film.render()
    film.pageNum.textContent = film.data.page
    search.value = null
    min.value = null
    max.value = null
    score.value = null
}

film.prev.onclick = () => {
    if(film.data.page === 1) return
    film.data.page = film.writeStorage(film.data.last, film.data.page-1)
    film.render()
    film.pageNum.textContent = film.data.page
    search.value = null
    min.value = null
    max.value = null
    score.value = null
}

film.searchButton.onclick = () => {
    if(!film.search.value && !min.value && !max.value && !film.score.value) return
    film.render(film.search.value, min.value, max.value, film.score.value)
}

film.paginationNum = film.data.page