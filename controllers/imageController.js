const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const connect = mongoose.connection;
let gfs;
connect.once('open', function() {
  gfs = Grid(connect.db, mongoose.mongo);
  gfs.collection('uploads');
});

exports.image_get = function(req, res) {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    if (err) {return next(err);}
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      gfs.createReadStream(file.filename).pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
};