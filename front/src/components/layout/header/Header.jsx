import Cookies from "js-cookie";
import Button from "../../ui/button/Button";

const Header = () => {
  const deleteToken = () => {
    Cookies.remove("token");
    console.log("asd");
    window.location.reload();
  };
  return (
    <header>
      <button onClick={deleteToken}>logout</button>
    </header>
  );
};
export default Header;
