import React, { useEffect, useRef, useState } from 'react';

const LazyVideo = ({ src, poster, id, className }) => {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const options = {
            rootMargin: '0px',
            threshold: 0.1, // Adjust as needed
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
    };

    useEffect(() => {
        if (isVisible && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [isVisible]);

    return (
        <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            poster={poster}
            id={id}
            className={className}
        >
            {/* <source src={src} type="video/mp4" /> */}
            {/* Add additional source types here if needed */}
            Sorry, your browser doesn't support videos.
        </video>
    );
};

export default LazyVideo;
