const router = require('express').Router;
const IndustrySubsectionController = require(APP_CONTROLLER_PATH + 'industry_subsection');

let industrySubsectionController = new IndustrySubsectionController();

router.get('/', industrySubsectionController.get);
router.get('/:id', industrySubsectionController.getIndustrySubsectionInfo);
router.post('/:id', industrySubsectionController.post);
router.delete('/:id', industrySubsectionController.del);
router.put('/:id', industrySubsectionController.put);

module.exports = router;