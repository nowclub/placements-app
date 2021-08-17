import { Button, ButtonGroup, Icon, IconButton, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BiMicrophone as RecordIcon,
  BiPlay as PlayIcon,
  BiRedo as RetryIcon,
  BiStop as StopIcon,
} from "react-icons/bi";
import { useMediaRecorder } from "../hooks/media-recorder-hook";
import { useTimer } from "../hooks/timer-hook";

function Empty({ onStart }) {
  return (
    <Button onClick={onStart} leftIcon={<Icon as={RecordIcon} />}>
      Record
    </Button>
  );
}

function Stopped({ onPlay, onRetry }) {
  return (
    <ButtonGroup isAttached>
      <Button leftIcon={<Icon as={PlayIcon} />} onClick={onPlay}>
        Play
      </Button>
      <IconButton aria-label="retry" onClick={onRetry} colorScheme="red">
        <Icon as={RetryIcon} />
      </IconButton>
    </ButtonGroup>
  );
}

function Recording({ onStop }) {
  const { elapsed, start: startTimer, stop: stopTimer } = useTimer();

  const constraints = useRef({ audio: true });
  const options = useRef({ mimeType: "audio/webm" });

  const {
    error,
    ready,
    start: startRec,
    stop: stopRec,
    media,
  } = useMediaRecorder(constraints.current, options.current);

  const start = useCallback(() => {
    startTimer();
    startRec();
  }, [startTimer, startRec]);

  const stop = useCallback(() => {
    stopTimer();
    stopRec();
  }, [stopTimer, stopRec]);

  useEffect(() => {
    if (media) onStop(media);
  }, [media, onStop]);

  useEffect(() => ready && start(), [ready, start]);

  if (error) {
    return <Text>Error: {error.toString()}. Try refreshing the browser.</Text>;
  }

  return (
    <Button leftIcon={<Icon as={StopIcon} />} onClick={() => stop()}>
      Recording {Number(elapsed).toFixed(1)}s
    </Button>
  );
}

function Playing({ source, onStop }) {
  const audioRef = useRef(new Audio(source));

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    return () => audio.pause();
  }, []);

  useEffect(() => {
    // Because of weird error
    audioRef.current.muted = false;
    audioRef.current.play();

    audioRef.current.addEventListener("ended", () => onStop());

    const timer = setInterval(() => {
      setCurrentTime(audioRef.current.currentTime);
    }, 100);

    return () => clearInterval(timer);
  }, [onStop]);

  return (
    <Button leftIcon={<Icon as={StopIcon} />} onClick={onStop}>
      Playing {Math.round(currentTime * 10) / 10}s
    </Button>
  );
}

function VoiceRecorder({ value, onChange }) {
  const [state, setState] = useState("idle");

  return (
    <>
      {state === "idle" && !value && (
        <Empty onStart={() => setState("recording")} />
      )}
      {state === "idle" && value && (
        <Stopped
          onPlay={() => setState("playing")}
          onRetry={() => setState("recording")}
        />
      )}
      {state === "recording" && (
        <Recording
          onStop={(media) => {
            onChange(media);
            setState("idle");
          }}
        />
      )}
      {state === "playing" && value && (
        <Playing
          source={URL.createObjectURL(value)}
          onStop={() => setState("idle")}
        />
      )}
    </>
  );
}

export default VoiceRecorder;
