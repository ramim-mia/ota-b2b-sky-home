import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  airLineCode?: string;
  className?: string;
  height?: string;
  width?: string;
}

const DynamicAirlineImage: FC<Props> = ({
  airLineCode,
  className,
  height,
  width,
}) => {
  return (
    <img
      className={twMerge("h-10 w-20 object-contain", className)}
      src={`https://m360ict.s3.ap-south-1.amazonaws.com/ota-files/${airLineCode}`}
      alt="airline_image"
      height={height || "100"}
      width={width || "100"}
    />
  );
};

export default DynamicAirlineImage;
