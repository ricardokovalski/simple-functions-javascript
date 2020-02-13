function inArray(needle, haystack) {
    let length = haystack.length;
    for (let index = 0; index < length; index++) {
        if (haystack[index] === needle) {
            return true;
        }
    }
    return false;
}
