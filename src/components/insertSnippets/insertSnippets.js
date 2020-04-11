
function insertSnippets(mainContent, snippets) {
    return mainContent.replace(/\${([^{}]*)}/g, (a, b) => {
        const r = snippets[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
    });
}

export default insertSnippets;
