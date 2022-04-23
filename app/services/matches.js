const common = require("../utils/common");
const player = require("../services/players");
const getDb = require("../utils/mongoDatabase").getDb;

module.exports.addMatches = async (req, res) => {
  const db = getDb();

  let firstPlayerName = req.body.firstPlayerName;
  let secondPlayerName = req.body.secondPlayerName;
  let playerObj = {
    firstPlayerName: firstPlayerName,
    secondPlayerName: secondPlayerName,
  };
  let checkPlayerExist = await isPlayer(playerObj);
  // let checkPlayerExist = await player.isPlayer(req);

  if (!(checkPlayerExist.length == 2)) {
    return common.responseData(res, {
      status: false,
      statuscode: 401,
      message: "Player does not exist with this name",
    });
  }

  let firstPlayerWins = req.body.firstPlayerWins;
  let secondPlayerWins = req.body.secondPlayerWins;

  let winner;

  if (firstPlayerWins > secondPlayerWins) {
    winner = firstPlayerName;
  } else {
    winner = secondPlayerName;
  }

  let winsBy = Math.abs(firstPlayerWins - secondPlayerWins); // absolute value to get positive response always;

  let matchObj = {
    firstPlayer: { name: firstPlayerName, wins: firstPlayerWins },
    secondPlayer: { name: secondPlayerName, wins: secondPlayerWins },
    winner: winner,
    winsBy: winsBy,
    createdAt: Date.now(),
  };

  let matchAdded = await db.collection("matches").insertOne(matchObj);

  if (matchAdded && matchAdded.insertedCount == 1) {
    return common.responseData(res, {
      status: true,
      statuscode: 200,
      message: "match added successfully",
    });
  }
};

module.exports.getMatches = async (req, res) => {
  try {
    const db = getDb();

    let limit = Number(req.query.list) || 20;

    let matchesList = await db
      .collection("matches")
      .find({})
      .limit(limit)
      .toArray();

    if (!(matchesList && matchesList.length)) {
      return common.responseData(res, {
        status: false,
        statuscode: 404,
        message: "No matches found. Please add one",
      });
    }

    return common.responseData(res, {
      status: true,
      statuscode: 200,
      message: "Players Added successfully",
      data: matchesList,
    });
  } catch (err) {
    return common.responseData(res, {
      status: false,
      statuscode: 401,
      message: err,
    });
  }
};

module.exports.getTopPerfomers = async (req, res) => {
  try {
    const db = getDb();

    let limit = Number(req.query.list) || 5;

    let isPlayer = await getTopPerfomersPlayer(limit);

    if (!isPlayer) {
      return common.responseData(res, {
        status: false,
        statuscode: 404,
        message:
          "Player Does not exist with this name. Please try with another name",
      });
    }

    return common.responseData(res, {
      status: true,
      statuscode: 200,
      message: "Players Added successfully",
      data: isPlayer,
    });
  } catch (err) {
    return common.responseData(res, {
      status: false,
      statuscode: 401,
      message: err,
    });
  }
};

async function getTopPerfomersPlayer(limit) {
  const db = getDb();

  let getTopPerformer = await db
    .collection("matches")
    .aggregate([
      { $limit: limit },
      {
        $group: { _id: "$winner", sum: { $count: {} } },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ])
    .toArray();

  if (getTopPerformer && getTopPerformer.length) {
    return getTopPerformer;
  }
  return false;
}

async function isPlayer(obj) {
  const db = getDb();
  let players = await db
    .collection("players")
    .find({
      $or: [{ name: obj.firstPlayerName }, { name: obj.secondPlayerName }],
    })
    .toArray();

  if (players && players.length) {
    return players;
  }
  return false;
}
