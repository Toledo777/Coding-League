function determineRank(skillLevel) {
	let rank;
	const BEGINNER = 100;
	const INTERMEDIATE = 500;
	const EXPERT = 1000;

	switch (skillLevel) {
	case ('Beginner'):
		rank = BEGINNER;
		break;
	case ('Intermediate'):
		rank = INTERMEDIATE;
		break;
	case ('Expert'):
		rank = EXPERT;
		break;
	default: 
		throw new Error('did not specified right level');
	}
	return rank;
}

export {determineRank};