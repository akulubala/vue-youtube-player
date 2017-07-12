<template>
<div id="youtube-wrapper" v-bind:style="videoStyle">
    <div class="youtube" :data-embed="youtube" @click="loadYoutube">
        <div class="play-button"></div>
    </div>
</div>
</template>
<script>
const youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig

function getIdFromURL (url) {
  var id = url.replace(youtubeRegexp, '$1');

  if (id.includes(';')) {
    var pieces = id.split(';');

    if (pieces[1].includes('%')) {
      var uriComponent = decodeURIComponent(pieces[1]);
      id = ("http://youtube.com" + uriComponent).replace(youtubeRegexp, '$1');
    } else {
      id = pieces[0];
    }
  } else if (id.includes('#')) {
    id = id.split('#')[0];
  }

  return id
}

export default {
    props: {
        'youtube': {
            type: String,
            default: ''
        },
        'videoStyle': {
            "max-width": "680px",
            "max-height": "400px",
            "margin": "60px auto",
            "padding": "0 20px"
        }
    },
    mounted() {
        var youtube = this.$el.querySelector(".youtube")
        let id = getIdFromURL(youtube.dataset.embed)
        let imageSource = "http://img.youtube.com/vi/"+ id +"/hqdefault.jpg"
        let image = new Image()
            image.src = imageSource
            image.addEventListener( "load", function() {
                youtube.appendChild( image )
            })
    },
    methods: {
        loadYoutube() {
            let youtube = this.$el.querySelector(".youtube")
            let id = getIdFromURL(youtube.dataset.embed)
            var iframe = document.createElement( "iframe" )
            iframe.setAttribute( "frameborder", "0" )
            iframe.setAttribute( "allowfullscreen", "" )
            iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ id +"?rel=0&showinfo=0&autoplay=1" )
            youtube.innerHTML = ""
            youtube.appendChild( iframe )
        }
    }
}   
</script>
<style>
#youtube-wrapper .youtube {
    background-color: #000;
    margin-bottom: 30px;
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    cursor: pointer;
}
#youtube-wrapper .youtube img {
    width: 100%;
    top: -16.82%;
    left: 0;
    opacity: 0.7;
}
#youtube-wrapper .youtube .play-button {
    width: 90px;
    height: 60px;
    background-color: #333;
    box-shadow: 0 0 30px rgba( 0,0,0,0.6 );
    z-index: 1;
    opacity: 0.8;
    border-radius: 6px;
}
#youtube-wrapper .youtube .play-button:before {
    content: "";
    border-style: solid;
    border-width: 15px 0 15px 26.0px;
    border-color: transparent transparent transparent #fff;
}
#youtube-wrapper .youtube img,
#youtube-wrapper .youtube .play-button {
    cursor: pointer;
}
#youtube-wrapper .youtube img,
#youtube-wrapper .youtube iframe,
#youtube-wrapper .youtube .play-button,
#youtube-wrapper .youtube .play-button:before {
    position: absolute;
}
#youtube-wrapper .youtube .play-button,
#youtube-wrapper .youtube .play-button:before {
    top: 50%;
    left: 50%;
    transform: translate3d( -50%, -50%, 0 );
}
#youtube-wrapper .youtube iframe {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
}
</style>