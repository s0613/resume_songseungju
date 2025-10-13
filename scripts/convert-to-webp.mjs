import fg from "fast-glob";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = new URL("../", import.meta.url).pathname;
const publicDir = path.join(root, "public");

async function convertPngsToWebp() {
	const pattern = path.join(publicDir, "**/*.png").replace(/\\/g, "/");
	const entries = await fg(pattern, { dot: false, onlyFiles: true });
	if (entries.length === 0) {
		console.log("No PNG files found under public/");
		return;
	}
	console.log(`Found ${entries.length} PNG file(s). Converting to WebP...`);
	let converted = 0;
	for (const file of entries) {
		const dir = path.dirname(file);
		const base = path.basename(file, ".png");
		const outPath = path.join(dir, `${base}.webp`);
		if (fs.existsSync(outPath)) {
			console.log(`Skip (exists): ${path.relative(publicDir, outPath)}`);
			continue;
		}
		try {
			await sharp(file).webp({ quality: 80 }).toFile(outPath);
			converted++;
			console.log(`OK: ${path.relative(publicDir, outPath)}`);
		} catch (err) {
			console.error(`FAIL: ${file}`, err);
		}
	}
	console.log(`Done. Converted ${converted} file(s).`);
}

convertPngsToWebp().catch((e) => {
	console.error(e);
	process.exit(1);
});
