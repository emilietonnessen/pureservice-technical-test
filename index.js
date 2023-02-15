import { rgbToHex, sortColorsByBrightness } from './hexSortes.js';

// Fetch the colors from colors.json file
const response = await fetch('./colors.json');
const colors = await response.json();

// Convert rgba colors to hex and sort them based on brightness using the helper functions provided in hexSortes.js. Then return a new array with the sorted hex values.
const getSortedHexColorsArray = () => {
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
const insertColorsToDOM = () => {
  const colorsContainer = document.querySelector('.colors-container');
  const sortedHexColors = getSortedHexColorsArray();

  for (const key in sortedHexColors) {
    colorsContainer.innerHTML += `
    <li class="color-item" style="background-color: ${sortedHexColors[key]}">
      ${sortedHexColors[key]}
    </li>
   `;
  }
};

insertColorsToDOM();
