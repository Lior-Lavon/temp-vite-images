import { useState } from "react";
import { useGlobalContext } from "../AppContext";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const elm = document.querySelector('[name="search"]');
    if (!elm.value) return;
    setSearchTerm(elm.value);
  };

  return (
    <section>
      <h1 className="title">Unsplash Images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="cat"
          value={text}
          className="form-input search-input"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button type="submit" className="btn">
          search
        </button>
      </form>
    </section>
  );
};
export default SearchForm;
