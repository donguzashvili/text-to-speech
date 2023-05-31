import { Routes, Route } from "react-router-dom";

import SpellChecker from "../view/spellcheckerContent/spellchecker";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<SpellChecker />} />
    </Routes>
  );
};

export default Routing;
