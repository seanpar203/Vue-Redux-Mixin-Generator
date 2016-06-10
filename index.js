/**
 * Created by sean on 09/06/2016.
 */


/**
 * Function returning Vue Mixin Object.
 * @param {Object} options - Containing prefix, actions & store parameters.
 *
 * prefix: {String} - OPTIONAL - String to prefix function names.
 * actions: {Array} - REQUIRED - Redux Actions.
 * store: {Object} - REQUIRED - Redux Store.
 */
const reVueMixinGen = options => createMixin(options.prefix, options.actions, options.store);


/**
 * Return a pluggable Vue mixins object.
 * @param {String} prefix - Name to be prepended to actions function name.
 * @param {Array} actions - Array of of functions to generate Vue methods for.
 * @param {Object} store - Redux store class.
 */
const createMixin = (prefix, actions, store) => {
	const methods = {};

	actions.forEach(action => {
		let propName = action.name;

		if (prefix) {
			propName = prefixedPropName(prefix, propName);
		}

		methods[propName] = (...params) => store.dispatch(action(...params));
	});

	return {methods};
};

/**
 * Returns a new string of prefixed property name.
 * @param {String} prefix - option passed into function.
 * @param {string} prop -  current action name in forEach iteration.
 */
const prefixedPropName = (prefix, prop) => prefix + firstCharUpper(prop);

/**
 * Returns a string with the first character uppercase
 * @param {String} str
 */
const firstCharUpper = str => str.charAt(0).toUpperCase() + str.substr(1);
