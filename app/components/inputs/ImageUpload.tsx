import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      uploadPreset="lavksmw5" // Replace with your actual preset
      onSuccess={handleUpload}
      
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <div
          onClick={()=>open?.()} // Open the widget on click
          className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-400 flex flex-col items-center justify-center gap-4 text-neutral-600"
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to upload</div>
          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                alt="Upload"
                fill
                src={value}
                style={{ objectFit: 'cover' }}
                sizes="100vw" // Ensures responsive image loading
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
