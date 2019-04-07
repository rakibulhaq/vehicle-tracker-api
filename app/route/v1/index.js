const express = require('express');
router = express.Router();

const ROUTE_V1_PATH = APP_ROUTE_PATH + "v1/";

router.use('/auth', require(ROUTE_V1_PATH + 'auth'));
router.use('/users', require(ROUTE_V1_PATH + 'user'));
router.use('/user-activities', require(ROUTE_V1_PATH + 'user-activity'));
router.use('/user-mentors', require(ROUTE_V1_PATH + 'user-mentor'));
// router.use('/user-tests', require(ROUTE_V1_PATH + 'user-test'));
router.use('/user-tickets', require(ROUTE_V1_PATH + 'user-ticket'));
router.use('/user-skills', require(ROUTE_V1_PATH + 'user-skill'));
router.use('/user-coupons', require(ROUTE_V1_PATH + 'user-coupon'));
router.use('/user-permissions', require(ROUTE_V1_PATH + 'user-permission'));
router.use('/user-purchases', require(ROUTE_V1_PATH + 'user-purchase'));
router.use('/user-tiers', require(ROUTE_V1_PATH + 'user-tier'));
router.use('/user-levels', require(ROUTE_V1_PATH + 'user-level'));
router.use('/skills', require(ROUTE_V1_PATH + 'skill'));
// router.use('/skill-tests', require(ROUTE_V1_PATH + 'skill-test'));
router.use('/skill-types', require(ROUTE_V1_PATH + 'skill-type'));
router.use('/industries', require(ROUTE_V1_PATH + 'industry'));
router.use('/industry-subsections', require(ROUTE_V1_PATH + 'industry-subsection'));
router.use('/coupons', require(ROUTE_V1_PATH + 'coupon'));
router.use('/tickets', require(ROUTE_V1_PATH + 'ticket'));
router.use('/packages', require(ROUTE_V1_PATH + 'package'));
router.use('/components', require(ROUTE_V1_PATH + 'component'));
router.use('/activities', require(ROUTE_V1_PATH + 'activity'));
router.use('/permissions', require(ROUTE_V1_PATH + 'permission'));
// router.use('/user-sessions', require(ROUTE_V1_PATH + 'user-session'));

module.exports = router;
