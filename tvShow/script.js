const form = document.querySelector('#search-form');
const container = document.querySelector('#container')

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	document.querySelectorAll('img').forEach((img) => img.remove());
	document.querySelectorAll('span').forEach((span) => span.remove());
    document.querySelectorAll('.tv-show').forEach((column) => column.remove());

	const keyword = form.elements.query.value;
	const config = {
		params: { q: keyword },
	};
	const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
	getImages(res.data);
	form.elements.query.value = '';
});

const getImages = (shows) => {
  for (let result of shows) {
     const column = document.createElement("div");
     column.classList.add("tv-show");
     const Name = document.createElement("span");
     Name.append(result.show.name);
    if (result.show.image) {
      const img = document.createElement("img");
      img.src = result.show.image.medium;
      column.appendChild(img);
    }

     column.appendChild(Name);
     container.appendChild(column);
  }
};