const express = require("express");
const sql = require("msnodesqlv8");
const cors = require("cors")
const port = 8100;


const connectionString =
  "Driver={ODBC Driver 17 for SQL Server};Server=2594-RAJKAMALVE;Database=ims;Trusted_Connection=Yes;";
const app = express();

app.use(cors())

app.use(express.json());

sql.query(connectionString, "SELECT 1", (err) => {
    if (err) {
      console.error("Database connection failed:", err);
    } else {
      console.log("Database connected successfully!");
    }
  });
app.get('/', (request, response) => {
//   response.status(200).send("The server is listening to request");
  
  const query = "SELECT * FROM products";
  sql.query(connectionString, query, (err, rows) => {
    if (err) {
      console.error("Error occurred:", err);
      return response.status(500).send("Something went wrong");
    }
    response.status(200).json(rows);
  });
});

app.get('/id',(request,response)=>{
    const id = request.query.id
    const query = `select * from products where id=?`
    sql.query(connectionString,query,[id],(err,rows)=>{
        if(err){
           return response.status(500).send("Something went wrong")
        }
        if(rows.length===0){
          return response.status(200).send(`No records available for id: ${id}`)
        }
        response.status(200).json(rows)
    })
    
})


app.post('/add',(request,response)=>{
    const {name,category,quantity,price,supplier,created_at} = request.body
    console.log(name,category,quantity,price,supplier,created_at)
    if(!name || !category || quantity===undefined || price===undefined || !supplier){
      return  response.status(400).send("Some data is missing")
    }  
    const currentDate = created_at ? new Date(created_at) : new Date(); 
    console.log(quantity,typeof quantity)
    console.log(price,typeof price)
    const query = "insert into products (name,category,quantity,price,supplier,created_at) values (?, ?, ?, ?, ?,?) "
    console.log(query)
    const values = [name,category,quantity,price,supplier,currentDate]
    console.log(values)
 
    
    
    sql.query(connectionString,query,values,(err,rows)=>{
        if(err){
            console.log(err)
         return  response.status(500).send("Something went wrong")
        }
        response.status(201).send("Data successfully added")
    
    })
 


})

app.put('/update',(request,response)=>{
        const {id,name,category,quantity,price,supplier}=request.body
        if(!id || !name || !category || quantity===undefined || price===undefined || !supplier){
          return  response.status(500).send("Some data are missing")
        } 
        const query = "update products set name = ? , category = ? , quantity =?,price =? ,supplier = ? where id = ?";
        const values = [name,category,quantity,price,supplier,id]
            sql.query(connectionString,query,values,(err,rows)=>{
                if(err){
                    console.log(err)
                    return response.status(500).send("Something went wrong")
                }else{
                 return response.status(200).send("Successfully updated data")
                }
                
                
            })
        
})

app.delete('/delete',(request,response)=>{
        const id = request.query.id
        const query = "delete from products where id = ?"
        sql.query(connectionString,query,[id],(err,rows)=>{
                if(err){
                    console.log(err)
                   return response.status(500).send("Something went wrong")
                }
                if(rows.length===0){
                  return response.status(200).send(`No records available for id: ${id}`)
                }
                response.status(204).send("Data deleted successfully")
        })
})

app.listen(port, () => {
  console.log(`My express server is running on port no. ${port}`);
});
