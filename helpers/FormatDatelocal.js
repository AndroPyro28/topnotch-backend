
function FormateDateLocal(date) {
    console.log('formatting', date);
    const newDate =  date.substring(0,date.indexOf("+")).replace("T", " ") + ".000000";
    return newDate
}

module.exports = FormateDateLocal