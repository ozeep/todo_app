import React from "react";
import classNames from "classnames";
import Icon from "@material-ui/core/Icon";
import { IFile } from "./Task";

interface DragAndDrop {
  children: React.ReactNode;
  handleChange(files: IFile[]): any;
}

const DragAndDrop = ({ children, handleChange }: DragAndDrop) => {
  const [dragging, setDragging] = React.useState(false);
  const [dragCounter, setDragCounter] = React.useState(0);

  const dropRef = React.useRef<HTMLDivElement>(null);

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(true);
  };

  const handleDragIn = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDragCounter((prev) => prev++);

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0)
      setDragging(true);
  };

  const handleDragOut = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDragCounter((prev) => prev--);

    if (dragCounter > 0) return;

    setDragging(false);
  };

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleChange(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
  }

  React.useEffect(() => {
    let drop: any = dropRef.current;
    drop.addEventListener("dragenter", handleDragIn);
    drop.addEventListener("dragleave", handleDragOut);
    drop.addEventListener("dragover", handleDrag);
    drop.addEventListener("drop", handleDrop);

    return () => {
      drop.removeEventListener("dragenter", handleDragIn);
      drop.removeEventListener("dragleave", handleDragOut);
      drop.removeEventListener("dragover", handleDrag);
      drop.removeEventListener("drop", handleDrop);
    };
  });

  return (
    <div
      className={classNames("drag_drop", { dragging: dragging })}
      ref={dropRef}
    >
      <div className="drag_drop__overlay">
        <Icon>publish</Icon>
      </div>
      {children}
    </div>
  );
};

export default DragAndDrop;
