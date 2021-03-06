var utils = require('../utils.js');

module.exports = function (req, res) {

	var query = req.query.query;
	console.log(query);
	utils.execute(function(err, connection) {
		if (err) {
	      //console.error(err.message);
	      res.status(500).json(utils.error(err.message));
	      return;
	    }
	    connection.execute(
	      query,
		  [],
		  function(err, result) {
	        if (err) {
	          //console.error(err.message);
	          utils.doRelease(connection);
	          res.status(404).json(utils.error(err.message));
	          return;
	        }
	        utils.doRelease(connection);
	        if(result.rows !== undefined) {
		        res.status(200).json(utils.format(result));
		    } else {
		    	res.status(200).json({rowsAffected: result.rowsAffected});
		    }
	    });
	});
};