import '../styles/globals.css'
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div>Typescript Hooks Form</div>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default App;
