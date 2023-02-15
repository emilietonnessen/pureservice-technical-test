import { rgbToHex, sortColorsByBrightness } from './hexSortes.js';

const url = 'https://api.jsonbin.io/v3/b/6357a1c10e6a79321e33d472';
const token = '$2b$10$82rC9Om26H9PYnm2CrxYQOi8.BqZA4R1EvU5xiXYMZ9LINy4zS0.6';

// Convert rgba colors to hex and sort them based on brightness using the helper functions provided in hexSortes.js. Then return a new array with the sorted hex values.
const getSortedHexColorsArray = (colors) => {
  const hexColors = [];

  for (const key in colors) {
    const red = colors[key][0];
    const green = colors[key][1];
    const blue = colors[key][2];

    hexColors.push(rgbToHex(red, green, blue));
  }

  return sortColorsByBrightness(hexColors);
};

// Loop through the colors object and insert the individual colors into the DOM
const insertColorsToDOM = (colors) => {
  const colorsContainer = document.querySelector('.colors-container');
  const sortedHexColors = getSortedHexColorsArray(colors);

  for (const key in sortedHexColors) {
    colorsContainer.innerHTML += `
    <li class="color-item" style="background-color: ${sortedHexColors[key]}">
      ${sortedHexColors[key]}
    </li>
   `;
  }
};

/* 
  Resources used to learn more about XMLHttp 
  - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  - https://alicemoretti.medium.com/xmlhttprequest-callbacks-and-promises-257a4e63fe9a
*/
const fetchColors = (callback) => {
  let request = new XMLHttpRequest();

  // Use the ReadyState property to track the request and then use a callback function once the data has been received.
  request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
      callback(undefined, JSON.parse(request.responseText).record);
    } else if (request.readyState === 4) {
      callback('Could not fetch data', undefined);
    }
  });

  request.open('GET', url);
  request.setRequestHeader('X-Access-Key', token);
  request.send();
};

fetchColors((error, colors) => {
  if (error) {
    console.log(error);
  } else {
    insertColorsToDOM(colors);
  }
});
