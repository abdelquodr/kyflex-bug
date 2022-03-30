import useAxios from 'axios-hooks';
import { useCallback, useEffect, useState } from 'react';

export const useGetExperiences = (callback) => {
  const [id, setId] = useState();
  const [{ data, error }, getExperiences] = useAxios(
    {
      url: `/api-experience/experiences/${id}/`,
      method: 'GET',
    },
    { manual: true }
  );
  useEffect(() => {
    if (data) {
      // console.log(data);
    }
  }, [data]);

  return {
    error,
    getExperiences: useCallback((formData) => {
      const { id } = formData;
      setId(id);
      // console.log(formData);
      return getExperiences({ data: formData });
    }),
  };
};
