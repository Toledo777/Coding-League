function solve(input) {
	const lines = input.split('\n').filter(line => line.includes('X'));
	console.log(lines);
	return lines.length - lines.filter(l => l.includes('--')).length * 2;
}