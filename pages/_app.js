import GlobalStyle from "../styles/styles";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <GlobalStyle />
      <Component {...pageProps} />
    </div>
  );
}
