function formatNumber(value) {
    let newValue = value.toFixed(2).replace('.', ',')
    return 'R$ ' + newValue
}
