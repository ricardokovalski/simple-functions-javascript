function displayInstallments (totalValue, maxInstallments = 12, interest = 0, compoundInterest = true, financingInterest = false) {
    let installments = calculateInstallments(totalValue, maxInstallments, interest, compoundInterest, financingInterest);

    installments.forEach(function(value, installment) {
        let total = number_format(value / installment,2,'.',',')
        installments[installment] = total
        if (total < 5.00) {
            delete(installments[installment])
        }
    })

    return installments
}

function calculateInstallments(totalValue, maxInstallments = 12, interest = 0, compoundInterest = true, financingInterest = false) {
    //Parcelas informadas invalidas
    if (maxInstallments < 1 || maxInstallments > 12 || maxInstallments === null) {
        maxInstallments = 12
    }

    let installments = []

    interest = interest > 0 ? interest / 100 : 0

    // Juros de financiamento
    if (interest > 0 && financingInterest) {
        range(1,maxInstallments).forEach(function(installment) {
            let installmentValue = 0
            if (installment == 1) {
                installmentValue = totalValue
            } else {
                installmentValue = (totalValue * interest / (1 - pow(1 + interest, - installment)) * installment)
            }
            installments[installment] = number_format(installmentValue, 2, ".", "");
        })
        return installments
    }

    // Juros Composto
    if (interest > 0 && compoundInterest) {
        range(1,maxInstallments).forEach(function (installment) {
            let installmentValue = totalValue * pow((1 + interest), installment - 1);
            installments[installment] = number_format(installmentValue, 2, ".", "");
        })
        return installments
    }

    // Juros simples ou sem juros
    range(1,maxInstallments).forEach(function (installment) {
        let installmentValue = (totalValue) + (installment > 1 ? (totalValue * interest) : 0);
        installments[installment] = number_format(installmentValue, 2, ".", "");
    })

    return installments
}

function pow(base, exp) {
    return Math.pow(base, exp)
}

function number_format (number, decimals, decPoint, thousandsSep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    var s = ''

    var toFixedFix = function (n, prec) {
        if (('' + n).indexOf('e') === -1) {
            return +(Math.round(n + 'e+' + prec) + 'e-' + prec)
        } else {
            var arr = ('' + n).split('e')
            var sig = ''
            if (+arr[1] + prec > 0) {
                sig = '+'
            }
            return (+(Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) + 'e-' + prec)).toFixed(prec)
        }
    }

    s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.')
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }

    return s.join(dec)
}

function range(low, high, step) {
    var matrix = []
    var iVal
    var endval
    var plus
    var walker = step || 1
    var chars = false

    if (!isNaN(low) && !isNaN(high)) {
        iVal = low
        endval = high
    } else if (isNaN(low) && isNaN(high)) {
        chars = true
        iVal = low.charCodeAt(0)
        endval = high.charCodeAt(0)
    } else {
        iVal = (isNaN(low) ? 0 : low)
        endval = (isNaN(high) ? 0 : high)
    }

    plus = !(iVal > endval)
    if (plus) {
        while (iVal <= endval) {
            matrix.push(((chars) ? String.fromCharCode(iVal) : iVal))
            iVal += walker
        }
    } else {
        while (iVal >= endval) {
            matrix.push(((chars) ? String.fromCharCode(iVal) : iVal))
            iVal -= walker
        }
    }

    return matrix
}
