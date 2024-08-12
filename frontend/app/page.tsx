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

  function HeaderComponent() {
    return (
      <div className="hidden md:block z-40 w-full bg-opacity-10 h-fit fixed top-0 gap-0 text-slate-300 backdrop-blur-lg bg-purple-950">
        <div
          onClick={scrollToContacts}
          className=" inline float-right p-4 pr-20 font-ttChoc text-2xl transition-all hover:text-purple-900"
        >
          Contact
        </div>
        <div
          onClick={scrollToProjects}
          className="inline float-right p-4 font-ttChoc text-2xl transition-all hover:text-purple-900"
        >
          Projects
        </div>
        <div
          onClick={scrollToSection}
          className="inline float-right p-4 font-ttChoc text-2xl transition-all hover:text-purple-900"
        >
          About
        </div>
      </div>
    );
  }
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
  const projectSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const scrollToSection = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToProjects = () => {
    if (projectSectionRef.current) {
      projectSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToContacts = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  function SkillBox(props: { skillText: string | number }) {
    return (
      <div className="w-fit h-fit text-gray-900 bg-slate-100 rounded-md px-2 m-0 py-1 hover:py-2 hover:px-3 transition-all">
        {props.skillText}
      </div>
    );
  }

  function ProjectBox(props: {
    projectTitle: string | number;
    bodyText: string | number;
    imageURL: string;
    dateText: string | number;
    linkURL: string;
  }) {
    return (
      <div className="p-3 pt-6 pb-6">
        <div className="w-full h-fit bg-slate-100 rounded-md">
          <div className="font-ttChoc text-gray-900 text-3xl p-4 pb-0">
            {props.projectTitle}
          </div>
          <div className="text-gray-900 text-lg pl-4 pb-2 pt-0 font-medium">
            {props.dateText}
          </div>
          <div className="p-4 w-full text-gray-900 text-sm break-words">
            <div className="float-left mr-4 mb-2 w-32 h-auto">
              <Image
                src={props.imageURL} // Replace with your image path
                alt="Description of image"
                width={100}
                height={100}
                layout="responsive"
                className="rounded-md"
              />
            </div>
            <p className="leading-relaxed font-normal">{props.bodyText}</p>
          </div>

          <div className="px-3 pb-5 text-gray-900 font-ttChoc text-2xl hover:px-4 hover:text-purple-800 transition-all duration-200">
            <a href={props.linkURL} target="_blank" rel="noopener noreferrer">
              Learn More &gt;
            </a>
          </div>
        </div>
      </div>
    );
  }

  function ContactForm() {
    const [formData, setFormData] = useState({
      name: "",
      subject: "",
      email: "",
      body: "",
    });

    const handleChange = (e: { target: { name: any; value: any } }) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission (e.g., show a thank you message)
        alert("Thank you for your message!");
      } else {
        // Handle error
        alert("Something went wrong. Please try again.");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="grid p-8 gap-3 grid-cols-2">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-slate-200">
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={formData.name}
              className="mt-1 block w-full p-2 border border-gray-800 rounded-md bg-[#382949] text-slate-200 font-normal"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              placeholder=""
              value={formData.email}
              type="email"
              className="mt-1 block w-full p-2 border border-gray-800 rounded-md bg-[#382949] text-slate-200 font-normal"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-200">
              Subject
            </label>
            <input
              name="subject"
              onChange={handleChange}
              value={formData.subject}
              type="text"
              className="mt-1 block w-full p-2 border border-gray-800 rounded-md bg-[#382949] text-slate-200 font-normal"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-200 col-span-3 h-fit overflow-auto">
              Body
            </label>
            <textarea
              name="body"
              value={formData.body}
              placeholder="Enter your text here..."
              onChange={handleChange}
              className="mt-1 block w-full p-2 border h-48 border-gray-800 rounded-md bg-[#382949] text-slate-200 font-normal"
              required
            ></textarea>
          </div>
          <div>
            <button className="w-fit p-2 px-6 text-xl transition-all duration-500 border-2 border-slate-200 hover:bg-slate-200 rounded-sm  font-ttChoc text-slate-200 hover:text-gray-900">
              Send
            </button>
          </div>
        </div>
      </form>
    );
  }
  // RETURN SECTION
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center p-4 md:p-12 to-[#191024] via-[#150723] from-[#221331] bg-gradient-to-b  z-10">
        <HeaderComponent />
        <div className="h-screen max-h-screen">
          <div className="w-full max-w-5xl h-full items-center justify-between text-center pt-36 font-ttChoc">
            <div className="text-center text-slate-50 text-4xl 2xl:text-9xl xl:text-9xl lg:text-8xl md:text-7xl pt-10 font-ttChoc">
              Hey, I&apos;m Jun Nur.
            </div>
            <div className="text-center text-slate-50 from-[#a150de] via-[#5f16a5] to-[#390072] text-xl p-4 transition-transform bg-gradient-to-br transform duration-100 mt-4 md:mt-8 2xl:text-6xl xl:text-6xl lg:text-5xl md:text-4xl w-fit mx-auto rounded-md ">
              <TitleSwitch />
            </div>

            <div className="z-20 relative">
              <button
                onClick={scrollToSection}
                className="z-20 lg:text-3xl text-slate-50 md:text-2xl text-xl border-slate-100 hover:border-purple-900 border-2 rounded-sm p-3 pt-2 pb-2 mt-8 hover:text-[#a150de] transition-all duration-500 "
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
            <div className="bg-slate-100 md:h-fit  hover:rotate-x-12 hover:rotate-y-12 duration-500 transform transition-transform">
              <div className="pt-8 p-4 pl-6 text-3xl text-gray-900 font-ttChoc ">
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

              <div
                onClick={scrollToProjects}
                className="p-4 pl-6 text-3xl text-gray-900 font-ttChoc text-right hover:text-purple-800 transition-colors duration-500"
              >
                go to My Projects
              </div>
            </div>
            <div className="border-slate-100 border-8 rounded-tl-2xl rounded-bl-2xl  hover:rotate-x-12 hover:-rotate-y-12 duration-500 transform transition-transform ">
              <div className="pt-8 p-4 pl-6 text-3xl text-slate-200 font-ttChoc">
                Skills
              </div>
              <div className="pt-1  pl-6 text-xl text-slate-200 font-ttChoc">
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
              <div className="pt-0 pl-6 text-xl text-slate-200 font-ttChoc">
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

        <div
          ref={projectSectionRef}
          className="w-full max-w-5xl min-h-screen h-fit items-center justify-between mt-32 font-semibold text-white"
        >
          <div className="pt-20 p-4 pl-6 text-6xl pb-12 text-slate-200 font-ttChoc">
            Projects
          </div>

          <div className="w-full h-[26rem] from-[#21122f] transition-all hover:border-purple-800 hover:border-2 to-[#241634] bg-gradient-to-br t-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto overflow-y-scroll">
            <ProjectBox
              projectTitle="Hack the Skies"
              bodyText="Hack the Skies is a hackathon of my own founding, led by a team of highschool students! We want to bring highschool students into the tech community. We're happening October 2024, check us out!"
              dateText="Since October 2023"
              imageURL="/HackTheSkiesLogoBlue.png"
              linkURL="https://hacktheskies.com"
            />
            <ProjectBox
              projectTitle="Identibear"
              bodyText="Identibear is a memory companion for dementia and prognopasia patients! Using a CNN, it detects who the user is talking to and outputs details in an earbud. It's also easily customizable on a web app."
              dateText="Made at Hack The 6ix 2024"
              imageURL="/IdentibearLogo.png"
              linkURL="https://devpost.com/software/identibear-your-memory-companion"
            />
            <ProjectBox
              projectTitle="Cycle"
              bodyText="Cycle is an Android Studio (Java) App that lets the user cycle through the day, leaving notes, to-do lists, and alarms! The user can also look at the entire day at once and view their edits."
              dateText="Made June 2024"
              imageURL="/CycleImage.jpg"
              linkURL="https://github.com/Solaror0/Cycle_APP/tree/main"
            />
            <ProjectBox
              projectTitle="Air DJ"
              bodyText="Air DJ is an instrument that allows the user to control Ableton Midi Values using pressure sensors, and change the pitch through an ultrasonic sensor distance, creating a DJ experience in the air!"
              dateText="Made at Hack The North 2023"
              imageURL="/airDJ.jpg"
              linkURL="https://devpost.com/software/air-dj-2r3nw9"
            />
            <ProjectBox
              projectTitle="Handibrake"
              bodyText="A mission statement: a girl in India suffering from leprosy uses her bike to travel through the roads of Mumbai. Create an accessible way of braking to allow her to safely travel. Watch the video linked below!"
              dateText="Made December 2023"
              imageURL="/EngDesGlove.png"
              linkURL="https://www.youtube.com/watch?v=alz2EUx-i6A"
            />
            <ProjectBox
              projectTitle="EmpowerU"
              bodyText="A web app allowing employers and employees to connect, prioritizing workflow, transparancy, and boasting built-in mental health functions for employees. EmpowerU goes beyond the standard work app with its accessible usage and design."
              dateText="Made at Hack the 6ix 2023"
              imageURL="/EmpowerUPng.png"
              linkURL="https://devpost.com/software/empoweru-dwiz25"
            />
            <ProjectBox
              projectTitle="Penguin ISU"
              bodyText="An Independent Study Unit on penguins! Made with TailwindCSS & Flask, this is a web app that walks the user through Emperor Penguins with information and minigames."
              dateText="Made December 2024"
              imageURL="/highResPengCardBackground.png"
              linkURL="https://penguinisu.vercel.app/"
            />
          </div>
        </div>

        <div
          ref={contactSectionRef}
          className="w-full max-w-5xl min-h-screen h-fit items-center justify-between mt-16 font-semibold text-white"
        >
          <div className="pt-20 p-4 pl-6 text-5xl md:text-6xl pb-12 text-slate-200 font-ttChoc">
            Contact Me!
          </div>
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
//randocomment
