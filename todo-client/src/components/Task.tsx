import React from "react";
import Icon from "@material-ui/core/Icon";

import Gallery from "./gallery/";
import Subtask from "./Subtask";
import DragAndDrop from "./DragAndDrop";
import classNames from "classnames";
import Dialog from "./Dialog";
import { ITask } from "../redux/types";
import { useDispatch } from "react-redux";
import { addSubtask } from "../redux/actions/subtasks";
import { deleteTask } from "../redux/actions/tasks";
import { addImage } from "../redux/actions/gallery";

export interface IFile extends File {
  url?: string;
}

const Task = ({ name, _id, subtasks, gallery }: ITask) => {
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);
  const [uploadImages, setUploadImages] = React.useState<IFile[]>([]);

  const [uploadImageError, setUploadImageError] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [subtaskName, setSubtaskName] = React.useState<string>("");

  const [editGallery, setEditGallery] = React.useState(false);
  const [editDescription, setEditDescription] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [showAddSubtask, setShowAddSubtask] = React.useState(false);

  const [menu, setMenu] = React.useState(false);

  const imageUploadButton = React.useRef<any>(null);

  const dispatch = useDispatch();

  const handleDrop = (files: IFile[]) => {
    setUploadImageError("");
    for (var i = 0; i < files.length; i++) {
      files[i].url = URL.createObjectURL(files[i]);

      let message = checkImage(files[i]);

      if (message) {
        setUploadImageError(message);
        return;
      }
    }
    setUploadImages([...uploadImages, ...files]);
  };

  const handleRemoveDragPreview = (index: number) => {
    var arr = [...uploadImages];
    arr.splice(index, 1);
    setUploadImages(arr);
  };

  const handleInputImageChange = (event: React.ChangeEvent): void => {
    setUploadImageError("");
    let file: IFile = (event!.target as HTMLFormElement).files[0];

    if (!file) return;

    let message = checkImage(file);

    if (message) {
      setUploadImageError(message);
      return;
    }

    file.url = URL.createObjectURL(file);
    setUploadImages([...uploadImages, file]);
  };

  const checkImage = (image: IFile) => {
    if (!image.type.includes("image")) return "Добавлять можно только картинки";
    if (image.size > 5242880) return "Максимальный размер 5 МБ";

    return "";
  };

  const handleSubmit = () => {
    dispatch(deleteTask(_id));
    setShowDelete(false);
  };

  const handleSubmitAddSubtask = () => {
    dispatch(addSubtask(_id, subtaskName));
    setSubtaskName("");
    setShowAddSubtask(false);
  };

  const handleSubtaskName = (e: any) => {
    setSubtaskName(e.target.value);
  };

  const handleUploadClick = () => {
    uploadImages.forEach((image) => {
      dispatch(
        addImage(_id, image, (progress) => {
          console.log(progress);
        })
      );
    });
  };

  React.useEffect(() => {}, []);

  return (
    <div className={!fullscreen ? `task` : `task fullscreen`}>
      <div className="task__header">
        <ul
          onClick={() => setMenu(false)}
          className={`task__menu ${menu && "active"}`}
        >
          <li onClick={() => setShowAddSubtask(true)}>
            <Icon>add</Icon>Добавить подзадачу
          </li>
          <li>
            <Icon>create</Icon>Редактировать задачу
          </li>
          <li onClick={() => setShowDelete(true)}>
            <Icon>delete</Icon>Удалить задачу
          </li>
        </ul>
        <p className="task__header__title">{name}</p>
        <div className="task__header__buttons">
          <div
            onClick={() => setFullscreen(!fullscreen)}
            className="task__button button--fullscreen"
          >
            {!fullscreen ? (
              <Icon>fullscreen</Icon>
            ) : (
              <Icon>fullscreen_exit</Icon>
            )}
          </div>
          <div
            onClick={() => setMenu(!menu)}
            className="task__button button--menu"
          >
            <Icon>more_horiz</Icon>
          </div>
        </div>
      </div>

      <div className="task__container">
        <div className="task__sidebar">
          <div className="task__sub-title">
            <h2>галерея</h2>
            <Icon
              className="button--icon"
              onClick={() => setEditGallery(!editGallery)}
            >
              edit
            </Icon>
          </div>

          <div className="task__sidebar__add_image">
            <DragAndDrop handleChange={handleDrop}>
              {uploadImages.length > 0 ? (
                uploadImages.map(
                  (image, index) =>
                    index < 6 && (
                      <div
                        className={classNames("drag_image_preview", {
                          last: index > 4 && uploadImages.length > 6,
                        })}
                        data-image_count={
                          uploadImages.length > 6 && index > 4
                            ? uploadImages.length - 6
                            : undefined
                        }
                        key={index}
                      >
                        <div
                          className="drag_image_preview__remove_button"
                          onClick={() => {
                            handleRemoveDragPreview(index);
                          }}
                        >
                          <Icon>delete</Icon>
                        </div>
                        <img src={image.url} alt="" />
                      </div>
                    )
                )
              ) : (
                <label
                  className="task__sidebar__add_image__button"
                  ref={imageUploadButton}
                >
                  {!uploadImageError ? (
                    <>
                      <p>Выбрать файл</p>
                      <i>или перетащите файлы</i>
                    </>
                  ) : (
                    <p style={{ color: "#f87474" }}>{uploadImageError}</p>
                  )}

                  <input type="file" onChange={handleInputImageChange} />
                </label>
              )}
            </DragAndDrop>
            {uploadImages.length > 0 && (
              <div className="task__sidebar__add_image__buttons">
                <label className="button button_add" ref={imageUploadButton}>
                  <p>
                    <Icon>add</Icon>Добавить файл
                  </p>
                  <input type="file" onChange={handleInputImageChange} />
                </label>
                <button
                  onClick={handleUploadClick}
                  className="button button_upload"
                >
                  <Icon>publish</Icon>Загрузить файлы
                </button>
              </div>
            )}
          </div>

          {gallery.length > 0 && (
            <div className="task__sidebar__gallery">
              <Gallery images={gallery} />
            </div>
          )}
          <div className="task__sub-title">
            <h2>Описание</h2>
            <Icon
              className="button--icon"
              onClick={() => setEditDescription(!editDescription)}
            >
              edit
            </Icon>
          </div>
          <div className="task__sidebar__description">
            {editDescription ? (
              <textarea
                name=""
                maxLength={600}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            ) : (
              <p>{description}</p>
            )}
          </div>
        </div>

        <div className="task__content">
          {fullscreen && (
            <div className="task__sub-title">
              <h2>Подзадачи</h2>
              <Icon className="button--icon">add</Icon>
            </div>
          )}
          {subtasks.map((subtask) => (
            <Subtask {...subtask} key={subtask._id} />
          ))}
        </div>
      </div>
      {showDelete && (
        <Dialog
          header="Удаление"
          onSubmit={handleSubmit}
          onDecline={() => setShowDelete(false)}
        >
          <p>Вы действительно хотите удалить эту задачу?"</p>
        </Dialog>
      )}

      {showAddSubtask && (
        <Dialog
          header="Добавление подзадачи"
          onSubmit={handleSubmitAddSubtask}
          onDecline={() => setShowAddSubtask(false)}
        >
          <p>Название:</p>
          <input
            type="text"
            placeholder="Введите название"
            onChange={handleSubtaskName}
          />
        </Dialog>
      )}
    </div>
  );
};

export default Task;
