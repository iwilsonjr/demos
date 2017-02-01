/********************************************************************************************************************
Page side hide/show scripts for booking page.
********************************************************************************************************************/

var isFiltered = true;
var pImdID = 0;
var pGalleryLinks;
var pGalleryImgs;

function goToNext() {
    pImdID = pImdID + 1;
    if (pImdID > pGalleryImgs.length - 1)
        pImdID = 0;
    showBigImg();
}
function goToPrevious() {
    pImdID = pImdID - 1;
    if (pImdID < 0)
        pImdID = pGalleryImgs.length - 1;
    showBigImg();
}

function showBigImg() {
    pGalleryImgs.hide();
    $(pGalleryImgs[pImdID]).fadeIn();
    $('#linkPanel img').removeClass('selected');
    $('#linkPanel img').stop().animate({ opacity: 0.7 }, 300);
    $(pGalleryLinks[pImdID]).addClass('selected');
    $(pGalleryLinks[pImdID]).stop().animate({ opacity: 1.0 }, 500);
}

//For Booking Offer
/*$(document).ready(function () {
    //if (document.getElementById("txPromoCode") != null &&
    //document.getElementById("txPromoCode") != undefined)
    {
        $("#txPromoCode").focusin(function (event) {
            document.getElementById("rdoPromoCode").checked = true;
        });
    }

    //if (document.getElementById("ddlLoyaltyCards") != null &&
    //document.getElementById("ddlLoyaltyCards") != undefined)
    {
        $("#ddlLoyaltyCards").focusin(function (event) {
            document.getElementById("rdoLoyaltyCard").checked = true;
        });
    }


    //if (document.getElementById("txtLoyaltyCardNo") != null &&
    //document.getElementById("txtLoyaltyCardNo") != undefined)
    {
        $("#txtLoyaltyCardNo").focusin(function (event) {
            document.getElementById("rdoLoyaltyCard").checked = true;
        });
    }
});*/

var EnableBookingOffer = function (offer) {
    if (offer == "P") {
        document.getElementById("rdoPromoCode").checked = true;
        document.getElementById("ddlLoyaltyCards").selectedIndex = 0;
        document.getElementById("txtLoyaltyCardNo").value = "";
    }
    else {
        document.getElementById("rdoLoyaltyCard").checked = true;
        document.getElementById("txtPromoCode").value = "";
    }
}

//for gallery slider event handlers
$(document).ready(function () {
    var allLinks = $('a.gLink');
    var allSlides = $('div#myGallery div.gItem');
    for (var i = 0; i < allLinks.length; i++) {
        $(allLinks[i]).attr('id', 'gLink' + i);y
        $(allSlides[i]).attr('id', 'gItem' + i);
    }

    allLinks.bind("click", function () {
        allSlides.hide();
        var slideID = parseInt($(this).attr('id').replace('gLink', ''));
        var allTextTop = 321;
        var currentTextTop = 272;

        $(allSlides[slideID]).children('div.text').css({ marginTop: allTextTop });
        $(allSlides[slideID]).fadeIn('normal', function () {
            $(this).children('div.text').stop().animate({ marginTop: currentTextTop }, 'fast');
        });
        allLinks.removeClass('selected');
        $(this).addClass('selected');
    });

    pGalleryLinks = $('#linkPanel img');
    pGalleryImgs = $('div.picslider img');

    pGalleryLinks.css({ opacity: 0.7 });
    $(pGalleryLinks[0]).css({ opacity: 1.0 });
    $(pGalleryImgs[0]).show();

    for (var i = 0; i < pGalleryLinks.length; i++) {
        $(pGalleryLinks[i]).attr('id', 'pgLink' + i);
        $(pGalleryImgs[i]).attr('id', 'pgImg' + i);
    }

    pGalleryLinks.bind("mouseenter", function () {
        $(this).stop().animate({ opacity: 1.0 }, 'normal');
    });
    pGalleryLinks.bind("mouseleave", function () {
        if ($(this).attr('class') != "selected")
            $(this).stop().animate({ opacity: 0.7 }, 'normal');
    });


    pGalleryLinks.bind("click", function () {
        pGalleryImgs.hide();
        var imgID = parseInt($(this).attr('id').replace('pgLink', ''));
        pImdID = imgID;
        $(pGalleryImgs[imgID]).fadeIn();
        $('#linkPanel img').removeClass('selected');
        $(this).addClass('selected');
    });
});

$(".fireflynoinsurance").live("click", function () {
    alert('Quick Facts Before You Decide to Travel without Insurance!\n\n#1 Did you know that Firefly Travel Protection is one of the most affordable and ' +
                            'easiest way to protect \n  your trip from unexpected events such as accidents and flight' +
                            'delay?\n\n#2 Did you know that even though most credit cards include insurance, the coverage' +
                            'they offer are usually\n  limited? Buy Firefly Travel Protection for more comprehensive' +
                            'coverage and to travel worry-free!');
    return true;

});

//Function to set the radio button name for Inssurance list
//On Loading ............................................................
//I am not sure what the fuck is happening... - Thiyaga
//jQuery(function () {
//    jQuery.ajax({
//        url: 'Booking.aspx',
//        success: function () {            
//            $("#divInsurance input:radio").attr("name", "rdoInsurance");
//        }
//    });
//});

/*
$(document).ready(function () {
    $('#divInsurance input:radio').attr('name', 'rdoInsurance'); 
}); */
/********************************************************************************************************************
Booking page change text/copy text scripts
********************************************************************************************************************/

$(document).ready(function () {
    $('#ucPassenger1_lstPassenger_TITLE_0_ddlTitle_0').live('change', function () {
        if ($('#ucPassenger1_lstPassenger_TITLE_0_ddlTitle_0') != null && $('#ucPassenger1_lstPassenger_TITLE_0_ddlTitle_0') != 'undefined') {
            if ($('#ucPersonalDetails1_ddlTitle') != null && $('#ucPersonalDetails1_ddlTitle') != "undefined") {
                $('#ucPersonalDetails1_ddlTitle').val($('#ucPassenger1_lstPassenger_TITLE_0_ddlTitle_0').val());
            }
        }
    });

    $('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtFName_0').live('change', function () {
        if ($('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtFName_0') != null && $('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtFName_0') != 'undefined') {
            if ($('#ucPersonalDetails1_txtFName') != null && $('#ucPersonalDetails1_txtFName') != "undefined") {
                $('#ucPersonalDetails1_txtFName').val($('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtFName_0').val());
            }
        }
    });

    $('#ucPassenger1_lstPassenger_LASTNAME_0_txtLName_0').live('change', function () {
        if ($('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtLName_0') != null && $('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtLName_0') != 'undefined') {
            if ($('#ucPersonalDetails1_txtLName') != null && $('#ucPersonalDetails1_txtLName') != "undefined") {
                $('#ucPersonalDetails1_txtLName').val($('#ucPassenger1_lstPassenger_LASTNAME_0_txtLName_0').val());
            }
        }
    });
    
    //    $('#ucPassenger1_lstPassenger_TITLE_0_ddlTitle_0').change(function () {
    //        if ($('#ucPassenger1_lstPassenger_TITLE_0_ddlTitle_0') != null && $('#ucPassenger1_lstPassenger_TITLE_0_ddlTitle_0') != 'undefined') {
    //            if ($('#ucPersonalDetails1_ddlTitle') != null && $('#ucPersonalDetails1_ddlTitle') != "undefined") {
    //                $('#ucPersonalDetails1_ddlTitle').val($('#ucPassenger1_lstPassenger_TITLE_0_ddlTitle_0').val());
    //            }
    //        }
    //    });


    //    $('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtFName_0').change(function () {
    //        if ($('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtFName_0') != null && $('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtFName_0') != 'undefined') {
    //            if ($('#ucPersonalDetails1_txtFName') != null && $('#ucPersonalDetails1_txtFName') != "undefined") {
    //                $('#ucPersonalDetails1_txtFName').val($('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtFName_0').val());
    //            }
    //        }
    //    });

    //    $('#ucPassenger1_lstPassenger_LASTNAME_0_txtLName_0').change(function () {
    //        if ($('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtLName_0') != null && $('#ucPassenger1_lstPassenger_FIRSTNAME_0_txtLName_0') != 'undefined') {
    //            if ($('#ucPersonalDetails1_txtLName') != null && $('#ucPersonalDetails1_txtLName') != "undefined") {
    //                $('#ucPersonalDetails1_txtLName').val($('#ucPassenger1_lstPassenger_LASTNAME_0_txtLName_0').val());
    //            }
    //        }
    //    });

    //    $('#chkCopy').click(function () {

    //        if ($('#chkCopy')[0].checked) {

    //            alert('1');
    //            if ($('#ucPersonalDetails1_ddlTitle') != null && $('#ucPersonalDetails1_ddlTitle') != "undefined") {
    //                if ($('#ucBillingDetails1_ddlTitle') != null && $('#ucBillingDetails1_ddlTitle') != "undefined") {
    //                    $('#ucBillingDetails1_ddlTitle').val($('#ucPersonalDetails1_ddlTitle').val());
    //                }
    //            }

    //            if ($('#ucPersonalDetails1_txtFName') != null && $('#ucPersonalDetails1_txtFName') != "undefined") {
    //                if ($('#ucBillingDetails1_txtFName') != null && $('#ucBillingDetails1_txtFName') != "undefined") {
    //                    $('#ucBillingDetails1_txtFName').val($('#ucPersonalDetails1_txtFName').val());
    //                }
    //            }

    //            if ($('#ucPersonalDetails1_txtLName') != null && $('#ucPersonalDetails1_txtLName') != "undefined") {
    //                if ($('#ucBillingDetails1_txtLName') != null && $('#ucBillingDetails1_txtLName') != "undefined") {
    //                    $('#ucBillingDetails1_txtLName').val($('#ucPersonalDetails1_txtLName').val());
    //                }
    //            }

    //            if ($('#ucPersonalDetails1_txtAdd1') != null && $('#ucPersonalDetails1_txtAdd1') != "undefined") {
    //                if ($('#ucBillingDetails1_txtAdd1') != null && $('#ucBillingDetails1_txtAdd1') != "undefined") {
    //                    $('#ucBillingDetails1_txtAdd1').val($('#ucPersonalDetails1_txtAdd1').val());
    //                }
    //            }

    //            if ($('#ucPersonalDetails1_txtAdd2') != null && $('#ucPersonalDetails1_txtAdd2') != "undefined") {
    //                if ($('#ucBillingDetails1_txtAdd2') != null && $('#ucBillingDetails1_txtAdd2') != "undefined") {
    //                    $('#ucBillingDetails1_txtAdd2').val($('#ucPersonalDetails1_txtAdd2').val());
    //                }
    //            }

    //            if ($('#ucPersonalDetails1_txtCity') != null && $('#ucPersonalDetails1_txtCity') != "undefined") {
    //                if ($('#ucBillingDetails1_txtCity') != null && $('#ucBillingDetails1_txtCity') != "undefined") {
    //                    $('#ucBillingDetails1_txtCity').val($('#ucPersonalDetails1_txtCity').val());
    //                }
    //            }

    //            if ($('#ucPersonalDetails1_txtState') != null && $('#ucPersonalDetails1_txtState') != "undefined") {
    //                if ($('#ucBillingDetails1_txtState') != null && $('#ucBillingDetails1_txtState') != "undefined") {
    //                    $('#ucBillingDetails1_txtState').val($('#ucPersonalDetails1_txtState').val());
    //                }
    //            }


    //            if ($('#ucPersonalDetails1_txtPostCode') != null && $('#ucPersonalDetails1_txtPostCode') != "undefined") {
    //                if ($('#ucBillingDetails1_txtPostCode') != null && $('#ucBillingDetails1_txtPostCode') != "undefined") {
    //                    $('#ucBillingDetails1_txtPostCode').val($('#ucPersonalDetails1_txtPostCode').val());
    //                }
    //            }

    //            if ($('#ucPersonalDetails1_txtContactNo') != null && $('#ucPersonalDetails1_txtContactNo') != "undefined") {
    //                if ($('#ucBillingDetails1_txtContactNo') != null && $('#ucBillingDetails1_txtContactNo') != "undefined") {
    //                    $('#ucBillingDetails1_txtContactNo').val($('#ucPersonalDetails1_txtContactNo').val());
    //                }
    //            }

    //            if ($('#ucPersonalDetails1_ddlCountry') != null && $('#ucPersonalDetails1_ddlCountry') != "undefined") {
    //                if ($('#ucBillingDetails1_ddlCountry') != null && $('#ucBillingDetails1_ddlCountry') != "undefined") {
    //                    $('#ucBillingDetails1_ddlCountry').val($('#ucPersonalDetails1_ddlCountry').val());
    //                }
    //            }

    //        }
    //        else {
    //            alert('2');
    //            if ($('#ucBillingDetails1_ddlTitle') != null && $('#ucBillingDetails1_ddlTitle') != "undefined") {
    //                $('#ucBillingDetails1_ddlTitle').val('');
    //            }
    //            if ($('#ucBillingDetails1_txtFName') != null && $('#ucBillingDetails1_txtFName') != "undefined") {
    //                $('#ucBillingDetails1_txtFName').val('');
    //            }
    //            if ($('#ucBillingDetails1_txtLName') != null && $('#ucBillingDetails1_txtLName') != "undefined") {
    //                $('#ucBillingDetails1_txtLName').val('');
    //            }

    //            if ($('#ucBillingDetails1_txtAdd1') != null && $('#ucBillingDetails1_txtAdd1') != "undefined") {
    //                $('#ucBillingDetails1_txtAdd1').val('');
    //            }

    //            if ($('#ucBillingDetails1_txtAdd2') != null && $('#ucBillingDetails1_txtAdd2') != "undefined") {
    //                $('#ucBillingDetails1_txtAdd2').val('');
    //            }

    //            if ($('#ucBillingDetails1_txtCity') != null && $('#ucBillingDetails1_txtCity') != "undefined") {
    //                $('#ucBillingDetails1_txtCity').val('');
    //            }
    //            if ($('#ucBillingDetails1_txtState') != null && $('#ucBillingDetails1_txtState') != "undefined") {
    //                $('#ucBillingDetails1_txtState').val('');
    //            }
    //            if ($('#ucBillingDetails1_txtPostCode') != null && $('#ucBillingDetails1_txtPostCode') != "undefined") {
    //                $('#ucBillingDetails1_txtPostCode').val('');
    //            }
    //            if ($('#ucBillingDetails1_ddlCountry') != null && $('#ucBillingDetails1_ddlCountry') != "undefined") {
    //                $('#ucBillingDetails1_ddlCountry').val('--Select--');
    //            }
    //            if ($('#ucBillingDetails1_txtContactNo') != null && $('#ucBillingDetails1_txtContactNo') != "undefined") {
    //                $('#ucBillingDetails1_txtContactNo').val('');
    //            }
    //        }
    //    });
});

//hide or show the Image in Bookin.aspx

function ShowHideImg(RbtnLst) {
    var value;
    if (RbtnLst.cells[0].firstChild.checked) {
        value = RbtnLst.cells[0].firstChild.value;
    }
    else {
        value = RbtnLst.cells[1].firstChild.value;
    }
    if (value == 13) {
        document.getElementById('divImg').style.visibility = 'visible';
    }
    else {
        document.getElementById('divImg').style.visibility = 'hidden';
    }
}

function CheckEve(chkbox) {
    var IsCheck = chkbox.checked;
            if (IsCheck) {

              
                if ($('#ucPersonalDetails1_ddlTitle') != null && $('#ucPersonalDetails1_ddlTitle') != "undefined") {
                    if ($('#ucBillingDetails1_ddlTitle') != null && $('#ucBillingDetails1_ddlTitle') != "undefined") {
                        $('#ucBillingDetails1_ddlTitle').val($('#ucPersonalDetails1_ddlTitle').val());
                    }
                }

                if ($('#ucPersonalDetails1_txtFName') != null && $('#ucPersonalDetails1_txtFName') != "undefined") {
                    if ($('#ucBillingDetails1_txtFName') != null && $('#ucBillingDetails1_txtFName') != "undefined") {
                        $('#ucBillingDetails1_txtFName').val($('#ucPersonalDetails1_txtFName').val());
                    }
                }

                if ($('#ucPersonalDetails1_txtLName') != null && $('#ucPersonalDetails1_txtLName') != "undefined") {
                    if ($('#ucBillingDetails1_txtLName') != null && $('#ucBillingDetails1_txtLName') != "undefined") {
                        $('#ucBillingDetails1_txtLName').val($('#ucPersonalDetails1_txtLName').val());
                    }
                }

                if ($('#ucPersonalDetails1_txtAdd1') != null && $('#ucPersonalDetails1_txtAdd1') != "undefined") {
                    if ($('#ucBillingDetails1_txtAdd1') != null && $('#ucBillingDetails1_txtAdd1') != "undefined") {
                        $('#ucBillingDetails1_txtAdd1').val($('#ucPersonalDetails1_txtAdd1').val());
                    }
                }

                if ($('#ucPersonalDetails1_txtAdd2') != null && $('#ucPersonalDetails1_txtAdd2') != "undefined") {
                    if ($('#ucBillingDetails1_txtAdd2') != null && $('#ucBillingDetails1_txtAdd2') != "undefined") {
                        $('#ucBillingDetails1_txtAdd2').val($('#ucPersonalDetails1_txtAdd2').val());
                    }
                }

                if ($('#ucPersonalDetails1_txtCity') != null && $('#ucPersonalDetails1_txtCity') != "undefined") {
                    if ($('#ucBillingDetails1_txtCity') != null && $('#ucBillingDetails1_txtCity') != "undefined") {
                        $('#ucBillingDetails1_txtCity').val($('#ucPersonalDetails1_txtCity').val());
                    }
                }

                if ($('#ucPersonalDetails1_txtState') != null && $('#ucPersonalDetails1_txtState') != "undefined") {
                    if ($('#ucBillingDetails1_txtState') != null && $('#ucBillingDetails1_txtState') != "undefined") {
                        $('#ucBillingDetails1_txtState').val($('#ucPersonalDetails1_txtState').val());
                    }
                }


                if ($('#ucPersonalDetails1_txtPostCode') != null && $('#ucPersonalDetails1_txtPostCode') != "undefined") {
                    if ($('#ucBillingDetails1_txtPostCode') != null && $('#ucBillingDetails1_txtPostCode') != "undefined") {
                        $('#ucBillingDetails1_txtPostCode').val($('#ucPersonalDetails1_txtPostCode').val());
                    }
                }

                if ($('#ucPersonalDetails1_txtContactNo') != null && $('#ucPersonalDetails1_txtContactNo') != "undefined") {
                    if ($('#ucBillingDetails1_txtContactNo') != null && $('#ucBillingDetails1_txtContactNo') != "undefined") {
                        $('#ucBillingDetails1_txtContactNo').val($('#ucPersonalDetails1_txtContactNo').val());
                    }
                }

                if ($('#ucPersonalDetails1_ddlCountry') != null && $('#ucPersonalDetails1_ddlCountry') != "undefined") {
                    if ($('#ucBillingDetails1_ddlCountry') != null && $('#ucBillingDetails1_ddlCountry') != "undefined") {
                        $('#ucBillingDetails1_ddlCountry').val($('#ucPersonalDetails1_ddlCountry').val());
                    }
                }

            }
            else {
               
                if ($('#ucBillingDetails1_ddlTitle') != null && $('#ucBillingDetails1_ddlTitle') != "undefined") {
                    $('#ucBillingDetails1_ddlTitle').val('');
                }
                if ($('#ucBillingDetails1_txtFName') != null && $('#ucBillingDetails1_txtFName') != "undefined") {
                    $('#ucBillingDetails1_txtFName').val('');
                }
                if ($('#ucBillingDetails1_txtLName') != null && $('#ucBillingDetails1_txtLName') != "undefined") {
                    $('#ucBillingDetails1_txtLName').val('');
                }

                if ($('#ucBillingDetails1_txtAdd1') != null && $('#ucBillingDetails1_txtAdd1') != "undefined") {
                    $('#ucBillingDetails1_txtAdd1').val('');
                }

                if ($('#ucBillingDetails1_txtAdd2') != null && $('#ucBillingDetails1_txtAdd2') != "undefined") {
                    $('#ucBillingDetails1_txtAdd2').val('');
                }

                if ($('#ucBillingDetails1_txtCity') != null && $('#ucBillingDetails1_txtCity') != "undefined") {
                    $('#ucBillingDetails1_txtCity').val('');
                }
                if ($('#ucBillingDetails1_txtState') != null && $('#ucBillingDetails1_txtState') != "undefined") {
                    $('#ucBillingDetails1_txtState').val('');
                }
                if ($('#ucBillingDetails1_txtPostCode') != null && $('#ucBillingDetails1_txtPostCode') != "undefined") {
                    $('#ucBillingDetails1_txtPostCode').val('');
                }
                if ($('#ucBillingDetails1_ddlCountry') != null && $('#ucBillingDetails1_ddlCountry') != "undefined") {
                    $('#ucBillingDetails1_ddlCountry').val('--Select--');
                }
                if ($('#ucBillingDetails1_txtContactNo') != null && $('#ucBillingDetails1_txtContactNo') != "undefined") {
                    $('#ucBillingDetails1_txtContactNo').val('');
                }
            }
        }
