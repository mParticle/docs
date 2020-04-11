/* eslint eqeqeq: "off" */

export function getPlatformCookie() {
    try {
        return document.cookie.replace(/(?:(?:^|.*;\s*)docsplatform\s*=\s*([^;]*).*$)|^.*$/, '$1');
    } catch (e) {
        return '';
    }
}

export function setPlatformCookie(platform) {
    try {
        document.cookie = `docsplatform=${platform}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        return true;
    } catch (e) {
        return false;
    }
}

const globalEventCallbacks = {};
export function addGlobalEventListener(event, callback) {
    if (!globalEventCallbacks[event]) {
        globalEventCallbacks[event] = [];

        if (typeof document != 'undefined') {
            document[event] = (e) => globalEventCallbacks[event].forEach((c) => c(e));
        }
    }
    globalEventCallbacks[event].push(callback);
}

export function removeGlobalEventListener(event, callback) {
    globalEventCallbacks[event] = (globalEventCallbacks[event] || []).filter((c) => c !== callback);
    if (globalEventCallbacks[event].length === 0) {
        globalEventCallbacks[event] = null;
        document[event] = null;
    }
}

export function alphabeticSort(key) {
    return function propertySort(a, b) {
        if (!a || !a[key]) {
            return 1;
        } else if (!b || !b[key]) {
            return -1;
        }
        const nameA = a[key].toUpperCase();
        const nameB = b[key].toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    };
}

export function copyTextToClipboard(txt) {
    // Create faux-textArea element
    const createFauxTextAreaElement = (text) => {
        const tempTextAreaElement = document.createElement('textarea');

        // Ensure that the element is able to be selected/focused (precautionary)
        tempTextAreaElement.display = 'none';
        tempTextAreaElement.style.background = 'transparent';
        tempTextAreaElement.style.border = 'none';
        tempTextAreaElement.style.boxShadow = 'none';
        tempTextAreaElement.style.height = '2em';
        tempTextAreaElement.style.left = 0;
        tempTextAreaElement.style.outline = 'none';
        tempTextAreaElement.style.padding = 0;
        tempTextAreaElement.style.position = 'fixed';
        tempTextAreaElement.style.top = 0;
        tempTextAreaElement.style.width = '2em';

        tempTextAreaElement.innerText = text;

        return tempTextAreaElement;
    };

    if (document.queryCommandSupported('copy') && txt) {
        const tempTextAreaElement = createFauxTextAreaElement(txt);

        document.body.appendChild(tempTextAreaElement);

        tempTextAreaElement.select();

        document.execCommand('SelectAll');
        document.execCommand('Copy');

        // Cleanup
        document.body.removeChild(tempTextAreaElement);
    }
}
