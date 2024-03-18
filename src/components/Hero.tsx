import { getDate } from "../utils/time";
import { CityDataType } from "../utils/type";

const Hero = ({ cityData }: { cityData: CityDataType }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="">
        <h4 className="text-[#003339] text-2xl md:text-3xl lg:text-6xl">
          {cityData?.name}
        </h4>
        <p className="text-[#003339] text-2xl md:text-3xl lg:text-6xl">
          {cityData?.sys.country}
        </p>
        {cityData && (
          <p className="text-[#96969A] text-[15px] lg:text-3xl">
            {getDate(cityData?.dt)}
          </p>
        )}
        <div className="flex space-x-5 items-center -mt-2 md:-mt-5">
          <img
            src={` https://openweathermap.org/img/wn/${cityData?.weather[0].icon}@2x.png`}
            className="w-10 md:w-20"
            alt={cityData?.weather[0].icon}
          />
          <p className="text-[#057BFF] text-[15px] lg:text-3xl">
            {cityData?.weather[0].main}
          </p>
        </div>
      </div>
      <div className="w-[50%] md:w-1/4 relative">
        <img
          src="/city.jpg"
          className="w-full rounded-xl"
          alt="city pic for decoration"
        />
        <div className="absolute  bottom-2 right-2 md:bottom-5 md:right-5 px-3 uppercase text-xs md:text-base py-1 md:px-5 rounded-xl bg-red-500 text-white animate-pulse">
          Live
        </div>
      </div>
    </div>
  );
};

export default Hero;
