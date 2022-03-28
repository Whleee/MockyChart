import { useState } from "react";
import "../../node_modules/react-vis/dist/style.css";
import InputFields from "./InputFields";
import { Oval } from "react-loader-spinner";
import DrawLineSeries from "./DrawLineSeries";

const _ = require("lodash");

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const parseDate = (date) => {
  let result = ""
  result = result + _.toString(date.getFullYear())
  result = result + " " + monthNames[date.getMonth()]
  return result  
}

const Projection = () => {
  const [loading, setLoading] = useState(false);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [data, setData] = useState({});
  const [value, setValue] = useState([]);
  const [currDate, setCurrDate] = useState("");
  const [currTop25, setCurrTop25] = useState("");
  const [currMedian, setCurrMedian] = useState("");
  const [currBottom10, setCurrBottom10] = useState("");
  const [currBenchmark, setCurrBenchmark] = useState("");
  const [currTotalDeposit, setCurrTotalDeposit] = useState("");

  return (
    <div className="flex flex-col mt-10 gap-y-5 mb-10">
      <InputFields
        initialInvestment={initialInvestment}
        setInitialInvestment={setInitialInvestment}
        monthlyInvestment={monthlyInvestment}
        setMonthlyInvestment={setMonthlyInvestment}
        setData={setData}
        setLoading={setLoading}
      />
      {loading ? (
        <div className="m-auto mt-28">
          <Oval
            ariaLabel="loading-indicator"
            height={150}
            width={150}
            strokeWidth={10}
            strokeWidthSecondary={10}
            color="#2c77ff"
            secondaryColor="#282c34"
          />
        </div>
      ) : (
        <DrawLineSeries
          data={data}
          currDate={currDate}
          setCurrDate={setCurrDate}
          currTop25={currTop25}
          setCurrTop25={setCurrTop25}
          currBenchmark={currBenchmark}
          setCurrBenchmark={setCurrBenchmark}
          currMedian={currMedian}
          setCurrMedian={setCurrMedian}
          currBottom10={currBottom10}
          setCurrBottom10={setCurrBottom10}
          currTotalDeposit={currTotalDeposit}
          setCurrTotalDeposit={setCurrTotalDeposit}
          value={value}
          setValue={setValue}
        />
      )}
    </div>
  );
};

export default Projection;
