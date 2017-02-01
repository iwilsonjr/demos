//This javascript is used to display the session timeout countdown 
//By default Session Timeout is 20 mins , so the value given here is 20 
//var timeout = 20 * 60 * 1000;
//var timer = setInterval(function () {
//    timeout -= 1000; document.getElementById('countDown').innerHTML = time(timeout); if (timeout == 0) {
//        clearInterval(timer);
//        CallPostBack();
//    }
//}, 1000);
//function two(x) { return ((x > 9) ? "" : "0") + x }
//function time(ms) {
//    var t = '';
//    var sec = Math.floor(ms / 1000);
//    ms = ms % 1000
//    var min = Math.floor(sec / 60);
//    sec = sec % 60;
//    t = two(sec);
//    min = min % 60;
//    t = two(min) + ":" + t;
//    return t;
//}
//function CallPostBack() {
//    window.location = "StartOver.aspx";
//}

function onlyShow(divId) {
    document.getElementById(divId).style.display = "";
  
}
function onlyHide(divId) {
    document.getElementById(divId).style.display = "none";
}

function showlayer(layer) {
    var myLayer = document.getElementById(layer).style.display;
    var btnsearch = document.getElementById('btnSearch');
    $('.botnav-1').slideUp();
    if (myLayer == "none") {
        $('#' + layer).slideDown();
        if (layer == 'modify' || layer == 'sort')
        {
            btnsearch.style.display = 'block';
        }
    } else {
        $('#' + layer).slideUp();
        if (layer == 'modify' ){//|| layer == 'sort') {            
            btnsearch.style.display = 'none';
        }
    }
}

function showlayerforsort(layer) {
   
    var myLayer = document.getElementById(layer).style.display;
    var btnsearch = document.getElementById('btnSearchBySort');
    $('.botnav-1').slideUp();
    if (myLayer == "none") {
        $('#' + layer).slideDown();
        if (layer == 'modify' || layer == 'sort') {
            if (btnsearch != null) {
                btnsearch.style.display = 'block';
            }
        }
    } else {
        $('#' + layer).slideUp();
        if (layer == 'modify' || layer == 'sort') {
            if (btnsearch != null) {
                btnsearch.style.display = 'none';
            }
        }
    }
}

function showlayer1(layer) {
    var myLayer = document.getElementById(layer).style.display;
    $('.drp').slideUp();
    if (myLayer == "none") {
        $('#' + layer).slideDown();
    } else {
        $('#' + layer).slideUp();
    }
}


function showHoliday(obj) {
    if (obj.rel == 'showed') {
        $(obj).html('(click here to show)');
        $('#cont').slideUp('slow', function () {
            $('#login').fadeOut('normal', function () {
                $('#column_2').stop().animate({ width: 740 }, 500);
            });
        });
        obj.rel = 'hide'
    }
    else {
        $(obj).html('(click here to hide)');
        $('#column_2').stop().animate({ width: 740 }, 500, function () {
            $('#login').fadeIn('normal', function () {
                $('#cont').slideDown('slow');
            });
        });
        obj.rel = 'showed'
    }
}

//Sorting and Filtering------------------------------------------------------------

//This method is to sort json object by key
var sortJsonObject = function (jsonObject, field, dataType) {

    try {
        if (field == "" || field == null) return;
        if (jsonObject.length > 0) {
            isSort = (isSort) ? false : true;
            jsonObject.sort(sort_by(field, isSort, dataType));
            return jsonObject;
        }
        else {
            alert("No Record Found!");
        }
    }
    catch (e) {
        //alert("sortJsonObject :" + e);
    }
}

//Sort by any field
var sort_by = function (field, reverse, dataType) {

    try {
        reverse = (reverse) ? -1 : 1;

        return function (a, b) {

            a = a[field];
            b = b[field];

            if (typeof (primer) != 'undefined') {
                a = dataType(a);
                b = dataType(b);
            }

            if (a < b) return reverse * -1;
            if (a > b) return reverse * 1;
            return 0;
        }
    }
    catch (e) {
        //alert("sort_by :" + e);
    }
}

var sort_by_price = function (jsonObject, reverse, dataType) {
    try {
        reverse = (reverse) ? -1 : 1;

        return function (a, b) {

            a = a.priceInfo.TotalPrice;
            b = b.priceInfo.TotalPrice;

            if (typeof (primer) != 'undefined') {
                a = dataType(a);
                b = dataType(b);
            }

            if (a < b) return reverse * -1;
            if (a > b) return reverse * 1;
            return 0;
        }
    }
    catch (e) {
       // alert("sort_by :" + e);
    }
}

// functions used for client-side filtering by the Apply method
function eq(d1, d2) { return d1 == d2; }
function ne(d1, d2) { return d1 != d2; }
function lt(d1, d2) { return d1 < d2; }
function le(d1, d2) { return d1 <= d2; }
function gt(d1, d2) { return d1 > d2; }
function ge(d1, d2) { return d1 >= d2; }
function bw(d1, d2) { return d1.match("^" + d2); }
function nb(d1, d2) { return !d1.match("^" + d2); }
function ew(d1, d2) { return d1.match(d2 + "$"); }
function nw(d1, d2) { return !d1.match(d2 + "$"); }
function cn(d1, d2) { return d2.indexOf(d1) != -1; }
function nc(d1, d2) { return d2.indexOf(d1) == -1; }
function nu(d1, d2) { return d1 == null; }
function nn(d1, d2) { return d1 != null; }

var convertToUTC = function (stringDate) {
    var newDate = new Date(parseInt(stringDate.replace("/Date(", "").replace(")/", ""), 10));
    return newDate.toUTCString();
}

var filterJaonObject = function (jsonObject, expression) {
    try {

        if (jsonObject == null || jsonObject == "undefined") return [];
        if (expression == null || expression == "") return jsonObject;

        var newJsonItems = [];
        for (var index = 0; index < jsonObject.length; index++) {

            var item = jsonObject[index];
            if (eval(expression) == true) {
                newJsonItems.push(item);
            }
        }
        return newJsonItems;
    }
    catch (e) {
      //  alert("filterText :" + e);
    }
}

//-----------------------------------------------------------

function deq(d1, d2) {
    var dtStart = new Date("1/1/2007 " + d1);
    var dtEnd = new Date("1/1/2007 " + d2);
    return dtStart == dtEnd;
}
function dge(d1, d2) {
    var dtStart = new Date("1/1/2007 " + d1);
    var dtEnd = new Date("1/1/2007 " + d2);
    return dtStart <= dtEnd;
}
function dle(d1, d2) {
    var dtStart = new Date("1/1/2007 " + d1);
    var dtEnd = new Date("1/1/2007 " + d2);
    return dtStart >= dtEnd;
}

function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh - 12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

    var repalcement = h + ":" + m;
    /* if you want to add seconds
    repalcement += ":"+s;  */
    repalcement += " " + dd;


    return date.replace(pattern, repalcement);
}

function getHour(date) {
    var d = new Date(convertToUTC(date));
    return d.getUTCHours();
}

function getMinute(date) {
    var d = new Date(convertToUTC(date));
    return d.getUTCMinutes();
}

Date.fromJsnMsec = function (jsn) {
    jsn = jsn.match(/\d+/);
    return new Date(+jsn)
}

Date.prototype.toJsnMsec = function () {
    return '/Date(' + this.getTime() + ')/';
}

$().ready(function () {
    // alert('ready');
    $(".sel_prod").click(function () {

        var sel_id = $(this).attr("id");
        
        if (sel_id == "flightproduct") {

            $("#flight_selection").slideToggle();

        }
        else if (sel_id == "hotelproduct") {
            $(".hotel_selection").slideToggle();
        }
        else if (sel_id == "tourproduct") {
            $(".tour_selection").slideToggle();

        }
        else if (sel_id == "transferproduct") {
            $(".transfer_selection").slideToggle();

        }
    });
});