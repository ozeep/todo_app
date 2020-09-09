import React from "react";
import DragAndDrop from "../DragAndDrop";
import DownloadPreview from "./DownloadPreview";
import { IFile } from "../";
import { addImage } from "../../redux/actions/gallery";
import { useDispatch } from "react-redux";
import ID from "../../utils/id";
import { AiOutlinePlus, AiOutlineCloudUpload } from "react-icons/ai";

interface IImageUploader {
	taskId: string;
}

const ImageUploader = ({ taskId }: IImageUploader) => {
	const [uploadImageError, setUploadImageError] = React.useState<string>("");
	const [uploadImages, setUploadImages] = React.useState<IFile[]>([]);

	const dispatch = useDispatch();

	const handleDrop = (files: IFile[]) => {
		setUploadImageError("");
		for (var i = 0; i < files.length; i++) {
			files[i].url = URL.createObjectURL(files[i]);
			files[i].id = ID();
			let message = checkImage(files[i]);

			if (message) {
				setUploadImageError(message);
				return;
			}
		}
		setUploadImages([...uploadImages, ...files]);
	};

	const handleRemoveDragPreview = (index: number) => {
		setUploadImages((prev) => prev.filter((_, i) => i !== index));
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
		file.id = ID();
		setUploadImages([...uploadImages, file]);
	};

	const handleInputImageClick = (
		event: React.MouseEvent<HTMLInputElement, MouseEvent>
	) => {
		const element = event.target as HTMLInputElement;
		element.value = "";
	};

	const checkImage = (image: IFile) => {
		if (!image.type.includes("image")) return "Добавлять можно только картинки";
		if (image.size > 5242880) return "Максимальный размер 5 МБ";

		return "";
	};

	const handleUploadClick = () => {
		uploadImages.forEach((image) => {
			dispatch(
				addImage(taskId, image, (progress) => {
					var percentCompleted = Math.round(
						(progress.loaded * 100) / progress.total
					);
					setUploadImages((prev) =>
						prev.map((img) =>
							image.id === img.id
								? { ...img, downloadProgress: percentCompleted }
								: img
						)
					);
				})
			);
		});
	};

	return (
		<>
			<DragAndDrop handleChange={handleDrop}>
				{uploadImages.length > 0 ? (
					<DownloadPreview
						uploadImages={uploadImages}
						onRemove={handleRemoveDragPreview}
					/>
				) : (
					<label className="task__sidebar__add_image__button">
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
					<label className="button button_add">
						<p>
							<AiOutlinePlus />
						</p>
						<input
							type="file"
							onChange={handleInputImageChange}
							onClick={handleInputImageClick}
						/>
					</label>
					<button onClick={handleUploadClick} className="button button_upload">
						<AiOutlineCloudUpload />
					</button>
				</div>
			)}
		</>
	);
};

export default ImageUploader;
