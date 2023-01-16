/**
 * 
		Ловушка	                  Что вызывает
		get	                      чтение свойства
		set	                      запись свойства
		has	                      оператор in
		deleteProperty	          оператор delete
		apply	                    вызов функции
		construct	                оператор new
		getPrototypeOf	          Object.getPrototypeOf
		setPrototypeOf	          Object.setPrototypeOf
		isExtensible	            Object.isExtensible
		preventExtensions	        Object.preventExtensions
		defineProperty	          Object.defineProperty, Object.defineProperties
		getOwnPropertyDescriptor	Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries
		ownKeys	                  Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object.keys/values/entries
 */

let dictionary = {
	'Hellow': 'Привет',
	'World': 'Мир',
};

dictionary = new Proxy(dictionary, {
	get(target, phrase) {
		return target[phrase] ?? 'Совпадение не найдено';
	}
});

console.log(dictionary['Hellow']);
console.log(dictionary['World']);
console.log(dictionary['Hellow World']);

/************************************************************/

let user = {
	name: 'User',
	age: 42,
	_password: '*****',
	_role: '****'
}

user = new Proxy(user, {
	get(target, prop) {
		if (prop.startsWith('_')) {
			throw new Error(`Нет доступа к свойству [${prop}]`);
		}
		const value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value;
	},

	set(target, prop, newValue) {
		if (prop.startsWith('_')) {
			throw new Error(`Нет доступа к свойству [${prop}]`);
		}
		target[prop] = newValue;
		return true;
	},

	deleteProperty(target, prop) {
		if (prop.startsWith('_')) {
			throw new Error(`Нет доступа к свойству [${prop}]`);
		}
		delete target[prop];
		return true;
	},

	ownKeys(target) {
		return Object.keys(target).filter((key) => !key.startsWith('_'));
	}
});

try {
	const p = user['_role'];
	console.log(p);
} catch(e) {
	console.log(e)
}

try {
	user['_password'] = 'new Password';
} catch(e) {
	console.log(e);
}

try {
	delete user._password;
} catch(e) {
	console.log(e);
}

delete user.lastName;

for (let key in user) {
	console.log(key);
}