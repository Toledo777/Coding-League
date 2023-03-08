function determineRank(skillLevel) {
	let rank;
	switch (skillLevel) {
	case ('Beginner'):
		rank = 100;
		break;
	case ('Intermediate'):
		rank = 500;
		break;
	case ('Expert'):
		rank = 100;
		break;
	default: 
		throw new Error('did not specified right level');
	}
	return rank;
}

export {determineRank};