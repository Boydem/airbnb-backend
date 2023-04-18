function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

module.exports = {
    makeId,
    debounce,
}

// Utils
// function calcAvgRate(stayReviews: IReview[]): string {
//     if (!stayReviews.length) return '0'
//     let allRatesSum = getRatesSum(stayReviews)
//     return (allRatesSum / stayReviews.length).toFixed(2)
// }
// function getRatesSum(stayReviews: IReview[]) {
//     return stayReviews.reduce((acc, review) => {
//         const rates = Object.values(review.moreRate)
//         let ratesSum = 0
//         rates.forEach(r => (ratesSum += r))
//         acc += ratesSum / rates.length
//         return acc
//     }, 0)
// }
// function calcAvgRates(reviews: IReview[]): { [key: string]: number } {
//     const avgRates: { [key: string]: number } = {}
//     const numReviews = reviews.length

//     reviews.forEach(review => {
//         const moreRates = review.moreRate

//         Object.entries(moreRates).forEach(([key, value]) => {
//             avgRates[key] = avgRates[key] || 0
//             avgRates[key] += value / numReviews
//         })
//     })

//     Object.entries(avgRates).forEach(([key, value]) => {
//         avgRates[key] = parseFloat(value.toFixed(1))
//     })

//     return avgRates
// }
