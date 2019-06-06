class Stack {
	count = 0;
	storage = {};
}


// Adds a value onto the end of the stack
Stack.prototype.push = function(value) {
	this.storage[this.count] = value;
	this.count++;
};

// Removes and returns the value at the end of the stack
Stack.prototype.pop = function() {
	// Check to see if the stack is empty
	if (this.count === 0) {
		return undefined;
	}
	
	this.count--;
	const result = this.storage[this.count];
	delete this.storage[this.count];
	return result;
};

// Returns the length of the stack
Stack.prototype.size = function() {
	return this.count;
};

Stack.prototype.isEmpty = function () {
	return (this.size === 0);
};

Stack.prototype.dupContain = function () {
	return this.storage;
};


export default Stack;