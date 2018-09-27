const router = require('express').Router();
const IndustrySubsectionController = require(APP_CONTROLLER_PATH + 'industry_subsection');

let industrySubsectionController = new IndustrySubsectionController();

router.get('/', industrySubsectionController.getAll);
router.get('/:id', industrySubsectionController.getIndustrySubsectionInfo);
router.post('/', industrySubsectionController.create);
router.delete('/:id', industrySubsectionController.remove);
router.put('/:id', industrySubsectionController.update);

module.exports = router;