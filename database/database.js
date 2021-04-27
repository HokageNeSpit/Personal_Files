var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "database/db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {

    if (err) {
      console.error(err.message)
      throw err
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`PRAGMA foreign_keys = ON;`);
        db.run(`CREATE TABLE personnel_department_system (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            personal_affairs text,
            photo text
            )`,
        (err) => {
            if (err) {
                console.log("Table personnel_department_system is already created");
            } else {
                console.log("Table personnel_department_system created");
            }
        });
        db.run(`CREATE TABLE register_of_entries_in_the_workbook (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          number text,
          date text,
          work_place text,
          personnel_department_system_id INTEGER NOT NULL,
          FOREIGN KEY (personnel_department_system_id) REFERENCES personnel_department_system(id)
          ON DELETE CASCADE
          )`,
      (err) => {
          if (err) {
              console.log("Table register_of_entries_in_the_workbook is already created");
          } else {
              console.log("Table register_of_entries_in_the_workbook created");
          }
      });            
    }
});
class Data_interaction {
  static add_personnel_department_system(personal_affairs, photo) {
    return new Promise((resolve, reject) => {
      var insert = 'INSERT INTO personnel_department_system (personal_affairs, photo) VALUES (?,?)';
      db.run(insert, [personal_affairs, photo]);
      resolve();
     });
  }

  static add_register_of_entries_in_the_workbook(number, date, work_place,  personnel_department_system_id) {
    return new Promise((resolve, reject) => {
      var insert = 'INSERT INTO register_of_entries_in_the_workbook (number, date, work_place, personnel_department_system_id) VALUES (?,?,?,?)';
      db.run(insert, [number, date, work_place, personnel_department_system_id]);
      resolve();
     });
  }
  static get_personnel_department_system() {
    return new Promise((resolve, reject) => {
      let res = [];
      db.all(`SELECT * FROM personnel_department_system;`, [], (err, rows) => {
          if (err) {
              err = (`Unable to select personnel_department_system`);
              reject(err);
          }

          if ((rows !== undefined) && (rows.length > 0)) {
              rows.forEach(row => {
                res.push(row);
              });
          }
          resolve(res)
      })
    });
  }
  static delete_personnel_department_system(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM personnel_department_system WHERE id=?`, id, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  static get_register_of_entries_in_the_workbook(id) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM register_of_entries_in_the_workbook WHERE personnel_department_system_id=?;`, id, (err, el) => {
          if (err) {
              err = (`Unable to select register_of_entries_in_the_workbook`);
              reject(err);
          }
          resolve(el);
      })
    });
  }
}
module.exports = {
  "di": Data_interaction
}