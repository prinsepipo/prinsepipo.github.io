// Audio controller.


// Range from 0 to 1.
const defaultVolumeLevel = 0.15;

const audios = document.getElementsByTagName('audio');

for (let i = 0; i < audios.length; i++) {
    audios[i].volume = defaultVolumeLevel;
}
