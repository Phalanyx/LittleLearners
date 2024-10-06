"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from 'next/image';
import "./camera.css"

function Page() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1920,
          height: 1080
        }
      })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    // Set the canvas width and height
    photo.width = width;
    photo.height = height;

    // Draw the video frame to the canvas
    const context = photo.getContext("2d");
    context.drawImage(video, 0, 0, width, height);

    // Create a Blob from the canvas data
    photo.toBlob((blob) => {
      if (blob) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "photo.png"; // Name of the file to download
        link.click();
      }
    }, "image/png");
  };
  const returnHome = () => {
    window.location.href = '/';
  }

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="page">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>SNAP!</button>
      </div>
      <button onClick={returnHome}>Home Page</button>
      {/* Hidden canvas used for taking the photo */}
      <canvas ref={photoRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default Page;
