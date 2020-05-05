
/**
 * Autocompletes search recommendation as user searches for a song.
 * Does not take parameters but activates every time the user adds or
 * deletes in the song search bar. Pulls recommendations from database
 * of classic rock songs from FiveThirtyEight database (MIT License)
 * that has been converted to a JSON file. Based on tutorial from
 * @bradtraversy.
 */
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Searches for songs in database based on what the user has typed
const searchSongs = async searchText => {
	const res = await fetch('https://raw.githubusercontent.com/hrdylan/hrdylan.github.io/master/data/songs.json');
	const songs = await res.json();

	let matches = songs.filter(music => {
		const regex = new RegExp(`^${searchText}`, 'gi');
		return (music.COMBINED.match(regex) || music.Artist.match(regex));
	});

	if (searchText.length === 0) {
		matches = [];
		matchList.innerHTML = '';
	};

	outputHtml(matches);
};

// Constructs HTML with songs that match user query 
const outputHtml = matches => {
	if(matches.length > 0) {
		console.log(matches.song);
		console.log(matches.Artist);
		const html = matches.map(match => `
			<div class="card card-body h-50 mt-1 mb-1 pt-2 pb-2" onclick="addSong('${match.Song}', '${match.Artist}')">
			<span><i class="fa fa-plus-circle" style="color: green"></i>
			${match.Song}</span><h6>${match.Artist}</h6>
			</div>`).join('');

		matchList.innerHTML = html;
	}
}

search.addEventListener('input', () => searchSongs(search.value));

$("#save").click(function() {
  $('#save').tooltip('enable');
  $('#save').tooltip('show');
  setTimeout(function(){$('#save').tooltip('hide');}, 4000);
  setSavedStatus();
});

/**
 * Adds a song to the user's playlist
 * @param name - the name of the song being added
 * @param writer - the name of the artist
 */
function addSong(name, writer) {
	setExclamation();
	console.log("adding");
  	const playlist = document.getElementById('playlist');

   let song = document.createElement('li');
   song.id = name + 'inPlayList';
   song.className = 'list-group-item';
   song.style.display = 'block';
   icon = document.createElement('i')
   icon.className = 'fa fa-minus-circle'
   icon.style.color = 'red'
   icon.onclick = function () {removeSong(name.toString())};
   span = document.createElement('span');
   span.innerText = ' ' + name;
   song_writer = document.createElement('H6');
   song_writer.innerText = writer;

   song.appendChild(icon);
   song.appendChild(span);
   song.appendChild(document.createElement('br'))
   song.appendChild(song_writer)
   playlist.appendChild(song);

  }

/**
 * Removes a song to the user's playlist
 * @param name - the name of the song being removed
 */
function removeSong(name) {
	console.log("removing");
	setExclamation();
  	const playlist = document.getElementById('playlist').childNodes;
  	for (let i = 0; playlist.length; i++) {
    if (playlist[i].id == name+'inPlayList'){
      playlist[i].remove();
    }
  }
}

/**
 * Changes the icon to loading when saving playlist
 */
function setSavedStatus() {
	document.getElementById("exclamation").className = "fa fa-circle-o-notch fa-spin";
	setTimeout(setCheck, 1000);
}

/**
 * Sets saved playlist icon to check mark
 */
function setCheck() {
	document.getElementById("exclamation").className = "fa fa-check";

}

/**
 * Sets playlust icon back to exclamation after changes have been made
 */
function setExclamation() {
	document.getElementById("exclamation").className = "fa fa-exclamation";
}
