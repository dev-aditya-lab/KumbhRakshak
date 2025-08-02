const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Optimize for smaller bundle size
config.transformer.minifierConfig = {
  ecma: 8,
  keep_fnames: false,
  mangle: {
    keep_fnames: false,
  },
  compress: {
    drop_console: true,
  },
};

config.resolver.platforms = ['native', 'android', 'ios'];

module.exports = withNativeWind(config, {
  input: './global.css',
  configPath: './tailwind.config.js',
});
