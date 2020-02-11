(function(global, doc, colorChecker) {
  const sampleInputContainer = doc.querySelector('.field--sample-color');
  const sampleInput = sampleInputContainer.querySelector('.field__input');
  const guidelineColorsInput = doc.querySelector(
    '.field--guideline-colors .field__input'
  );
  const guidelineColorsContainer = doc.querySelector('.guideline-colors');
  const colors = [
    '#000000',
    'ffffff',
    '#979797',
    '#b9c4cb',
    '#e5e5e5',
    '#4a90e2',
    '#519ff7',
    '#3a71b0',
    '#009e71',
    '#06a77d',
    '#1b4691',
    '#e87f36',
    '#c43546',
    '#ff8c3b',
    '#b8652e',
    'bb3300'
  ];
  const sample = '#f58220';
  const colorPattern = /^#(([\da-fA-F]{3}){1,2}|([\da-fA-F]{4}){1,2})$/;
  const timeout = 250;
  const colorsUpdateTimeout = null;
  const updateSampleColorPreview = () => {
    let style = '';

    if (colorPattern.test(sampleInput.value)) {
      style = `--sample-color: ${sampleInput.value};`;
    }

    sampleInputContainer.style = style;
  };
  const updateGuidelineColorsPreview = () => {
    global.clearTimeout(colorsUpdateTimeout);
    global.setTimeout(() => {
      colorsBase.length = 0;

      const colorValues = guidelineColorsInput.value.split('\n');
      const colorsFragment = colorValues.reduce((wrapper, color) => {
        if (colorPattern.test(color)) {
          const colorNode = doc.createElement('div');

          colorNode.classList.add('guideline-color');
          colorNode.style = `color: ${color};`;

          wrapper.appendChild(colorNode);
          colorsBase.push(color);
        }

        return wrapper;
      }, doc.createDocumentFragment());

      guidelineColorsContainer.innerHTML = '';
      guidelineColorsContainer.appendChild(colorsFragment);
    }, timeout);
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

  console.log(colors.map(hex => colorChecker(sample, hex)));
})(window, window.document, window.colorDistanceChecker);
