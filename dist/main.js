!function(){"use strict";var e=document.getElementById("videoContainer");!function(e,t){console.log(t),e.addEventListener("click",(function(){if(e.classList.contains("premiere__video--load"))return!1;e.innerHTML='<iframe src="https://www.youtube.com/embed/'.concat(t,'?rel=0&autoplay=1" class="video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'),e.classList.add("premiere__video--load")}))}(e,e.dataset.videoId)}();