import React from "react";
import { IFile } from "../Task";
import classNames from "classnames";
import RadialProgressbar from "../progressbar/radial/RadialProgressbar";
import { AiOutlineDelete } from "react-icons/ai";

interface IDownloadPreview {
	onRemove(index: number): void;
	uploadImages: IFile[];
}

const DownloadPreview = ({ uploadImages, onRemove }: IDownloadPreview) => {
	return (
		<>
			{uploadImages.map(
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
							{!image.downloadProgress && (
								<div
									className="drag_image_preview__remove_button"
									onClick={() => onRemove(index)}
								>
									<AiOutlineDelete />
								</div>
							)}
							{image.downloadProgress && (
								<div className="drag_image_preview__download-progress">
									<RadialProgressbar value={image.downloadProgress} />
								</div>
							)}
							{image.downloadProgress === 100 && onRemove(index)}
							<img src={image.url} alt="" />
						</div>
					)
			)}
		</>
	);
};

export default DownloadPreview;
