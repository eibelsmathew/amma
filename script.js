document.addEventListener('DOMContentLoaded', function() {
    // Calculate and display age
    const birthYear = 1976;
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    document.getElementById('age').textContent = `Celebrating ${age} wonderful years!`;

    // Confetti animation
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Photo reveal functionality
    const photos = document.querySelectorAll('.photo-collage img:not(.centerpiece)');
    const centerpiece = document.querySelector('.photo-collage .centerpiece');
    let revealedCount = 0;

    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            if (!photo.classList.contains('visible')) {
                photo.classList.add('visible');
                revealedCount++;

                if (revealedCount === photos.length) {
                    setTimeout(() => {
                        centerpiece.style.opacity = '0';
                        centerpiece.style.pointerEvents = 'none';
                    }, 500);
                }
            }
        });
    });

    // Shake to reveal functionality
    let shakeThreshold = 15;
    let lastX, lastY, lastZ;
    let moveCounter = 0;

    if ('DeviceMotionEvent' in window) {
        window.addEventListener('devicemotion', (event) => {
            let acceleration = event.accelerationIncludingGravity;
            if (!lastX) {
                lastX = acceleration.x;
                lastY = acceleration.y;
                lastZ = acceleration.z;
                return;
            }

            let deltaX = Math.abs(acceleration.x - lastX);
            let deltaY = Math.abs(acceleration.y - lastY);
            let deltaZ = Math.abs(acceleration.z - lastZ);

            if (deltaX + deltaY + deltaZ > shakeThreshold) {
                moveCounter++;
                if (moveCounter > 5) {
                    photos.forEach(photo => {
                        if (!photo.classList.contains('visible')) {
                            photo.classList.add('visible');
                            revealedCount++;
                        }
                    });

                    if (revealedCount === photos.length) {
                        setTimeout(() => {
                            centerpiece.style.opacity = '0';
                            centerpiece.style.pointerEvents = 'none';
                        }, 500);
                    }

                    moveCounter = 0;
                }
            } else {
                moveCounter = 0;
            }

            lastX = acceleration.x;
            lastY = acceleration.y;
            lastZ = acceleration.z;
        });
    }
});