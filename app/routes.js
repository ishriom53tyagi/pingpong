const express = require('express');
const router = express.Router();

const player = require('./services/players');
const matches = require('./services/matches');

router.post("/add/players" ,player.addPlayers);
router.post("/getPlayer" , player.getPlayers);

router.post("/add/matches" ,matches.addMatches);
router.get('/getMatches',matches.getMatches);
router.get('/getTopPerformers',matches.getTopPerfomers);


module.exports = router;