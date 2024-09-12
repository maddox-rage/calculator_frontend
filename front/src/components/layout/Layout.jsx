import Sidebar from "./sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar>
        <section>{children && <div>{children}</div>}</section>
      </Sidebar>
    </div>
  );
};
export default Layout;
