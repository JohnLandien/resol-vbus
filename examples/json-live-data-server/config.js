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
    // packetFieldNameMap: {
    //     // naming add Solar_ to prevent double names, then add device like collector, Pump, tank or Valve, then add specific detail like VW or SWW, tankchoice/shortcut, speed
    //     '00_0010_7E11_10_0100_000_2_0': 'Solar_Collector_Temp_West',            // S1
    //     '00_0010_7E11_10_0100_002_2_0': 'Tank_VW_Temp_Middle',                  // S2
    //     '00_0010_7E11_10_0100_006_2_0': 'Tank_SWW_Temp_Middle',                 // S4
    //     '00_0010_7E11_10_0100_008_2_0': 'Solar_Shortcut_Temp',                  // S5
    //     '00_0010_7E11_10_0100_010_2_0': 'Solar_Collector_Temp_Middle',          // S6
    //     '00_0010_7E11_10_0100_012_2_0': 'Solar_Collector_Temp_East',            // S7
    //     '00_0010_7E11_10_0100_014_2_0': 'Solar_Collector_Temp_Roof',            // S8
    //     '00_0010_7E11_10_0100_022_2_0': 'Tank_SWW_Temp_Top',                    // S12
    //     '00_0010_7E11_10_0100_024_2_0': 'Tank_SWW_Temp_Bottom',                 // S13
    //     '00_0010_7E11_10_0100_026_2_0': 'Tank_VW_Temp_Top',                     // S14
    //     '00_0010_7E11_10_0100_028_2_0': 'Tank_VW_Temp_Bottom',                  // S15
    //     '00_0010_7E11_10_0100_100_1_0': 'Solar_Pump_Speed_West',                // PWM_Output_A','PWM_Output_Pump_Zonnecollector',              //
    //     '00_0010_7E11_10_0100_101_1_0': 'Solar_Pump_Speed_East',                // PWM_Output_B',
    //     '00_0010_7E11_10_0100_102_1_0': 'Solar_Pump_Speed_Roof',                // PWM_Output_C',
    //     '00_0010_7E11_10_0100_076_1_0': 'Solar_Pump_West',                // R1
    //     '00_0010_7E11_10_0100_077_1_0': 'Solar_Pump_Middle',              // R2
    //     '00_0010_7E11_10_0100_078_1_0': 'Solar_Valve_Tankchoice_SWW_VW',              // R3
    //     '00_0010_7E11_10_0100_079_1_0': 'Solar_Pump_Roof',                // R4
    //     '00_0010_7E11_10_0100_080_1_0': 'Solar_Valve_Shortcut_Shortcut_Pass',   // R5
    // },


    computeActions :
    {
        'I_Solar_Collector_Temp_West' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_000_2_0',
            'resolHw' : 'S1',
        },
        'I_Tank_VW_Temp_Middle' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_002_2_0',
            'resolHw' : 'S2',
        },
        'I_Tank_SWW_Temp_Middle' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_006_2_0',
            'resolHw' : 'S4',
        },
        'I_Solar_Shortcut_Temp' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_008_2_0',
            'resolHw' : 'S5',
        },
        'I_Solar_Collector_Temp_Middle' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_010_2_0',
            'resolHw' : 'S6',
        },
        'I_Solar_Collector_Temp_East' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_012_2_0',
            'resolHw' : 'S7',
        },
        'I_Solar_Collector_Temp_Roof' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_014_2_0',
            'resolHw' : 'S8',
        },
        'I_Solar_1' : {
            'resolId' : '00_0010_7E11_10_0100_016_2_0',
            'resolHw' : 'S9',
        },
        'I_Solar_2' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_018_2_0',
            'resolHw' : 'S10',
        },
        'I_Tank_SWW_Temp_Top' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_022_2_0',
            'resolHw' : 'S12',
        },
        'I_Tank_SWW_Temp_Bottom' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_024_2_0',
            'resolHw' : 'S13',
        },
        'I_Tank_VW_Temp_Top' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_026_2_0',
            'resolHw' : 'S14',
        },
        'I_Tank_VW_Temp_Bottom' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_028_2_0',
            'resolHw' : 'S15',
        },
        'I_Solar_Flow' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_060_4_0',
            'resolHw' : 'Gd1-F',
        },
        'I_Solar_Outgoing_Temp' : {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_036_2_0',
            'resolHw' : 'Gd1-T',
        },
        'I_Solar_Pump_Speed_West': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_100_1_0',
            'resolHw' : 'PWMA',
            'actions': [{
                'Solar_Pump_General_Speed': {
                    'calculate': 0.25,
                    'rule': 'add_subtract',
                    'translate': false
                },
            }, {
                'Solar_Pump_General_Off_On': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                    'off-conditions': ['Solar_Pump_Speed_East', 'Solar_Pump_Speed_Middle', 'Solar_Pump_Speed_Roof']
                }
            }]
        },
        'I_Solar_Pump_Speed_East': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_101_1_0',
            'resolHw' : 'PWMB',
            'actions': [{
                'Solar_Pump_General_Speed': {
                    'calculate': 0.25,
                    'rule': 'add_subtract',
                    'translate': false
                },
            }, {
                'Solar_Pump_General_Off_On': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                    'off-conditions': ['Solar_Pump_Speed_West', 'Solar_Pump_Speed_Middle', 'Solar_Pump_Speed_Roof']
                }
            }]
        },
        'I_Solar_Pump_Speed_Middle': {
            'type': 'input',
            'source' : 'compute',
            'currentValue' : '',
            'actions': [{
                'Solar_Pump_General_Speed': {
                    'calculate': 0.25,
                    'rule': 'add_subtract',
                    'translate': false
                },
            }, {
                'Solar_Pump_General_Speed': {
                    'calculate': 0.25,
                    'rule': 'add_subtract',
                    'translate': false
                }
            }, {
                'Solar_Pump_General_Off_On': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                    'off-conditions': ['Solar_Pump_Speed_West', 'Solar_Pump_Speed_Middle', 'Solar_Pump_Speed_Roof']
                }
            }]
        },
        'I_Solar_Pump_Speed_Roof': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_102_1_0',
            'resolHw' : 'PWMC',
            'actions': [{
                'Solar_Pump_General_Speed': {
                    'calculate': 0.25,
                    'rule': 'add_subtract',
                    'translate': false
                }
            }, {
                'Solar_Pump_General_Off_On': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                    'off-conditions': ['Solar_Pump_Speed_West', 'Solar_Pump_Speed_Middle', 'Solar_Pump_Speed_Roof']
                }
            }]
        },
        'I_Solar_Valve_TankChoice_SWW_VW': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_078_1_0',
            'resolHw' : 'R3',
            'actions': [{
                'Solar_Valve_Tankchoice_SWW_VW': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                }
            }, {
                'Solar_Valve_Tankchoice_Collectoren_Off_Power': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                }
            }]
        },
        'I_Solar_Valve_Shortcut_Shortcut_Pass': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_080_1_0',
            'resolHw' : 'R5',
            'actions': [{
                'Solar_Valve_Shortcut_Shortcut_Pass': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                }
            }, {
                'Solar_Valve_Shortcut_Off_Power': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                }
            }]
        },
        'I_Solar_Pump_West': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_076_1_0',
            'resolHw' : 'R1',
            'actualValue' : '',
            'initialValue' : 'off',
            'actions': [{
                'Solar_Pump_West_Off_Power': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                    'on-conditions' : [ { 'IO' : 'Sunrise', 'condition' : true, 'operator' : '==='  }, { 'IO' : 'Sunset', 'condition' : false, 'operator' : '==='  } ], // conditions when going from off-to-on will be followed
                    'off-conditions': [ { 'IO' : 'Sunset', 'condition' : true, 'operator' : '==='  }]  // conditions when going from on-to-off will be followed
                }
            }, {
                'Solar_Pump_West_Speed': {
                    'translate': '',
                    'rule': 'change',
                    'on-conditions' : [ { 'IO' : 'Solar_Pump_West_Off_Power', 'condition' : 'on', 'operator' : '==='  }, { 'IO' : 'Sunrise', 'condition' : true, 'operator' : '==='  }, { 'IO' : 'Sunset', 'condition' : false, 'operator' : '==='  } ], // conditions when going from low - to high will be followed
                }
            }, {
                'Solar_Pump_General_Off_Power': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                    'on-conditions': [{ 'IO' : 'Sunrise', 'condition' : true, 'operator' : '==='  }, { 'IO' : 'Sunset', 'condition' : false, 'operator' : '==='  }], // conditions when going from off-to-on will be followed
                    'off-conditions': [ { 'IO' : 'Sunset', 'condition' : true, 'operator' : '==='  }]  // conditions when going from on-to-off will be followed
                }
            }, {
                'Solar_Pump_General_Off_On': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                    'off-conditions': ['Sunset_Sunrise']
                }
            }, {
                'Solar_Pump_General_Speed': {
                    'calculate': 0.25,
                    'rule': 'add_subtract',
                    'translate': false
                }
            }, ]
        },
        'I_Solar_Pump_Middle': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_077_1_0',
            'resolHw' : 'R2',
            'actions': [{
                'Solar_Pump_Middle_Off_Power': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                    'off-conditions': ['Sunset_Sunrise']
                }
            },
            {
                'Sunset_Sunrise': {
                    'translate': '>0?on:off',
                    'rule': 'only-on'
                }
            }]
        },
        'I_Solar_Pump_East': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'actions': [{
                'Solar_Pump_East_Off_Power': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                    'off-conditions': ['Sunset_Sunrise']
                }
            },
            {
                'Sunset_Sunrise': {
                    'translate': '>0?on:off',
                    'rule': 'only-on'
                }
            }]
        },
        'I_Solar_Pump_Roof': {
            'type': 'input',
            'source' : 'resol',
            'currentValue' : '',
            'resolId' : '00_0010_7E11_10_0100_079_1_0',
            'resolHw' : 'R4',
            'actions': [{
                'Solar_Pump_Roof_Off_Power': {
                    'translate': '>0?on:off',
                    'rule': 'change',
                    'off-conditions': ['Sunset_Sunrise']
                }
            },
            {
                'Sunset_Sunrise': {
                    'translate': '>0?on:off',
                    'rule': 'only-on'
                }
            }]
        },
    },

    IO: {
        'I_Sunset': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'main', // main / exp1 / exp2
            'port': false, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': 'off 1 hour after Sunset_ on demand of program',
            'actualValue' : ''
        },
        'I_Sunrise': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'main', // main / exp1 / exp2
            'port': false, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': 'off 1 hour after Sunset_ on demand of program',
            'actualValue' : ''
        },
        'Solar_Valve_Shortcut_Off_Power': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 0, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'resol', // resol / program ..
            'sourceId': '100_081_1_0', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'WP_Valve_Short_Shortcut_Off_Power': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 1, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'WP_Valve_Shortcut_Shortcut_Pass': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 2, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'Cool_Valve_Shortcut_Pass_Cool': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 3, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'Solar_Valve_Tankchoice_SWW_VW': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 4, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'Cool_Valve_Shortcut_Off_Power': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 5, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'Solar_Valve_Shortcut_Short_Pass': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 6, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'resol', // resol / program ..
            'sourceId': '100_081_1_0', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'Solar_Valve_Tankchoice_Collectoren_Off_Power': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 7, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'VW_Pump_Off_On': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 8, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'WP_Pump_Off_On': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 9, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'Solar_Pump_General_Off_Power': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 10, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'resol', // resol / program ..
            'sourceId': '100_078_1_0', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'VW_Pump_Off_Power': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 11, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'WP_Pump_Off_Power': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 12, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'VW_ThermoValve_Off_Power': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 13, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'VW_ThermoValve_Koud_Warm': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 14, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'Solar_Pump_General_Off_On': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'exp1', // main / exp1 / exp2
            'port': 15, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'resol', // resol / program ..
            'sourceId': '100_078_1_0', // now used for resol id
            'type': 'output', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        /*
        '100_100_1_0' : 'PWM_Pump_Collector_West', //'PWM_Output_A','PWM_Output_Pump_Zonnecollector',              //
        '100_101_1_0' : 'PWM_Pump_Collector_East', //'PWM_Output_B',
        '100_102_1_0' : 'PWM_Pump_Collector_Roof', //'PWM_Output_C',
         */
        'Solar_Pump_General_Speed': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'main', // main / exp1 / exp2
            'port': 12, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'pwmout', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'VW_Pump_Speed': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'main', // main / exp1 / exp2
            'port': 18, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'pwmout', // input , output, pwmout, pwm-detection,
            'compute': ''
        },
        'WP_Pump_Speed': {
            'pi': 'main', // main /pool / cv /outside
            'ioSource': 'main', // main / exp1 / exp2
            'port': 19, // pi 1-33?? , exp1 or exp2 0-15
            'mode': 'auto', // auto / manual
            'source': 'program', // resol / program ..
            'sourceId': '', // now used for resol id
            'type': 'pwmout', // input , output, pwmout, pwm-detection,
            'compute': ''
        }
    },

    // power on off of the pumps will be controlled once a day by astro function while powering on /off is not desired to do more than once a day
    /*
                        {
                            'Solar_Pump_Check_West' :
                                {
                                    'timed' : 60000
                                },
                        },
                        {
                            'Solar_Pump_West' :
                                {
                                    'translate' : ">0?'on':'off'",
                                    'rule'      : "change",
                                },
                        },
*/
    /*  individual pumps are swithed off
                        { 'Solar_Pump_Check_East' :
                                {
                                    'timed' : 60000
                                } ,
                        },
                        {
                            'Solar_Pump_East' :
                                {
                                    'translate' : ">0?'on':'off'" ,
                                    'rule'      : "change",
                                },
                        },
*/
    /*  individual pumps are swithed off
                        { 'Solar_Pump_Check_Middle' :
                                {
                                    'timed' : 60000
                                } ,
                        },
                        {
                            'Solar_Pump_Middle' :
                                {
                                    'translate' : ">0?'on':'off'",
                                    'rule'      : "change",
                                },
                        },
*/
    // temp added while controller can not have 4 collectors
    /*     individual pumps are swithed off
                        {
                            'Solar_Pump_Check_Middle' :
                                {
                                    'timed' : 60000
                                }
                        },
                        {
                            'Solar_Pump_Middle' :
                                {
                                    'translate' : ">0?'on':'off'"
                                },
                        },
*/
    // temp end
    /*  individual pumps are swithed off
                        { 'Solar_Pump_Check_Roof' :
                                {
                                    'timed' : 60000
                                } ,
                        },
                        {
                            'Solar_Pump_Roof' :
                                {
                                    'translate' : ">0?'on':'off'",
                                    'rule'      : "change",
                                },
                        },
*/

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
