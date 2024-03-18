import { useEffect, useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import { CityDataType } from "./utils/type";
import { getDate } from "./utils/time";
import Card from "./components/Card";
import { FinalDataType } from "./utils/finalDataType";
import AdditionalInfo from "./components/AdditionalInfo";
import ChartNew from "./components/ChartNewcopy";
import Loader from "./components/Loader";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

function App() {
  const [cityData, setCityData] = useState<CityDataType>();
  const [finalData, setFinalData] = useState<FinalDataType>();
  const [tempData, setTempData] = useState([]);
  const [loading, setLoading] = useState(false);

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
          let tmp = data.daily.map(({ dt, temp }: { dt: number; temp: {} }) => {
            let newObj = {};

            for (const [key, value] of Object.entries(temp)) {
              newObj[key] = +(value - 273.15).toFixed(2);
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

  console.log({ tempData });
  return (
    <div className="container m-auto">
      <div className="p-2">
        <div className="mt-5 flex justify-center">
          <SearchForm
            onSubmit={onSubmit}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <p className="text-[#003339] text-2xl">{cityData?.name}</p>
            <p className="text-[#003339] text-2xl">{cityData?.sys.country}</p>
            {cityData && (
              <p className="text-[#96969A] text-[15px]">
                {getDate(cityData?.dt)}
              </p>
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
        )}
      </div>
    </div>
  );
}

export default App;

// flex-none py-6 px-3 first:pl-6 last:pr-6 bg-red-500
