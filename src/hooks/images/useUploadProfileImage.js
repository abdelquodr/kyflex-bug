import { useCallback, useEffect } from 'react';
import { useAxios } from '../../lib/apiClient';
import {useUpdateUser} from '../../contexts/UserContext';

export const useUploadProfileImage = (id, callback) => {
  // POST REQUEST
  const updateUser=useUpdateUser();
  const url = `/users/me/`;
  const [{ data, error }, postImage] = useAxios(
    {
      url: url,
      method: 'PATCH',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    { manual: true }
  );
  useEffect(() => {
    if (data) {
      updateUser(data)
    }
  }, [data]);
  return {
    error,
    data,
    postImage: (image) => {
      let formData = new FormData();
      formData.append('uploaded_picture', image);
      return postImage({ data: formData, skipTransform: true });
    },
  };
};
