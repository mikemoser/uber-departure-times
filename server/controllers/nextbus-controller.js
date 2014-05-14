'use strict'

module.exports.search = function (req, res) {
  // TODO: Remove mock data
  res.json([{
    name: 'J-Church',
    stops: [{
      id: '123',
      name: '24th & Church',
      direction: 'Outbound'
    }, 
    {
      id: '456',
      name: '24th & Church',
      direction: 'Inbound'
    }]      
  },
  {
    name: '14 - Folsom',
    stops: [{
      id: '123',
      name: '22nd & Mission',
      direction: 'Outbound'
    }, 
    {
      id: '456',
      name: '22nd & Mission',
      direction: 'Inbound'
    }]      
  }]);
}

module.exports.predictions = function (req, res) {
  res.json([1,2,3]);
}