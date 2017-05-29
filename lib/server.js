'use strict'

import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Promise from 'bluebird'
import config from '../config'

const app = express()

/* connect to db */
mongoose.connect(config.mongodb)

mongoose.connection.on('error', () => {
  console.log('Mongodb connection error\nExiting now')
  process.exit(1)
})

mongoose.connection.on('connected', () => {
  //listen on config port
  app.server = app.listen(config.port, e => {
    console.log('listening on', config.port)
  })
})

//error loggin and handling
const logErrors = (err, req, res, next) => {
  console.err(err.stack)
  next(err)
}

const errorHandler = (err, req, res, next) => {
  if (err.status == 404){
    res.status(404)
    res.send(err.message || 'Not found')
  }
  res.status(err.status || 500)
  res.send({'error': err.message || 'Error occured'})
}

//Block certain http request methods
app.use((req, res, next) => {
  const methods = ['PUT', 'POST', 'DELETE', 'PATCH']
 
  Promise.each(methods, method => {
    if (req.method == method){
      throw new Error('Method Not Allowed')
    }
  }).then(() => {
    //method allowed, proceed to next middleware
    next()
  }).catch( err => {
    err.status = 405
    next(err)
  })
})

//keep error handler last middleware function
app.use(errorHandler)

module.exports = app
