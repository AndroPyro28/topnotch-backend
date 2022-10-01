
function FormateDateLocal(date) {
    console.log('formatting', date);
    const newDate =  date.substring(0,date.indexOf("+")).replace("T", " ");
    return newDate
}

module.exports = FormateDateLocal