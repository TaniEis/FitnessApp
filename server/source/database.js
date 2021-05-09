var mongoose = require('mongoose');


  const setConnection = () => {
    mongoose.connect(
        "mongodb://localhost:27017/Workout",
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
      const db = mongoose.connection

      db.on('error', (err)=>{
          console.log(err)
      })
      db.once('open', ()=>{
        console.log("Database Connection Established")
    })
  };

  const database = {
    setConnection: setConnection
  };
  
  module.exports = database;
