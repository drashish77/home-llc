const AdditionalInfo = ({ data }: any) => {
  return (
    <div>
      <h4 className="text-lg text-[#003339] my-5">Additional Info</h4>
      <div className="flex justify-between md:w-1/3">
        <div className="">
          <p className="text-[#96969A] text-[13px] md:text-lg lg:text-3xl">
            Visibility
          </p>
          <p className="text-[#003339] text-[15px]">{data?.visibility}</p>
        </div>
        <div className="">
          <p className="text-[#96969A] text-[13px] md:text-lg lg:text-3xl">
            Humidity
          </p>
          <p className="text-[#003339] text-[15px]">{data?.humidity}%</p>
        </div>
        <div className="">
          <p className="text-[#96969A] text-[13px] md:text-lg lg:text-3xl">
            Windy
          </p>
          <p className="text-[#003339] text-[15px]">{data?.wind_speed}</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
