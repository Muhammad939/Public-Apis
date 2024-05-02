function searchVideos() {
    var query = document.getElementById("searchInput").value;
    var apiKey = 'AIzaSyA8bapOHAbdG7l_5JGyDW-8SBzRhqwlsvs';
    var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + query + '&key=' + apiKey;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var searchResultsDiv = document.getElementById("searchResults");
            searchResultsDiv.innerHTML = '';

            data.items.forEach(item => {
                if (item.id.kind === 'youtube#video') {
                    var videoTitle = item.snippet.title;
                    var channelTitle = item.snippet.channelTitle;
                    var videoId = item.id.videoId;

                    var videoLink = 'https://www.youtube.com/embed/' + videoId;

                    var resultDiv = document.createElement("div");
                    resultDiv.className = "video-item";
                    resultDiv.innerHTML = '<iframe src="' + videoLink + '" frameborder="0" allowfullscreen></iframe>' +
                        '<p class="video-title">' + videoTitle + '</p>' +
                        '<p class="channel-title">' + channelTitle + '</p>';

                    // Add subscribe and open channel buttons
                    var subscribeButton = document.createElement("button");
                    subscribeButton.className = "subscribe-button";
                    subscribeButton.innerText = "Subscribe";
                    subscribeButton.addEventListener("click", function() {
                        window.open('https://www.youtube.com/channel/' + item.snippet.channelId, '_blank');
                        alert("To subscribe, please click the 'Subscribe' button on the channel page.");
                    });
                    resultDiv.appendChild(subscribeButton);

                    var openChannelButton = document.createElement("button");
                    openChannelButton.className = "open-channel-button";
                    openChannelButton.innerText = "Open Channel";
                    openChannelButton.addEventListener("click", function() {
                        window.open('https://www.youtube.com/channel/' + item.snippet.channelId, '_blank');
                    });
                    resultDiv.appendChild(openChannelButton);

                    searchResultsDiv.appendChild(resultDiv);
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle svg');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.setAttribute('fill', '#000'); // Change SVG color for light mode
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.setAttribute('fill', '#fff'); // Change SVG color for dark mode
    }
}
