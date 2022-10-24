// according to the requirements , this function helps the app to hide and display fields of those devices
// module for  R3C and R5C.
function showFields(deviceName) {
    //hide fields of options in database
    const allInputs = document.getElementsByClassName('fields');
    for (let e of allInputs) {
        e.setAttribute('hidden', true);
        e.removeAttribute('name');
    }

    //select the fields required
    const selectedDeviceInputs = document.getElementsByClassName(
        'fields ' + deviceName
    );
    for (let e of selectedDeviceInputs) {
        e.removeAttribute('hidden');
        e.setAttribute('name', e.getAttribute('data-field-name'));
    }
}
