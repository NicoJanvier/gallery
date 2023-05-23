function generateScript(fileNames: string[]): string {
  let script = `mkdir -p export;`;
  for (const fileName of fileNames) {
    script += ` find . -type f -name "${fileName}" -exec cp {} export/ \\;`;
  }
  script += ` echo "Files copied to export"`;
  return script;
}
