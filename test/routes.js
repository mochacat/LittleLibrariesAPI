'use strict'

import request from 'supertest'
import chai from 'chai'
import config from '../config'
import app from '../lib/server'

const should = chai.should()

const library = {
  _id: 1,
  name: 'Test Library',
  story: 'Test Story',
  coordinates: ['33.8121', '117.9190']
}

describe('Routes test', () => {
  it('POST should return 405 error', done => {
    request(app)
      .post('/libraries/1')
      .send(JSON.stringify(library))
      .set('Accept', 'application/json')
      .expect(405)
      .end((err, res) => {
        res.status.should.equal(405)
        done()
      })
  })

  it('PUT should return 405 code', done => {
    request(app)
      .put('/libraries/1')
      .send(JSON.stringify(library))
      .set('Accept', 'application/json')
      .expect(405)
      .end((err, res) => {
        res.status.should.equal(405)
        done()
      })
  })
  
  it('PATCH should return 405 code', done => {
    request(app)
      .patch('/libraries/1')
      .send(JSON.stringify(library))
      .set('Accept', 'application/json')
      .expect(405)
      .end((err, res) => {
        res.status.should.equal(405)
        done()
      })
  })

  it('DELETE should return 405 code', done => {
    request(app)
      .delete('/libraries/1')
      .expect(405)
      .end((err, res) => {
        res.status.should.equal(405)
        done()
      })
  })
})
