module.exports =
  activate: ->
  deactivate: ->
  provideLinter: ->
    provider =
      grammarScopes: ['source.python', 'source.python.django']
      scope: 'file' # or 'project'
      lintOnFly: false # must be false for scope: 'project'
      lint: (textEditor)->
        return new Promise (resolve, reject)->
          message = {type: 'Error', text: 'Something went wrong', range:[[0,0], [0,1]]}
          resolve([message])
