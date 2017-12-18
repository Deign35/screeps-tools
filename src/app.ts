import * as express from 'express'
import * as path from 'path'
import * as superagent from 'superagent'

let app = express()

app.use('/js', express.static('public/js'))
app.use('/img', express.static('public/img'))
app.use('/css', express.static('public/css'))

app.get('/api/shards', (req, res) => {
  let url = 'https://screeps.com/api/game/shards/info'
  superagent.get(url).end((err, agentRes) => {
    if(agentRes){
      res.json(agentRes.body)
    }else{
      res.end()
    }
  })
})

app.get('/api/terrain/:shard/:room', (req, res) => {
  let url = 'https://screeps.com/api/game/room-terrain?room=' + req.params.room +  '&encoded=1&shard=' + req.params.shard
  superagent.get(url).end((err, agentRes) => {
    if(agentRes){
      res.json(agentRes.body)
    }else{
      res.end()
    }
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.listen(3000)