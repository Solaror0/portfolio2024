"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import ParticlesBackground from "../components/ParticlesBackground";

export default function Home() {
  const listOfTitles = [
    "A Highschool Student.",
    "A Web Developer",
    "An Aspiring Engineer",
  ];

  function TitleSwitch() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      // Change text every 3 seconds
      const intervalId = setInterval(() => {
        setIndex((currentIndex) => (currentIndex + 1) % listOfTitles.length);
      }, 3000);
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div>{listOfTitles[index]}</div>;
  }

  const targetRef = useRef<HTMLDivElement>(null);
  const scrollToSection = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // RETURN SECTION
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center p-12 bg-[#17082A] z-10">
        <div className="h-screen max-h-screen">
          <div className="w-full max-w-5xl items-center justify-between text-center pt-36 font-semibold">
            <div className="text-center text-slate-50 text-4xl 2xl:text-8xl xl:text-8xl lg:text-7xl md:text-6xl">
              Hey, I'm Jun Nur.
            </div>
            <div className="text-center text-slate-50 text-2xl pt-8 2xl:text-6xl xl:text-6xl lg:text-5xl md:text-4xl">
              <TitleSwitch />
            </div>

            <div className="z-20 relative">
              <button
                onClick={scrollToSection}
                className="z-20 lg:text-3xl md:text-2xl text-xl bg-slate-100 rounded-sm p-3 pt-2 pb-2 mt-8 hover:text-purple-800 transition-all duration-500 "
              >
                Learn About Me
              </button>
            </div>
          </div>
          <div className="z-0">
            <ParticlesBackground />
          </div>
        </div>
        {/* ABOUT ME SECTION */}

        <div
          ref={targetRef}
          className="w-full max-w-5xl min-h-screen items-center justify-between mt-20 font-semibold text-white"
        >
          <div className="pt-32 px-5 grid grid-cols-2 gap-4">
            <div className="border-slate-100 border-8  rounded-tl-2xl rounded-bl-2xl h-full"></div>

            <div className="bg-slate-100 h-fit">
              <div className="pt-8 p-4 pl-6 text-3xl text-gray-900 font-extrabold">
                About Me
              </div>

              <div className="p-4 pl-6 pr-8 text-lg text-gray-950 font-normal">
                Hey! My name is Jun Nur Mustaqeem. I'm a Grade 12 student from
                Toronto! I'm passionate about software and hardware development
                on all spectrums, and I also enjoy getting myself involved
                outside of programming.
              </div>

              <div className="grid grid-cols-2 m-3 gap-2 p-4 text-lg text-black ">
                <a href="/Jun Nur Mustaqeem Resume 2024.pdf">
                  <div className="flex p-4 bg-slate-200 font-normal w-full h-full rounded-lg hover:bg-slate-300 hover:p-5 transition-all duration-300 items-center">
                    <div className="h-8 w-8 relative flex-shrink mr-3">
                      <Image
                        src="/documentimage.png"
                        alt="logo"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    My Resume
                  </div>
                </a>

                <a href="mailto:junnurmustaqeem@gmail.com">
                  <div className="flex p-4 items-center bg-slate-200 font-normal w-full h-full rounded-lg hover:bg-slate-300 hover:p-5 transition-all duration-300">
                    <div className="h-10 w-10 relative flex-shrink mr-3">
                      <Image
                        src="/emailIcon.png"
                        alt="logo"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    Email Me
                  </div>
                </a>

                <a href="https://github.com/Solaror0">
                  <div className="flex p-4 bg-slate-200 font-normal w-full h-full rounded-lg hover:bg-slate-300 hover:p-5 transition-all duration-300 items-center">
                    <div className="h-8 w-8 relative flex-shrink mr-3">
                      <Image
                        src="/github-mark.png"
                        alt="logo"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    Github
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/jun-nur-mustaqeem-bbb30b223/">
                  <div className="flex p-4 bg-slate-200 font-normal w-full h-full rounded-lg hover:bg-slate-300 hover:p-5 transition-all duration-300 items-center">
                    <div className="h-8 w-8 relative flex-shrink mr-3">
                      <Image
                        src="/linkedln logo.png"
                        alt="logo"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    LinkedIn
                  </div>
                </a>
              </div>

              <div className="p-4 pl-6 text-3xl text-gray-900 font-extrabold text-right hover:text-purple-800 transition-colors duration-500">
                go to My Skills
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
