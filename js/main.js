class Film{
    API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
    tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.API_KEY}&page=1` 
    tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&page=1`
    tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.API_KEY}&page=1`
    searchButton = document.querySelector('.btn')
    buttons = document.querySelectorAll('.btns')
    pageNum = document.querySelector('.title')
    append = document.querySelector('.append')
    search = document.querySelector('#search')
    score = document.querySelector('#score')
    prev = document.querySelector('.prev')
    next = document.querySelector('.next')


    writeStorage(lastCat, pagi=1){
        let data = this.data
        data.last = lastCat
        data.page = pagi
        return window.localStorage.setItem('database', JSON.stringify(data))
    }

    get data () {
		const data = window.localStorage.getItem('database')
		return JSON.parse(data) || base
	}

    async updatePopular(page) {
        this.tokenPopular = this.tokenPopular.slice(0, -1) + page
        let response = await fetch(this.tokenPopular)
        return await response.json()
    }

    async updateTop(page) {
        this.tokenTop = this.tokenTop.slice(0, -1) + page
        let response = await fetch(this.tokenTop)
        return await response.json()
    }

    async updateUpComing(page) {
        this.tokenUpComing = this.tokenUpComing.slice(0, -1) + page
        let response = await fetch(this.tokenUpComing)
        return await response.json()
    }

    paginationNum = this.data.page

    async render(searchValue, minYear, maxYear, score) {
        if (this.data.last == 'top_rated') {
            var datas = await this.updateTop(this.data.page)
        } else if (this.data.last == 'popular') {
            var datas = await this.updatePopular(this.data.page)
        }else{
            var datas = await this.updateUpComing(this.data.page)
        }
        datas = datas.results
        this.append.innerHTML = null
        for(let data of datas) {
            if(data.title.toLowerCase().includes(searchValue ? searchValue.toLowerCase() : "")) {
                if(minYear ? minYear <= data.release_date.slice(0, 4) : true){
                    if(maxYear ? maxYear >= data.release_date.slice(0, 4) : true) {
                        if(score ? score <= data.vote_average : true) {
                            let div = document.createElement('div')
                            div.className = 'movie'
                            div.innerHTML = films(data)
                            this.append.append(div)
                        }
                    }
                }
            }
        }
    }
}

let film = new Film()
film.render()