import React, { useEffect, useState } from "react";

interface FormProps {
  onSubmit: Function;
  loading: boolean;
  setLoading: Function;
}

const SearchForm: React.FC<FormProps> = ({ onSubmit, loading, setLoading }) => {
  const [city, setCity] = useState("");

  const [coord, setCoord] = useState({ lat: String, lon: String });
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1072914dac1cfb3bb8205723370ab007`;
  const url2 = `https://api.openweathermap.org/data/2.5/weather?q=indore&appid=1072914dac1cfb3bb8205723370ab007`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSubmit(city);
    setLoading(true);
    try {
      fetch(url)
        .then((response) => {
          if (response.ok) return response.json();
        })
        .then((data) => {
          onSubmit(data);
          setCoord(data.coord);
          setLoading(false);
        });
    } catch (error) {
      console.log({ error });
    }
    setCity("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  useEffect(() => {
    setLoading(true);
    try {
      fetch(url2)
        .then((response) => {
          if (response.ok) return response.json();
        })
        .then((data) => {
          onSubmit(data);
          setCoord(data.coord);
          setLoading(false);
        });
    } catch (error) {
      console.log({ error });
    }
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <label>
        {/* Enter city: */}
        <input
          required
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city name"
          className="border-2 border-blue-600 px-2 py-2 ring-red-500"
        />
      </label>
      <button
        type="submit"
        className="py-2 px-3 border bg-blue-800 rounded-lg text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
