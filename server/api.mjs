import express from 'express';
const router = express.Router();


router.get('/one-problem', (req, res) => {
	let x = (Math.floor(Math.random() * (1, req.query.range)) + 1);
	console.log(x);
	if (x == 1) {
		res.json({ id: 1, text: 'sample problem 1' });
	}
	else if (x == 2) {
		res.json({ id: 2, text: 'sample problem 2' });
	}
	else if (x == 3) {
		res.json({ id: 3, text: 'sample problem 3' });
	}
	else if (x == 4) {
		res.json({ id: 4, text: 'sample problem 4' });
	}
	else if (x == 5) {
		res.json({ id: 5, text: 'sample problem 5' });
	}
});

export default router;