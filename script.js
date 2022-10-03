const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const body = document.getElementById("body");

const apiURL = "https://api.lyrics.ovh";

// Get Search Value
form.addEventListener("submit", e => {
    e.preventDefault();
    searchValue = search.value.trim();
    searchValue ? beginSearch(searchValue) : alert("Nothing to search");
    search.value = '';
});

// Search function
async function beginSearch(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();

    displayData(data);
}

// Display Search Result
function displayData(data) {
    body.style.background = "url(./images/music2.jpg) no-repeat center";
    result.innerHTML = `
    <ul class="songs">
      ${data.data
            .map(song => `<li>
                    <div>
                        <strong>${song.artist.name}</strong> - ${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
            )
            .join('')}
    </ul>
  `;
}

//event listener in get lyrics button
result.addEventListener('click', e => {
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle)
    }
});

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await response.json();
    body.style.background = "url(./images/music3.jpg) no-repeat center";
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
}