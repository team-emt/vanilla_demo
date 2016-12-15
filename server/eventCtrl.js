const db = require('./database');

module.exports = {

  addToDb: (text) => {
    console.log('req.body.text : ', text);
    let stringText = JSON.stringify(text);
    db.conn.query(`
    INSERT INTO events 
    (_id, string )
    VALUES 
    (default, '${stringText}')
    `, (err, result) => {
        if (err) throw new Error(err);
        console.log('row added.');
      });
  },

  showAll: (socket) => {
    let result = [];
    let query = db.conn.query(`SELECT string FROM events`);
    query
      .on('row', (row) => {
        // row = { string : ~text string~ }
        result.push(row.string);
      })
      .on('end', () => {
        // console.log(result);
        console.log('completed query push!');  
        socket.emit('dbOnLoad', result)
      });
  }

}