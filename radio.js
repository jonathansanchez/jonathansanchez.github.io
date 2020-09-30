var radioApp = {};
radioApp.itunes = [];
radioApp.currentImage = {};

function fetch_itunes(artist, song, callback){
    if(typeof radioApp.itunes[artist+"-"+song] !== 'undefined'){
        callback(radioApp.itunes[artist+"-"+song]);
    }else{
        $.getJSON( "https://itunes.apple.com/search?term=" + encodeURIComponent(artist + " - " + song) + "&entity=song&callback=?", {
            format: "json"
        }).done(function( data ) {
            radioApp.itunes[artist+"-"+song] = data;
            callback(radioApp.itunes[artist+"-"+song]);
        });
    }
}

$(document).ready(function(){
    setInterval(function(){ update_meta(); }, 10000);
});

update_meta();

function update_meta(){
    //$.getJSON("https://cors-anywhere.herokuapp.com/https://radio.nme.com/radioplayer/api/nme2.json", function( data ) {
    $.getJSON("https://jonathansanchez.github.io?url=http://mastodonte.rf.gd/consumer.php", function( data ) {
        updateStationBlock("radio", data);
    });
}

function updateStationBlock(stat, data) {
    fetch_itunes(data.artist, data.song, function(itunes_data) {
        var defaultImage = "https://is5-ssl.mzstatic.com/image/thumb/Music123/v4/b8/38/2e/b8382e6a-dfa3-9192-01df-6d0bb4b93c4a/source/100x100bb.jpg";
        defaultImage.replace('100x100', '300x300');

        if(data.artist != null && data.song != null) {
            if(itunes_data != null && itunes_data.resultCount > 0) {
                var image = itunes_data.results[0].artworkUrl100.replace('100x100', '300x300');
                if(typeof radioApp.currentImage[stat] === 'undefined' || radioApp.currentImage[stat] != image){
                    radioApp.currentImage[stat] = image;
                    $("#image").attr("src", image);
                }
            } else {
                $("#image").attr("src", defaultImage);
            }
            $("h5").text(data.artist);
            $("p").text(data.song);
        } else {
            $("#image").attr("src", defaultImage);
            $("h5").text("Mastodonte FM");
            $("p").text("");
        }
    });
}
