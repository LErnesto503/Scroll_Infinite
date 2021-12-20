
// const btnAnterior = document.getElementById('btnAnterior');
// const btnSiguiente = document.getElementById('btnSiguiente');

// btnSiguiente.addEventListener('click', () => {
// 	if(pagina < 1000){
// 		pagina += 1;
// 		cargarPeliculas();
// 	}
// });

// btnAnterior.addEventListener('click', () => {
// 	if(pagina > 1){
// 		pagina -= 1;
// 		cargarPeliculas();
// 	}
// });

'use strict'

let pagina = 1;
let peliculas = '';	
const observe = new IntersectionObserver(entries => {
	if(entries[0].isIntersecting) {
		pagina++;
		cargarPeliculas();
	}
},{
	threshold : 0.8
});


const cargarPeliculas = async() => {
	const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
	const datos = await respuesta.json();
	const resultado = datos.results;
	resultado.forEach(movie => {
		peliculas += `
			<div class="pelicula">
			<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
				<h3 class="titulo">${movie.title}</h3>
			</div>
		`;
	});
	document.getElementById('contenedor').innerHTML = peliculas
	const movieView = document.querySelectorAll('.pelicula')
	let lastMovie = movieView[movieView.length - 1]
	observe.observe(lastMovie)
}
cargarPeliculas();