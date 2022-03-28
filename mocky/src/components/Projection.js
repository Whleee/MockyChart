import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { XYPlot, LineSeries, Crosshair } from 'react-vis';
import { HorizontalGridLines, VerticalGridLines, XAxis, YAxis } from "react-vis/dist";
import '../../node_modules/react-vis/dist/style.css';

const _ = require("lodash");

const RenderSubmitButton = (
  initialInvestment,
  monthlyInvestment,
  setData
) => {
  const handleSubmit = () => {
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
      .then((data) => setData(data));
  };

  return (
    <div className="text-[#2c77ff] text-xl mt-auto">
      <button className="font-bold text-xl" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const RenderInputFields = (
  initialInvestment,
  setInitialInvestment,
  monthlyInvestment,
  setMonthlyInvestment,
  setData
) => {
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
        {RenderSubmitButton(initialInvestment, monthlyInvestment, setData)}
      </div>
    </div>
  );
};

const Projection = () => {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [data, setData] = useState({});
  const [value, setValue] = useState([]);

  console.log(initialInvestment)

  const RenderLineSeries = () => {
    console.log(data)
    if (Object.keys(data).length !== 0) {
      const dataTop25 = []
      const dataMedian = []
      const dataBottom10 = []
      const dataBenchmark = []
      const dataTotalDeposit = []
      for (let i = 0; i < data.length; i++) {
        const dataPoint = data[i];
        const approxDate = _.toNumber(dataPoint.yearMonth.replace('-', '.'))
        let pointTop25 = [approxDate, dataPoint.expectedAmounts[75] / 1000000]
        let pointMedian = [approxDate, dataPoint.expectedAmounts[50] / 1000000]
        let pointBottom10 = [approxDate, dataPoint.expectedAmounts[10] / 1000000]
        let pointBenchmark = [approxDate, dataPoint.expectedAmounts.benchmark / 1000000]
        let pointTotalDeposit = [approxDate, dataPoint.totalDeposit / 1000000]
        dataTop25.push(pointTop25)
        dataMedian.push(pointMedian)
        dataBottom10.push(pointBottom10)
        dataBenchmark.push(pointBenchmark)
        dataTotalDeposit.push(pointTotalDeposit)
      }

      return (
        <XYPlot
          height={700}
          width={1600}
          getX={(d) => d[0]}
          getY={(d) => d[1]}
          margin={{ top: 50, right: 50, left: 50, bottom: 50 }}
          onMouseLeave={() => setValue(false)}
        >
          <XAxis
            tickPadding={5}
            style={{
              line: { stroke: "white" },
              ticks: { stroke: "white" },
              text: { fill: "white", fontWeight: 300, fontSize: 12 },
            }}
            tickFormat={(v) => `${v}`}
          />
          <YAxis
            orientation="right"
            style={{
              line: { stroke: "white" },
              ticks: { stroke: "white" },
              text: {
                fill: "white",
                fontWeight: 300,
                fontSize: 12,
              },
            }}
            tickFormat={function tickFormat(val) {
              let valString = _.toString(val);
              if (!valString.includes(".")) {
                return valString + ".0m";
              } else {
                return valString + "m";
              }
            }}
          />
          <LineSeries data={dataTop25} onNearestX={(d) => setValue(d)} />
          <LineSeries data={dataMedian} />
          <LineSeries data={dataBottom10} />
          <LineSeries data={dataBenchmark} />
          <LineSeries data={dataTotalDeposit} />
          {value && (
            <Crosshair values={[value]}>
              <div style={{ background: "black" }}>
                <h3>Values of crosshair:</h3>
                <p>Series 1: {value[0]}</p>
                <p>Series 2: {value[1]}</p>
              </div>{" "}
            </Crosshair>
          )}
        </XYPlot>
      );
    } else {
      return ("")
    }
  }

  return (
    <div className="grid grid-flow-row mt-10 gap-y-5 mb-10">
      {RenderInputFields(
        initialInvestment,
        setInitialInvestment,
        monthlyInvestment,
        setMonthlyInvestment,
        setData
      )}
      {RenderLineSeries()}
    </div>
  );
};

export default Projection;
