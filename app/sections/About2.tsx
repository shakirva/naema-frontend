"use client";
import Image from "next/image";
import React, { useRef } from "react";
import DateSticker from "../components/DateSticker";

import Link from "next/link";
import ParallaxImage from "../components/ParallaxImage";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About2 = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const sticker = useRef<HTMLDivElement | null>(null);

  const span = useRef<HTMLSpanElement | null>(null);
  const title = useRef<HTMLParagraphElement | null>(null);
  const para = useRef<HTMLParagraphElement | null>(null);
  const icons = useRef<HTMLDivElement | null>(null);
  const button = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
   tl.to(sticker.current, { y: -200 }, 0)      // Using pixels for more control
      .to(span.current, { y: -100 }, 0)
      .to(title.current, { y: -200 }, 0)
      .to(para.current, { y: -100 }, 0)         // Lower value for the tall para
      .to(icons.current, { y: -50 }, 0);
  }, { scope: container });

  return (
    <section
      ref={container}
      className="w-full relative  bg-cream px-16 py-32 max-lg:pt-8 max-lg:px-8 max-md:px-5"
    >
      <div ref={sticker} className="absolute top-0 right-10 z-10 ">
        <DateSticker />
      </div>

      <div className="h-full w-full absolute inset-0">
        <ParallaxImage
          mainclass="h-full w-full absolute inset-0"
          imageClass="object-cover "
          src="/goldpalm.jpg"
          alt="palm"
        />
        <div className="h-full w-full absolute inset-0 bg-gold opacity-15" />
      </div>

      <div className="flex flex-col items-center  relative w-full max-w-[1440px] mx-auto h-full">
        <span
          ref={span}
          className="font-serif text-[clamp(2.25rem,5.56vw,5rem)] text-center leading-none  bg-cream border-2 border-gold rounded-lg px-6 py-2 -rotate-2"
        >
          Our <span className="italic">Story</span>
        </span>

        <p
          ref={title}
          className="text-[clamp(3rem,12vw,180px)] font-serif font-medium text-cream leading-none text-center mt-32 "
        >
          Born in <br /> India
        </p>

        <p
          ref={para}
          className="font-serif text-[clamp(1.5rem,3.33vw,3rem)]  text-cream leading-[1.25] text-center mt-20 "
        >
          Naema was created with a deep appreciation for exceptional dates,
          premium nuts, and thoughtful craftsmanship — bringing together rich
          flavour, everyday luxury, and carefully sourced ingredients in every
          collection we create.
        </p>

        <div className="w-full flex flex-col items-center justify-center mt-42 ">
          <div ref={icons} className="flex flex-wrap justify-center gap-16  ">
            {/* Icon 1 */}
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="size-32 bg-cream border-2 border-gold  rounded-full p-10">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <g clipPath="url(#clip0_5303_7089)">
                    <path
                      d="M15.3491 7.69635H19.1746C20.1892 7.69635 21.1622 8.09939 21.8796 8.81681C22.5971 9.53423 23.0001 10.5073 23.0001 11.5218V17.2601C23.0001 17.5137 22.8993 17.757 22.72 17.9363C22.5406 18.1157 22.2974 18.2164 22.0437 18.2164H15.3491V7.69635Z"
                      fill="white"
                    />
                    <path
                      d="M23 11.5218V12.4782H19.1745C19.0421 12.4836 18.91 12.4599 18.7877 12.4086C18.6654 12.3574 18.5559 12.2799 18.4668 12.1817C18.3775 12.0862 18.3093 11.973 18.2664 11.8495C18.2236 11.7259 18.2072 11.5948 18.2182 11.4645V7.69635H19.1745C20.1891 7.69635 21.1621 8.09939 21.8796 8.81681C22.597 9.53423 23 10.5073 23 11.5218Z"
                      fill="#66E1FF"
                    />
                    <path
                      d="M19.1739 7.69635H18.2175V11.4645C18.2096 11.622 18.2408 11.779 18.3084 11.9216L21.6241 8.60586C20.9409 8.02199 20.0726 7.69967 19.1739 7.69635Z"
                      fill="#C2F3FF"
                    />
                    <path
                      d="M1.95979 3.87085H14.3926C14.6463 3.87085 14.8895 3.97161 15.0689 4.15096C15.2482 4.33032 15.349 4.57358 15.349 4.82722V17.2601H1.00342V4.82722C1.00342 4.57358 1.10418 4.33032 1.28353 4.15096C1.46289 3.97161 1.70614 3.87085 1.95979 3.87085Z"
                      fill="#FF808C"
                    />
                    <path
                      d="M15.3514 14.8691H1.00586V17.2601H15.3514V14.8691Z"
                      fill="#E3E3E3"
                    />
                    <path
                      d="M14.3926 3.87085H1.95979C1.70614 3.87085 1.46289 3.97161 1.28353 4.15096C1.10418 4.33032 1.00342 4.57358 1.00342 4.82722V7.21815C1.00342 6.96451 1.10418 6.72125 1.28353 6.54189C1.46289 6.36254 1.70614 6.26178 1.95979 6.26178H14.3926C14.6463 6.26178 14.8895 6.36254 15.0689 6.54189C15.2482 6.72125 15.349 6.96451 15.349 7.21815V4.82722C15.349 4.57358 15.2482 4.33032 15.0689 4.15096C14.8895 3.97161 14.6463 3.87085 14.3926 3.87085Z"
                      fill="#FFBFC5"
                    />
                    <path
                      d="M10.5678 6.73999H4.82959V10.5655H10.5678V6.73999Z"
                      fill="#FFBC44"
                    />
                    <path
                      d="M6.73823 10.5875H1V14.8691H6.73823V10.5875Z"
                      fill="#FFBC44"
                    />
                    <path
                      d="M12.4482 10.5875H6.70996V14.8691H12.4482V10.5875Z"
                      fill="#FFBC44"
                    />
                    <path
                      d="M15.827 20.1292C16.4611 20.1292 17.0692 19.8772 17.5176 19.4289C17.966 18.9805 18.2179 18.3723 18.2179 17.7382C18.2179 17.1041 17.966 16.496 17.5176 16.0476C17.0692 15.5992 16.4611 15.3473 15.827 15.3473C15.1929 15.3473 14.5847 15.5992 14.1363 16.0476C13.6879 16.496 13.436 17.1041 13.436 17.7382C13.436 18.3723 13.6879 18.9805 14.1363 19.4289C14.5847 19.8772 15.1929 20.1292 15.827 20.1292Z"
                      fill="#808080"
                    />
                    <path
                      d="M5.30646 20.1292C5.94057 20.1292 6.54871 19.8772 6.9971 19.4289C7.44549 18.9805 7.69739 18.3723 7.69739 17.7382C7.69739 17.1041 7.44549 16.496 6.9971 16.0476C6.54871 15.5992 5.94057 15.3473 5.30646 15.3473C4.67234 15.3473 4.0642 15.5992 3.61581 16.0476C3.16743 16.496 2.91553 17.1041 2.91553 17.7382C2.91553 18.3723 3.16743 18.9805 3.61581 19.4289C4.0642 19.8772 4.67234 20.1292 5.30646 20.1292Z"
                      fill="#808080"
                    />
                    <path
                      d="M11.5236 17.2601H9.61084"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.131 18.2164H22.0437C22.2974 18.2164 22.5406 18.1157 22.72 17.9363C22.8993 17.757 23.0001 17.5137 23.0001 17.2601V11.5218C22.9968 10.5083 22.5927 9.53714 21.876 8.82043C21.1593 8.10372 20.1882 7.69963 19.1746 7.69635H15.3491"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.9995 16.3037H21.5649"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.61084 13.4346V10.5655H12.48V14.8692"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.00342 10.5655H6.74165"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.87256 10.5655V13.4346"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.82861 6.73999H10.5668V10.5655H4.82861V6.73999Z"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.69775 6.73999V8.65273"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.7417 10.5655V13.9128"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.349 13.4346V4.82722C15.349 4.57358 15.2482 4.33032 15.0689 4.15096C14.8895 3.97161 14.6463 3.87085 14.3926 3.87085H1.95979C1.70614 3.87085 1.46289 3.97161 1.28353 4.15096C1.10418 4.33032 1.00342 4.57358 1.00342 4.82722V17.2601"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.9997 12.4782H19.1742C19.0432 12.4803 18.9132 12.4551 18.7925 12.4041C18.6717 12.3532 18.5629 12.2777 18.473 12.1825C18.383 12.0872 18.3139 11.9742 18.2699 11.8508C18.226 11.7273 18.2083 11.5961 18.2179 11.4654V7.69635"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.827 20.1292C16.4611 20.1292 17.0692 19.8772 17.5176 19.4289C17.966 18.9805 18.2179 18.3723 18.2179 17.7382C18.2179 17.1041 17.966 16.496 17.5176 16.0476C17.0692 15.5992 16.4611 15.3473 15.827 15.3473C15.1929 15.3473 14.5847 15.5992 14.1363 16.0476C13.6879 16.496 13.436 17.1041 13.436 17.7382C13.436 18.3723 13.6879 18.9805 14.1363 19.4289C14.5847 19.8772 15.1929 20.1292 15.827 20.1292Z"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.30646 20.1292C5.94057 20.1292 6.54871 19.8772 6.9971 19.4289C7.44549 18.9805 7.69739 18.3723 7.69739 17.7382C7.69739 17.1041 7.44549 16.496 6.9971 16.0476C6.54871 15.5992 5.94057 15.3473 5.30646 15.3473C4.67234 15.3473 4.0642 15.5992 3.61581 16.0476C3.16743 16.496 2.91553 17.1041 2.91553 17.7382C2.91553 18.3723 3.16743 18.9805 3.61581 19.4289C4.0642 19.8772 4.67234 20.1292 5.30646 20.1292Z"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5303_7089">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="font-serif text-xl text-cream max-w-[100px] text-center leading-snug">
                Farm-fresh delivery daily
              </p>
            </div>

            {/* Icon 2 */}
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="size-32 bg-cream  border-2 border-gold  rounded-full p-10 flex">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <g clipPath="url(#clip0_5303_7258)">
                    <path
                      d="M19.0629 12.8608L18.3073 5.68692C18.2836 5.45114 18.1732 5.23256 17.9976 5.07351C17.8219 4.91447 17.5935 4.82628 17.3565 4.82605H11.4261C11.1891 4.82628 10.9607 4.91447 10.785 5.07351C10.6094 5.23256 10.499 5.45114 10.4753 5.68692L9.71964 12.8608C9.70623 12.9942 9.72102 13.129 9.76305 13.2563C9.80507 13.3836 9.8734 13.5007 9.9636 13.5999C10.0538 13.6991 10.1638 13.7783 10.2866 13.8322C10.4094 13.8862 10.5421 13.9137 10.6762 13.913H18.116C18.2501 13.9137 18.3828 13.8862 18.5056 13.8322C18.6283 13.7783 18.7384 13.6991 18.8286 13.5999C18.9187 13.5007 18.9871 13.3836 19.0291 13.2563C19.0711 13.129 19.0859 12.9942 19.0725 12.8608H19.0629Z"
                      fill="#C2F3FF"
                    />
                    <path
                      d="M14.3913 10.4121C12.8391 10.4146 11.3348 9.87541 10.1376 8.88745L9.71964 12.8608C9.70623 12.9943 9.72102 13.129 9.76305 13.2563C9.80507 13.3836 9.8734 13.5007 9.9636 13.5999C10.0538 13.6991 10.1638 13.7783 10.2866 13.8322C10.4094 13.8862 10.5421 13.9137 10.6762 13.913H18.116C18.2501 13.9137 18.3828 13.8862 18.5056 13.8322C18.6283 13.7783 18.7384 13.6991 18.8286 13.5999C18.9187 13.5007 18.9871 13.3836 19.0291 13.2563C19.0711 13.129 19.0859 12.9943 19.0725 12.8608L18.6545 8.89128C17.4543 9.87988 15.9462 10.4179 14.3913 10.4121Z"
                      fill="#66E1FF"
                    />
                    <path
                      d="M1 22.9999V13.4347"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 15.3478H7.69565C8.45671 15.3478 9.18659 15.6501 9.72474 16.1883C10.2629 16.7264 10.5652 17.4563 10.5652 18.2173H16.3043C17.0654 18.2173 17.7953 18.5197 18.3334 19.0578C18.8716 19.596 19.1739 20.3259 19.1739 21.0869H1V15.3478Z"
                      fill="#FFDDA1"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5649 18.2174H7.69531"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.0433 8.65198H16.3042C16.0505 8.65198 15.8072 8.75275 15.6278 8.93214C15.4484 9.11152 15.3477 9.35481 15.3477 9.6085V14.3911C15.3477 14.6448 15.4484 14.8881 15.6278 15.0675C15.8072 15.2469 16.0505 15.3476 16.3042 15.3476H22.0433C22.297 15.3476 22.5403 15.2469 22.7197 15.0675C22.8991 14.8881 22.9998 14.6448 22.9998 14.3911V9.6085C22.9998 9.48289 22.9751 9.35851 22.927 9.24245C22.8789 9.1264 22.8085 9.02096 22.7197 8.93214C22.6309 8.84332 22.5254 8.77286 22.4094 8.72479C22.2933 8.67672 22.1689 8.65198 22.0433 8.65198Z"
                      fill="#FF808C"
                    />
                    <path
                      d="M22.0433 8.65198H16.3042C16.0505 8.65198 15.8072 8.75275 15.6278 8.93214C15.4484 9.11152 15.3477 9.35481 15.3477 9.6085V11.9998C15.3477 11.7461 15.4484 11.5028 15.6278 11.3234C15.8072 11.1441 16.0505 11.0433 16.3042 11.0433H22.0433C22.297 11.0433 22.5403 11.1441 22.7197 11.3234C22.8991 11.5028 22.9998 11.7461 22.9998 11.9998V9.6085C22.9998 9.35481 22.8991 9.11152 22.7197 8.93214C22.5403 8.75275 22.297 8.65198 22.0433 8.65198Z"
                      fill="#FFBFC5"
                    />
                    <path
                      d="M22.0433 8.65198H16.3042C16.0505 8.65198 15.8072 8.75275 15.6278 8.93214C15.4484 9.11152 15.3477 9.35481 15.3477 9.6085V14.3911C15.3477 14.6448 15.4484 14.8881 15.6278 15.0675C15.8072 15.2469 16.0505 15.3476 16.3042 15.3476H22.0433C22.297 15.3476 22.5403 15.2469 22.7197 15.0675C22.8991 14.8881 22.9998 14.6448 22.9998 14.3911V9.6085C22.9998 9.48289 22.9751 9.35851 22.927 9.24245C22.8789 9.1264 22.8085 9.02096 22.7197 8.93214C22.6309 8.84332 22.5254 8.77286 22.4094 8.72479C22.2933 8.67672 22.1689 8.65198 22.0433 8.65198Z"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.1738 8.65198V15.3476"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.3477 12.4783H22.9998"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.2169 4.82605H11.4256C11.1894 4.82616 10.9615 4.91368 10.786 5.07174C10.6105 5.2298 10.4996 5.44722 10.4748 5.68214L9.71916 12.856C9.70503 12.9898 9.71928 13.1251 9.76098 13.253C9.80269 13.3809 9.8709 13.4986 9.96117 13.5983C10.0514 13.6981 10.1617 13.7777 10.2849 13.8319C10.408 13.8861 10.5411 13.9137 10.6757 13.913H15.3473"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.3041 4.82609V2.91304C16.3041 2.40567 16.1026 1.91908 15.7438 1.56032C15.385 1.20155 14.8984 1 14.3911 1C14.1398 1 13.8911 1.04948 13.659 1.14562C13.4269 1.24176 13.216 1.38267 13.0383 1.56032C12.8607 1.73796 12.7198 1.94885 12.6236 2.18095C12.5275 2.41305 12.478 2.66182 12.478 2.91304V4.82609"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.1733 8.65218L17.2603 6.73914"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.0869 6.73914L19.1738 8.65218"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5303_7258">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="font-serif text-xl text-cream max-w-[100px] text-center leading-snug">
                Sourced straight from orchards
              </p>
            </div>

            {/* Icon 3 */}
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="size-32 bg-cream border-2 border-gold  rounded-full p-10">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <g clipPath="url(#clip0_5303_7199)">
                    <path
                      d="M17.4149 16.0959L18.8491 8.65369H2.24561L3.65774 15.9736C3.73928 16.3438 3.94677 16.6741 4.24471 16.9085C4.54265 17.1428 4.91267 17.2665 5.29169 17.2585H16.0066C16.3399 17.2585 16.6628 17.1425 16.9197 16.9304C17.1767 16.7182 17.3518 16.4232 17.4149 16.0959Z"
                      fill="#FFF9BF"
                    />
                    <path
                      d="M18.4028 11.044L18.8637 8.65369H2.2583L2.71913 11.044H18.4028Z"
                      fill="#FFEF5E"
                    />
                    <path
                      d="M3.90527 5.78528L6.39683 1.00488"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.1904 5.78528L14.6997 1.00488"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.3375 11.3135L18.851 8.65369H2.24561L3.65774 15.9736C3.73928 16.3438 3.94677 16.6741 4.24471 16.9085C4.54265 17.1428 4.91267 17.2665 5.29169 17.2585H10.0855"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.1657 5.7854H1.95608C1.42804 5.7854 1 6.21344 1 6.74148V7.69756C1 8.2256 1.42804 8.65364 1.95608 8.65364H19.1657C19.6937 8.65364 20.1218 8.2256 20.1218 7.69756V6.74148C20.1218 6.21344 19.6937 5.7854 19.1657 5.7854Z"
                      fill="white"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5601 11.0439V13.9495"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.82422 11.0439L7.23919 13.9495"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.7718 13.7697L19.9995 16.6159H22.3897C22.5107 16.611 22.6302 16.6436 22.7318 16.7093C22.8336 16.775 22.9125 16.8705 22.9576 16.9829C23.0028 17.0952 23.0121 17.2188 22.9842 17.3366C22.9563 17.4544 22.8925 17.5608 22.8018 17.6408L20.7261 19.4862L21.8734 22.1278C21.9241 22.2486 21.9356 22.3823 21.9063 22.51C21.8769 22.6376 21.8082 22.7529 21.7099 22.8394C21.6115 22.926 21.4885 22.9794 21.3581 22.9922C21.2277 23.005 21.0965 22.9765 20.9833 22.9108L18.2106 21.3476L15.438 22.9108C15.3246 22.9762 15.1935 23.0045 15.0633 22.9915C14.9329 22.9787 14.81 22.9251 14.7117 22.8388C14.6134 22.7524 14.5446 22.6373 14.5151 22.5097C14.4854 22.3823 14.4966 22.2486 14.5469 22.1278L15.6942 19.4871L13.6233 17.6408C13.5329 17.5609 13.4693 17.455 13.4415 17.3375C13.4138 17.2201 13.4229 17.0969 13.4678 16.9848C13.5128 16.8727 13.5912 16.7774 13.6924 16.7116C13.7938 16.6459 13.9128 16.6132 14.0334 16.6178H16.4237L17.6522 13.7716C17.7068 13.6701 17.7878 13.5853 17.8868 13.5262C17.9857 13.4671 18.0987 13.4358 18.214 13.4358C18.3292 13.4358 18.4423 13.4671 18.5411 13.5262C18.6401 13.5853 18.7211 13.6701 18.7757 13.7716L18.7718 13.7697Z"
                      stroke="#191919"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5303_7199">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="font-serif text-xl text-cream max-w-[100px] text-center leading-snug">
                Premium quality, always
              </p>
            </div>
          </div>

          <div
            ref={button}
            className="w-full flex items-center justify-center  "
          >
            <Link
              href="/about"
              className="px-12 py-5 text-base font-medium tracking-tight border-2 border-gold bg-navy rounded-full text-cream w-fit transition-all hover:bg-cream hover:text-navy"
            >
              Our origins
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About2;
