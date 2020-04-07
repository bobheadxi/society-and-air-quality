import React, { useState, useEffect } from 'react';

function SingleLoader({ children, context }) {
  const [data, setData] = useState({ loading: true })

  useEffect(() => {
    let cancel = false;
    async function loadFunc() {
      console.log(`${context.displayName}: loading...`);
      try {
        const data = await context.loadValue();
        if (cancel) { return; }
        setData({ loading: false, ...data });
        console.log(`${context.displayName}: ok, updated`);
      } catch(err) {
        console.log(`${context.displayName}: err, updated`);
        setData({ loading: false, err });
      }
    }
    loadFunc();

    return () => { cancel = true; }
  }, [context])

  return <context.Provider value={data} children={children}/>;
}

SingleLoader.defaultValue = { loading: true, err: undefined };

export default SingleLoader;
