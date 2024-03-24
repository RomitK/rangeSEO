import { useEffect, useRef } from 'react';

const LazyVideo = ({ src, poster, id, className }) => {
    const videoRef = useRef(null);

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
                const video = entry.target;
                video.load(); // Lazy load video when it enters viewport
                video.play(); // Optional: Auto play video when it enters viewport
            }
        });
    };

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
            {/* Add appropriate video sources */}
            {/* <source src={src} type="video/mp4" />
      <source src={src} type="video/webm" /> */}
            Sorry, your browser doesn't support videos.
        </video>
    );
};

export default LazyVideo;
