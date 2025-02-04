---
layout: docs
title: VBus Parameterization
---


This document aims to give an overview on how you can read and possibly change parameters in a controller over the VBus connection.


## Basics of VBus communication

Just to recap some of the relevant bits from the [VBus specification](vbus-specification.html):

- the VBus is a single-master communication bus
- the master (normally the controller) is in charge of the communication timing
- attached non-master devices are only allowed to send data when they are requested to do so by the master (and only for a short period of time)
- bytes other than the SYNC byte (0xAA) must not have their MSB set, reducing them to 7-bit effectively
- in cases where 8-bit transfer is required (e.g. in payload) up to seven MSBs are extracted into an additional byte to be transferred
- simple checksums are used to ensure integrity of the data in transit
- receiving a SYNC byte (0xAA) from a VBus data source starts a new stream of bytes
- the first six bytes of a stream indicate destination, source and protocol version
- the remaining data stream must be interpreted differently based on the protocol version

Parameterization uses VBus protocol version 2.0 (datagrams) for all its operations. The structure of a datagram is as follows:

| Offset | Explanation |
|--:|:--|
| 0 | SYNC-Byte (0xAA or 170 decimal) |
| 1 | Destination address (low-byte) |
| 2 | Destination address (high-byte) |
| 3 | Source address (low-byte) |
| 4 | Source address (high-byte) |
| 5 | Protocol version (0x20 or 32 decimal) |
| 6 | Command (low-byte) |
| 7 | Command (high-byte) |
| 8 | 16-bit parameter (low-byte) |
| 9 | 16-bit parameter (high-byte) |
| 10 | 32-bit parameter (low-byte) |
| 11 | 32-bit parameter  |
| 12 | 32-bit parameter  |
| 13 | 32-bit parameter (high-byte) |
| 14 | Septet for offset 8-13 |
| 15 | Checksum for offset 1-14 |

Each datagram contains the following variable parts:

- a destination address
- a source address
- a command
- a 16-bit parameter
- a 32-bit parameter

For more in-depth details about those topics see the [VBus specification](vbus-specification.html) documentation for reference.


## Basics of the VBus parameterization

Parameterization over the VBus is basically using a non-master device (like a datalogger or VBus/LAN adapter) attached to the VBus to read and possibly write parameter values from or to a controller by exchanging VBus protocol version 2.0 datagrams.


### Transfer of the master role

Since the non-master device is not allowed to randomly transmit parameterization requests to the VBus (due to the single-master restrictions), the controller (in its role as the master) will send a offer to temporarily transfer the VBus master role at regular intervals. Non-master devices then have approx. 0,4 seconds to start taking over the VBus communication. If no device does that, the controller will keep its master role and continue with its normal communication routine. But if a non-master device starts to communicate with the controller the controller temporarily transfers its master role to that communicating device. The master role transfers back to the controller by either using a special VBus datagram or after 10 seconds without communication to the controller.


### Addressing values

Most parameters accessible in the controller's user interface are also accessible over the VBus. Each of those parameter "values" has a 16-bit "value index" to access it.

On older controllers those value indices were manually assigned and could be considered constant over the lifetime of the controller. But newer controllers started to automatically assign the value indices during the software development process. That means that a controller firmware update could result in a change of the mapping from "value index" to "value".

RESOL provides a XML based value list in each of their controller-specific RPT download packages. See the list of controllers under the "RPT" section on the [RESOL software download page](https://www.resol.de/en/software) for details.

In those XML files you can find those values and their indices under:

```
<menuSystem>
    ...
    <value id="..." idHash="..." index="..." ... >
    ...
</menuSystem>
```

As an example: the list of values for the RESOL DeltaSol MX 2.08 contains the following information for the manual mode of relay 1:

```
<value id='Relais_Regler_R1_Handbetrieb' idHash='763685401' index='1977' ...>
```

That value is accessible using value index 1977 in this specific version of this specific controller.


### The changeset ID and value ID hashes

Although it is okay to use hard-coded value indices for proof-of-concepts or tightly controlled scenarios where no unexpected change of the firmware version and its value-index-to-value mapping is occurring, it is best to add support to react to that situation.

The first step is to read out the controller's "changeset ID". That changeset ID is autogenerated during the software development process of the controller and always accessible by reading the value with "value index 0". A change in the changeset ID indicated a change in the value-index-to-value mapping.

This change could be used to either:

- display an error to the user, hinting them to update the mapping manually, or
- start discovering the new mapping and optionally caching it associated to the new changeset ID

The mapping discovery process is enabled by the fact that most of the non-volatile values in controllers also have a "value ID hash", a number value derived from their name and hence constant even between firmware updates (and sometimes between different controller products). Although there are no VBus datagram command to directly read or write values using their value ID hashes, there are commands to look up value indices by their respective value ID hash and vice versa.


### Using datagrams

As stated before parameterization is using VBus protocol version 2.0 datagrams to communicate. Some examples include:

- the offer for transfering the master role is a broadcast from the controller with command 0x0500
- returning the master role to the controller is a datagram directed to the controller with command 0x0600
- reading a value is a datagram directed to the controller with command 0x0300 and the value's index as the 16-bit parameter
- writing a value is a datagram directed to the controller with command 0x0300, the value's index as the 16-bit parameter and the value as the 32-bit parameter
- both reading and writing a value results in an acknoledgement datagram from the controller with command 0x0100, the value's index as the 16-bit parameter and the value as the 32-bit parameter


## Sequence of parameterization

The rough sequence of VBus protocol version 2.0 datagrams of a parameteration is listed below.

The "self address" is a VBus address used by the software to communicate with the controller. The RESOL Parameterization tool (RPT) and other software like the "resol-vbus" JavaScript library use `0x0020` for that address.

The rough sequence of a parameterization is as follows:

- passively wait for the datagram offering transfer of the VBus master role, using a timeout of >= 10 seconds
    - destination address = broadcast: `0x0000`
    - source address = controller address
    - command = `0x0500`
    - 16-bit parameter = not used
    - 32-bit parameter = not used
- respond to that offer by reading the changeset ID (value index 0) of the controller
    - destination address = controller address
    - source address = self address
    - command = `0x0300`
    - 16-bit parameter = value index: `0x0000`
    - 32-bit parameter = not used
- wait for the response from the controller, indicating a) the changeset ID and b) that the controller has temporarily transferred the master role to the device using "self address"
    - destination address = self address
    - source address = controller address
    - command = `0x0100`
    - 16-bit-parameter = value index: `0x0000`
    - 32-bit-parameter = value: changeset ID
- if you already have a value-index-to-value mapping, but the changeset ID differs, forget about that old mapping
- for each value without a known "value index":
    - send a request to lookup the value index based on the value ID hash:
        - destination address = controller address
        - source address = self address
        - command = `0x1100`
        - 16-bit parameter = not used
        - 32-bit parameter = value ID hash
    - wait for the response from the controller
        - destination address = self address
        - source address = controller address
        - command = `0x0100` or `0x1101`
        - 16-bit parameter = value index
        - 32-bit parameter = value ID hash
- optionally read the changeset ID again to "resynchronize", especially if you performed only one lookup in the step above (see below for reasoning)
- for each value to set:
    - send a request to set the value:
        - destination address = controller address
        - source address = self address
        - command = `0x0200`
        - 16-bit parameter = value index
        - 32-bit parameter = value to set to
    - wait for the response from the controller
        - destination address = self address
        - source address = controller address
        - command = `0x0100`
        - 16-bit parameter = value index
        - 32-bit parameter = current value
- optionally read the changeset ID again to "resynchronize", especially if you only set a single value in the step above (see below for reasoning)
- for each value to get:
    - send a request to get that value:
        - destination address = controller address
        - source address = self address
        - command = `0x0300`
        - 16-bit parameter = value index
        - 32-bit parameter = not used
    - wait for the response from the controller
        - destination address = self address
        - source address = controller address
        - command = `0x0100`
        - 16-bit parameter = value index
        - 32-bit parameter = current value
- transfer master role back to the controller
    - destination address = controller address
    - source address = self address
    - command = `0x0600`
    - 16-bit parameter = not used
    - 32-bit parameter = not used
- wait for a VBus protocol version 1.0 packet from the controller indicating that the transfer back was successful

Each of those steps can be associated with a timeout after which the step can be repeated, skipped or aborted, depending on the application's use case.


### The optional "resychronization"

As documented above there are three groups of steps involved in the parameterization that might affect zero or more values:
    - looking up a value index,
    - setting a value and
    - getting a value.

But all the responses from the controller to those requests result in responses that:

- have a command of `0x0100` and
- copy over parts of the original request to the response.

In certains situations (especially involving retransmits of the request after timeouts) it is hard to distinguish to which request a given response should be associated because they look too similar.

For example consider the following excerpt of a sequence consisting of a single value index lookup followed by getting that same value without any resychronization in between the groups of steps:

- the parameterization application sends the request #1 to lookup the value index
    - destination address = controller address
    - source address = self address
    - command = `0x1100`
    - 16-bit parameter = not used
    - 32-bit parameter = value ID hash
- the controller receives that request, but does not respond to that request #1 immediately because it is busy, causing a timeout on the parameterization application side
- the parameterization application re-sends the request #1 as request #2
- the controller responds to request #1
    - destination address = self address
    - source address = controller address
    - command = `0x0100`
    - 16-bit parameter = value index
    - 32-bit parameter = value ID hash
- the parameterization application receives that response, but associates it to the wrong request: request #2
- the parameterization application sends the request #3 to get the value for the value index it just looked up
    - destination address = controller address
    - source address = self address
    - command = `0x0300`
    - 16-bit parameter = value index
    - 32-bit parameter = not used
- the controller responds to request #2
    - destination address = self address
    - source address = controller address
    - command = `0x0100`
    - 16-bit parameter = value index
    - 32-bit parameter = value ID hash
- the parameterization application received that response, but associated it to the wrong request: request #3

And since the parameterization application expected that response to request #3 to contain the "current value" in the 32-bit parameter, it erroneously treats the "value ID hash" as the "current value".

For that reason it is advised to perform a "resynchronization" in between groups of steps to ensure that all responses can be associated with their corresponding requests from the same group.

The easiest way to perform a resynchronization is to get the changeset ID again. Since that always uses a 16-bit parameter of 0x0000, it can be used to discard responses to retransmitted requests containing a different 16-bit parameter:

- the parameterization application sends the request #1 to lookup the value index
    - destination address = controller address
    - source address = self address
    - command = `0x1100`
    - 16-bit parameter = not used
    - 32-bit parameter = value ID hash
- the controller receives that request, but does not respond to that request #1 immediately because it is busy, causing a timeout on the parameterization application side
- the parameterization application re-sends the request #1 as request #2
- the controller responds to request #1
    - destination address = self address
    - source address = controller address
    - command = `0x0100`
    - 16-bit parameter = value index
    - 32-bit parameter = value ID hash
- the parameterization application receives that response, but associates it to the wrong request: request #2
- the parameterization application sends the request #3 to get the changeset ID
    - destination address = controller address
    - source address = self address
    - command = `0x0300`
    - 16-bit parameter = value index of the changeset ID: `0x0000`
    - 32-bit parameter = not used
- the controller responds to request #2
    - destination address = self address
    - source address = controller address
    - command = `0x0100`
    - 16-bit parameter = value index
    - 32-bit parameter = value ID hash
- the parameterization application discard that response, because the 16-bit parameter does not match the one in request #3
- the controller responds to request #3
    - destination address = self address
    - source address = controller address
    - command = `0x0100`
    - 16-bit parameter = value index of the changeset ID: `0x0000`
    - 32-bit parameter = changeset ID
- the parameterization application receives that response and correctly associates it with request #3


## Example communication

The following example shows the datagrams exchanged with a RESOL DeltaSol MX 2.08 to lookup, set and get the `Relais_Regler_R1_Handbetrieb` value:

- passively wait for the datagram offering transfer of the VBus master role, using a timeout of >= 10 seconds
    - RX: `0xAA 0x00 0x00 0x11 0x7E 0x20 0x00 0x05 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x4B`
        - destination address = `0x0000`
        - source address = `0x7E11`
        - command = `0x0500`
        - 16-bit parameter = `0x0000`
        - 32-bit parameter = `0x00000000`
- use the source address of that datagram as the "controller address" and `0x0020` as "self address" for the remainder of this communication
- respond to that offer by reading the changeset ID (value index 0) of the controller
    - TX: `0xAA 0x11 0x7E 0x20 0x00 0x20 0x00 0x03 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x2D`
        - destination address = `0x7E11`
        - source address = `0x0020`
        - command = `0x0300`
        - 16-bit parameter = `0x0000`
        - 32-bit parameter = `0x00000000`
- wait for the response from the controller, indicating a) the changeset ID and b) that the controller has temporarily transferred the master role to the device using "self address"
    - RX: `0xAA 0x20 0x00 0x11 0x7E 0x20 0x00 0x01 0x00 0x00 0x3C 0x5A 0x34 0x27 0x0C 0x32`
        - destination address = `0x0020`
        - source address = `0x7E11`
        - command = `0x0100`
        - 16-bit parameter = `0x0000`
        - 32-bit parameter = `0x2734DABC`
- changeset ID is `0x2734DABC`
- send a request to lookup the value index based on the value ID hash of `Relais_Regler_R1_Handbetrieb`:
    - TX: `0xAA 0x11 0x7E 0x20 0x00 0x20 0x00 0x11 0x00 0x00 0x19 0x6A 0x04 0x2D 0x18 0x53`
        - destination address = `0x7E11`
        - source address = `0x0020`
        - command = `0x1100`
        - 16-bit parameter = `0x0000`
        - 32-bit parameter = `0x2D84EA19`
- wait for the response from the controller
    - RX: `0xAA 0x20 0x00 0x11 0x7E 0x20 0x01 0x11 0x39 0x07 0x19 0x6A 0x04 0x2D 0x19 0x11`
        - destination address = `0x0020`
        - source address = `0x7E11`
        - command = `0x1101`
        - 16-bit parameter = `0x07B9`
        - 32-bit parameter = `0x2D84EA19`
- the value index of `Relais_Regler_R1_Handbetrieb` is `0x07B9`
- read the changeset ID again to "resynchronize"
    - TX: `0xAA 0x11 0x7E 0x20 0x00 0x20 0x00 0x03 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x2D`
        - destination address = `0x7E11`
        - source address = `0x0020`
        - command = `0x0300`
        - 16-bit parameter = `0x0000`
        - 32-bit parameter = `0x00000000`
    - RX: `0xAA 0x20 0x00 0x11 0x7E 0x20 0x00 0x01 0x00 0x00 0x3C 0x5A 0x34 0x27 0x0C 0x32`
        - destination address = `0x0020`
        - source address = `0x7E11`
        - command = `0x0100`
        - 16-bit parameter = `0x0000`
        - 32-bit parameter = `0x2734DABC`
- send a request to set `Relais_Regler_R1_Handbetrieb`:
    - TX: `0xAA 0x11 0x7E 0x20 0x00 0x20 0x00 0x02 0x39 0x07 0x02 0x00 0x00 0x00 0x01 0x6B`
        - destination address = `0x7E11`
        - source address = `0x0020`
        - command = `0x0200`
        - 16-bit parameter = `0x07B9`
        - 32-bit parameter = `0x00000002`
- wait for the response from the controller
    - RX: `0xAA 0x20 0x00 0x11 0x7E 0x20 0x00 0x01 0x39 0x07 0x02 0x00 0x00 0x00 0x01 0x6C`
        - destination address = `0x0020`
        - source address = `0x7E11`
        - command = `0x0100`
        - 16-bit parameter = `0x07B9`
        - 32-bit parameter = `0x00000002`
- read the changeset ID again to "resynchronize"
    - TX: `0xAA 0x11 0x7E 0x20 0x00 0x20 0x00 0x03 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x2D`
        - destination address = `0x7E11`
        - source address = `0x0020`
        - command = `0x0300`
        - 16-bit parameter = `0x0000`
        - 32-bit parameter = `0x00000000`
    - RX: `0xAA 0x20 0x00 0x11 0x7E 0x20 0x00 0x01 0x00 0x00 0x3C 0x5A 0x34 0x27 0x0C 0x32`
        - destination address = `0x0020`
        - source address = `0x7E11`
        - command = `0x0100`
        - 16-bit parameter = `0x0000`
        - 32-bit parameter = `0x2734DABC`
- send a request to get `Relais_Regler_R1_Handbetrieb`:
    - TX: `0xAA 0x11 0x7E 0x20 0x00 0x20 0x00 0x03 0x39 0x07 0x00 0x00 0x00 0x00 0x01 0x6C`
        - destination address = `0x7E11`
        - source address = `0x0020`
        - command = `0x0300`
        - 16-bit parameter = `0x07B9`
        - 32-bit parameter = `0x00000000`
- wait for the response from the controller
    - RX: `0xAA 0x20 0x00 0x11 0x7E 0x20 0x00 0x01 0x39 0x07 0x02 0x00 0x00 0x00 0x01 0x6C`
        - destination address = `0x0020`
        - source address = `0x7E11`
        - command = `0x0100`
        - 16-bit parameter = `0x07B9`
        - 32-bit parameter = `0x00000002`
- transfer master role back to the controller
    - TX: `0xAA 0x11 0x7E 0x20 0x00 0x20 0x00 0x06 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x2A`
        - destination address = `0x7E11`
        - source address = `0x0020`
        - command = `0x0600`
        - 16-bit parameter = `0x0000`
        - 32-bit parameter = `0x00000000`

The information about the value (`valueId` and `valueIdHash`) were extracted from the controller-specific RPT download package as described above.


## Example code for "resol-vbus" JavaScript library

```
const vbus = require('resol-vbus');

const values = [{
    valueId: 'Relais_Regler_R1_Handbetrieb',
    valueIdHash: 763685401,
    valueIndex: null,
    changedValue: 2,
    currentValue: null,
}];

function hex(value, digits) {
    return `0x${value.toString(16).padStart(digits, '0').toUpperCase()}`;
}

async function main() {
    const conn = new vbus.TcpConnection({
        host: '...',
        password: 'vbus',
    });

    await conn.connect();

    conn.on('datagram', dgram => {
        const bytes = Array.from(dgram.toLiveBuffer()).map(b => hex(b, 2)).join(' ');

        console.log(`- \`${bytes}\``);
        console.log(`    - destination address = \`${hex(dgram.destinationAddress, 4)}\``);
        console.log(`    - source address = \`${hex(dgram.sourceAddress, 4)}\``);
        console.log(`    - command = \`${hex(dgram.command, 4)}\``);
        console.log(`    - 16-bit parameter = \`${hex(dgram.valueId, 4)}\``);
        console.log(`    - 32-bit parameter = \`${hex(dgram.value, 8)}\``);
    });

    let dgram = await conn.waitForFreeBus();
    if (!dgram) {
        throw new Error(`No bus offer received`);
    }

    const peerAddress = dgram.sourceAddress;

    // console.log(`PeerAddress = 0x${hex(peerAddress, 4)}`);

    dgram = await conn.getValueById(peerAddress, 0x00000000);
    if (!dgram) {
        throw new Error(`Unable to get changeset ID`);
    }

    // console.log(`Changeset ID = ${hex(dgram.value, 8)}`);

    const valuesToLookup = values.filter(value => (value.valueIdHash != null) && (value.valueIndex == null));
    if (valuesToLookup.length > 0) {
        for (const value of valuesToLookup) {
            dgram = await conn.getValueIdByIdHash(peerAddress, value.valueIdHash);
            if (!dgram) {
                throw new Error(`Unable to lookup value ID hash`);
            }

            value.valueIndex = dgram.valueId;
        }

        // Resynchronize between lookup and get/set
        dgram = await conn.getValueById(peerAddress, 0x00000000);
        if (!dgram) {
            throw new Error(`Unable to get changeset ID`);
        }
    }

    const valuesToSet = values.filter(value => (value.valueIndex != null) && (value.changedValue != null));
    if (valuesToSet.length > 0) {
        for (const value of valuesToSet) {
            dgram = await conn.setValueById(peerAddress, value.valueIndex, value.changedValue);
            if (!dgram) {
                throw new Error(`Unable to set value`);
            }

            value.changedValue = null;
            value.currentValue = null;
        }

        // Resynchronize between get and set
        dgram = await conn.getValueById(peerAddress, 0x00000000);
        if (!dgram) {
            throw new Error(`Unable to get changeset ID`);
        }
    }

    const valuesToGet = values.filter(value => (value.valueIndex != null) && (value.currentValue == null));
    if (valuesToGet.length > 0) {
        for (const value of valuesToGet) {
            dgram = await conn.getValueById(peerAddress, value.valueIndex);
            if (!dgram) {
                throw new Error(`Unable to get value`);
            }

            value.currentValue = dgram.value;
        }
    }

    await conn.releaseBus(peerAddress);

    await conn.disconnect();
}

main().then(null, err => {
    console.error(err);
    process.exit(1);
});
```
