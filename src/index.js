const addSideEffectMiddleware = (options = { timeout: 0 }) =>
  (store) => {
    const sideEffects = [];

    return (next) => (action) => {
      /* eslint no-param-reassign: 0 */
      action.addSideEffect = (sideEffect) => sideEffects.push(sideEffect);
      action.sideEffectInfo = { count: sideEffects.length, options };

      // Execute the action across all reducers
      const result = next(action);

      // If any side effects were defined in a reducer, then run each one
      while (sideEffects.length > 0) {
        // Pop off each side effect and execute them in rough ordering
        const item = sideEffects.shift();

        // If item is a function, then create side effect object
        // { effect: <function>, timeout: number }
        const sideEffect = (typeof item === 'function')
          ? { effect: item, timeout: options.timeout }
          : item;

        if (options.timeout) {
          setTimeout(sideEffect.effect(store), sideEffect.timeout);
        } else {
          sideEffect.effect(store);
        }
      }

      return result;
    };
  };

export default addSideEffectMiddleware;
