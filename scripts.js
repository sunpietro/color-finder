(function(global, doc, colorChecker) {
  const form = doc.querySelector('#color-checker');
  const sampleInputContainer = doc.querySelector('.field--sample-color');
  const sampleColorContainer = doc.querySelector('.sample-color');
  const sampleInput = sampleInputContainer.querySelector('.field__input');
  const guidelineColorsInput = doc.querySelector(
    '.field--guideline-colors .field__input'
  );
  const guidelineColorsContainer = doc.querySelector('#guideline-colors');
  const colorPattern = /^#(([\da-fA-F]{3}){1,2}|([\da-fA-F]{4}){1,2})$/;
  const timeout = 250;
  const colorsUpdateTimeout = null;
  const updateSampleColorPreview = () => {
    sampleColorContainer.style = `background: ${sampleInput.value}`;
    sampleColorContainer.dataset.value = sampleInput.value;
  };
  const updateGuidelineColorsPreview = () => {
    global.clearTimeout(colorsUpdateTimeout);
    global.setTimeout(() => {
      colorsBase.length = 0;

      const colorValues = guidelineColorsInput.value.split('\n');
      const colorsFragment = colorValues.reduce((wrapper, color) => {
        if (colorPattern.test(color)) {
          const colorNode = doc.createElement('div');

          colorNode.classList.add('color');
          colorNode.style = `color: ${color};`;
          colorNode.dataset.value = color;

          wrapper.appendChild(colorNode);
          colorsBase.push(color);
        }

        return wrapper;
      }, doc.createDocumentFragment());

      guidelineColorsContainer.innerHTML = '';
      guidelineColorsContainer.appendChild(colorsFragment);

      console.log({ colorsBase });
    }, timeout);
  };
  const getClosestColor = sample => {
    const results = colorsBase.map(hex => colorChecker(sample, hex));
    const closestDistance = Math.min(...results);
    const indexClosestDistance = results.indexOf(closestDistance);

    return colorsBase[indexClosestDistance];
  };
  let colorsBase = [];

  sampleInput.addEventListener('blur', updateSampleColorPreview, false);
  sampleInput.addEventListener('input', updateSampleColorPreview, false);

  guidelineColorsInput.addEventListener(
    'blur',
    updateGuidelineColorsPreview,
    false
  );
  guidelineColorsInput.addEventListener(
    'input',
    updateGuidelineColorsPreview,
    false
  );

  form.onsubmit = event => {
    event.preventDefault();

    const sample = sampleInput.value.trim();

    if (!sample.length) {
      return;
    }

    const sampleColor = doc.querySelector('.results__color--sample');
    const closestColor = doc.querySelector('.results__color--closest');
    const closest = getClosestColor(sample);

    sampleColor.style = `background: ${sample}`;
    sampleColor.dataset.value = sample;
    closestColor.style = `background: ${closest}`;
    closestColor.dataset.value = closest;
  };
})(window, window.document, window.ColorDistanceChecker);