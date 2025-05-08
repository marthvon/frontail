module.exports = {
  ColorfulScrollbar: function({ addUtilities, theme }) {
    const colors = theme('colors');
    const makeTemplate = (type, colorName, colorValue) => ({
      [`.scroll${type}-${colorName}::-webkit-scrollbar-${type}`]: {
        'background-color': colorValue,
      },
      [`.scroll${type}-${colorName}`]: {
        ...(type === 'thumb'
          ? { '--scrollthumb-color': colorValue }
          : { '--scrolltrack-color': colorValue }),
        'scrollbar-color': 'var(--scrollthumb-color, inherit) var(--scrolltrack-color, inherit)',
      },
    });
    const createUtilities = (type) => {
      const utilities = [];
      for (const [colorName, colorValue] of Object.entries(colors))
        if (typeof colorValue === 'string')
          utilities.push(makeTemplate(type, colorName, colorValue));
        else
          for (const [shade, hex] of Object.entries(colorValue))
            utilities.push(makeTemplate(type, `${colorName}-${shade}`, hex));
      return utilities;
    };
    addUtilities([...createUtilities('thumb'), ...createUtilities('track')]);
  },
  AnimationDuration: function({ addUtilities, theme }) {
    const transitionDurations = theme('transitionDuration');
    addUtilities(Object.entries(transitionDurations).reduce( (acc, [key, value]) => {
      acc[`.animation-duration-${key}`] = {
        'animation-duration': value 
      };
      return acc;
    }, {}));
  },
  extraScreens: {
    '2xs': '22.5rem',
    'xs': '30rem',
    'sm': '40rem',
    'md' : '47.5rem',
    'lg': '56.25rem',
    'xl': '67.5rem',
    '2xl': '80rem',
    '3xl': '90rem',
    '4xl': '128rem'
  },
  heightScreens: {
    'h-2xs': { 'raw': '(height <= 22.5rem)' },
    'h-xs': { 'raw': '(height <= 30rem)' },
    'h-sm': { 'raw': '(height <= 40rem)' },
    'h-md': { 'raw': '(height <= 47.5rem)' },
    'h-lg': { 'raw': '(height <= 56.25rem)'}
  }
}