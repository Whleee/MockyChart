import { LineSeries, Crosshair, FlexibleXYPlot } from "react-vis";
import {
  XAxis,
  YAxis,
} from "react-vis/dist";
import "../../node_modules/react-vis/dist/style.css";

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

const DrawLineSeries = (props) => {
  const {
    data,
    currDate,
    setCurrDate,
    currTop25,
    setCurrTop25,
    currBenchmark,
    setCurrBenchmark,
    currMedian,
    setCurrMedian,
    currBottom10,
    setCurrBottom10,
    currTotalDeposit,
    setCurrTotalDeposit,
    value,
    setValue,
  } = props;
  if (Object.keys(data).length !== 0) {
    const dataTop25 = [];
    const dataMedian = [];
    const dataBottom10 = [];
    const dataBenchmark = [];
    const dataTotalDeposit = [];
    for (let i = 0; i < data.length; i++) {
      const dataPoint = data[i];
      const approxDate = _.toNumber(dataPoint.yearMonth.replace("-", "."));
      let pointTop25 = [approxDate, dataPoint.expectedAmounts[75] / 1000000];
      let pointMedian = [approxDate, dataPoint.expectedAmounts[50] / 1000000];
      let pointBottom10 = [
        approxDate,
        dataPoint.expectedAmounts[10] / 1000000,
      ];
      let pointBenchmark = [
        approxDate,
        dataPoint.expectedAmounts.benchmark / 1000000,
      ];
      let pointTotalDeposit = [approxDate, dataPoint.totalDeposit / 1000000];
      dataTop25.push(pointTop25);
      dataMedian.push(pointMedian);
      dataBottom10.push(pointBottom10);
      dataBenchmark.push(pointBenchmark);
      dataTotalDeposit.push(pointTotalDeposit);
    }

    return (
      <div className="w-85vw h-65vh">
        <FlexibleXYPlot
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
            tickSize={9}
            tickTotal={5}
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
            tickSize={9}
            tickTotal={15}
          />
          <LineSeries
            data={dataTop25}
            onNearestX={(d) => {
              let date = new Date(_.toString(d[0]))
              const dateString = parseDate(date)
              setCurrDate(dateString)
              setCurrTop25(d[1]);
              setValue(d);
            }}
            color="#139097"
          />
          <LineSeries
            data={dataMedian}
            color="#76c1dc"
            onNearestX={(d) => {
              setCurrMedian(d[1]);
              setValue(d);
            }}
          />
          <LineSeries
            data={dataBottom10}
            color="#ff9833"
            onNearestX={(d) => {
              setCurrBottom10(d[1]);
              setValue(d);
            }}
          />
          <LineSeries
            data={dataBenchmark}
            color="#E723E3"
            onNearestX={(d) => {
              setCurrBenchmark(d[1]);
              setValue(d);
            }}
          />
          <LineSeries
            data={dataTotalDeposit}
            color="#ee5d28"
            onNearestX={(d) => {
              setCurrTotalDeposit(d[1]);
              setValue(d);
            }}
          />
          {Object.keys(data).length !== 0 && (
            <Crosshair values={[value]}>
              <div
                style={{
                  background: "white",
                  color: "#2c77ff",
                  width: "17rem",
                  padding: "0.5rem",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "0.25rem",
                }}
              >
                <div className="text-xl font-semibold border-b pb-2 text-gray-500">
                  {currDate}
                </div>
                <div className="text-md text-center text-gray-500 pb-2">
                  Chance of outcome
                </div>
                <div className="text-base flex flex-col gap-y-2">
                  <div className="text-[#139097]">
                    Top 25%: ${currTop25 * 1000000}
                  </div>
                  <div className="text-[#76c1dc]">
                    Median: ${currMedian * 1000000}
                  </div>
                  <div className="text-[#ff9833]">
                    Bottom 10%: ${currBottom10 * 1000000}
                  </div>
                  <div className="text-[#E723E3]">
                    Benchmark: ${currBenchmark * 1000000}
                  </div>
                  <div className="text-[#ee5d28]">
                    Total Deposit: ${currTotalDeposit * 1000000}
                  </div>
                </div>
              </div>
            </Crosshair>
          )}
        </FlexibleXYPlot>
      </div>
    );
  } else {
    return null;
  }
};

export default DrawLineSeries;
