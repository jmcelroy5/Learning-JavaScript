var Video = function(config){
    this.title = config.title || "Untitled video";
    this.uploader = config.uploader || "Anonymous";
    this.seconds = config.seconds || 666;
};

// If no arguments are passed, video will be assigned the default attributes
unnamedVideo = new Video({});
console.log(unnamedVideo);

Video.prototype.watch = function(seconds){
    console.log("You watched all " + this.seconds +" seconds of " + this.title + "!\n");
};

var MusicVideo = function(config){
    var videoConfig = {
        title: config.title,
        uploader: config.uploader,
        seconds: config.seconds
    };
    Video.call(this, config);
    this.artist = artist;
};

// Music video extends video prototype
MusicVideo.prototype = Object.create(Video.prototype);

MusicVideo.prototype.rockOut = function(){
    console.log("You rocked out to", this.title, "by", this.artist, "!\n");
};

// create new MusicVideo instance
andrewBird = new MusicVideo({title:"Fake Palindromes", uploader:"Jessica",seconds: 60,artist: "Andrew Bird"});

// MusicVideo now has methods that are defined on Video
andrewBird.watch(555);

// MusicVideos has a method that regular Videos dont
andrewBird.rockOut();

// Make an array of video data with both normal videos and
// music videos, loop through them, and decide on each one
// whether to make it a Video or MusicVideo object.

videosToCreate = [
    { //musicvideo
    title: "Gangnam Style",
    uploader: "Jessica",
    seconds: 60,
    artist: "Psy"
    },
    { //video
    title: "Union Square Flash Mob",
    uploader: "Nora",
    seconds: 120
    },
    { //video
    title:"Cute Kittens",
    uploader:"Jeremy",
    seconds: 150
    },
    { //video
    title: "Puppies Falling Down Stairs",
    uploader: "Diane",
    seconds: 500
    },
    { //musicvideo
    title: "She Lit a Fire",
    uploader: "Jessica",
    artist: "Lord Huron",
    seconds: 100
    },
    { //musicvideo
    title: "Hit Me Baby One More Time",
    uploader: "Sarah",
    artist: "Britney Spears",
    seconds: 60
    }];

var regularVideos = [];
var musicVideos = [];

for (var i = 0; i < videosToCreate.length; i++){
    if (videosToCreate[i].artist){
        var video = new MusicVideo(videosToCreate[i]);
        musicVideos.push(video);
    }
    else {
        var video = new Video(videosToCreate[i]);
        regularVideos.push(video);
    }
}

// Print video lists we just created
console.log("List of regular videos: ", regularVideos.length);
console.log("List of music videos: ", musicVideos.length);

// Each uploader rocks out to the music video they uploaded
var errbodyRock = function(){
    for (var i = 0; i < musicVideos.length; i++){
        musicVideo[i].rockOut();
    }
};

