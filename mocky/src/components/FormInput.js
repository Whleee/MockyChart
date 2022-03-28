const FormInput = (props) => {
  const { label, onChange } = props;
  return (
    <form>
      <label className="text-lg text-white">
        {label}
        <input
          type="text"
          className="text-[#2c77ff] py-3 m-auto text-2xl mt-2 font-medium px-3 w-4/5"
          onChange={onChange}
        />
      </label>
    </form>
  );
};

export default FormInput;
