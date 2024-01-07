const SunCalc = require('suncalc');

const RR = SunCalc.getTimes(new Date(), 52.68, 4.89);

console.log('today : ', new Date().toString());

console.log("today's sunrise : ", Date(RR.sunsriseEnd).toString());

console.log("today's sunset : ", RR.sunset.toString());

console.log("today's pump off : ", new Date(addSec(RR.sunset, 3600000)).toString());


function addSec (time, msecToAdd) {
    return new Date(time.getTime() + msecToAdd).toString();
}
