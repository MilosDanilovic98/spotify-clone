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
    <div>
      <RadixSlider.Root
        className={
          "relative flex h-10 w-full touch-none select-none items-center"
        }
        defaultValue={[]}
        value={[value]}
        max={1}
        step={0.1}
        aria-label={"Volume"}
      >
        <RadixSlider.Track
          className={"relative h-[3px] grow rounded-full bg-neutral-600"}
        >
          <RadixSlider.Range
            className={"absolute h-full rounded-full bg-white"}
          />
        </RadixSlider.Track>
      </RadixSlider.Root>
    </div>
  );
};

export default Slider;
