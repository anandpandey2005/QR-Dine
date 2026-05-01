import "./App.css";
import { Landingpage, NavbarComponent } from "./handler";
const App = () => {
  return (
    <>
      <section className="w-full bg-zinc-300">
        <NavbarComponent></NavbarComponent>
        <div className="relative max-w-lg mx-auto h-auto m-0  overflow-hidden bg-[#f1f1f1]">
          <Landingpage></Landingpage>
        </div>
      </section>
    </>
  );
};

export default App;
