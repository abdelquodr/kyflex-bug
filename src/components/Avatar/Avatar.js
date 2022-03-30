import React, { useState, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';

const Avatar = ({ imgUrl, size, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const onLoad = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  const style = useMemo(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  return (
    <>
      <Image
        style={style}
        className={`avatar ${isLoading ? 'avatar--unloaded' : ''}`}
        src={imgUrl}
        roundedCircle
        alt={alt}
        onLoad={onLoad}
      />
      {isLoading && (
        <div style={style} className={'avatar avatar-placeholder'}>
          <FontAwesomeIcon icon={faUser} className="avatar-placeholder__icon" />
        </div>
      )}
    </>
  );
};

export { Avatar };