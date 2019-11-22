import { Router } from 'express';

const router = Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  res.cookie('id', '100');
  res.send({ 'lastName': 'test node server' });
});

export default router;
