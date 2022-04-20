const { exec } = require("child_process");
var cfg = require("../../config/config.json");
const getDb = require('../utils/mongoDatabase').getDb;

module.exports.saveServerIp = async (req, res, next) => {
  const db = getDb();
  let org_id = cfg.org_id;
  exec(" hostname -I | awk '{print $1}' ", async (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    let ip = stdout.trim();
    // console.log("Org id value is here", org_id);
    let Data = {
      ip: ip,
      created_time: Math.floor(((new Date()).getTime()) / 1000),
      status: true
    }
    let checkData = {
      'ip': ip
    }
    if (org_id) {
      checkData["org_id"] = org_id
      Data["org_id"] = org_id
    }
    //save server IP
    await db.collection('router_boot_log').updateOne(checkData, {
      $set: Data
    }, {
      'upsert': true
    });
  });
}


