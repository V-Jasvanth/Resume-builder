function addStr(str, index, stringToAdd) {
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}

function appender(z, value) {
    return z.substring(0, z.length - 1) + value + z.substring(z.length - 1);
}

window.onload = function () {
    var t1Elems = document.getElementsByClassName('t1');
    if (t1Elems && t1Elems.length > 0) {
        var oneElems = t1Elems[0].getElementsByClassName("one");
        if (oneElems && oneElems.length > 0) {
            oneElems[0].click();
        }
    }
};

$(document).ready(function () {
    $('.t1 .one').css("border", "3px solid white");
    $('.t1 .pelement').click(function () {
        $('.t1 .pelement').css("border", "3px solid transparent");
        $(this).css("border", "3px solid white");
        $('.t1 .left_side').css("background-color", $(this).css("background-color"));
        $('.t1 .right_side .about .text h4').css("color", appender(addStr($(this).css("background-color"), 3, "a"), ", 0.82"));
        $('.t1 .right_side .percent div').css("background-color", appender(addStr($(this).css("background-color"), 3, "a"), ", 0.65"));
    })
})