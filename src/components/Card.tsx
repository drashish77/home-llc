import { getHours } from "../utils/time";

const Card = ({ data }: any) => {
  return (
    <div className="hover:bg-teal-900 px-2  rounded-3xl py-2 lg:py-8 lg:px-10 text-white text-[13px]">
      <h3 className="md:text-2xl">{getHours(data.dt)}</h3>
      <img
        src={` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data?.weather[0].icon}
      />
      <p className="md:text-2xl">{(data.temp - 273.15).toFixed(2)}°C</p>
    </div>
  );
};

export default Card;
