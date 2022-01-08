import '../scss/style.scss';

let videoContainer = document.getElementById('videoContainer');
let videoId = videoContainer.dataset.videoId;

videoLoader(
    videoContainer,
    videoId
);

function videoLoader(videoContainer, videoId) {
    console.log(videoId);
    videoContainer.addEventListener('click', function() {
        if (videoContainer.classList.contains('premiere__video--load')) {
            return false;
        }
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1" class="video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        videoContainer.classList.add('premiere__video--load');
    });
}
