import SearchForm from "@/components/SearchForm";

const Home = () => {
  return (
    <section className="pink_container">
      <p className="heading">
        Pitch Your Startup, <br /> Connect With Entrepreneurs
      </p>
      <p className="sub-heading !max-w-3xl">
        Submit Ideas, Vote on Pitches & Get Noticed in Virtual Competitions.
      </p>
      <SearchForm />
    </section>
  );
};

export default Home;
