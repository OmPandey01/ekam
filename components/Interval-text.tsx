import { TextRenderer } from "./article-page";
import { useState, useEffect } from "react";

export default function IntervalText(props: { data: string[] }) {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % props.data.length);
    }, 3000);

    // 1. Uncomment the cleanup function to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []); // 2. Add the empty dependency array here!

  console.log(props.data[index], index);

  return (
    <div>
      <TextRenderer size={"md"} text={props.data[index]} index={index} />
    </div>
  );
}
