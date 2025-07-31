function persianToEnglishNumber(persianNumber) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';

    return persianNumber.replace(/[۰-۹]/g, (char) => {
        return englishDigits[persianDigits.indexOf(char)];
    });
}

module.exports = persianToEnglishNumber;