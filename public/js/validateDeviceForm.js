// according to the R3D and R5C, this is an input validation module
function validateDeviceForm() {
    let deviceSelect = document.getElementById('deviceName');
    let volumeInput =
        document.getElementsByName('volume').length == 0
            ? undefined
            : document.getElementsByName('volume')[0];
    let temperatureInput =
        document.getElementsByName('temperature').length == 0
            ? undefined
            : document.getElementsByName('temperature')[0];
    // input is a must have
    if (deviceSelect.value === '') {
        alert('Device must be selected');
        deviceSelect.focus();
        return false;
    }

    //input voulume number have to be limited from 0 to 100.
    if (
        volumeInput !== undefined &&
        (Number(volumeInput.value) < 0 || Number(volumeInput.value) > 100)
    ) {
        alert('Volume must be between 0 and 100');
        volumeInput.focus();
        return false;
    }

    // tempetasrture input limited from 10 to 32.
    if (
        temperatureInput !== undefined &&
        (Number(temperatureInput.value) < 10 ||
            Number(temperatureInput.value) > 32)
    ) {
        alert(
            'it is better to choose a temperature fall between 10 and 32 degrees, take '
        );
        temperatureInput.focus();
        return false;
    }

    // must fill the tempterature
    if (temperatureInput !== undefined && temperatureInput.value === '') {
        alert('Temperature must be filled out');
        temperatureInput.focus();
        return false;
    }

    // must fill the volume
    if (volumeInput !== undefined && volumeInput.value === '') {
        alert('Volume must be filled out');
        volumeInput.focus();
        return false;
    }
    return true;
}
