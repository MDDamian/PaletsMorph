interface UploadStatusProps {
    success?: boolean;
    error?: string;
    filename?: string;
  }
  
  export function UploadStatus({ success, error, filename }: UploadStatusProps) {
    if (error) {
      return (
        <div class="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      );
    }
  
    if (success) {
      return (
        <div class="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
          Successfully uploaded: {filename}
        </div>
      );
    }
  
    return null;
  }