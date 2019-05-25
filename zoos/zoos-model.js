const db = require('../data/dbConfig')

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
};

function find(query) {
  let { page = 1, limit = 5, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('zoos')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db('zoos')
    .where({ id })
    .first();
}

async function add(hub) {
  const [id] = await db('zoos').insert(hub);

  return findById(id);
}

function remove(id) {
  return db('zoos')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('zoos')
    .where({ id })
    .update(changes, '*');
}

