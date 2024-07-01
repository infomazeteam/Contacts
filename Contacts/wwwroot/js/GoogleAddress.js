let autocomplete;
let address1Field;
let address2Field;
let postalField;
let countryField;

function initAutocomplete(libraries, v) {
    address1Field = document.querySelector(".google-map-address");
    address2Field = document.querySelector(".google-map-address2");
    cityField = document.querySelector(".google-map-city");
    countyField = document.querySelector(".google-map-county");
    stateField = document.querySelector(".google-map-state");
    postalField = document.querySelector(".google-map-zip");
    countryField = document.querySelector(".google-map-country");

    // Clear the existing data

    
    // Create the autocomplete object, restricting the search predictions to
    // addresses in the US and Canada.
    if (address1Field != null) {
        autocomplete = new google.maps.places.Autocomplete(address1Field, {
            //componentRestrictions: { country: ["us", "ca", "ind"] },
            fields: ["address_components", "geometry"],
            types: ["address"],
        });

        //address1Field.focus();
        // When the user selects an address from the drop-down, populate the
        // address fields in the form.
        autocomplete.addListener("place_changed", fillInAddress);
    }

    /* For Mailing Address */

    mailaddress1Field = document.querySelector(".google-map-mailaddress");
    mailaddress2Field = document.querySelector(".google-map-mailaddress2");
    mailcityField = document.querySelector(".google-map-mailcity");
    mailcountyField = document.querySelector(".google-map-mailcounty");
    mailstateField = document.querySelector(".google-map-mailstate");
    mailpostalField = document.querySelector(".google-map-mailzip");
    mailcountryField = document.querySelector(".google-map-mailcountry");

    if (mailaddress1Field != null) {
        addressautocomplete = new google.maps.places.Autocomplete(mailaddress1Field, {
            //componentRestrictions: { country: ["us", "ca", "ind"] },
            fields: ["address_components", "geometry"],
            types: ["address"],
        });
        // When the user selects an address from the drop-down, populate the
        // address fields in the form.
        addressautocomplete.addListener("place_changed", fillInMailAddress);
    }
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();
    let address1 = "";
    let address2 = "";
    let address3 = "";
    let postcode = "";
    let city = "";
    let county = "";
    let state = "";
    let country = "";
    let countryid = 0;
    

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    console.log("Pin to pin details");
    console.log(place);
    for (const component of place.address_components) {
        const componentType = component.types[0];
       
        switch (componentType) {
            case "street_number": {
                address1 = `${component.long_name} ${address1}`;
                break;
            }

            case "route": {
                address1 += component.long_name;
                break;
            }

            case "premise": {
                if (address1 == "" || address1 == null) {
                    address2 += component.long_name;
                }
                break;
            }

            case "sublocality_level_2": {
                if (address1 == "" || address1 == null) {
                    address2 += "," + component.long_name;
                }
                break;
            }
            case "administrative_area_level_3": {
                //city += component.long_name;      //// Address 2 currently appears to be populating Subdivision Name or City
                break;
            }
            case "administrative_area_level_2": {
                if (county == "" || county == null) {
                    county = component.long_name;
                }
                break;
            }
            case "postal_code": {
                postcode = `${component.long_name}${postcode}`;
                break;
            }

            case "postal_code_suffix": {
                postcode = `${postcode}-${component.long_name}`;
                break;
            }
            case "locality":
                city = component.long_name;
                break;

            case "administrative_area_level_1":
                  case "postal_town": {
                    state = component.long_name;
                break;
            }
            case "sublocality_level_1": {
                address2 = component.long_name;
                break;
            }
            case "subpremise": {
                address2 += component.long_name;
                break;
            }
            case "neighborhood": {
                city += component.long_name;
                break;
            }
            case "country":
                country = component.long_name;
                break;
        }
    }

    if (address1Field != null || county != "") {
        if (address1 == "" || address1 == null) {
            address1Field.value = address3
        } else {
            address1Field.value = address1;
        }

    }
    if (address2Field != null || county != "") {
        address2Field.value = address2;
    }
    if (city != null || county != "") {
        cityField.value = city;
        $(".google-map-city").trigger('blur');
    }
    if (postalField != null || county != "") {
        postalField.value = postcode;
        $(".google-map-zip").trigger('blur');
    }
    if (stateField != null || county != "") {
        stateField.value = state;
        $(".google-map-state").trigger('blur');
    }
    countryid = $(".google-map-country option").filter(function () {
        return $(this).text() == country;
    }).val();

    $(".google-map-country").val(countryid).trigger('change');

    if (county != null || county != "") {
        countyField.value = county;
        $(".google-map-county").trigger('blur');
    }    
}

/* for Mail Address */

function fillInMailAddress() {
    // Get the place details from the autocomplete object.
    const place = addressautocomplete.getPlace();
    let address1 = "";
    let address2 = "";
    let address3 = "";
    let postcode = "";
    let city = "";
    let state = "";
    let country = "";
    let countryid = 0;


    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    console.log("Pin to pin details");
    console.log(place);
    for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
            case "street_number": {
                address1 = `${component.long_name} ${address1}`;
                break;
            }

            case "route": {
                address1 += component.short_name;
                break;
            }

            case "premise": {
                if (address1 == "" || address1 == null) {
                    address3 += component.long_name;
                }
                break;
            }

            case "sublocality_level_2": {
                if (address1 == "" || address1 == null) {
                    address3 += "," + component.long_name;
                }
                break;
            }

            case "postal_code": {
                postcode = `${component.long_name}${postcode}`;
                break;
            }

            case "postal_code_suffix": {
                postcode = `${postcode}-${component.long_name}`;
                break;
            }
            case "locality":
                city = component.long_name;
                break;

            case "administrative_area_level_1": {
                state = component.long_name;
                break;
            }
            case "sublocality_level_1": {
                address2 = component.long_name;
                break;
            }
            case "subpremise": {
                address2 += component.long_name;
                break;
            }
            case "neighborhood": {
                address2 += component.long_name;
                break;
            } 
            case "country":
                country = component.long_name;
                break;
        }
    }

    if (mailaddress1Field != null) {
        if (address1 == "" || address1 == null) {
            mailaddress1Field.value  = address3
        } else {
            mailaddress1Field.value  = address1;
        }

    }

    if (mailaddress2Field != null) {
        mailaddress2Field.value = address2;
    }
    if (mailcityField != null) {
        mailcityField.value = city;
    }
    if (mailpostalField != null) {
        mailpostalField.value = postcode;
    }
    if (mailstateField != null) {
        mailstateField.value = state;
    }
    if (mailcountryField != null) {
        mailcountryField.value = country;
    }


    // After filling the form with address components from the Autocomplete
    // prediction, set cursor focus on the second address line to encourage
    // entry of subpremise information such as apartment, unit, or floor number.

}

$.fn.allchange = function (callback) {
    var valid = this;
    var last = "";
    var infunc = function () {
        var text = $(valid).val();
        if (text != last) {
            last = text;
            callback();
        }
        setTimeout(infunc, 100);
    }
    setTimeout(infunc, 100);
};

$(".google-map-address").allchange(function () {
    if ($(".google-map-address").val() != undefined) {
    if ($(".google-map-address").val().length > 0) {
        $("#google-map-address").addClass('hide');
    }
    else {
        $("#google-map-address").removeClass('hide');
        }
    }
});
$(".google-map-city").allchange(function () {
    if ($(".google-map-city").val() != undefined) {
        if ($(".google-map-city").val().length > 0) {
            $("#google-map-city").addClass('hide');
        }
        else {
            $("#google-map-city").removeClass('hide');
        }
    }
});


$(".google-map-state").allchange(function () {
    if ($(".google-map-state").val() != undefined) {
        if ($(".google-map-state").val().length > 0) {
            $("#google-map-state").addClass('hide');
        }
        else {
            $("#google-map-state").removeClass('hide');
        }
    }
});


$(".google-map-zip").allchange(function () {
    if ($(".google-map-zip").val() != undefined) {
        if ($(".google-map-zip").val().length > 0) {
            $("#google-map-zip").addClass('hide');
        }
        else {
            $("#google-map-zip").removeClass('hide');
        }
    }
});