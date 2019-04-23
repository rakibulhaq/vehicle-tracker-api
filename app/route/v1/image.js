const router = require('express').Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
    destination: APP_ASSET_PATH,
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return callback(err);
            callback(null, raw.toString('hex') + path.extname(file.originalname));
          });
    }
  });
const upload = multer({ storage: storage });

const ImageController = require('../../api/v1/image').ImageController;

let imageController = new ImageController();

router.post('/', upload.single('avatar') ,imageController.upload);
router.delete('/:id', imageController.remove);

module.exports = router;