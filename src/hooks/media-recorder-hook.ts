/// <reference types="@types/dom-mediacapture-record" />
import { useCallback, useEffect, useRef, useState } from "react";

export function useMediaRecorder(
  constraints: MediaStreamConstraints,
  options?: MediaRecorderOptions
) {
  const mediaRecorder = useRef<MediaRecorder>(null);
  const chunks = useRef([]);
  const [error, setError] = useState<string | null>(null);
  const [media, setMedia] = useState<Blob>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Current browser does not support MediaStream API");
      return;
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream, options);

        mediaRecorder.current.addEventListener("error", (event) => {
          setError(`Error ${event}: ${event}`);
        });

        mediaRecorder.current.addEventListener("dataavailable", (event) => {
          if (event.data.size) chunks.current.push(event.data);
        });

        mediaRecorder.current.addEventListener("start", () => {
          chunks.current = [];
        });
        mediaRecorder.current.addEventListener("stop", () => {
          const buffer = new Blob(chunks.current, {
            type: mediaRecorder.current.mimeType,
          });

          setMedia(buffer);
        });

        setReady(true);
      })
      .catch((error) => {
        setError(error);
        setReady(false);
      });
  }, [constraints, options]);

  const start = useCallback(
    () => ready && mediaRecorder.current.start(),
    [ready]
  );

  const stop = useCallback(() => {
    ready && mediaRecorder.current.stop();
  }, [ready]);

  return { error, ready, media, start, stop };
}
