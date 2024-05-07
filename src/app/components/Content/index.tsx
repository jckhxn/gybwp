import React from "react";
import Image from "next/image";
import Link from "next/link";
import PDF from "public/content-icons/pdf.png";
import WEB from "public/content-icons/web.png";
// Renders an icon and link tag based on Content passed by Sanity CMS.
// PDF, Link, Etc
interface ContentType {
  name: string;
  file: string;
  link: string;
  type: string;
  image: string;
}
export const Content = ({ file, name, link, type, image }: ContentType) => {
  return (
    <>
      {type === "image" ? (
        <div className="col-auto mr-3  row-start-1 row-end-1">
          <Image src={image} alt={name} width="300" height="300" />

          {name}
        </div>
      ) : null}

      {type === "link" ? (
        <div className=" mr-5   row-start-2 row-end-2 ">
          <Link href={{ pathname: link }}>
            <Image
              className="ml-28 md:ml-5"
              src={WEB}
              alt={name}
              width="75"
              height="75"
            />

            {name}
          </Link>
        </div>
      ) : null}

      {type === "pdf" ? (
        <div className=" row-start-2 row-end-2">
          <Link href={{ pathname: file }}>
            <Image
              className="ml-28  md:ml-5"
              src={PDF}
              alt={name}
              width="75"
              height="75"
            />
            {name}
          </Link>
        </div>
      ) : null}
    </>
  );
};
