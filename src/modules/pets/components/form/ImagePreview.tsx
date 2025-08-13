import React from "react";
import { ImageIcon } from "lucide-react";
import { FORM_CONFIG } from "../../constants/form.constants";

interface ImagePreviewProps {
  preview: string;
  alt: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ preview, alt }) => (
  <div className="flex justify-center">
    <div className="relative">
      <img
        src={preview}
        alt={alt}
        className="border-primary/30 h-48 w-48 rounded-lg border-2 border-dashed object-cover shadow-lg"
        style={{
          width: FORM_CONFIG.IMAGE_SIZE.width,
          height: FORM_CONFIG.IMAGE_SIZE.height,
        }}
      />
      <div className="absolute inset-0 rounded-lg bg-black/10" />
    </div>
  </div>
);

export const EmptyImagePlaceholder: React.FC = () => (
  <div className="border-border bg-linen flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed">
    <div className="text-center">
      <ImageIcon className="text-muted-foreground mx-auto h-12 w-12" />
      <p className="font-nunito-400 text-muted-foreground mt-2 text-sm">
        Chưa có ảnh
      </p>
    </div>
  </div>
);
