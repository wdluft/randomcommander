const body = document.querySelector('body');
const btn = document.getElementById('getRandomBtn');
const cardImg = document.getElementById('card-img');
const cardName = document.getElementById('card-name');
const colorId = document.getElementById('color-id');
const oracle = document.getElementById('oracle-text');
const cardType = document.getElementById('card-type');
const manaCost = document.getElementById('mana-cost');
const edhrec = document.getElementById('edh-rec');
const twitterBtn = document.querySelector('.twitter-btn');
const cardInfo = document.querySelector('#card-info');

const scryfall = 'https://api.scryfall.com/cards/random?q=is%3Acommander';

// MAGIC COLORS
const white = '#FFFDD7';
const blue = '#00aaf9';
const black = '#262525';
const red = '#ed5f55';
const green = '#69d38d';

// Color pairs
const monocolors = [
  {
    colorCode: white,
    abbreviation: 'W',
  },
  {
    colorCode: blue,
    abbreviation: 'U',
  },
  {
    colorCode: black,
    abbreviation: 'B',
  },
  {
    colorCode: red,
    abbreviation: 'R',
  },
  {
    colorCode: green,
    abbreviation: 'G',
  },
];

function setBackground(colorArr) {
  let cardColors;
  if (colorArr.length === 0) {
    body.style.background = '#cecece';
  } else if (colorArr.length === 1) {
    cardColors = monocolors.filter(color => color.abbreviation === colorArr[0]);
    body.style.background = `${cardColors[0].colorCode}`;
  } else if (colorArr.length === 2) {
    cardColors = monocolors.filter(color => color.abbreviation === colorArr[0] || color.abbreviation === colorArr[1]);
    body.style.background = `linear-gradient(to right, ${cardColors[0].colorCode}, ${cardColors[1].colorCode})`;
  } else if (colorArr.length === 3) {
    cardColors = monocolors.filter(
      color =>
        color.abbreviation === colorArr[0] || color.abbreviation === colorArr[1] || color.abbreviation === colorArr[2]
    );
    body.style.background = `linear-gradient(to right, ${cardColors[0].colorCode}, ${cardColors[1].colorCode}, ${
      cardColors[2].colorCode
    })`;
  } else if (colorArr.length === 4) {
    cardColors = monocolors.filter(
      color =>
        color.abbreviation === colorArr[0] ||
        color.abbreviation === colorArr[1] ||
        color.abbreviation === colorArr[2] ||
        color.abbreviation === colorArr[3]
    );
    body.style.background = `linear-gradient(to right, ${cardColors[0].colorCode}, ${cardColors[1].colorCode}, ${
      cardColors[2].colorCode
    }, ${cardColors[3].colorCode}
    )`;
  } else {
    body.style.background = `linear-gradient(to right, ${white}, ${blue}, ${black}, ${red}, ${green})`;
  }
}

function getImg() {
  fetch(scryfall)
    .then(response => response.json())
    .then(data => {
      cardInfo.style.display = 'grid';
      console.log(data);
      let colorIdentity = '';
      data.color_identity.forEach(color => {
        colorIdentity += color;
      });
      cardImg.src = data.image_uris.png;
      cardName.innerText = data.name;
      colorId.innerText = `Color Identity: ${colorIdentity}`;
      manaCost.innerText = `Mana Cost: ${data.mana_cost}`;
      cardType.innerText = data.type_line;
      oracle.innerText = `Oracle Text: \n ${data.oracle_text}`;
      edhrec.innerHTML = `<a href='${data.related_uris.edhrec}' class='btn btn-secondary' target="_blank">EDHREC</a>`;
      // twitterBtn.dataset.text = `My random commander is ${data.name}`;
      twitterBtn.setAttribute(
        'href',
        `https://twitter.com/intent/tweet?text=My random commander is ${
          data.name
        }. From&url=https://randomcommander.com`
      );
      setBackground(data.color_identity);
    });
}

btn.addEventListener('click', getImg);
// window.onload = getImg();
