import { getHours } from "../utils/time";

const Card = ({ data }: any) => {
  return (
    <div className="hover:bg-teal-900 px-3 rounded-3xl py-2 text-white text-[13px]">
      <h3>{getHours(data.dt)}</h3>
      <img
        src={` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data?.weather[0].icon}
      />
      <p className="">{(data.temp - 273.15).toFixed(2)}°C</p>
    </div>
  );
};

export default Card;
