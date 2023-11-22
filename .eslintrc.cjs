module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/base',
    'eslint:recommended',
    "plugin:vue/vue3-recommended",
    "prettier"
  ],
  rules: {
    //"vue/attribute-hyphenation": "off",
    //"vue/script-setup-uses-vars": "error"
  }
}
