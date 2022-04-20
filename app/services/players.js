
const common = require("../utils/common");
const getDb = require('../utils/mongoDatabase').getDb;

module.exports.addPlayers = async (req, res) => {
try{

  const db = getDb();

  let firstPlayerName = req.body.firstPlayerName ;
  let secondPlayerName = req.body.secondPlayerName ;

  if(!( (firstPlayerName &&  secondPlayerName) || (firstPlayerName == '' || secondPlayerName == '') ))  {
    return common.responseData(res, { status: false, statuscode: 401, message: "Please Enter Players Name'" });

    }

  let playerObj = {
    "firstPlayerName" : firstPlayerName,
    "secondPlayerName" : secondPlayerName
  }

  let checkPlayerExist = await isPlayer(playerObj);

  if(checkPlayerExist) {
    return common.responseData(res, { status: false, statuscode: 401, message: `Player Already exist with the name ${checkPlayerExist.name}` });
  }

    let playersObj =  [{
            name : firstPlayerName ,
            createdAt : Date.now()
    }, {
        name : secondPlayerName ,
        createdAt : Date.now()
    }] 

 let playerAdded = await db.collection('players').insertMany(playersObj);

  if(playerAdded && playerAdded.insertedCount == 2)  {
      return common.responseData(res, { status: true, statuscode: 200, message: "Players Added successfully" });
  }
} catch(error) {
    console.log('Error value is here' , error );
      return common.responseData(res, { status: false, statuscode: 401, message: error });
  }
}


module.exports.getPlayers = async (req, res) => {

  try {

    const db = getDb();

    let playerName = req.body.playerName ;
  
    if(!( playerName ))  {
      return common.responseData(res, { status: false, statuscode: 401, message: "Please Enter Players Name" });
      }
  
    let playerObj = { 
          "name" : playerName
      }
  
    let isPlayer = await getPlayerDetails(playerObj);
  
    if(!(isPlayer)) {
      return common.responseData(res, { status: false, statuscode: 404, message: "Player Does not exist with this name. Please try with another name" });
    }
  
    return common.responseData(res, { status: true, statuscode: 200, message: "Player Details" , data: isPlayer });
    
  } catch(err) {
    console.log("error value is here" , err);
    return common.responseData(res, { status: false, statuscode: 401, message: err });

  }
}
async function isPlayer ( playerObj) {

  const db = getDb();

  let players = await db.collection('players').findOne({ $or : [{  name : playerObj.firstPlayerName  }, { name : playerObj.secondPlayerName  }] });

  if(players ) {
       return players;
  }
  return false;
}


async function getPlayerDetails ( player) {

  const db = getDb();
  let firstPlayer = await db.collection('players').findOne({ name : player.name  });

  if(firstPlayer) {
    return  firstPlayer ;
  }
  return false;

}


