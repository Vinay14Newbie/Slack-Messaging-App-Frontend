// This function combines multiple context provider together and return a single context provider

export default function combineContext(...providers) {
  // children is the components ex. Routes, Toaster
  return ({ children }) => {
    return providers.reduceRight((accumulator, CurrentProvider) => {
      return <CurrentProvider>{accumulator}</CurrentProvider>;
    }, children); //initial value
  };
}

/**
 * <A>
 *   <B>
 *      <C>
 *         <D>
 *              {children}
 *         </D>
 *      </C>
 *   </B>
 * </A>
 */

/**
 * <Combined>
 *   {children}
 * </Combined>
 */
