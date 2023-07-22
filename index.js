const chalk = require("chalk");
const getPixels = require("get-pixels");

const toHex = (color) => {
	if (Math.abs(color) < 256)
		return Math.abs(color).toString(16).padStart(2, "0");
	throw new Error("Invalid Color Number: " + color);
};

function convertToImage(pixels, shape) {
	const width = shape[0];
	const height = shape[1];
	const layers = shape[2];

	let image = "";

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			const current_pixel = i * (width * layers) + j * layers;

			const [red, green, blue] = pixels
				.slice(current_pixel, current_pixel + layers)
				.slice(0, 3);

			const hexColor =
				"#" + toHex(red) + toHex(green) + toHex(blue);

			image += chalk.bgHex(hexColor)(" ");
		}
		image += "\n";
	}
	return image;
}

function displayImage(path) {
	getPixels(path, (err, pixels) => {
		if (err) {
			console.log("Error in displaying the image.");
			return;
		}
		const image = convertToImage([...pixels.data], pixels.shape);
		console.log(image);
	});
}

if (process.argv[2] == "--sample") {
	displayImage("sample.jpg");
}

module.exports = displayImage;
