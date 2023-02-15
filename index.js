// Fetch the colors from colors.json file
const response = await fetch('./colors.json');
const colors = await response.json();

// Loop through the colors object and insert the individual colors into the DOM
const insertColorsToDOM = () => {
  const colorsContainer = document.querySelector('.colors-container');

  for (const key in colors) {
    const rgbaValue = `rgba(${colors[key].toString()})`;

    colorsContainer.innerHTML += `
    <li class="color-item" style="background-color: ${rgbaValue}">
      ${key}
    </li>
   `;
  }
};

insertColorsToDOM();
