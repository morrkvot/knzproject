import CommonLayout from "../layout/CommonLayout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <CommonLayout>
      <Component {...pageProps} />
    </CommonLayout>
  );
}

export default MyApp;
