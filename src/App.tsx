import { useEffect, useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import { CityDataType } from "./utils/type";
import { getDate } from "./utils/time";
import Card from "./components/Card";
import { FinalDataType } from "./utils/finalDataType";
import AdditionalInfo from "./components/AdditionalInfo";
import ChartNew from "./components/ChartNew";
import Loader from "./components/Loader";
import { HiMenuAlt2, HiSearch } from "react-icons/hi";
import Hero from "./components/Hero";

function App() {
  const [cityData, setCityData] = useState<CityDataType>();
  const [finalData, setFinalData] = useState<FinalDataType>();
  const [tempData, setTempData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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
    <div className=" container">
      <div className="p-2">
        <div className="flex justify-between items-center mt-5 text-[#003339]">
          <div className="">
            <HiMenuAlt2 className="text-2xl md:text-4xl" />
          </div>
          <div className="">
            <HiSearch
              className={`text-2xl md:text-4xl ${
                isSearchVisible ? "hidden" : "block"
              }`}
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            />
            <div className={` ${isSearchVisible ? "block" : "hidden"}`}>
              <SearchForm
                onSubmit={onSubmit}
                setLoading={setLoading}
                setIsSearchVisible={setIsSearchVisible}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : cityData === undefined ? (
          <section className=" mt-5 ">
            <h3 className="text-3xl text-center my-10">Data Not Found!</h3>
          </section>
        ) : (
          <div className="">
            {/* Hero section */}
            <section className=" mt-5 ">
              <Hero cityData={cityData} />
            </section>
            {/* Hourly weather section */}
            <section className=" mt-20">
              <h4 className="my-5 text-xl md:text-2xl lg:text-4xl text-[#003339] sr-only">
                Hourly Weather
              </h4>
              <div className="overflow-x-auto lg:w-2/3 rounded-[2rem] justify-center flex bg-[#003339] p-2">
                {finalData &&
                  finalData?.hourly.slice(0, 5).map((hourData) => {
                    return <Card data={hourData} />;
                  })}
              </div>
            </section>
            {/* Additional info section */}
            <section className="mt-20">
              <h4 className="my-5 text-lg text-[#003339] md:text-2xl lg:text-4xl ">
                Additional Info
              </h4>
              <AdditionalInfo data={finalData?.current} />
            </section>
            <section className=" mt-20">
              <h4 className="my-5 text-xl md:text-2xl lg:text-4xl text-[#003339] mb-10">
                Temprature
              </h4>
              <div className="">
                {/* <Chart data={tempData} /> */}
                <ChartNew data={tempData} />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
