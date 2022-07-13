import React, { useEffect } from 'react';
import Script from 'next/script'
import "node_modules/@angular/material/prebuilt-themes/indigo-pink.css";


export function Index() {
  useEffect(() => {
    window.addEventListener('ElementsLoaderReady', async () => {
      const loader = window['ElementsLoaderProxy']('@ng-atomic/components');
      await loader.load('templates-entrance');
    });
  });

  return (<>
    <h1>Ng Atomic Demo for Next</h1>
    <Script src='http://localhost:4202/main.js' defer></Script>
    {/* <atoms-chips-input></atoms-chips-input> */}
    <templates-entrance></templates-entrance>
  </>
  );
}

export default Index;
