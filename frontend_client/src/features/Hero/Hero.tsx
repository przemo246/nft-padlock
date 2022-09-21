import padlocks from "./img/padlocks.png";

export const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <h1 className="font-body font-extrabold max-w-xl text-7xl text-neutral-900 leading-[100px] mt-0 lg:mt-6">
        <span className="text-red-600">padLock</span> your relationship{" "}
        <span className="before:block before:absolute before:w-full before:bg-violet-300 relative inline-block before:-skew-x-12 before:h-3 before:bottom-[20%]">
          <span className="relative">with us</span>
        </span>
      </h1>
      <div className="mt-10 lg:mt-0">
        <img src={padlocks} alt="Three padlocks" />
      </div>
    </div>
  );
};
