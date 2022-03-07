const express = require('express')
const http = require('http');
const { generateUUID } = require('./utils/helpers.js');
const Helpers = require('./utils/helpers.js')

const pg = require('knex')({
  client: 'pg',
  version: '9.6',      
  searchPath: ['knex', 'public'],
  connection: () => {
    if("test" == process.env.BUILD_ENV) {
      return process.env.PG_TEST_CONNECTION_STRING ? process.env.PG_TEST_CONNECTION_STRING : 'postgres://example:example@localhost:5433/test'
    }
    return process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
  }
});
const app = express();
http.Server(app); 



app.get('/', async (req, res) => {
  const result = await pg
    .select(['uuid', 'author', 'created_at', "message"])
    .from('messages')
  res.json({
      data: result
  })
})

async function initialiseTables() {
  await pg.schema.hasTable('messages').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('messages', (table) => {
          table.increments().primary();
          table.uuid('uuid');
          table.string('author');
          table.string('message');
          table.integer('likes');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table message');
          const uuid = Helpers.generateUUID();
          await pg.table('messages').insert({ uuid, author: `BOT`, message: "hello" })
          
        });
        
    }
  });
}
initialiseTables()

module.exports = app;