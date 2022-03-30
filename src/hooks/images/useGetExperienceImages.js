import { useCallback, useEffect } from 'react';
import { useAxios } from '../../lib/apiClient';
export const useUploadImage = (imageUrl, callback) => {
  // POST REQUEST
  const [{ data, error }, postImage] = useAxios(
    {
      url: imageUrl,
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
    },
    { manual: true }
  );
  useEffect(() => {
    if (data) {
      // TODO: re-fetch data upon available
    }
  }, [data]);
  return {
    error,
    data,
    postImage: (experienceId, image, config) => {
      var formData = new FormData();
      formData.append('image_path', image);
      formData.append('experience_id', experienceId);
      return postImage({ data: formData, skipTransform: true });
    },
  };
};
