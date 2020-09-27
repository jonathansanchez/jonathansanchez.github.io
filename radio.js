var radioApp = {};
radioApp.itunes = [];
radioApp.currentImage = {};

function fetch_itunes(artist, song, callback){
	if(typeof radioApp.itunes[artist+"-"+song] !== 'undefined'){
		callback(radioApp.itunes[artist+"-"+song]);
	}else{
		$.getJSON( "https://cors-escape.herokuapp.com/https://itunes.apple.com/search?term=" + encodeURIComponent(artist + " - " + song) + "&entity=song&callback=?", {
					format: "json"
		}).done(function( data ) {
			radioApp.itunes[artist+"-"+song] = data;
			callback(radioApp.itunes[artist+"-"+song]);
		}).error(function(){
			callback(null);
		});
	}
}

function msieversion() {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
		return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
	}else{
		return false;
	}
	return false;
}

$(document).ready(function(){
	setInterval(function(){ update_meta(); }, 10000);
	var ie_version = msieversion();
	if(ie_version !== false){
		$('.nme-header').css('width', '100%').css('width', '-=55px');
	}
});

update_meta();

function update_meta(){
	$.getJSON("https://cors-escape.herokuapp.com/https://radio.nme.com/radioplayer/api/nme2.json", function( data ) {
		updateStationBlock('nme2', data);
	});
}

function updateStationBlock(stat, data){
  console.log(stat);
  console.log(data);
  //$("#image").attr("src", t.image), $("h5").text(t.artist_text), $("p").text(t.song_text);

	$('#' + stat + '_artist').text(data.artist);
	$('#' + stat + '_track').text(data.song);
}
