import { useCallback, useEffect } from 'react';
import { useAxios } from '../../lib/apiClient';
export const useUploadExperienceImg = (endpoint, callback) => {
  // POST REQUEST
  const [{ data, error }, postExperienceImg] = useAxios(
    {
      url: endpoint,
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
    postExperienceImg: (formData) => {
      return postExperienceImg({ data: formData, skipTransform: true });
    },
  };
};
