'use client';
import { ReactLenis } from 'lenis/react';
import Link from 'next/link';

export default function HorizontalScroll() {
  return (
    <ReactLenis root>
      <main>
        <article>
          {/* Slide 1: Hook */}
          <section className="text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
            Tired of scrolling through boring docs? <br />
            Let ChatDoc do the reading for you. 🤖📄
            </h1>
          </section>

          {/* Slide 2: What it does */}
          <section className="bg-gray-300 text-black grid place-content-center h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="2xl:text-7xl text-[2.5rem] px-8 font-semibold text-center tracking-tight leading-[120%]">
            Whether it’s college notes, research papers, or 100-page manuals,
            <br /> ChatDoc breaks it down so you don’t have to. 😮‍💨📖
            </h1>
          </section>

          {/* Slide 3: Vibe + CTA */}
          <section className="text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]  "></div>
            <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
            Upload notes, essays, or random PDFs...<br />
            We’ll turn it into chill convos. 😎 give it a go ↓
            </h1>
            <Link href={"/playground"} className='m-auto mt-[2rem] text-[2rem] font-semibold px-[2rem] py-[0.5rem] bg-[#ffffff1c] rounded-[5px] hover:scale-[1.03] transition-all cursor-pointer z-50' >Get Started</Link>
          </section>
        </article>
      </main>
    </ReactLenis>
  );
}
