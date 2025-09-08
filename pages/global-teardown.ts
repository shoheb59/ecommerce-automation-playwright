import * as fs from "fs";
import * as path from "path";

async function globalTeardown() {
  const downloadsDir = path.join(process.cwd(), "downloads");

  if (fs.existsSync(downloadsDir)) {
    const files = fs.readdirSync(downloadsDir);

    for (const file of files) {
      const filePath = path.join(downloadsDir, file);
      fs.unlinkSync(filePath);
      console.log(`Cleaned up: ${filePath}`);
    }
  }
}

export default globalTeardown;
