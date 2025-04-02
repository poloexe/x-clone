import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="flex max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignuP />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
