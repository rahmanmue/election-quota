import voting from "@/assets/Voting-amico.svg";
import { buttonVariants } from "../ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="container grid lg:grid-cols-2 place-items-center py-20 md:py-10 gap-8"
    >
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Election Quota
            </span>{" "}
          </h1>

          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              landing
            </span>{" "}
            page
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Build your React landing page effortlessly with the required sections
          to your project.
        </p>

        <div className="flex gap-2 justify-center md:justify-normal">
          <a href="#calculation" className={buttonVariants({})}>
            Show Calculation
          </a>
          <a href="#about" className={buttonVariants({ variant: "outline" })}>
            About
          </a>
        </div>
      </div>

      <div className="w-full h-auto md:h-[80vh]">
        <img src={voting} alt="image-voting" className="w-full h-full" />
      </div>

      <div className="shadow"></div>
    </section>
  );
};

export default Hero;
