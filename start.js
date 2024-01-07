const schedule = require('node-schedule');

const changeList = [];
const data = {
    'Solar_Pump_West' : '0',
    'Solar_Pump_Middle' : '0',
    'Solar_Valve_TankChoice_SWW_VW': '0',
    'Solar_Pump_Roof': '0',
    'Solar_Valve_Shortcut_Shortcut_Pass': '0',
    'Solar_Pump_Speed_West': '0',
    'Solar_Pump_Speed_East': '0',
    'Solar_Pump_Speed_Roof': '0',
    'Solar_Report_date': '01/04/2024 16:17:31'
};

detectChanges(changeList, data);

// const rule = new schedule.RecurrenceRule();
// rule.minute = 1;

// eslint-disable-next-line no-unused-vars
const job = schedule.scheduleJob({ hour : 0, minute: 30 }, () => {
    console.log('recalculate sunrise and sunset and put them in config (file) and var');
});


function detectChanges(list, data) {
    const fetchPromise = fetch('http://127.0.0.1:3333/output');
    fetchPromise.then(response => {
        return response.json();
    }).then(receivedData => {
        if (receivedData.length > 0) {
            const newData = [];
            receivedData.forEach((element) => {
                newData[element.name] = element.textValue;
                if (element.textValue !== data[element.name]) {
                    const change =  {
                        'item' : element.name,
                        'old' : data[element.name],
                        'new' : newData[element.name],
                        'source' : 'solar',
                        'date' : new Date().toLocaleString()

                    };
                    changeList.push(change);
                }
            });

            console.log('\x1b[33m\x1b[1m\x1b[5mlist of changes to take action: \x1b[0m\n\n', changeList);
            return { list, newData };
        }
    })
        .catch((error) => {
            console.error('Got error', error);
        });
}




// eslint-disable-next-line no-unused-vars
function computeChanges(changeList) {
    const actionList = [];
    changeList.forEach((change) => {
        if (change.item.includes('_Pump_Power_')) {

            // power-up specific pump
            // power-up main pump if not already powered-up
            // look for others pump which are on and calculate rotation for main pump
            // normally rotation should also be change for the specific pump

            actionList.push({
                'item' : 'Solar_Pump_Power_West',
                'old': change.old === '100' ? 'on' : 'off',
                'new' : change.new === '100' ? 'on' : 'off',
                'source' : 'computeChanges for Solar',
                'date'  : change.date

            });
            actionList.push({
                'item' : 'Solar_Valve_West',
                'old': change.old === '100' ? 'open' : 'close',
                'new' : change.new === '100' ? 'open' : 'close',
                'source' : 'computeChanges for Solar',
                'date'  : change.date

            });
            actionList.push({
                'item' : 'Solar_Valve_West_detect' + change.new === '100' ? 'open' : 'close',
                'source' : 'computeChanges for Solar',
                'date'  : change.date,
                'checkTime' : ''

            });

            console.log('d');
        }
    });

}


// eslint-disable-next-line no-unused-vars
function addSec (time, secToAdd) {
    return new Date(time.getTime() + secToAdd).toLocaleString();
}
