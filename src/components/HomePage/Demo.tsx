"use client";

// import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Link } from "react-router-dom";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var h-[600px]">
      <CardBody className="bg-transparent relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-transparent dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-full rounded-xl p-6   ">
       <div className="flex justify-center"> 
       <CardItem
          translateZ="50"
          className="text-xl  font-bold text-white dark:text-white"
        >
          Buy Medicine in one click
        </CardItem>
     
       </div>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4  h-[420px]"
        >
          <img
            src="https://img.freepik.com/free-photo/high-angle-pill-foils-plastic-containers_23-2148533456.jpg"
            height="1000"
            width="1000"
            className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <Link to='/shop'>
        <div className="flex justify-center items-center mt-5">
          
          <CardItem
            translateZ={20}
            translateX={40}
            as="button"
            className=" px-4 py-4 w-1/3 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
           Buy
          </CardItem>
        </div>
        </Link>
      </CardBody>
    </CardContainer>
  );
}
