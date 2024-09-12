import Header from "./header/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <section>
        <Header />
        <h1>Layout</h1>
        {children && <div>{children}</div>}
      </section>
    </div>
  );
};
export default Layout;
