/**
 * Created by sean on 09/06/2016.
 */


/**
 * Function returning Vue Mixin Object.
 * @param {Object} options - Containing prefix, actions & store parameters.
 */
const reVueMixinGen = options => createMixin(options.prefix, options.actions, options.store);


/**
 * Return a pluggable Vue mixins object
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

const prefixedPropName = (prefix, str) => prefix + str.charAt(0).toUpperCase() + str.substr(1);
