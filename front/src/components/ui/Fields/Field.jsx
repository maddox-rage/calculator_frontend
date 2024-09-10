const Field = ({ register, name, options, error, ...rest }) => {
  return (
    <div>
      <input {...register(name, options)} {...rest} />
      {error && <div>{error}</div>}
    </div>
  );
};

export default Field;
