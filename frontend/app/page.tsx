"use client";
import {
  useEffect,
  useState,
  useRef,
  AwaitedReactNode,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import axios from "axios";
import Image from "next/image";
//import ParticlesBackground from "../components/ParticlesBackground";
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(
  () => import("../components/ParticlesBackground"),
  { ssr: false }
);

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

  function SkillBox(props: { skillText: string | number }) {
    return (
      <div className="w-fit h-fit text-gray-900 bg-slate-100 rounded-md px-2 m-0 py-1 hover:py-2 hover:px-3 transition-all">
        {props.skillText}
      </div>
    );
  }

  // RETURN SECTION
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center p-12 to-[#191024] via-[#150723] from-[#221331] bg-gradient-to-b  z-10">
        <div className="h-screen max-h-screen">
          <div className="w-full max-w-5xl h-full items-center justify-between text-center pt-36 font-semibold">
            <div className="text-center text-slate-50 text-3xl 2xl:text-8xl xl:text-8xl lg:text-7xl md:text-6xl pt-10">
              Hey, I&apos;m Jun Nur.
            </div>
            <div className="text-center text-slate-50 text-xl pt-4 md:pt-8 2xl:text-6xl xl:text-6xl lg:text-5xl md:text-4xl">
              <TitleSwitch />
            </div>

            <div className="z-20 relative">
              <button
                onClick={scrollToSection}
                className="z-20 lg:text-3xl text-gray-900 md:text-2xl text-xl bg-slate-100 rounded-sm p-3 pt-2 pb-2 mt-8 hover:text-purple-800 transition-all duration-500 "
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
          className="w-full max-w-5xl min-h-screen h-fit items-center justify-between mt-20 font-semibold text-white"
        >
          <div className="pt-32 px-1 lg:px-5 grid  grid-rows-2 grid-cols-none lg:grid-cols-2 lg:grid-rows-none gap-4 lg:gap-4">
            <div className="bg-slate-100 md:h-fit ">
              <div className="pt-8 p-4 pl-6 text-3xl text-gray-900 font-extrabold">
                About Me
              </div>

              <div className="p-4 pl-6 pr-8 text-sm md:text-lg text-gray-950 font-normal">
                Hey! My name is Jun Nur Mustaqeem. I&apos;m a Grade 12 student
                from Toronto! I&apos;m passionate about software and hardware
                development on all spectrums, and I also enjoy getting myself
                involved outside of programming.
              </div>

              <div className="grid grid-cols-2 m-3 gap-2 p-4 text-xs md:text-lg text-black ">
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
                go to My Projects
              </div>
            </div>
            <div className="border-slate-100 border-8 rounded-tl-2xl rounded-bl-2xl ">
              <div className="pt-8 p-4 pl-6 text-3xl text-slate-200 font-extrabold">
                Skills
              </div>
              <div className="pt-1  pl-6 text-xl text-slate-200 font-bold">
                Programming
              </div>
              <div className="flex flex-wrap gap-2 my-3 text-md md:text-lg pt-1 p-3 pl-6 pb-1">
                <SkillBox skillText="Python" />
                <SkillBox skillText="Java" />
                <SkillBox skillText="Flask" />
                <SkillBox skillText="TailwindCSS" />
                <SkillBox skillText="JavaScript" />
                <SkillBox skillText="React.js" />
                <SkillBox skillText="HTML" />
                <SkillBox skillText="CSS" />
                <SkillBox skillText="Arduino" />
                <SkillBox skillText="Android Studio" />
              </div>
              <div className="pt-0 pl-6 text-xl text-slate-200 font-bold">
                Tools & Software
              </div>
              <div className="flex flex-wrap gap-2 my-3 text-md md:text-lg pt-0 p-4 pl-6 ">
                <SkillBox skillText="VSCode" />
                <SkillBox skillText="Git" />
                <SkillBox skillText="GitHub" />
                <SkillBox skillText="IntelliJ IDEA" />
                <SkillBox skillText="Figma" />
                <SkillBox skillText="Canva" />
                <SkillBox skillText="Photoshop" />
                <SkillBox skillText="DaVinci Resolve" />
                <SkillBox skillText="Filmora" />
                <SkillBox skillText="GSuite" />
                <SkillBox skillText="Microsoft Office" />
                <SkillBox skillText="WordPress" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
//randocomment
