import { useState, useRef, useEffect } from 'react';
import { Video } from '../types';
import { useApp } from '../context/AppContext';
import { Play, CheckCircle, Clock, Film } from 'lucide-react';

interface VideosProps {
  subjectId: string;
  videos: Video[];
}

export default function Videos({ subjectId, videos }: VideosProps) {
  const { state, dispatch } = useApp();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sortedVideos = [...videos].sort((a, b) => a.order - b.order);

  const getVideoProgress = (videoId: string) => {
    const key = `${subjectId}:${videoId}`;
    return state.progress.videoProgress[key];
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !selectedVideo) return;
    const video = videoRef.current;
    const percentage = video.duration
      ? Math.round((video.currentTime / video.duration) * 100)
      : 0;
    const completed = percentage >= 90;

    dispatch({
      type: 'SET_VIDEO_PROGRESS',
      subjectId,
      videoId: selectedVideo.id,
      progress: {
        videoId: selectedVideo.id,
        percentage,
        currentTime: video.currentTime,
        completed,
        lastWatched: new Date().toISOString(),
      },
    });
  };

  const handleVideoLoaded = () => {
    if (!videoRef.current || !selectedVideo) return;
    const progress = getVideoProgress(selectedVideo.id);
    if (progress && progress.currentTime > 0) {
      videoRef.current.currentTime = progress.currentTime;
    }
  };

  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      const progress = getVideoProgress(selectedVideo.id);
      if (progress && progress.currentTime > 0) {
        videoRef.current.currentTime = progress.currentTime;
      }
    }
  }, [selectedVideo]);

  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Film className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No videos available for this subject yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video list */}
      <div className="lg:col-span-1 space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Course Videos ({sortedVideos.length})
        </h3>
        {sortedVideos.map((video) => {
          const progress = getVideoProgress(video.id);
          const isCompleted = progress?.completed;
          const isSelected = selectedVideo?.id === video.id;

          return (
            <button
              key={video.id}
              onClick={() => handleVideoSelect(video)}
              className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${isCompleted ? 'opacity-75' : ''}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isCompleted ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Play className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${
                  isCompleted ? 'text-gray-500' : 'text-gray-800'
                }`}>
                  {video.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  {video.duration && (
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </span>
                  )}
                  {progress && progress.percentage > 0 && !isCompleted && (
                    <span className="text-xs text-indigo-500">
                      {progress.percentage}% watched
                    </span>
                  )}
                </div>
              </div>
              {isCompleted && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  ✓ Done
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Video player */}
      <div className="lg:col-span-2">
        {selectedVideo ? (
          <div className="bg-black rounded-xl overflow-hidden shadow-lg">
            <video
              ref={videoRef}
              key={selectedVideo.id}
              controls
              className="w-full aspect-video"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleVideoLoaded}
            >
              <source src={selectedVideo.path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-4 bg-gray-900 text-white">
              <h4 className="font-medium">{selectedVideo.title}</h4>
              {(() => {
                const progress = getVideoProgress(selectedVideo.id);
                if (progress && progress.currentTime > 0 && !progress.completed) {
                  return (
                    <p className="text-sm text-gray-400 mt-1">
                      Resuming from {Math.floor(progress.currentTime / 60)}:{String(Math.floor(progress.currentTime % 60)).padStart(2, '0')} • {progress.percentage}% watched
                    </p>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl flex items-center justify-center aspect-video">
            <div className="text-center text-gray-400">
              <Film className="w-16 h-16 mx-auto mb-3" />
              <p className="text-lg">Select a video to start watching</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
