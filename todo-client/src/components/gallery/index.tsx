import React from "react";
import classNames from "classnames";

import "./gallery.scss";
import { IGallery } from "../../redux/types";
import {
	AiOutlineClose,
	AiOutlineDoubleLeft,
	AiOutlineDoubleRight,
} from "react-icons/ai";

export interface GalleryComponent {
	images: IGallery[];
	settings?: any;
}

const Gallery = ({ images, settings }: GalleryComponent) => {
	const [fullscreen, setFullscreen] = React.useState<boolean>(false);
	const [imageId, setImageId] = React.useState<number>(0);
	const [previewWidth, setPreviewWidth] = React.useState<number>(0);
	const [previewNumber, setPreviewNumber] = React.useState<number>(0);

	const previewWrapper = React.useRef<HTMLDivElement>(null);
	const previewContainer = React.useRef<HTMLDivElement>(null);

	const settingsDefault = {
		maxPreview: 3,
		maxFullscreenPreview: 6,
	};

	settings = settings ? settings : settingsDefault;

	React.useEffect(() => {
		if (images.length === 0) return;

		var preview: any = previewWrapper.current!.childNodes[0];

		var previewMargin =
			preview.currentStyle || window.getComputedStyle(preview);

		var width =
			preview.getBoundingClientRect().width +
			parseInt(previewMargin.marginLeft) +
			parseInt(previewMargin.marginRight);

		setPreviewWidth(width);

		previewContainer.current!.style.width = `${previewNumber * width}px`;
	}, [fullscreen, previewNumber]);

	React.useEffect(() => {
		if (images.length === 0) return;

		if (images.length < settings.maxFullscreenPreview)
			setPreviewNumber(images.length);
		else setPreviewNumber(settings.maxFullscreenPreview);
	}, [images, settings]);

	const changeSlide = (dir: number) => {
		var id = imageId;

		id = id + 1 * dir;

		if (id >= images.length) id = 0;
		if (id < 0) id = images.length - 1;

		setPreview(id);
	};

	const setPreview = (id: number) => {
		var offset = 2;
		var maxOffset = images.length - (offset + 1) * 2;

		if (previewNumber < settings.maxFullscreenPreview) {
			offset = 0;
			maxOffset = 0;
		}

		offset = id - offset;

		if (offset <= 0) offset = 0;
		if (offset >= maxOffset) offset = maxOffset;

		previewWrapper.current!.setAttribute(
			"style",
			`left: ${-previewWidth * offset}px`
		);

		setImageId(id);
	};

	return (
		<div className={"gallery"}>
			{images.map(
				(img, index) =>
					index < settings.maxPreview && (
						<div
							className={classNames("gallery__image", {
								solo: images.length === 1,
								last:
									index === settings.maxPreview - 1 &&
									images.length > settings.maxPreview,
							})}
							onClick={() => {
								setFullscreen(true);
								setImageId(index);
							}}
							data-image_count={
								images.length > settings.maxPreview &&
								index > settings.maxPreview - 2
									? images.length - settings.maxPreview
									: undefined
							}
							key={index}
						>
							<img src={img.url} alt="" />
						</div>
					)
			)}
			<div
				className={classNames("gallery__fullscreen", {
					active: fullscreen,
				})}
			>
				<div className="gallery__fullscreen__wrapper">
					{images.map((image, index) => (
						<div
							className={classNames("gallery__fullscreen__image", {
								active: index === imageId,
							})}
							key={index}
						>
							<img src={image.url} alt="" />
						</div>
					))}
				</div>

				<div className="gallery__fullscreen__preview" ref={previewContainer}>
					<div
						className="gallery__fullscreen__preview__wrapper"
						ref={previewWrapper}
					>
						{images.map((image, index) => (
							<div
								onClick={() => setPreview(index)}
								className={classNames("gallery__fullscreen__preview__image", {
									active: index === imageId,
								})}
								key={index}
							>
								<img src={image.url} alt="" />
							</div>
						))}
					</div>
				</div>
				<div className="gallery__button left" onClick={() => changeSlide(-1)}>
					<AiOutlineDoubleLeft />
				</div>
				<div className="gallery__button right" onClick={() => changeSlide(1)}>
					<AiOutlineDoubleRight />
				</div>
				<div
					className="gallery__button close"
					onClick={() => setFullscreen(false)}
				>
					<AiOutlineClose />
				</div>
			</div>
		</div>
	);
};

export default Gallery;
