/**
 * Created by sean on 09/06/2016.
 */


/**
 * Function returning Vue Mixin Object.
 * @param {Object} options - Containing prefix, actions & store parameters.
 */
const reVueMixinGen = (options) => createMixin(options.prefix, options.actions, options.store);


/**
 * Return a pluggable Vue mixins object
 * @param {String} prefix - Name to be prepended to actions function name.
 * @param {Array} actions - Array of of functions to generate Vue methods for.
 * @param {Object} store - Redux store class.
 */
const createMixin = (prefix, actions, store) => {
	let methods = {};

	for (let i = 0; i < actions.length; i++) {
		let action = actions[i];
		let propName = action.name;

		if (prefix && prefix.length > 0) {
			propName = camelize(prefix + ' ' + action.name);
		}

		methods[propName] = (...params) => store.dispatch(action(...params));
	}
	return {methods};
};

/**
 * Camel case string
 * @param {String} str - new String camelCased.
 */
const camelize = (str) => str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
		if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
		return index == 0 ? match.toLowerCase() : match.toUpperCase();
	}
);


module.exports = reVueMixinGen;
