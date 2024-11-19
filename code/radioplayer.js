// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>
const channelsWrapper = document.querySelector("#channels-wrapper");

async function getData() {
  const response = await fetch("http://api.sr.se/api/v2/channels?format=json&size=100");
  const data = await response.json();
  console.log(data);
  displayData(data);
}
getData();

function displayData(data) {
  const slicedData = data.channels.slice(0, 10);
  console.log(slicedData);

  slicedData.forEach((channel) => {
    const container = document.createElement("div");
    container.classList.add("channel-container");
    channelsWrapper.appendChild(container);

    const image = document.createElement("img");
    image.classList.add("channel-image");
    image.src = channel.image;
    container.appendChild(image);

    const controlsWrapper = document.createElement("div");
    controlsWrapper.classList.add("controls-wrapper");
    controlsWrapper.style.backgroundColor = `#${channel.color}`;
    container.appendChild(controlsWrapper);

    const title = document.createElement("p");
    title.classList.add("title");
    title.innerText = channel.name;
    controlsWrapper.appendChild(title);

    const player = document.createElement("audio");
    player.classList.add("player");
    player.controls = true;
    player.src = channel.liveaudio.url;
    controlsWrapper.appendChild(player);
  });
}
