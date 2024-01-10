/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const path = require('path');



const config = {

    /**
     * The level of details for log messages.
     * @type {String}
     */
    logLevel: 'debug',

    /**
     * The port number for the HTTP server to listen to.
     * @type {Number}
     */
    httpPort: 3333,

    /**
     * The inteval in milliseconds between two writes of the logging file.
     * @type {Number}
     */
    loggingInterval: 10000,

    /**
     * The filename of the logging file.
     * @type {String}
     */
    loggingFilename: path.resolve(__dirname, 'xx.json'),

    /**
     * Text file logging interval in milliseconds. A value of zero disables this functionality.
     */
    textLoggingInterval: 0,

    /**
     * Text file logging time to live in milliseconds.
     */
    textLoggingTimeToLive: 60000,

    /**
     * Text file logging directory.
     */
    textLoggingPath: path.resolve(__dirname, 'log'),

    /**
     * Text file logging options, passed to the `TextConverter` constructor.
     */
    textLoggingOptions: {
        columnSeparator: '\t',
        lineSeparator: '\r\n',
        separateDateAndTime: false,
    },

    /**
     * Either 'TcpConnection' or 'SerialConnection' to connect to the VBus.
     * @type {String}
     */
    connectionClassName: 'TcpConnection',

    connectionOptions: {
        /**
         * SerialConnection only:
         * The serial port to which the Vbus/USB device is connected.
         * @type {String}
         */
        path: '/dev/ttyACM0',

        /**
         * TcpConnection only:
         * The host name / IP address of the VBus/LAN or Datalogger device.
         * @type {String}
         */
        host: '192.168.1.190',

        /**
         * TcpConnection only:
         * The password for the VBus/LAN or Datalogger device.
         * @type {String}
         */
        password: 'vbus',
    },

    /**
     * A map of packet field IDs to their custom name.
     */
    packetFieldNameMap: {
        // naming add Solar_ to prevent double names, then add device like collector, Pump, tank or Valve, then add specific detail like VW or SWW, tankchoice/shortcut, speed
        //'00_0010_7E11_10_0100_000_2_0': 'Solar_Collector_Temp_West',            // S1
    },


    computeActions :
    {
        'Solar_Collector_Temp_West' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_000_2_0',
            'resolHw' : 'S1',
        },
        'Tank_VW_Temp_Middle' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_002_2_0',
            'resolHw' : 'S2',
        },
        'House_Outlet_Temp' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_004_2_0',
            'resolHw' : 'S3',
        },
        'Tank_SWW_Temp_Middle' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_006_2_0',
            'resolHw' : 'S4',
        },
        'Solar_Shortcut_Temp' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_008_2_0',
            'resolHw' : 'S5',
        },
        'Solar_Collector_Temp_Middle' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_010_2_0',
            'resolHw' : 'S6',
        },
        'Solar_Collector_Temp_East' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_012_2_0',
            'resolHw' : 'S7',
        },
        'Solar_Collector_Temp_Roof' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_014_2_0',
            'resolHw' : 'S8',
        },
        'Solar_1' : {
            'resolId' : '00_0010_7E11_10_0100_016_2_0',
            'resolHw' : 'S9',
        },
        'Solar_2' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_018_2_0',
            'resolHw' : 'S10',
        },
        'Tank_SWW_Temp_Top' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_022_2_0',
            'resolHw' : 'S12',
        },
        'Tank_SWW_Temp_Bottom' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_024_2_0',
            'resolHw' : 'S13',
        },
        'Tank_VW_Temp_Top' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_026_2_0',
            'resolHw' : 'S14',
        },
        'Tank_VW_Temp_Bottom' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_028_2_0',
            'resolHw' : 'S15',
        },
        'Solar_Flow' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_060_4_0',
            'resolHw' : 'Gd1-F',
        },
        'Solar_Outgoing_Temp' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_036_2_0',
            'resolHw' : 'Gd1-T',
        },
        'Solar_Pump_Speed_West': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_100_1_0',
            'resolHw' : 'PWMA',
        },
        'Solar_Pump_Speed_East': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_101_1_0',
            'resolHw' : 'PWMB',
        },
        'Solar_Pump_Speed_Middle': {
            'type': 'input',
            'source' : 'compute',
            'currentValue' : '',
        },
        'Solar_Pump_Speed_Roof': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_102_1_0',
            'resolHw' : 'PWMC',
        },
        'Solar_Valve_TankChoice_SWW_VW': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_078_1_0',
            'resolHw' : 'R3',
        },
        'Solar_Valve_Shortcut_Shortcut_Pass': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_080_1_0',
            'resolHw' : 'R5',
        },
        'Solar_Pump_West': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_076_1_0',
            'resolHw' : 'R1',
        },
        'Solar_Pump_Middle': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_077_1_0',
            'resolHw' : 'R2',
        },
        'Solar_Pump_East': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
        },
        'Solar_Pump_Roof': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_079_1_0',
            'resolHw' : 'R4',
        },
    },

    /**
     * A list of EM (extension module) sub-addresses to simulate.
     */
    emSimulatorSubAdresses: [
        // 1,
        // 2,
        // 3,
        // 4,
        // 5,
    ],

};

module.exports = config;
