function  removeElementArray(needle, haystack) {
    let index = haystack.indexOf(needle);
    while (index > -1) {
        haystack.splice(index, 1);
        index = haystack.indexOf(needle);
    }
}
