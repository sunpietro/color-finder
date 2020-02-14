(function(global, doc, colorChecker) {
  const sampleInputContainer = doc.querySelector('.field--sample-color');
  const sampleInput = sampleInputContainer.querySelector('.field__input');
  const guidelineColorsInput = doc.querySelector(
    '.field--guideline-colors .field__input'
  );
  const guidelineColorsContainer = doc.querySelector('.guideline-colors');
  const colors = [
    '#2F6380',
    '#ABE2FF',
    '#5EC7FF',
    '#557180',
    '#4CA0CC',
    '#B34B55',
    '#BB3300',
    '#FFE77A',
    '#E8C66F',
    '#FFD187',
    '#E8AA6F',
    '#FFA77A'
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

      console.log({ colorsBase });
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

  const results = colors.map(hex => colorChecker(sample, hex));
  const closestDistance = Math.min(...results);
  const indexClosestDistance = results.indexOf(closestDistance);

  console.log('%csample', `padding: 4px 8px; background: ${sample};`);
  console.log(
    '%cclosest',
    `padding: 4px 8px; background: ${colors[indexClosestDistance]};`
  );
})(window, window.document, window.colorDistanceChecker);
