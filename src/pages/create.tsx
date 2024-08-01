// src/pages/create.tsx

import Navbar from "~/components/navbar";
import {NewTweetForm}  from "~/components/newTweetForm";

const CreatePage: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <NewTweetForm/>
    </div>
  );
};

export default CreatePage;
