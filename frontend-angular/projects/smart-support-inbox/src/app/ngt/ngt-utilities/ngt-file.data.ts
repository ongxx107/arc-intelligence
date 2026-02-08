
export type NgtFileType = `.${string | ''}`;
/** according to https://www.iana.org/assignments/media-types/media-types.xhtml */
export type NgtFileTypeGroup = 'application/*' | 'audio/*' | 'image/*' | 'video/*' | 'message/*' | 'text/*'; // does not seem to work:  | 'model/*'

export type NGT_DOC_EXTENSION = '.txt, .doc, .docx, .pdf, .xml, .html';

export enum NgtFileExtensions {
  DATA = '.csv, .xls, .xlsx, .xml, .json',
  DOC = '.txt, .doc, .docx, .pdf, .xml, .html',
  CAD = '.cad, .stl, .stp, .step, .igs, .iges, .qif, .pdf, .mesh, .dxf, .dwg, .CATPart, .CATProduct, .ptc, .prt, .asm, .ipt, .aim, .sldprt, .sldasm, .obj, .model'
};
