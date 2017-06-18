'use strict';

const Denon = require('denon-client');

//var denon = require('denon-avr');
//var net = require('net');


// Set your IP here
var AVR_IP = '10.11.12.50';
var AVR_PORT = '4097'


const denonClient = new Denon.DenonClient(AVR_IP, AVR_PORT);


/* Matrix Controller */

module.exports.onButtonPressed = function onButtonPressed(name) {
    console.log(`[DENON CONTROLLER] ${name} button pressed`);

    denonClient.connect();

    switch (name) {
        case "POWER ON":
            denonClient.setPower(Denon.Options.PowerOptions.On);
            break;
        case "POWER OFF":
            denonClient.setPower(Denon.Options.PowerOptions.Standby);
            break;
        case "POWER OFF":
            denonClient.setPower(Denon.Options.PowerOptions.Standby);
            break;
        case "VOLUME UP":
            denonClient.setVolume(Denon.Options.VolumeOptions.Up);
            break;
        case "VOLUME DOWN":
            denonClient.setVolume(Denon.Options.VolumeOptions.Down);
            break;
        case "INPUT TV":
            denonClient.setInput(Denon.Options.InputOptions.TV);
            break;
        case "INPUT HDMI1":
            denonClient.setInput(Denon.Options.InputOptions.VDP);
            break;

    }


};

denonClient.on('masterVolumeChanged', (volume) => {
    // This event will fire every time when the volume changes.
    // Including non requested volume changes (Using a remote, using the volume wheel on the device).

    console.log(`Volume changed to: ${volume}`);
});



