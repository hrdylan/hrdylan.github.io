function addToPlaylist(id) {
 	var add = document.getElementById("Add " + id);
  	var play = document.getElementById("Play " + id);
  	add.style.display = "none";
  	play.style.display = "block";
}

function removeFromPlaylist(id) {
 	var add = document.getElementById("Add " + id);
  	var play = document.getElementById("Play " + id);
  	add.style.display = "block";
  	play.style.display = "none";
}