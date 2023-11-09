import React from 'react';
import loadingGif from '../Imagenes/giphy (1).gif';

function Loading() {
  return (
    <div>
      <img src={loadingGif} alt="Loading" />
    </div>
  );
}

export default Loading;