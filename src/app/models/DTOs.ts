export interface IFileSet {
    documentName: string,
    documentId: number,
    isRequiredForClientClosed: boolean,
    allowMultiple: boolean,
    files: IFile[] | null
}

export interface IFile {
    fileName: string,
    sn: number,
    link: string | null,
    s3Key: string | null
}

export interface IClientDocuments {
    businessName: string;
    panNo: string;
    document: IFileSet | null
}

export interface IFileUpload extends IFile {
  file: File;
  previewUrl: string | null;
  progress: number;
  error: string | null;
}

export interface ILocalFileUpload extends IFileUpload {
  status: 'new' | 'uploading' | 'success' | 'error';
}