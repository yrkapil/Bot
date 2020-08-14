/* eslint-disable*/
const dns = require('dns');


// Example
// Setting options for dns.lookup() method 
// const options = { 
      
//     // Setting family as 6 i.e. IPv6 
//     family: 6, 
//     hints: dns.ADDRCONFIG | dns.V4MAPPED, 
// }; 
const lookup = (hostname, {family = 0, hints, all = false, verbatim = false}, callback) => {
    dns.lookup(hostname, {family, hints, all, verbatim}, (err, address, family) => {
        if (err) throw err;
        callback(address, family);
    });
};

// rrtype
// A: IPv4 address
// AAAA: IPv6 address
// ANY: Any records
// CNAME: canonical name records
// MX: mail exchange records
// NAPTR: name authority pointer records
// NS: name server records
// PTR: pointer records
// SOA: start of authority records
// SRV: service records
// TXT: text records
const resolver = (hostname, rrtype = 'IPv4', callback) => {
    dns.resolve(hostname, rrtype, (err, records) => {
        if (err) throw err;
        callback(records);
    });
};

module.exports = {
    lookup,
    resolver
};

