import React from "react";

function HeroSection() {
  return (
    <section
      className="relative min-h-[65vh] w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat p-6 text-white"
      style={{
        backgroundImage:
          "url('https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/08/07193919/Gurukul-System-of-Education.png')",
        backgroundPosition: "center bottom 30%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // backgroundSize: "contain",
        // backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Glasmorphism Content Box */}
      <div className="relative z-10 max-w-4xl text-center space-y-6 p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Welcome to <span className="text-blue-400">Aniket ka Gurukul 🚀</span>
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-white/90">
          Learn. Code. Conquer. — Future Developers ki Pehli Manzil 🏆
        </h2>

        {/* Search Box */}
        <div className="w-full max-w-md mx-auto flex items-center bg-white/20 backdrop-blur-lg rounded-full overflow-hidden border border-white/30 focus-within:ring-2 focus-within:ring-blue-300">
          <input
            type="text"
            placeholder="Explore your dream course..."
            className="flex-1 bg-transparent outline-none p-3 text-white placeholder-white/60"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-full">
            Explore Courses 🚀
          </button>
        </div>

        {/* Motivation Line */}
        <p className="text-sm md:text-base font-light text-white/80">
          "Aaj ka ek skill kal ke career ka building block hai. Start Today! 💻"
        </p>
      </div>
      
    </section>
  );
}

export default HeroSection;
