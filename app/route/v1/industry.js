const router = require('express').Router;
const IndustryController = require(APP_CONTROLLER_PATH + 'industry');

let industryController = new IndustryController();

router.get('/', industryController.get);
router.get('/:id', industryController.getIndustryInfo);
router.post('/:id', industryController.post);
router.delete('/:id', industryController.del);
router.put('/:id', industryController.put);

module.exports = router;