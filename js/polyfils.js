// Array.prototype.filter
Array.prototype.filer = function(func) {
	if (!Array.isArray(this)) {
		return new Error('[this] is not an array');
	}

	const target = this;
	const result = [];

	for (let i = 0; i < target.length; i++) {
		if (func(target[i], i, target)) {
			result.push(target[i]);
		}
	}

	return result;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr.filter((item) => item % 2 === 0));
