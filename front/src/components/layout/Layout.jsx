import Sidebar from "./sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar>
        <section className="h-screen flex">{children}</section>
      </Sidebar>
    </div>
  );
};
export default Layout;
