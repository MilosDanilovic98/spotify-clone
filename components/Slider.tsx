"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import React from "react";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (

      <RadixSlider.Root
        className={
          "relative flex h-10 w-full touch-none select-none items-center cursor-pointer"
        }
        defaultValue={[]}
        value={[value]}
        max={1}
        step={0.1}
        aria-label={"Volume"}
        onValueChange={handleChange}
      >
        <RadixSlider.Track
          className={"relative h-[3px] grow rounded-full bg-neutral-600 cursor-pointer"}
        >
          <RadixSlider.Range
            className={"absolute h-full rounded-full bg-white cursor-pointer"}
          />
        </RadixSlider.Track>
      </RadixSlider.Root>

  );
};

export default Slider;
