'use strict';

const neeoapi = require('neeo-sdk');
const controller = require('./controller');

console.log('Denon AVR over TCP');
console.log('---------------------------------------------');

/*
 * Adapter - an Adapter to connect inputs + outputs from HDBaseT matrix
 */

// first we set the device info, used to identify it on the Brain
const denontcp = neeoapi.buildDevice('Denon AVR-2807 over TCP')
    .setManufacturer('Denon')
    .addAdditionalSearchToken('AVR')
    .addAdditionalSearchToken('2807')
    .setType("ACCESSOIRE")
    //.setType('Matrix')

    // Capabilities of the device
    .addButton({ name: 'POWER ON', label: 'Power On' })
    .addButton({ name: 'POWER OFF', label: 'Power Off' })

    .addButton({ name: 'VOLUME UP', label: 'Volume Up' })
    .addButton({ name: 'VOLUME DOWN', label: 'Volume Down' })

    .addButton({ name: 'INPUT TV', label: 'Input TV' })
    .addButton({ name: 'INPUT HDMI1', label: 'Input HDMI1' })

    .addButtonHander(controller.onButtonPressed)
    ;

function startSdkExample(brain) {
    console.log('- Start server');
    neeoapi.startServer({
        brain,
        port: 6338,
        name: 'denon-2807-tcp',
        devices: [denontcp]
    })
        .then(() => {
            console.log('# READY! use the NEEO app to search for "Denon 2807 TCP".');
        })
        .catch((error) => {
            //if there was any error, print message out to console
            console.error('ERROR!', error.message);
            process.exit(1);
        });
}

const brainIp = process.env.BRAINIP;
if (brainIp) {
    console.log('- use NEEO Brain IP from env variable', brainIp);
    startSdkExample(brainIp);
} else {
    console.log('- discover one NEEO Brain...');
    neeoapi.discoverOneBrain()
        .then((brain) => {
            console.log('- Brain discovered:', brain.name);
            startSdkExample(brain);
        });
}
