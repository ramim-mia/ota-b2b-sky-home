import { useState } from "react";
import SelectCountry from "../../flightSearchNew/elements/SelectCountry";

function SearchVisa() {
  const [country, setCountry] = useState();
  return (
    <div>
      <SelectCountry />
    </div>
  );
}

export default SearchVisa;
