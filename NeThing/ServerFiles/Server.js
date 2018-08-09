var express = require('express')
var app = express()
var router = express.Router()
var path = 'views/'
const OSC = require('osc-js')
app.use(express.static('public'))

router.get('/', function (req, res) {
  res.sendFile('index.html')
})

app.use('/', router)

app.listen(3000, function () {
  console.log('Live at Port 3000')
})

const config = { udpClient: { port: 9129 } }
const osc = new OSC({ plugin: new OSC.BridgePlugin(config) })

osc.open() // start a WebSocket server on port 8080
