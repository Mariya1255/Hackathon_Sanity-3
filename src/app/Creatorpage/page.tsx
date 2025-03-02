'use client';

import Image from 'next/image';
import { FaEnvelope, FaInstagram, FaGithub, FaLinkedin, FaHandshake } from 'react-icons/fa'; // Added icons for sections

function CreatorPage() {
  return (
    <>
   
      <div className="min-h-screen bg-[#f9f9f9] py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* About Creator Section */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/Mariya.jpg" // Path to your image in the public folder
                alt="Mariya"
                width={150}
                height={150}
                className="rounded-full shadow-lg-[#1D3178]"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1D3178] flex items-center gap-2">
                About the Creator
              </h1>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                Hi, I’m <span className="font-semibold">Mariya khan</span>, an enthusiastic developer exploring the limitless
                opportunities in <span className="font-semibold">Generative AI</span>, the <span className="font-semibold">Metaverse</span>, and <span className="font-semibold">Cloud Technologies</span>. I specialize in creating interactive and innovative web solutions while staying ahead of cutting-edge trends.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                When I’m not coding, you’ll find me delving into new tech adventures, sharing ideas, or connecting with like-minded people to build
                amazing projects.
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200"></div>

          {/* Feel Free to Knock Section */}
          <div className="bg-[#FEE5E5] sm:bg-[#EDEFFB] p-6 rounded-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#FB2E86] flex items-center justify-center gap-2">
              Feel Free to <span className="text-[#1D3178]">Knock</span> <FaHandshake className="text-[#FB2E86]" />
            </h2>
            <div className="mt-6 flex justify-center space-x-8 text-center text-2xl text-[#1D3178]">
              {/* Gmail */}
              <a
                href="mariyakhan5562@gmail.com"
                className="hover:text-[#FB2E86] transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEnvelope />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/manokhan31124?igsh=b29wd2hqcDBrb2tr"
                className="hover:text-[#FB2E86] transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Mariya1255"
                className="hover:text-[#FB2E86] transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mariya-khan-3072152b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="hover:text-[#FB2E86] transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatorPage;