import React from "react";
import Slider from "./slider/index";

export interface IColor {
  hue: number;
  saturation: number;
  light: number;
}

interface ColorPicker {
  defaultColor: IColor;
  onColorChange(color: IColor): any;
}

const ColorPicker = ({ defaultColor, onColorChange }: ColorPicker) => {
  const [color, setColor] = React.useState<IColor>(defaultColor);

  const [hueSlider, setHueSlider] = React.useState<any>();
  const [satSlider, setSatSlider] = React.useState<any>();
  const [lightSlider, setLightSlider] = React.useState<any>();

  const OnChange = (value: number, slider: HTMLDivElement) => {
    slider.className.includes("hue") &&
      setColor((prevColor) => ({
        ...prevColor,
        hue: value,
      }));

    slider.className.includes("saturation") &&
      setColor((prevColor) => ({
        ...prevColor,
        saturation: value,
      }));

    slider.className.includes("light") &&
      setColor((prevColor) => ({
        ...prevColor,
        light: value,
      }));
  };

  React.useLayoutEffect(() => {
    onColorChange(color);

    if (hueSlider == null || satSlider == null || lightSlider == null) return;
    hueSlider.current.querySelector(
      ".slider__thumb"
    ).style.background = `hsl(${color.hue}, 50%, 50%)`;

    satSlider.current.querySelector(
      ".slider__thumb"
    ).style.background = `hsl(${color.hue}, ${color.saturation}%, ${color.light}%)`;

    satSlider.current.querySelector(
      ".slider__bg"
    ).style.background = `linear-gradient(90deg, hsl(${color.hue}, 0%, ${color.light}%) 0%, hsl(${color.hue}, 100%, ${color.light}%) 100%)`;

    lightSlider.current.querySelector(
      ".slider__thumb"
    ).style.background = `hsl(0, 0%, ${color.light}%)`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return (
    <div className="color_picker">
      <p>Выбрать цвет</p>
      <Slider
        initialValue={defaultColor.hue}
        maxValue={360}
        onProgressChange={OnChange}
        className={"hue"}
        sliderRef={setHueSlider}
      />
      <Slider
        initialValue={defaultColor.saturation}
        maxValue={100}
        onProgressChange={OnChange}
        className={"saturation"}
        sliderRef={setSatSlider}
      />
      <Slider
        initialValue={defaultColor.light}
        maxValue={100}
        onProgressChange={OnChange}
        className={"light"}
        sliderRef={setLightSlider}
      />
    </div>
  );
};

export default ColorPicker;
