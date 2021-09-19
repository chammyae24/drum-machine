class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.crashAudio = document.querySelector(".crash-sound");
    this.selector = document.querySelectorAll("select");
    this.bpm = 150;
    this.index = 0;
    this.muteButton = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.volumeSlider = document.querySelector(".volume-slider");
    this.isPlaying = false;
  }
  activePad() {
    // console.log(this);
    this.classList.toggle("active");
  }
  repeat() {
    const step = this.index % 16;
    const activeBar = document.querySelectorAll(`.b${step}`);

    activeBar.forEach((bar) => {
      bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (bar.classList.contains("crash-pad")) {
          this.crashAudio.currentTime = 0;
          this.crashAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const timeInterval = (60 / this.bpm) * 1000;

    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, timeInterval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = false;
    }
    this.index = 0;
  }
  updateButton() {
    // console.log(this.playButton);
    if (!this.isPlaying) {
      this.playButton.innerText = "STOP";
      this.playButton.classList.add("active");
    } else {
      this.playButton.innerText = "PLAY";
      this.playButton.classList.remove("active");
    }
  }
  changeVolume(e) {
    // console.log(e.target.value);
    this.volumeText = document.querySelector(".volume-text");
    this.volumeSelect = document.querySelector("#volume-select");
    this.volumeText.innerText = e.target.value;
    let volSel = this.volumeSelect.value;
    // console.log(volSel);
    switch (volSel) {
      case "kick":
        this.kickAudio.volume = e.target.value / 100;
        break;
      case "snare":
        this.snareAudio.volume = e.target.value / 100;
        break;
      case "hihat":
        this.hihatAudio.volume = e.target.value / 100;
        break;
      case "crash":
        this.crashAudio.volume = e.target.value / 100;
    }
  }
  changeSound(e) {
    const name = e.target.name;
    const sound = e.target.value;
    // console.log(name);
    switch (name) {
      case "kick-select":
        this.kickAudio.src = sound;
        break;
      case "snare-select":
        this.snareAudio.src = sound;
        break;
      case "hihat-select":
        this.hihatAudio.src = sound;
        break;
      case "crash-select":
        this.crashAudio.src = sound;
        break;
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-text");
    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = false;
    const playBtn = this.playButton;
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
  updateMute(e) {
    console.log(e);
    const muteIcon = e.target;
    muteIcon.classList.toggle("active");
    if (muteIcon.classList.contains("active")) {
      muteIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
      if (muteIcon.classList.contains("kick-mute")) {
        drumKit.kickAudio.volume = 0;
      }
      if (muteIcon.classList.contains("snare-mute")) {
        drumKit.snareAudio.volume = 0;
      }
      if (muteIcon.classList.contains("hihat-mute")) {
        drumKit.hihatAudio.volume = 0;
      }
      if (muteIcon.classList.contains("crash-mute")) {
        drumKit.crashAudio.volume = 0;
      }
    } else {
      muteIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
      if (muteIcon.classList.contains("kick-mute")) {
        drumKit.kickAudio.volume = 1;
      }
      if (muteIcon.classList.contains("snare-mute")) {
        drumKit.snareAudio.volume = 1;
      }
      if (muteIcon.classList.contains("hihat-mute")) {
        drumKit.hihatAudio.volume = 1;
      }
      if (muteIcon.classList.contains("crash-mute")) {
        drumKit.crashAudio.volume = 1;
      }
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playButton.addEventListener("click", () => {
  drumKit.updateButton();
  drumKit.start();
});

drumKit.volumeSlider.addEventListener("input", (e) => {
  drumKit.changeVolume(e);
});

drumKit.selector.forEach((select) => {
  select.addEventListener("change", (e) => {
    drumKit.changeSound(e);
  });
});

drumKit.tempoSlider.addEventListener("input", (e) => {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", (e) => {
  drumKit.updateTempo(e);
});

drumKit.muteButton.forEach((mute) => {
  mute.addEventListener("click", drumKit.updateMute);
});
