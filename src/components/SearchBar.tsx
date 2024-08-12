import { useState } from "react";

type Item = {
  id: number;
  name: string;
};



function SearchBarExample() {
  const [searchTerm, setSearchTerm] = useState("");



  return (
    <div className="">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className=" border-[1.5px] rounded ml-4 p-1.5 w-[650px] outline-[#3b49df] border-gray-300 hidden lg:block"
      />
      
    </div>
  );
}

export default SearchBarExample;
