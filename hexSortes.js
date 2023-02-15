function hexToDec(hex) {
  return parseInt((hex + '').replace(/[^a-f0-9]/gi, ''), 16);
}

export function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexValueSanitize(color) {
  return color
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => r + r + g + g + b + b
    )
    .replace('#', '');
}

function hexBrightness(hex, type) {
  let conversion;

  if (type == 'BT601') {
    conversion = [0.299, 0.587, 0.114]; //BT601
  } else if (type == 'BT709') {
    conversion = [0.2126, 0.7152, 0.0722]; //BT709
  } else if (type == 'BT2020') {
    conversion = [0.2627, 0.678, 0.0593]; //BT2020
  } else {
    conversion = [0.299, 0.587, 0.114]; //BT601
  }

  hex = hexValueSanitize(hex);

  return (
    hexToDec(hex[0] + hex[1]) * conversion[0] +
    hexToDec(hex[2] + hex[3]) * conversion[1] +
    hexToDec(hex[4] + hex[5]) * conversion[2]
  );
}

function mostBrightColor(colors, type) {
  let mostBright = false;
  let hex;

  colors.forEach((color) => {
    let colorCode = color.colorCode || color;
    hex = hexValueSanitize(colorCode);

    // brightness = hexBrightness(hex, type);
    if (
      !mostBright ||
      hexBrightness(hex, type) > hexBrightness(mostBright, type)
    ) {
      mostBright = hex;
    }
  });

  return `#${mostBright}`;
}

export function sortColorsByBrightness(colors) {
  const copiedColor = colors.slice(0);
  const output = [];

  while (copiedColor.length > 0) {
    const color = mostBrightColor(copiedColor);
    let index = copiedColor.indexOf(color);
    if (index > -1) {
      copiedColor.splice(index, 1);
    }

    output.push(color);
  }

  return output;
}
