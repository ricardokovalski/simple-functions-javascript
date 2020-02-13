function  removeAccents(char) {
    let from = "áàâãäéèêẽëíìîĩïóòôõöúùûũüñç";
    let to   = "aaaaaeeeeeiiiiiooooouuuuunc";
    for (let index = 0, length = from.length; index < length; index++) {
        char = char.replace(new RegExp(from.charAt(index), 'g'), to.charAt(index));
    }
    return char;
}
