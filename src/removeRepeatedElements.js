function  removeRepeatedElements(arr) {
    return arr.filter(function(key, index) {
        return arr.indexOf(key) === index;
    });
}
