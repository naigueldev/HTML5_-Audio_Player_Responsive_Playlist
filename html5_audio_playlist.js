
              // html5media enables <video> and <audio> tags in all major browsers
// External File: https://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: https://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
        playing = false,
        mediaPath = 'musicas2/',
        extension = '',
        tracks = [{
            "track": 1,
            "name": "jingle2009",
            "length": "0:30",
            "file": "jingle2009"
        }, {
            "track": 2,
            "name": "klm1",
            "length": "0:30",
            "file": "klm1"
        }, {
            "track": 3,
            "name": "klm2",
            "length": "0:30",
            "file": "klm2"
        }, {
            "track": 4,
            "name": "klm4",
            "length": "0:31",
            "file": "klm4"
        }, {
            "track": 5,
            "name": "klm5",
            "length": "0:30",
            "file": "klm5"
        }, {
            "track": 6,
            "name": "maxprint",
            "length": "0:32",
            "file": "maxprint"
        }, {
            "track": 7,
            "name": "multilaser",
            "length": "0:31",
            "file": "multilaser"
        }],
        buildPlaylist = $.each(tracks, function(key, value) {
            var trackNumber = value.track,
            trackName = value.name,
            trackLength = value.length;
            if (trackNumber.toString().length === 1) {
                trackNumber = '0' + trackNumber;
            } else {
                trackNumber = '' + trackNumber;
            }
            $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
        }),
        trackCount = tracks.length,
        npAction = $('#npAction'),
        npTitle = $('#npTitle'),
        audio = $('#audio1').bind('play', function () {
            playing = true;
            npAction.text('Executando...');
        }).bind('pause', function () {
            playing = false;
            npAction.text('Pausado...');
        }).bind('ended', function () {
            npAction.text('Pausado...');
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                audio.play();
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }).get(0),
        btnPrev = $('#btnPrev').click(function () {
            if ((index - 1) > -1) {
                index--;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        btnNext = $('#btnNext').click(function () {
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        li = $('#plList li').click(function () {
            var id = parseInt($(this).index());
            if (id !== index) {
                playTrack(id);
            }
        }),
        loadTrack = function (id) {
            $('.plSel').removeClass('plSel');
            $('#plList li:eq(' + id + ')').addClass('plSel');
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
        },
        playTrack = function (id) {
            loadTrack(id);
            audio.play();
        };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});
