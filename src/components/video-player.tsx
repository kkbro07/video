'use client';

import * as React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, FastForward, Rewind } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
}

export function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [quality, setQuality] = React.useState('auto');
  const [showControls, setShowControls] = React.useState(true);
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const progressSaveIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted) setVolume(0); else setVolume(videoRef.current.volume);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const seekTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = seekTime;
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };
  
  const handleFastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const saveProgress = React.useCallback(() => {
    if (videoRef.current) {
      localStorage.setItem(`video-progress-${src}`, videoRef.current.currentTime.toString());
    }
  }, [src]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleTimeUpdate = () => {
      updateProgress();
    };
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      const savedProgress = localStorage.getItem(`video-progress-${src}`);
      if (savedProgress) {
        const progressTime = parseFloat(savedProgress);
        // Only seek if the saved time is meaningful (not at the very end)
        if (progressTime > 0 && progressTime < video.duration - 5) {
          video.currentTime = progressTime;
        }
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      progressSaveIntervalRef.current = setInterval(saveProgress, 5000); // Save every 5 seconds
    };

    const handlePause = () => {
      setIsPlaying(false);
      if (progressSaveIntervalRef.current) {
        clearInterval(progressSaveIntervalRef.current);
      }
      saveProgress(); // Save progress one last time on pause
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    window.addEventListener('beforeunload', saveProgress); // Save on page close/refresh

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      window.removeEventListener('beforeunload', saveProgress);
      if (progressSaveIntervalRef.current) {
        clearInterval(progressSaveIntervalRef.current);
      }
      saveProgress(); // Ensure progress is saved on component unmount
    };
  }, [duration, src, saveProgress]);

  const hideControls = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }

  React.useEffect(() => {
    hideControls();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }
  }, [isPlaying]);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    if (hours > 0) {
        return `${hours}:${formattedMinutes}:${formattedSeconds}`;
    }
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full group"
      onMouseMove={() => {
        setShowControls(true);
        hideControls();
      }}
      onMouseLeave={() => {
        if(isPlaying) {
          setShowControls(false);
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        onClick={handlePlayPause}
        onDoubleClick={handleFullscreen}
        autoPlay
      />
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 z-[101] p-2 sm:p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex flex-col gap-2">
            <Slider
                value={[progress]}
                onValueChange={handleSeek}
                className="w-full h-1 cursor-pointer"
            />
            <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-1 sm:gap-4">
                    <Button variant="ghost" size="icon" onClick={handlePlayPause} className="text-white hover:bg-white/10">
                        {isPlaying ? <Pause /> : <Play />}
                    </Button>
                     <Button variant="ghost" size="icon" onClick={handleRewind} className="text-white hover:bg-white/10 hidden sm:inline-flex">
                        <Rewind />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleFastForward} className="text-white hover:bg-white/10 hidden sm:inline-flex">
                        <FastForward />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/10">
                            {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
                        </Button>
                         <Slider
                            value={[isMuted ? 0 : volume]}
                            onValueChange={handleVolumeChange}
                            max={1}
                            step={0.1}
                            className="w-24 hidden sm:block"
                        />
                    </div>
                    <span className="text-xs sm:text-sm font-mono">{formatTime(videoRef.current?.currentTime ?? 0)} / {formatTime(duration)}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <Settings />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-black/80 border-slate-700 text-white">
                            <DropdownMenuRadioGroup value={quality} onValueChange={setQuality}>
                                <DropdownMenuRadioItem value="1080p">1080p</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="720p">720p</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="480p">480p</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="auto">Auto</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" onClick={handleFullscreen} className="text-white hover:bg-white/10">
                        <Maximize />
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
