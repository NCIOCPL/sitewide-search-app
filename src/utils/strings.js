export const emboldenSubstring = (str, subStr) => {
	const regex = new RegExp(subStr, 'i');
	return str.replace(regex, '<strong>$&</strong>');
};

export const splitSentencesToArray = (text) => {
	const textArray = text.split(/(?:\.)/g).map(str => str + '.');
	// Remove last array item if item value is '.' char
	if (textArray.length > 0 && textArray[textArray.length - 1] === '.') {
		textArray.pop();
	}
	return textArray;
};
