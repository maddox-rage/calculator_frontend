const Button = ({ children, clickHandler = null }) => {
  return (
    <div>
      <button onClick={clickHandler}>{children}</button>
    </div>
  );
};

export default Button;
