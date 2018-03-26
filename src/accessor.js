var Promise = require('promise');

var Accessor = function(config, single, plural){
  var zdrequest = require('./zdrequest.js')(config)

  return {
    list: function(params){
      return new Promise(function(fufill, reject){
        var urlParams = params ? '?' + params : '';
        zdrequest.get('/' + plural + '.json' + urlParams).then(function(data){
          var key = plural === 'search' ? 'results' : plural
          fufill(data[key])
        }).catch(function(err){
          reject(err)
        })
      })
    },

    showMany: function(ids){
      return new Promise(function(fufill, reject){
        zdrequest.get('/' + plural + '/show_many.json?ids='+ids ).then(function(data){
          var key = plural === 'search' ? 'results' : plural
          fufill(data[key])
        }).catch(function(err){
          reject(err)
        })
      })
    },

    show: function(id, childrenName){
			var children = childrenName ? '/'+childrenName : ''
      return new Promise(function(fufill, reject){
        zdrequest.get('/' + plural + '/' + id + children + '.json').then(function(data){
          fufill(children ? data[childrenName] : data[single])
        }).catch(function(err){
          reject(err)
        })
      })
    },

    create: function(data){
      var createData = {}
      createData[single] = data
      return new Promise(function(fufill, reject){
        zdrequest.post('/' + plural + '.json', createData).then(function(data){
          fufill(data)
        }).catch(function(err){
          reject(err)
        })
      })
    },
    
    createOrUpdate: function(data){
      var createData = {}
      createData[single] = data
      return new Promise(function(fufill, reject){
        zdrequest.post('/' + plural + '/create_or_update.json', createData).then(function(data){
          fufill(data)
        }).catch(function(err){
          reject(err)
        })
      })
    },

    update: function(id, data, child){
      var createData = {}
      createData[single] = data;
			child = child ? '/'+child.name+'/'+child.id : ''
      return new Promise(function(fufill, reject){
        zdrequest.put('/' + plural + '/' + id + child + '.json', createData).then(function(data){
          fufill(data)
        }).catch(function(err){
          reject(err)
        })
      })
    },

    delete: function(id){
      return new Promise(function(fufill, reject){
        zdrequest.delete('/' + plural + '/' + id + '.json').then(function(){
          fufill(true)
        }).catch(function(err){
          reject(err)
        })
      })
    }
  }
}

module.exports = Accessor
