import { Footer } from "./Footer";
import { Header } from "./Header";

const Layout = ({ children, background }) => {
  return (
    <div className={`site ${background || ""}`}>
      <Header />
      <main className="site__main">{children}</main>
      <Footer />
    </div>
  );
};

export { Layout };