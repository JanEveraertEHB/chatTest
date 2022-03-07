

async function initialiseTable(pg, done) {
  await pg.schema.hasTable('posts').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('posts', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('title');
          table.string('summary');
          table.timestamps(true, true);
        }); 
    } else {
      console.log("already exists");
    }
  });
  await pg.raw('BEGIN');
  done();
}

module.exports = { initialiseTable };
