export function toFileList(fileList: FileList):File[]{
    if (fileList && fileList.length > 0){ 
      const files: File[] = [];
      for (let i=0; i< fileList.length; i++){
        files.push(fileList.item(i)!);
      }
      return files;
    }
    return [];
}

export function displayfileInfos(fileInput: File | File[] | null | undefined) {
  if (!fileInput) return 'none';
  if (Array.isArray(fileInput)) {
    if(fileInput.length===0) return 'none';
    let files: string = '';
    (fileInput as File[]).forEach((file) => files += '\t' + displayfileInfos(file) + ',\n\r');
    return '[' + files + ']';
  }
  return `{name: ${fileInput.name}, type: ${fileInput.type} }`;
}
