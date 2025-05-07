module.exports = {
  ColorfulScrollbar: function({ addUtilities, theme }) {
    const colors = theme('colors');
    const makeTemplate = (type, colorName, colorValue) => ({
      [`.scroll${type}-${colorName}::-webkit-scrollbar-${type}`]: {
        'background-color': colorValue,
      },
      [`.scroll${type}-${colorName}`] : {
        ...(type == 'thumb'? {'--scrollthumb-color': colorValue} : {'--scrolltrack-color': colorValue}),
        'scrollbar-color': 'var(--scrollthumb-color, inherit) var(--scrolltrack-color, inherit)'
      }
    });
 
    addUtilities(Object.entries(colors).map( ([colorName, colorValue]) => {
      if(typeof colorValue !== 'object')
        return makeTemplate('thumb', colorName, colorValue);
      return Object.entries(colorValue).map(([colorShade, colorHex]) => 
        makeTemplate('thumb', colorName+'-'+colorShade, colorHex));
    }));
 
    addUtilities(Object.entries(colors).map( ([colorName, colorValue]) => {
      if(typeof colorValue !== 'object')
        return makeTemplate('track', colorName, colorValue);
      return Object.entries(colorValue).map(([colorShade, colorHex]) => 
        makeTemplate('track', colorName+'-'+colorShade, colorHex));
    }));
  },
  AnimationDuration: function({ addUtilities, theme, e }) {
    const transitionDurations = theme('transitionDuration');
    addUtilities(Object.entries(transitionDurations).reduce( (acc, [key, value]) => {
      acc['.animation-duration-'+e(key)] = {
        '--animation-duration': value,
        animationDuration: value 
      };
      return acc;
    }, {}), ['responsive']);
  },
  EventTriggers: function({ addVariant, e }) {
    addVariant(/^peer(?:-\[(.+?)\])?-([a-z&]+)$/, ({ modifySelectors, separator }, { value, modifier }) => {
      const peerSelector = value? '.peer'+group : '.peer';
      const fullClassName = e(`peer${value? `-[${value}]` : ''}-${modifier}${separator}`)
      modifySelectors(({ className }) => modifier.split('|')
        .map(state => `${peerSelector}:${state} ~ .${fullClassName}${e(className)}`)
        .join(', ')
      );
    });
  },
  extraScreens: {
    '2xs': '360px',
    'xs': '480px',
    'sm': '640px',
    'md' : '760px',
    'lg': '900px',
    'xl': '1080px',
    '2xl': '1280px',
    '3xl': '1440px',
    '4xl': '2048px',
    'h-2xs': { 'raw': '(max-height: 360px)' },
    'h-xs': { 'raw': '(max-height: 480px)' },
    'h-sm': { 'raw': '(max-height: 640px)' },
    'h-md': { 'raw': '(max-height: 760px)' },
    'h-lg': { 'raw': '(max-height: 900px)'}
  }
}