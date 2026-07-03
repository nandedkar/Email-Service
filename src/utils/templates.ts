import path from "node:path";
import fs from "node:fs/promises";

export async function loadTemplate(fileName: string): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "templates",
    `${fileName}.html`,
  );
  const template = await fs.readFile(filePath, "utf-8");
  return template;
}

export function compileTemplate(
  html: string,
  variables: Record<string, string>,
): string {
  let compiled = html;
  for (const key in variables) {
    compiled = compiled.replaceAll(`{{${key}}}`, variables[key]);
  }
  return compiled;
}
