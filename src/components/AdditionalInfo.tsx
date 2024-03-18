const AdditionalInfo = ({ data }: any) => {
  return (
    <div className="flex justify-between md:w-1/3 mt-5">
      <div className="">
        <p className="text-[#96969A] text-[13px] md:text-lg lg:text-3xl">
          Visibility
        </p>
        <p className="text-[#003339] text-[15px] md:text-lg lg:text-2xl">
          {data?.visibility}
        </p>
      </div>
      <div className="">
        <p className="text-[#96969A] text-[13px] md:text-lg lg:text-3xl">
          Humidity
        </p>
        <p className="text-[#003339] text-[15px] md:text-lg lg:text-2xl">
          {data?.humidity}%
        </p>
      </div>
      <div className="">
        <p className="text-[#96969A] text-[13px] md:text-lg lg:text-3xl">
          Windy
        </p>
        <p className="text-[#003339] text-[15px] md:text-lg lg:text-2xl">
          {data?.wind_speed}
        </p>
      </div>
    </div>
  );
};

export default AdditionalInfo;
