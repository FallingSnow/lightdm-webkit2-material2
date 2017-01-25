export function addError(msg, url, lineNo, columnNo, error) {
    return {
        type: 'ADD_ERROR',
        payload: {msg, url, lineNo, columnNo, error}
    };
}
