module.exports = {
    "env": {
        "browser": true
    },
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "arrow-parens": [2, "always"],
        "comma-dangle": [2, "never"],
        "import/prefer-default-export": 0,
        "indent": [2, 4],
        "jsx-quotes": [2, "prefer-single"],
        "linebreak-style": 0,
        "no-param-reassign": [2, { "props": false }],
        "no-plusplus": [2, { "allowForLoopAfterthoughts": true }],
        "quotes": [2, "single"],
        "react/jsx-closing-bracket-location": [2, "after-props"],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4]
    }
};