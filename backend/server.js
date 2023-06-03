const { MongoConnection } = require("./src/config/database");
const app = require("./src/config/express");
const { PORT } = require("./src/config/vars");
const colors = require("colors");

(async () => {
try{

     const connection = new MongoConnection();
    await connection.connectionToDb();
    console.log("database connected succesfully".bgBlue)

    app.listen(PORT,()=>{
        console.log(
        `Server running on port ${PORT}`

        )
    })


}catch(error){
    console.log(error);
    
}
})();