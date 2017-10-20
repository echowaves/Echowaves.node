exports.up = function(pgm) {
  pgm.createTable(
    'photos',
    {
      id: 'id',
      email: {type: 'string', notNull: true },
      password: {type: 'string', notNull: true },
      createdAt: {type: 'timestamp '},
      updatedAt: {type: 'timestamp'}
    })
  pgm.sql(
    'CREATE UNIQUE INDEX users_email_key ON photos (lower(email));'
  )
}

exports.down = function(pgm) {
  pgm.dropTable('photos')
};
