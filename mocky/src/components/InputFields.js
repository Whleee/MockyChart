import FormInput from "./FormInput";
import '../../node_modules/react-vis/dist/style.css';

const _ = require("lodash");

const RenderSubmitButton = (
  initialInvestment,
  monthlyInvestment,
  setData,
  setLoading,
) => {
  const handleSubmit = () => {
    setLoading(true)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initialInvestment: _.toNumber(initialInvestment),
        monthlyInvestment: _.toNumber(monthlyInvestment),
      }),
    };
    fetch(
      "http://www.mocky.io/v2/5e69de892d00007a005f9e29?mocky-delay=2000ms",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };

  return (
    <div className="text-[#2c77ff] text-xl mt-auto">
      <button className="font-bold text-xl" onClick={handleSubmit}>
        Calculate
      </button>
    </div>
  );
};

const InputFields = (props) => {
  const {
    initialInvestment,
    setInitialInvestment,
    monthlyInvestment,
    setMonthlyInvestment,
    setData,
    setLoading,
  } = props;
  const handleInitialInvestmentChange = (e) => {
    setInitialInvestment(e.target.value);
  };
  const handleMonthlyInvestmentChange = (e) => {
    setMonthlyInvestment(e.target.value);
  };
  return (
    <div className="flex">
      <div className="grid grid-cols-5">
        <FormInput
          label="Initial Investment"
          onChange={handleInitialInvestmentChange}
        />
        <FormInput
          label="Monthly Investment"
          onChange={handleMonthlyInvestmentChange}
        />
        {RenderSubmitButton(initialInvestment, monthlyInvestment, setData, setLoading)}
      </div>
    </div>
  );
};

export default InputFields;