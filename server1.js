var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbo=null

function addData(){

	  	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		dbo = db.db("bom");
		//myobj={userid:"ankur",password:"hello",type:"mbom"}
	  	dbo.collection("mbom").insertOne({}, function(err, res) {
	    if (err) throw err;
	    console.log("Number of documents inserted: " + res.insertedCount);
	    db.close();
	 	});
	  }); 
	}

function readData(){
    var data={success:false}
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      dbo = db.db("bom");
      dbo.collection('mbom').find().toArray(function(err, result) {
      if (err) throw err;
    
        console.log(result)
        if(result.length > 0) {
          var obj=new Object()
          obj.userid=result[0].userid
          obj.type=result[0].type
          obj.success=true
          data=obj
          //res.send(obj)
        }


      db.close();
      });
    }); 

  }

  readData()