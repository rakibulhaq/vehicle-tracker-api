const express = require('express');
router = express.Router();

const ROUTE_V1_PATH = APP_ROUTE_PATH + "v1/";

router.use('/auth', require(ROUTE_V1_PATH + 'auth'));
router.use('/users', require(ROUTE_V1_PATH + 'user'));
router.use('/user_activities', require(ROUTE_V1_PATH + 'user_activity'));
router.use('/user_mentors', require(ROUTE_V1_PATH + 'user_mentor'));
router.use('/user_tests', require(ROUTE_V1_PATH + 'user_test'));
router.use('/user_tickets', require(ROUTE_V1_PATH + 'user_ticket'));
router.use('/user_coupons', require(ROUTE_V1_PATH + 'user_coupon'));
router.use('/user_permissions', require(ROUTE_V1_PATH + 'user_permission'));
router.use('/user_purchases', require(ROUTE_V1_PATH + 'user_purchase'));
router.use('/user_tiers', require(ROUTE_V1_PATH + 'user_tier'));
router.use('/user_levels', require(ROUTE_V1_PATH + 'user_level'));
router.use('/skills', require(ROUTE_V1_PATH + 'skill'));
router.use('/skill_types', require(ROUTE_V1_PATH + 'skill_type'));
router.use('/industries', require(ROUTE_V1_PATH + 'industry'));
router.use('/industry_subsections', require(ROUTE_V1_PATH + 'industry_subsection'));
router.use('/coupons', require(ROUTE_V1_PATH + 'coupon'));
router.use('/tickets', require(ROUTE_V1_PATH + 'ticket'));
router.use('/packages', require(ROUTE_V1_PATH + 'package'));
router.use('/components', require(ROUTE_V1_PATH + 'component'));
router.use('/activities', require(ROUTE_V1_PATH + 'activity'));

module.exports = router;
