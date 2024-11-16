import Form from "next/form";

const SearchForm = () => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        type="text"
        defaultValue=""
        placeholder="Search Startups"
        className="search-input"
      />
    </Form>
  );
};

export default SearchForm;
