import { defineCommand } from "@reliverse/rempts";
import * as fs from "fs-extra";
import * as path from "pathe";

type ScriptOptions = {
  noFrontmatter: boolean;
  noRename: boolean;
  outputFilename: string;
};

/**
 * Converts a kebab-case string to Title Case.
 */
function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split("-")
    .map((word) => {
      if (word.length === 0) return "";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Processes an individual markdown file to add frontmatter.
 */
async function addFrontmatterToMdFile(
  mdFilePath: string,
  folderName: string,
): Promise<void> {
  try {
    const originalContent = await fs.readFile(mdFilePath, "utf-8");
    const originalLines = originalContent.split("\n");

    let title = titleCase(folderName);
    let description = titleCase(folderName);
    const linesToRemoveIndices = new Set<number>();

    if (originalLines.length > 0 && originalLines[0].startsWith("#")) {
      const potentialTitle = originalLines[0].substring(1).trim();
      if (potentialTitle) title = potentialTitle;
      linesToRemoveIndices.add(0);
      if (originalLines.length > 1) linesToRemoveIndices.add(1);
    }

    if (originalLines.length > 2 && originalLines[2].startsWith(">")) {
      const potentialDescription = originalLines[2].substring(1).trim();
      if (potentialDescription) description = potentialDescription;
      linesToRemoveIndices.add(2);
      if (originalLines.length > 3) linesToRemoveIndices.add(3);
    }

    const finalBodyLines = originalLines.filter(
      (_, index) => !linesToRemoveIndices.has(index),
    );
    const body = finalBodyLines.join("\n");
    const frontmatter = `---
title: ${title}
description: ${description}
---

`;
    const newContent = frontmatter + body;
    await fs.writeFile(mdFilePath, newContent, "utf-8");
    console.log(`Added frontmatter to ${mdFilePath}`);
  } catch (error) {
    console.error(
      `Error processing frontmatter for file ${mdFilePath}:`,
      error instanceof Error ? error.message : error,
    );
  }
}

/**
 * Processes a single subfolder.
 */
async function processSubfolder(
  inputSubfolderPath: string,
  inputSubfolderName: string,
  outputDirPath: string,
  options: ScriptOptions,
): Promise<void> {
  const readmePath = path.join(inputSubfolderPath, "README.md");

  try {
    await fs.access(readmePath, fs.constants.F_OK);
  } catch {
    console.log(
      `No README.md found in ${inputSubfolderPath}. Skipping this subfolder.`,
    );
    return;
  }

  try {
    const outputSubfolderInOutput = path.join(
      outputDirPath,
      inputSubfolderName,
    );
    await fs.mkdir(outputSubfolderInOutput, { recursive: true });

    const targetFilename = options.noRename
      ? "README.md"
      : options.outputFilename;
    const targetFilePath = path.join(outputSubfolderInOutput, targetFilename);

    await fs.copyFile(readmePath, targetFilePath);
    console.log(`Copied ${readmePath} to ${targetFilePath}`);

    if (!options.noFrontmatter) {
      await addFrontmatterToMdFile(targetFilePath, inputSubfolderName);
    } else {
      console.log(
        `Skipping frontmatter for ${targetFilePath} due to --no-frontmatter.`,
      );
    }
  } catch (error) {
    console.error(
      `Error processing subfolder ${inputSubfolderName}:`,
      error instanceof Error ? error.message : error,
    );
  }
}

/**
 * Processes the input directory.
 */
async function processInputDirectory(
  inputDirPath: string,
  outputDirPath: string,
  options: ScriptOptions,
): Promise<void> {
  try {
    const entries = await fs.readdir(inputDirPath, { withFileTypes: true });
    const subfolders = entries.filter((entry) => entry.isDirectory());

    if (subfolders.length === 0) {
      console.log(`No subfolders found in ${inputDirPath}.`);
      return;
    }
    console.log(
      `Found ${subfolders.length} subfolder(s) to process in ${inputDirPath}.`,
    );

    for (const subfolder of subfolders) {
      const currentInputSubfolderPath = path.join(inputDirPath, subfolder.name);
      await processSubfolder(
        currentInputSubfolderPath,
        subfolder.name,
        outputDirPath,
        options,
      );
    }
    console.log("Finished processing all subfolders.");
  } catch (error) {
    console.error(
      `Error reading input directory ${inputDirPath}:`,
      error instanceof Error ? error.message : error,
    );
    throw error; // Re-throw for citty to handle or for the main run block
  }
}

export default defineCommand({
  meta: {
    name: "process-markdown-docs",
    version: "1.0.0",
    description:
      "Copies README.md from input subfolders to output, renames them, and optionally adds frontmatter.",
  },
  args: {
    inputDirectory: {
      type: "positional",
      description: "Path to the input directory containing subfolders.",
      required: true,
    },
    outputDirectory: {
      type: "positional",
      description: "Path to the output directory.",
      required: true,
    },
    noFrontmatter: {
      type: "boolean",
      description: "Disable frontmatter processing and content modification.",
      alias: "nf",
    },
    noRename: {
      type: "boolean",
      description:
        "Copy README.md as README.md (disables renaming to output-filename).",
      alias: "nr",
    },
    outputFilename: {
      type: "string",
      description:
        "Custom name for the output file (default: index.md). Ignored if --no-rename is used.",
      default: "index.md",
      alias: "o",
    },
  },
  async run({ args }) {
    // Type assertions for positional arguments
    const inputDir = args.inputDirectory;
    const outputDir = args.outputDirectory;

    const scriptOptions: ScriptOptions = {
      noFrontmatter: !!args.noFrontmatter, // Ensure boolean
      noRename: !!args.noRename, // Ensure boolean
      outputFilename: args.outputFilename, // Default is handled by citty
    };

    const inputDirPath = path.resolve(inputDir);
    const outputDirPath = path.resolve(outputDir);

    console.log(`Input directory: ${inputDirPath}`);
    console.log(`Output directory: ${outputDirPath}`);
    console.log("Effective options:", scriptOptions);

    // `runMain` handles top-level try/catch and graceful exit,
    // but we can have one for our specific application logic flow.
    try {
      await fs.mkdir(outputDirPath, { recursive: true });
      console.log(`Ensured output directory exists: ${outputDirPath}`);

      await processInputDirectory(inputDirPath, outputDirPath, scriptOptions);
      console.log("Script completed successfully.");
    } catch (error) {
      // Log specific error, then re-throw to let citty handle the exit
      console.error("A critical error occurred during script execution.");
      // citty's runMain will print the error details.
      throw error;
    }
  },
});
