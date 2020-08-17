function getData() {
    var t = Math.round(new Date().getTime() / 1e3);
    $.ajax({
        url: "https://s3-eu-west-1.amazonaws.com/nme-rp-aws1-timeincuk-net/nowplaying/nme2.json?cache=" + t,
        dataType: "jsonp",
        crossDomain: !0,
        success: function (t) {
            console.log(response);
        },
    });
}
var radioApp = {
    event: {
        nowPlaying: function (t) {
            console.log(t);		
            $("#image").attr("src", t.image), $("h5").text(t.artist_text), $("p").text(t.song_text);
        },
    },
};
$(document).ready(function () {
    setInterval(getData, 1e4);
}),

$(window).on("load", function () {
    getData();
});
