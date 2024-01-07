/*
converts  IO to packetFeild for Resol

*/

const config = require('./examples/json-live-data-server/config');


config.packetFieldNameMap = {};
for (const key in config.computeActions) {
    if ({}.propertyIsEnumerable.call(config.computeActions[key], 'resolId')) config.packetFieldNameMap[config.computeActions[key].resolId] = key;
}

console.log(config.packetFieldNameMap);
