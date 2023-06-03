import React, { useCallback, useEffect, useState } from "react";
import LazyLoad from "react-lazyload";

export const ImageOptimized = ({src, alt, ...props}) => {
  const [imgSrc, setSrc] = useState(src);

  const onLoad = useCallback(() => setSrc(src), [src]);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.addEventListener("load", onLoad);
    return () => {
      img.removeEventListener("load", onLoad);
    };
  }, [src, onLoad]);

  return (
     <LazyLoad once>
        <img key={src} {...props} src={imgSrc} alt={alt} loading="lazy"/>
     </LazyLoad>
  );
};
