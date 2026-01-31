// components/ui/ImageCompressor.tsx
"use client";

import { useState, useCallback } from "react";

interface CompressedImageResult {
  file: File;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

interface ImageCompressorOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: "image/jpeg" | "image/webp" | "image/png";
  maxSizeKB?: number;
}

export const useImageCompressor = () => {
  const [isCompressing, setIsCompressing] = useState(false);

  const compressImage = useCallback(
    async (
      file: File,
      options: ImageCompressorOptions = {},
    ): Promise<CompressedImageResult> => {
      setIsCompressing(true);

      const {
        maxWidth = 400,
        maxHeight = 400,
        quality = 0.8,
        format = "image/jpeg",
        maxSizeKB = 500,
      } = options;

      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
          try {
            // Calculate new dimensions
            let { width, height } = img;

            if (width > height) {
              if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
              }
            }

            canvas.width = width;
            canvas.height = height;

            // Apply image smoothing for better quality
            if (ctx) {
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = "high";
              ctx.drawImage(img, 0, 0, width, height);
            }

            let finalQuality = quality;
            let attempts = 0;
            const maxAttempts = 5;

            const tryCompress = () => {
              canvas.toBlob(
                (blob) => {
                  if (!blob) {
                    reject(new Error("Failed to compress image"));

                    return;
                  }

                  const sizeKB = blob.size / 1024;

                  // If size is still too large and we haven't hit max attempts
                  if (
                    sizeKB > maxSizeKB &&
                    attempts < maxAttempts &&
                    finalQuality > 0.1
                  ) {
                    finalQuality *= 0.8; // Reduce quality by 20%
                    attempts++;
                    tryCompress();

                    return;
                  }

                  // Create final file
                  const compressedFile = new File(
                    [blob],
                    file.name.replace(/\.[^/.]+$/, "") +
                      "_compressed." +
                      format.split("/")[1],
                    { type: format },
                  );

                  // Create data URL for preview
                  const reader = new FileReader();

                  reader.onload = () => {
                    setIsCompressing(false);
                    resolve({
                      file: compressedFile,
                      dataUrl: reader.result as string,
                      originalSize: file.size,
                      compressedSize: blob.size,
                      compressionRatio: Math.round(
                        (1 - blob.size / file.size) * 100,
                      ),
                    });
                  };
                  reader.readAsDataURL(blob);
                },
                format,
                finalQuality,
              );
            };

            tryCompress();
          } catch (error) {
            setIsCompressing(false);
            reject(error);
          }
        };

        img.onerror = () => {
          setIsCompressing(false);
          reject(new Error("Failed to load image"));
        };

        img.src = URL.createObjectURL(file);
      });
    },
    [],
  );

  return {
    compressImage,
    isCompressing,
  };
};
