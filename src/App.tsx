import { useEffect, useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import { CityDataType } from "./utils/type";
import { getDate } from "./utils/time";
import Card from "./components/Card";
import { Daily, FinalDataType } from "./utils/finalDataType";
import AdditionalInfo from "./components/AdditionalInfo";
import ChartNew from "./components/ChartNewcopy";

function App() {
  const [cityData, setCityData] = useState<CityDataType>();
  const [finalData, setFinalData] = useState<FinalDataType>();
  const [tempData, setTempData] = useState([]);
  // const [coord, setCoord] = useState({ lat: String, lon: String });

  const onSubmit = (data: any) => {
    setCityData(data);
  };
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${cityData?.coord.lat}&lon=${cityData?.coord.lon}&appid=1072914dac1cfb3bb8205723370ab007`;
    try {
      fetch(url)
        .then((response) => {
          if (response.ok) return response.json();
        })
        .then((data) => {
          //   let tmp = data.daily.map((i: Daily) => {
          //     let newObj = {};

          //     for (const [key, value] of Object.entries(i.temp)) {
          //       newObj[key] = (value - 273.15).toFixed(2);
          //     }
          //     return {
          //       date: getDate(i.dt),
          //       temp: {
          //         ...newObj,
          //       },
          //     };
          //   });
          let tmp = data.daily.map(({ dt, temp }: { dt: number; temp: {} }) => {
            let newObj = {};

            for (const [key, value] of Object.entries(temp)) {
              newObj[key] = (value - 273.15).toFixed(2);
            }
            let date = getDate(dt);
            return { date, ...newObj };
          });
          setTempData(tmp);
          setFinalData(data);
        });
    } catch (error) {
      console.log({ error });
    }
  }, [cityData]);

  let data = [
    {
      date: "2019-01-01",
      day: 304.36,
      min: 293.19,
      max: 307.02,
      night: 299.12,
      eve: 303.81,
      morn: 293.58,
    },
    {
      date: "2019-01-02",
      day: 305.7,
      min: 294.26,
      max: 308.34,
      night: 298.21,
      eve: 306.5,
      morn: 294.72,
    },
    {
      date: "2019-01-03",
      day: 305.22,
      min: 293.46,
      max: 307.43,
      night: 297.19,
      eve: 305.87,
      morn: 293.91,
    },
    {
      date: "2019-01-04",
      day: 305.95,
      min: 293.42,
      max: 307.33,
      night: 297.44,
      eve: 306.17,
      morn: 293.64,
    },
    {
      date: "2019-01-05",
      day: 303.16,
      min: 293.74,
      max: 306.42,
      night: 299.59,
      eve: 306.03,
      morn: 293.74,
    },
    {
      date: "2019-01-06",

      day: 307.79,
      min: 296.53,
      max: 309.59,
      night: 299.63,
      eve: 308.31,
      morn: 296.53,
    },
    {
      date: "2019-01-07",
      day: 307.34,
      min: 295.52,
      max: 309.37,
      night: 300.73,
      eve: 307.25,
      morn: 295.52,
    },
    {
      date: "2019-01-08",
      day: 306.59,
      min: 296.23,
      max: 309.08,
      night: 299.9,
      eve: 307.75,
      morn: 296.23,
    },
  ];
  console.log({ tempData });
  return (
    <div className="container m-auto">
      <div className="p-2">
        <div className="mt-5 flex justify-center">
          <SearchForm onSubmit={onSubmit} />
        </div>
        <p className="text-[#003339] text-2xl">{cityData?.name}</p>
        <p className="text-[#003339] text-2xl">{cityData?.sys.country}</p>
        {cityData && (
          <p className="text-[#96969A] text-[15px]">{getDate(cityData?.dt)}</p>
        )}
        <p className="text-[#057BFF] text-[15px]">
          {cityData?.weather[0].main}
        </p>
        <img
          src={` https://openweathermap.org/img/wn/${cityData?.weather[0].icon}@2x.png`}
          alt={cityData?.weather[0].icon}
        />
        <p>HOURLY WEATHER</p>
        <div className="overflow-x-auto lg:w-1/2 justify-center flex bg-[#003339] p-2">
          {finalData &&
            finalData?.hourly
              .slice(0, 5)
              // .filter((i) => i.dt - finalData.current.dt > 130000)
              .map((hourData) => {
                return <Card data={hourData} />;
              })}
        </div>
        <AdditionalInfo data={finalData?.current} />
        <div className="">
          {/* <Chart data={tempData} /> */}
          <ChartNew data={tempData} />
        </div>
      </div>
    </div>
  );
}

export default App;

// flex-none py-6 px-3 first:pl-6 last:pr-6 bg-red-500
