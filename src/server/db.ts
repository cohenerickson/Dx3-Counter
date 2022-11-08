import fs from "node:fs";

export function addCount() {
  const count = getCount();
  fs.writeFileSync("./count.txt", (count + 1).toString());
}

export function getCount(): number {
  let count;
  try {
    count = fs.readFileSync("./count.txt");
  } catch {
    fs.createWriteStream("./count.txt");
    fs.writeFileSync("./count.txt", "0");
  }
  return Number(count ?? 0);
}
