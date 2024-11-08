import React, { createContext, useState, ReactNode, useContext } from 'react';
import { CameraCapturedPicture } from 'expo-camera';

interface PhotoContextType {
  capturedPhoto: CameraCapturedPicture | null;
  setCapturedPhoto: (photo: CameraCapturedPicture | null) => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider = ({ children }: { children: ReactNode }) => {
  const [capturedPhoto, setCapturedPhoto] = useState<CameraCapturedPicture | null>(null);

  return (
    <PhotoContext.Provider value={{ capturedPhoto, setCapturedPhoto }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhoto = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhoto must be used within a PhotoProvider');
  }
  return context;
};
