import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
}

export function Image({ src, alt, width = 45 }: ImageProps) {
  const FALLBACK_IMAGE = '/image-not-found.jpg';
  const [loading, setLoading] = useState(false);

  const imageOnLoadHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoading(false);
  };

  const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
    setLoading(false);
  };

  return (
    <>
      {loading && <Spinner animation="border" />}
      <img
        src={src}
        width={width}
        onLoad={() => setLoading(false)}
        onError={imageOnErrorHandler}
        alt={alt}
        className={!loading ? 'success' : 'error'}
      />
    </>
  );
}
