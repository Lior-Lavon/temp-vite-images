import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../axios/utils";
import { useGlobalContext } from "../AppContext";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();

  // { data, isLoading, isError }
  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await customFetch(`/search/photos?query=${searchTerm}`);
      return result.data;
    },
  });
  // console.log(response);

  if (!response.data) return <div></div>;

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>loading ...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  const result = response.data.results;
  if (result.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }
  return (
    <section className="image-container">
      {response.data.results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            alt={item.alt_description}
            key={item.id}
            className="img"
          />
        );
      })}
    </section>
  );
};
export default Gallery;
