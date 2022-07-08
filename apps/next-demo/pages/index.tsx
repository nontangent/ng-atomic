import React, { useEffect } from 'react';
import Script from 'next/script'

import "node_modules/@angular/material/prebuilt-themes/indigo-pink.css";

export function Index() {
  const onLoad = () => {
    window['ElementsLoaderProxy']('@ng-atomic/components').load('atoms-chips-input');
  };

  return (<>
    <h1>Ng Atomic Demo for Next</h1>
    <Script src='http://127.0.0.1:8080/elements/runtime.js' defer></Script>
    <Script src='http://127.0.0.1:8080/elements/polyfills.js' defer></Script>
    <Script src='http://127.0.0.1:8080/elements/main.js' defer></Script>
    <Script src='http://127.0.0.1:8080/elements/vendor.js' onLoad={() => onLoad()} defer></Script>
    <atoms-chips-input></atoms-chips-input>
  </>
  );
}

export default Index;
