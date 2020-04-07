import React, { useState, useEffect } from 'react';

function SingleLoader({ name, children, context }) {
  const [data, setData] = useState({ loading: true })

  useEffect(() => {
    async function loadFunc() {
      console.log(`${name}: loading...`);
      try {
        const data = await context.loadValue();
        setData({ loading: false, ...data });
        console.log(`${name}: ok, updated`);
      } catch(err) {
        console.log(`${name}: err, updated`);
        setData({ loading: false, err });
      }
    }
    loadFunc();
  }, [name, context])

  return <context.Provider value={data} children={children}/>;
}

SingleLoader.defaultValue = { loading: true, err: undefined };

export default SingleLoader;
