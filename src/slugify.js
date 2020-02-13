function slugify(str) {
    str = str.toLowerCase();

    let from = "áàâãäéèêẽëíìîĩïóòôõöúùûũüñç";
    let to   = "aaaaaeeeeeiiiiiooooouuuuunc";

    for (let index = 0, length = from.length; index < length; index++) {
        str = str.replace(new RegExp(from.charAt(index), 'g'), to.charAt(index));
    }

    return str.replace(/[^a-z0-9\s]/g, '')
        .replace(/\s/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}
