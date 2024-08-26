import React, { useEffect, useState, useRef, memo } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Player = memo(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [videoUrl, setVideoUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const playerRef = useRef(null);
    const [readyToPlay, setReadyToPlay] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        let isMounted = true; 

        const fetchVideoData = async () => {
            try {
                setLoading(true);

                const response = await axios.get(`http://localhost:5000/api/videos/${id}`, {
                    responseType: 'arraybuffer',
                });

                if (isMounted) {
                    const videoBlob = new Blob([response.data], { type: 'video/mp4' });
                    const videoUrl = URL.createObjectURL(videoBlob);
                    setVideoUrl(videoUrl);

                    const progressResponse = await axios.get(`http://localhost:5000/api/progress/${id}`);
                    const savedProgress = progressResponse.data.progress || 0;

                    setProgress(savedProgress);
                    setReadyToPlay(true);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching video data:', error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchVideoData();

        return () => {
            isMounted = false;
            URL.revokeObjectURL(videoUrl);
        };
    }, [id]);

    const handleProgress = (state) => {
        if (state.playedSeconds <= progress) return; 

        setProgress(state.playedSeconds);
        axios.post('http://localhost:5000/api/save-progress', {
            userId: 1,
            videoId: parseInt(id),
            progress: state.playedSeconds,
        }).catch((error) => console.error('Error saving progress:', error));
    };

    const handleReady = () => {
        if (readyToPlay && playerRef.current) {
            playerRef.current.seekTo(progress, 'seconds');
            setReadyToPlay(false);
        }
    };

    const handleEnded = async () => {
        try {
            await axios.post('http://localhost:5000/api/save-status', {
                userId: 1,
                videoId: parseInt(id),
                completed: true,
            });

            const nextVideoId = parseInt(id) + 1;

            if (nextVideoId <= 3) {
                await axios.post('http://localhost:5000/api/save-progress', {
                    userId: 1,
                    videoId: nextVideoId,
                    progress: 0,
                });

                navigate(`/dashboard/video/${nextVideoId}`);
            } else {
                navigate(`/dashboard/training-completed`);
            }
        } catch (error) {
            console.error('Error handling video end:', error);
        }
    };

    const handleSeek = (seconds) => {
        if (seconds > progress) {
            playerRef.current.seekTo(progress);
        }
    };

    return (
        <div className="p-5">
            {loading ? (
                <div>Loading video...</div>
            ) : (
                <ReactPlayer
                    ref={playerRef}
                    url={videoUrl}
                    controls
                    playing={false}
                    playbackRate={1}
                    onReady={handleReady}
                    onProgress={handleProgress}
                    onEnded={handleEnded}
                    onSeek={handleSeek}
                    pip={false}
                    progressInterval={1000}
                    width="100%"
                    config={{ file: { attributes: { controlsList: 'nodownload noremoteplayback noplaybackrate' } } }}
                />
            )}
        </div>
    );
});

export default Player;

