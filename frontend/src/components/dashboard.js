import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Player from './player';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

const Dashboard = () => {
    const [videos, setVideos] = useState([]);
    const [status, setStatus] = useState([]);
    const { id } = useParams();
    const [videoDetails, setVideoDetails] = useState([]);
    const [backstate, setBackstate] = useState(false);
    const [nextstate, setNextstate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoListResponse = await axios.get('http://localhost:5000/api/video-list');
                setVideos(videoListResponse.data);

                const statusResponse = await axios.get('http://localhost:5000/api/status');
                setStatus(statusResponse.data);

                const videoDetailsResponse = await axios.get('http://localhost:5000/api/video-details');
                setVideoDetails(videoDetailsResponse.data);

                const currentId = parseInt(id);

                setBackstate(currentId > 1);
                setNextstate(currentId < videoListResponse.data.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const completedVideos = status.filter(videoStatus => videoStatus.completed).length;
    const totalVideos = videos.length;
    const percentage = (completedVideos / totalVideos) * 100;

    const isCurrentVideoCompleted = status.some(videoStatus => videoStatus.video_id === parseInt(id) && videoStatus.completed);
    const isLastVideoCompleted = status.some(videoStatus => videoStatus.video_id === 3 && videoStatus.completed);

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <div className="container mx-auto py-10 px-4">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold text-blue-600 drop-shadow-lg tracking-wide">
                        Training Dashboard
                    </h1>
                </div>
                
                <div className="flex flex-wrap items-center justify-between bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                    <div className="flex flex-col w-full lg:w-2/3 ">
                        {videos.map((video) => (
                            <div key={video.id} className="mb-4">
                                {status.some(videoStatus => videoStatus.video_id === video.id && videoStatus.completed) ? (
                                    <Link to={`/dashboard/video/${video.id}`} className="block text-lg font-semibold text-green-400 bg-gray-700 p-4 rounded-lg hover:text-white hover:bg-blue-600 transition-all duration-300">
                                        Module: {videoDetails.find(v => v.videoId === video.id)?.title || `Video ${video.id}`}
                                    </Link>
                                ) : (
                                    <div to={`/dashboard/video/${video.id}`} className="block text-lg font-semibold text-gray-400 bg-gray-700 p-4 rounded-lg hover:text-white hover:bg-blue-600 cursor-not-allowed transition-all duration-300">
                                        Module: {videoDetails.find(v => v.videoId === video.id)?.title || `Video ${video.id}`}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center w-full lg:w-1/3 mt-5 lg:mt-0">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4 text-white">Your Progress</h2>
                            <CircularProgress value={Math.round(percentage)} size="120px" color="blue" trackColor="black">
                                <CircularProgressLabel className="text-white font-bold">{Math.round(percentage)}%</CircularProgressLabel>
                            </CircularProgress>
                            <div className="text-md mt-2 text-gray-300">{completedVideos}/{totalVideos} completed</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mb-4">
                    {backstate ? (
                        <Link to={`/dashboard/video/${parseInt(id) - 1}`}>
                            <button className="bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-300">Back</button>
                        </Link>
                    ) : (
                        <button className="bg-gray-600 text-white py-2 px-5 rounded-lg cursor-not-allowed">Back</button>
                    )}
                    {isLastVideoCompleted ? (
                        <button className="bg-gray-600 text-white py-2 px-5 rounded-lg cursor-not-allowed">Completed Training</button>
                    ) : (
                        nextstate && isCurrentVideoCompleted ? (
                            <Link to={`/dashboard/video/${parseInt(id) + 1}`}>
                                <button className="bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-300">Next</button>
                            </Link>
                        ) : (
                            <button className="bg-gray-600 text-white py-2 px-5 rounded-lg cursor-not-allowed">Not Completed</button>
                        )
                    )}
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col lg:flex-row">
                    <div className="lg:w-2/3">
                        {videoDetails.map((videoDetail) => (
                            videoDetail.videoId === parseInt(id) ? (
                                <div key={videoDetail.videoId}>
                                    <h2 className="text-4xl font-semibold mb-4 text-blue-400 text-center pb-2">{videoDetail.title}</h2>
                                    {Object.entries(videoDetail.content).map(([point_no, desc]) => (
                                        <p key={point_no} className="mb-3 text-lg text-gray-300 p-3"> -- {desc}</p>
                                    ))}
                                </div>
                            ) : null
                        ))}
                    </div>
                    <div className="-mt-12">
                        <Player />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


