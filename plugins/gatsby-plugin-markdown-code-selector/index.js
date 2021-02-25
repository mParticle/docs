// https://www.gatsbyjs.org/docs/plugins/
// https://www.gatsbyjs.org/docs/plugin-authoring/?no-cache=1
// called from C:\gatsby2\hello-world\node_modules\gatsby-transformer-remark\extend-node-type.js - Line 247

/*module.exports = ({
    markdownAST
  }, {
    classPrefix = `language-`,
    inlineCodeMarker = null,
    aliases = {},
    noInlineHighlight = false
  } = {}) => {

    console.log('TODO: Implement custom markdown parsing');
    debugger;
  };*/

/*module.exports = (args1, args2, args3) => {
    console.log(args1);
    console.log(args2);
    console.log(args3);
};*/

const codeBlockLabels = {
    "objectivec": "Objective-C",
    "java": "Java",
    "ruby": "Cocoapods",
    "groovy": "Gradle",
    "javascript": "Javascript",
    "typescript": "Typescript",
    "cs": "Unity",
    "swift": "Swift",
    "kotlin": "Kotlin",
    "json":"JSON",
    "nodesdk":"Node SDK",
    "curl":"Curl"
};

/**
 * We have:
 * - SDKs
 * - Languages
 * - Labels
 * 
 * Different SDKs use the same language, so it can't be 1:1 as above
 * so this object is used to overwrite the languages above
 */
const codeBlockToSyntaxHighlighter = {
    "nodesdk":"javascript",
    "curl":"bash"
};

const selectorMarker = ':::code-selector-block'
const openingBlockHTML = '<div class="code-selector-block">';
const closingBlockHTML = '</div>';
const singleLanguageBlockHTML = '<div class="code-selector-block no-selector">';

function getCodeToggle(originalLanguage, id, first) {
    var tabLabel = codeBlockLabels[originalLanguage] || language;
    var language = codeBlockToSyntaxHighlighter[originalLanguage] || originalLanguage;
    var toggleId = `code-toggle-${language}-${id}`;
    var content = `<input class="code-toggle-${language}" id="${toggleId}" type="radio"`;
    content += ` name="code-toggle-${id}"`;
    if (first) {
      content += 'checked="checked"';
    }
    content += ' />';
    content += `<label for="${toggleId}">${tabLabel}</label>`;
  
    return content;
  }

let transformHTML = function(data, pluginOptions) {
    var y = true;
    const children = data && data.markdownAST && data.markdownAST.children;
    if (children) {
        let inCodeSelectorBlock = false;
        let currId = 0;
        let i = 0;
        while (i < children.length) {
            let c = children[i];
            if (c.type === 'paragraph' && c.children && c.children[0].value && c.children[0].value.indexOf(selectorMarker) >= 0) {
                let codeBlockLanguages = [];
                let endChild = null;
                currId = i;

                // Check subsequent blocks to verify that they are type 'code' and save their languages
                while (++i < children.length) {
                    let originalLang = children[i].lang;
                    if (children[i].type === 'code' && originalLang) {
                        codeBlockLanguages.push(originalLang);
                        children[i].lang = codeBlockToSyntaxHighlighter[originalLang] || originalLang;
                    } else if (children[i].type === 'paragraph' && children[i].children) {
                        let childContent = children[i].children[0].value;
                        childContent = childContent && childContent.trim();
                        if (childContent === ':::') {
                            endChild = children[i];
                            break;
                        } else {
                            codeBlockLanguages = null;
                            break;
                        }
                    } else {
                        codeBlockLanguages = null;
                        break;
                    }

                }
                // Invalid formatting for code selector
                if (!codeBlockLanguages) {
                    console.log('\nWARNING: Code selector block was not formatted correctly. Missing closing ":::" after this code block:\n');
                    console.log(children[i-1].value);
                    i++;
                    continue;
                }

                let selectorContent = '';
                if (codeBlockLanguages.length > 1) {
                    selectorContent = codeBlockLanguages.reduce((acc, v, index) => {
                        return acc + getCodeToggle(v, currId, index === 0);
                    }, '');
                } else {
                    selectorContent = singleLanguageBlockHTML; 
                }

                c.type = 'html';
                c.value = openingBlockHTML + selectorContent;

                if (endChild) {
                    endChild.type = 'html';
                    endChild.value = closingBlockHTML;
                }
            }
            i++;
        }
    }
}

/*transformHTML.mutateSource = function(data, pluginOptions) {
    //console.log(data);
    var x = true;
}*/

module.exports = transformHTML;