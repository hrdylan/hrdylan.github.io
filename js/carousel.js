


const VALID_NAMES = ['bob', 'jim', 'clayton', 'prof. harmon','professor harmon', 'sarah harmon', 'george', 'ian', 'dylan']
const VALID_SONG_NAMES = /^\w\w\w+\s?\w*\s?\w*\s?\w*\s?\w*\s?\w*\s?\w*\s?\w*\s?\w*$/g
const BAND_NAME = ['The Best Band', 'The Best Band\'s Worst Enemy', 'The Worst Band', 'Clayton Rose', 'The Trustee Troubadour',
'Some Clever Band Name', 'Carl', 'Corona']
const GENRE_SONGS = {
  'Dance': VALID_SONG_NAMES,
  'Pop': VALID_SONG_NAMES,
  'Rock': VALID_SONG_NAMES,
  'Bowdoin Band BS': /^Mr\. Brightside$/g,
  'Punk': VALID_SONG_NAMES,
}
$("#next_button").click(function() {

  $('#throw_party').carousel('next');
});

$("#next_button_1").click(function() {

  $('#throw_party').carousel('next');
});

$("#next_button_2").click(function() {

  $('#throw_party').carousel('next');
});
$("#next_button_3").click(function() {

  $('#throw_party').carousel('next');
});

$("#save").click(function() {
  $('#save').tooltip('enable');
  $('#save').tooltip('show');
  setTimeout(function(){$('#save').tooltip('hide');}, 4000);
  blowConfetti();
  setSavedStatus();
});

$("#prev_button").click(function() {

  $('#throw_party').carousel('prev');
});

$("#prev_button_1").click(function() {

  $('#throw_party').carousel('prev');
});

$("#prev_button_2").click(function() {

  $('#throw_party').carousel('prev');
});
$("#prev_button_3").click(function() {

  $('#throw_party').carousel('prev');
});

$("#prev_button_4").click(function() {

  $('#throw_party').carousel('prev');
});

$('#throw_party').carousel({
  interval: false
})

$('#found_indicator').tooltip({
	animation: true,
	title: 'found user'

})

$('.dropdown-item').click(function () {
  const genre_select = document.getElementById('genre_select');
  var text = $(this).text();
  genre_select.innerText = text; 
})
function removeSong(name) {
  const playlist = document.getElementById('playlist').childNodes;
  const playlist_1 = document.getElementById('playlist_1').childNodes;
  const playlist_2 = document.getElementById('playlist_2').childNodes;
  const playlist_3 = document.getElementById('playlist_3').childNodes;
  console.log(playlist)
  console.log(playlist_1)
  for (let i = 1;playlist.length;i++) {
    if (playlist[i].id == name+'inPlayList'){
      playlist[i].remove();
    }
    if (playlist_1[i].id == name+'inPlayList'){
      playlist_1[i].remove();
    }
    if (playlist_2[i].id == name+'inPlayList'){
      playlist_2[i].remove();
    }
    if (playlist_3[i].id == name+'inPlayList'){
      playlist_3[i].remove();
    }
  }


}
function addSong(name, writer) {
  const playlist = document.getElementById('playlist');
  const playlist_1 = document.getElementById('playlist_1');
  const playlist_2 = document.getElementById('playlist_2');
  const playlist_3 = document.getElementById('playlist_3');
  const playlists = [playlist, playlist_1, playlist_2, playlist_3]
  for (let i in playlists){
    let song = document.createElement('li');
    song.id = name + 'inPlayList';
    song.className = 'list-group-item';
    song.style.display = 'block';
    icon = document.createElement('i')
    icon.className = 'fa fa-minus-circle'
    icon.style.color = 'red'
    icon.onclick = function () {removeSong(name);}
    span = document.createElement('span')
    span.innerText = ' ' + name
    song_writer = document.createElement('H6');
    song_writer.innerText = writer;

    song.appendChild(icon);
    song.appendChild(span);
    song.appendChild(document.createElement('br'))
    song.appendChild(song_writer)
    playlists[i].appendChild(song);

  }

}
function addGuest(name) {
  const guestList = document.getElementById('guest_list')
  const button = document.createElement('button');
  button.className = "btn btn-light m-1"
  button.id = name
  icon = document.createElement('i')
  icon.className = "fa fa-times"
  button.innerText = name + ' '
  button.appendChild(icon);
  button.onclick = function() {removeGuest(name);};
  guest_list.appendChild(button)
}

function removeGuest(name) {
  const guest = document.getElementById(name)
  guest.remove()
}
 
function showError(id) {
  $(id).tooltip({
    animation: true,
    title: 'Not Found',
    placement: 'right'

  });
  $(id).tooltip('show');
  setTimeout(function (){
    $(id).tooltip('hide');
  }, 3000)
}

$('#search_songs').keyup(function(event){
        $('#search_songs').tooltip('hide');
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
          const val = $('#search_songs').val()
          if (val.match(VALID_SONG_NAMES)){
            addSong($('#search_songs').val(), BAND_NAME[Math.floor(Math.random() * BAND_NAME.length)])
            console.log($('#search_songs').val());
            console.log($('#search_songs').val(''));
            document.getElementById('song_found_indicator').className = ''
          } else {
            showError('#search_songs');
          }
           
        } else {
          const val = $('#search_songs').val().toLowerCase()

          if (val.match(VALID_SONG_NAMES)){
            document.getElementById('song_found_indicator').className = 'fa fa-check';
            document.getElementById('song_found_indicator').color = 'rgb(92,184,92)';
            document.getElementById('search_songs').style.borderBottomColor = 'rgb(92,184,92)';
          } else {
            document.getElementById('song_found_indicator').className = '';
            document.getElementById('search_songs').style.borderBottomColor = 'red';
          }
        }
});

$('#search_genre_songs').keyup(function(event){
        $('#search_genre_songs').tooltip('hide');
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
          const genre = $('#genre_select').text()
          const val = $('#search_genre_songs').val()
          if (val.match(GENRE_SONGS[genre])){
            addSong($('#search_genre_songs').val(), BAND_NAME[Math.floor(Math.random() * BAND_NAME.length)])
          } else {
            showError('#search_genre_songs');
          }
           
        } else {
          const genre = $('#genre_select').text()
          const val = $('#search_genre_songs').val()
          if (val.match(GENRE_SONGS[genre])){
            document.getElementById('search_genre_songs').style.borderBottomColor = 'rgb(92,184,92)';
          } else {
            document.getElementById('search_genre_songs').style.borderBottomColor = 'red';
          }
        }
});

$('#search').keyup(function(event){
        $('#search').tooltip('hide');
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
          const val = $('#search').val()
          if (VALID_NAMES.includes(val)){
            addGuest($('#search').val())
            console.log($('#search').val());
            console.log($('#search').val(''));
            document.getElementById('found_indicator').className = ''
          } else {
            showError('#search');
          }
           
        } else {
        	const val = $('#search').val().toLowerCase()

        	if (VALID_NAMES.includes(val)){
        		document.getElementById('found_indicator').className = 'fa fa-check';
        		document.getElementById('found_indicator').color = 'rgb(92,184,92)';
        		document.getElementById('search').style.borderBottomColor = 'rgb(92,184,92)';
        	} else {
        		document.getElementById('found_indicator').className = '';
        		document.getElementById('search').style.borderBottomColor = 'red';
        	}
        }
});


var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Dance', 'Pop', 'Punk', 'Rock', 'Bowdoin Band BS'],
    datasets: [{
      label: '# of Guests',
      data: [10,20,50,5,100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
  }
});


$('#save').tooltip({
  animation: true,
  title: 'Playlist Saved!',
  placement: 'right'

})

$('#save').tooltip('disable')

$('.fa-exclamation').tooltip({
  animation: true,
  title: 'playlist not saved!',
  placement: 'right'
})

function setSavedStatus() {
  const exclamations = document.getElementsByClassName('fa fa-exclamation');
  for (let i = 0;i<4;i++){
    console.log(i)
    const spinner = document.createElement('i')
    spinner.className = "fa fa-circle-o-notch fa-spin"
    spinner.style.color = 'rgb(92,184,92)'
    spinner.style.opacity = 0.5
    exclamations[0].parentNode.insertBefore(spinner, exclamations[0])
    exclamations[0].remove();

  }

  setTimeout(function () {
    const spinners = document.getElementsByClassName('fa fa-circle-o-notch fa-spin');
    for (let i = 0;i<4;i++){
      console.log(i)
      const circle = document.createElement('i')
      circle.className = "fa fa-check-circle-o fa-pulse"
      circle.style.color = 'rgb(92,184,92)'
      circle.style.transform = 'scale(1.2,1.2)'
      spinners [0].parentNode.insertBefore(circle, spinners[0])
      spinners [0].remove();
    }
    $('.fa-check-circle-o').tooltip({
      animation: true,
      title: 'playlist saved!',
      placement: 'right'
    })
  }, 1000)
  console.log('done')

}

// confetii code from the javascript library example, adapted for use in this project.
function blowConfetti () {
  var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio)
  }));
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
  
}
