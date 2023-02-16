import express from 'express';
const router = express.Router();


router.get('/one-problem', (req, res) => {
	let x = (Math.floor(Math.random() * (1, req.query.range)) + 1);
	console.log(x);
	res.json({ id: x, text: 'sample problem ' + x });
});

export default router;