import React, { RefObject } from "react";
import "./slider.scss";

interface Slider {
  initialValue?: number;
  maxValue?: number;
  className: string;
  sliderRef(sliderRef: RefObject<HTMLDivElement>): any;
  onProgressChange(
    value: number,
    refSlider?: HTMLDivElement | null,
    refSliderThumb?: HTMLDivElement | null
  ): any;
}

const Slider = ({
  initialValue = 0,
  maxValue = 100,
  className,
  onProgressChange,
  sliderRef,
}: Slider) => {
  const refSlider = React.useRef<HTMLDivElement>(null),
    refSliderBg = React.useRef<HTMLDivElement>(null),
    refSliderFg = React.useRef<HTMLDivElement>(null),
    refSliderThumb = React.useRef<HTMLDivElement>(null);

  const [value, setValue] = React.useState(initialValue);

  const setSize = (event: any, slider: RefObject<HTMLDivElement>) => {
    var rect = slider.current!.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var size = (x / rect.width) * 100;
    if (size >= 100) size = 100;
    if (size <= 0) size = 0;

    setValue(Math.trunc(size));
  };

  const mouseDown = () => {
    window.addEventListener("mousemove", moveAt);
    window.addEventListener("mouseup", mouseUp);
  };

  const mouseUp = () => {
    window.removeEventListener("mousemove", moveAt);
    window.removeEventListener("mouseup", mouseUp);
  };

  const moveAt = (event: MouseEvent): any => {
    setSize(event, refSlider);
  };

  const handleClickSlider = (event: React.MouseEvent): any => {
    setSize(event, refSlider);
  };

  React.useEffect(() => {
    setValue((initialValue * 100) / maxValue);

    sliderRef && sliderRef(refSlider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    refSliderFg.current!.setAttribute("style", `width: ${value}%;`);
    refSliderThumb.current!.setAttribute(
      "style",
      `left: calc(${value}% - 6px);`
    );

    onProgressChange(
      Math.trunc(maxValue * (value / 100)),
      refSlider.current,
      refSliderThumb.current
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div
      className={`slider ${className}`}
      onClick={handleClickSlider}
      ref={refSlider}
    >
      <div className="slider__bg" ref={refSliderBg}></div>
      <div className="slider__fg" ref={refSliderFg}></div>
      <div
        className="slider__thumb"
        ref={refSliderThumb}
        onMouseDown={mouseDown}
      ></div>
    </div>
  );
};

export default Slider;
