function films(i){
    return `
    <div class="movie">
        <img src="https://image.tmdb.org/t/p/w500${i.poster_path}" alt="${i.title}">

        <div class="movie-info">
            <h3>${i.title}</h3>
            <span class="orange">${i.vote_average}</span>
         </div>
        <span class="date">${i.release_date}</span>
    </div>
      `
}
