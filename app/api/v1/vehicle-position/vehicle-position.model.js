
var VehiclePosition = function(vehiclePosition){
    this.vehicle_id = vehiclePosition.vehicle_id;
    this.company_name = vehiclePosition.company_name;
    this.lattitude = vehiclePosition.lattitude;
    this.longitude = vehiclePosition.longitude;
    this.captured_time = vehiclePosition.captured_time;
    this.speed = vehiclePosition.speed;
    this.mobile_number = vehiclePosition.mobile_number;
};
VehiclePosition.createVehiclePosition = function createUser(newVehiclePosition, result) {    
    sql.query("INSERT INTO VehiclePositions set ?", newVehiclePosition, function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });           
};
VehiclePosition.getVehiclePositionById = function getVehiclePositionById(VehiclePositionId, result) {
    sql.query("Select VehiclePosition from VehiclePositions where id = ? ", VehiclePositionId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};
VehiclePosition.getAllVehiclePosition = function getAllVehiclePosition(result) {
    sql.query("Select * from VehiclePositions", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('VehiclePositions : ', res);  

             result(null, res);
            }
        });   
};
VehiclePosition.updateById = function(id, VehiclePosition, result){
sql.query("UPDATE vechicle_locations SET VehiclePosition = ? WHERE id = ?", [VehiclePosition.VehiclePosition, id], function (err, res) {
      if(err) {
          console.log("error: ", err);
            result(null, err);
         }
       else{   
         result(null, res);
            }
        }); 
};
VehiclePosition.remove = function(id, result){
 sql.query("DELETE FROM VehiclePositions WHERE id = ?", [id], function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
           
             result(null, res);
            }
        }); 
};



module.exports.VehiclePosition = VehiclePosition;