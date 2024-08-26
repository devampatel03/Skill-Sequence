import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaAward, FaPlayCircle } from 'react-icons/fa';

const HomeComponent = () => {
    const [trainingStatus, setTrainingStatus] = useState(false);
    const [id, setId] = useState(1);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/status');
                const statusData = response.data;

                if (statusData[2] && statusData[2].completed) {
                    setTrainingStatus(true);
                }
            } catch (error) {
                console.error('Error fetching video progress:', error);
            }
        };

        fetchStatus();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 to-indigo-900 flex justify-center items-center p-8">
            {!trainingStatus ? (
                <div className="text-center animate-fade-in-up">
                    <div className="flex flex-col items-center">
                        <h1 className="text-white text-7xl font-bold mb-10">Welcome to Skill Sequence !</h1>
                        <div className="flex items-center gap-4">
                            <FaPlayCircle className="text-white text-6xl mt-5 mr-5 -translate-y-7 animate-bounce" />
                            <Link to={`/dashboard/video/${id}`} className="inline-block mt-4">
                                <button className="bg-green-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                    Start Training
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center animate-fade-in-up">
                    <div className="flex flex-col items-center">
                        <h2 className="text-white text-7xl font-bold mb-4">Congratulations!</h2>
                        <div className="flex items-center gap-4">
                            <FaAward className="text-yellow-400 text-6xl animate-pulse" />
                            <p className="text-blue-200 text-2xl">Your training is completed.</p>
                        </div>
                        <Link to={`/dashboard/video/1`} className="inline-block mt-8">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400">
                                Revisit the Modules?
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeComponent;
