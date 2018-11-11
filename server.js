var MongoClient = require('mongodb').MongoClient;
var http=require('http');
var url = "mongodb://localhost:27017/";
var dbo=null
var app=require('express')()
var http=require('http').Server(app)
var io=require('socket.io')(http)
var cors=require('cors')
//app.use(express.bodyParser());
app.use(cors())
/*app.get('/',function(req,res){
  res.sendFile('login.html',{root : __dirname});
})*/
app.post('/',function(req,res){
  var jsonString=''
  req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
          var userid=jsonString.split("&")[0].split("=")[1]
          var password=jsonString.split("&")[1].split("=")[1]
          new_data=readData({userid:userid,password:password},"login",res)
      
           // res.send(new_data)
        });
})

io.on('connection',function(socket){
  id=socket.id
  console.log(id)
  socket.on('ebom_attr',function(data){
    if(data.toUpdate==false) {
    addBomData(data,'ebom',id)
  } else {
    updateEbom(data,id)
  }
  })

  socket.on('mbom_attr',function(data){
    var part_no=data.part_no;
    console.log(data)
    var data2=checkEbom({part_no:part_no},'ebom',id,data)
  })

  socket.on('read_ebom',function(data){
    console.log(data)
    readEbomData({part_no:data.part_no},'ebom',id)
  })
   socket.on('read_mbom',function(data){
    console.log(data)
    readMbomData({part_no:data.part_no},'mbom',id)
  })
   socket.on('need_change',function(data){
    updateEbom(data,'ebom',id,{update:'pending'})
   })
   socket.on('change_on_approval',function(data){
    updateEbom({part_no:part_no},'ebom',id,data)
   })
   socket.on('approve_ebom',function(id2){
    updateEbomStatus(id2,id)
   })
   socket.on('check_mstatus',function(id2){
    console.log(id2)
    updateMbomStatus(id2,id)
   })
})


    function addBomData(data,bom_type,id){

      MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("bom");

      dbo.collection(bom_type).insertOne(data, function(err, res) {
      if (err) 
        if(bom_type=='ebom')
      { io.to(id).emit('ebom_return',{success:false})  }
        else
      { io.to(id).emit('mbom_return',{success:false})  }
      else
      if(bom_type=='ebom')
      { io.to(id).emit('ebom_return',{success:true})  }
        else
      { io.to(id).emit('mbom_return',{success:true})  }
      db.close();
    });
    }); 
  }

  function updateEbom(query,id){

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("bom");
    var newvalues = { $set: {qty:query.qty,deadline:query.deadline,material:query.material,specs:query.specs,manufacture:query.manufacture,status:false,date:query.date} };
    dbo.collection("ebomd").updateOne({part_no:query.part_no}, newvalues, function(err, res) {
      if (err) throw err;
      io.to(id).emit('change_status',{success:true})
      db.close();
      });
    }); 
  }

  function readData(query,c_type,res){
    var data={success:false}
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      dbo = db.db("bom");
      dbo.collection(c_type).find(query).toArray(function(err, result) {
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

        res.send(data)
      db.close();
      });
    }); 

  }


  function readEbomData(query,c_type,id){
    var data={success:false}
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      dbo = db.db("bom");
      dbo.collection(c_type).find(query).toArray(function(err, result) {
      if (err) throw err;
    
        console.log(result)
        if(result.length > 0) {
         result[0]._id=null
         data.success=true
         data.query=result[0]
          //res.send(obj)
        }
        io.to(id).emit('ebom_data',data)

      db.close();
      });
    }); 

  }

   function readMbomData(query,c_type,id2){
    var data={success:false}
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      dbo = db.db("bom");
      dbo.collection('ebom').find(query).toArray(function(err, result) {
      if (err) throw err;
    
        console.log(result.length)
        if(result.length > 0) {
         id=result[0]._id
         console.log(id)
         data.ebom=result[0]
         dbo.collection('mbom').find({ebom_id:id}).toArray(function(err, result2) {
         if (err) throw err;
         console.log('mbom:-',result2)
        if(result.length>0) {
         data.mbom=result2[0]
         data.success=true
        } 
          //res.send(obj)
         console.log("mbom:-",data)
         io.to(id2).emit('mbom_data',data)
        })

        }
        
  

      db.close();
      });
    }); 

  }


    function checkEbom(query,c_type,id,datax){
    var data={success:false}
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      dbo = db.db("bom");
      dbo.collection(c_type).find(query).toArray(function(err, result) {
      if (err) { throw err };
    
      
      if(result.length > 0) {
        console.log(result)
          //datax['id']=result[0]._id
          

         // datax['ebom_id']=result.id
     // console.log("id",data.id)
          data2={com:datax.com,ploc:datax.ploc,vcode:datax.vcode,sob:datax.sob,dloc:datax.dloc,sp:datax.sp,mod:datax.mod,ebom_id:result[0]._id}
          console.log("data2",data2)
         addBomData(data2,'mbom',id)

        }

      
      db.close();
      });
    }); 

  }

  function delData(query){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      dbo = db.db("mydatabse");
      dbo.collection("data").deleteOne(query, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
      });
    }); 
  }

function updateEbomStatus(id2,id) {
  console.log(id)
   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("bom");
    dbo.collection("ebom").updateOne({part_no:id2},{$set: {status:true}}, function(err, res) {
      if (err) throw err;
      console.log(res)
      io.to(id).emit('change_status',{success:true})
      db.close();
      });
    }); 
}

function updateMbomStatus(id2,id) {

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      dbo = db.db("bom");
      dbo.collection("ebom").find({part_no:id2}).toArray(function(err, result) {
      if (err) throw err;
    
        console.log(result)
        if(result.length > 0) {
          if(result[0].status==false) {
            dbo.collection("ebom").updateOne({part_no:id2},{$set: {status:"pending"}},function(err, result2) {
      if (err) throw err;
    
        io.to(id).emit('mbom_status',{status:result[0].status})
      })
          }
          //res.send(obj)
        }

      db.close();
      });
    }); 
}
//addData();
//updateData(myquery, queryup);
//readData();
//delData(myquery);
//readData();
http.listen(4000,function(){
  console.log("listening")
})