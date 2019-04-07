const router = require('express').Router();
const IndustryController = require('../../api/v1/industry').IndustryController;

let industryController = new IndustryController();

router.get('/', industryController.getAll);
router.get('/:id', industryController.getIndustryInfo);
router.post('/', industryController.create);
router.delete('/:id', industryController.remove);
router.put('/:id', industryController.update);

module.exports = router;