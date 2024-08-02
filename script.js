document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.floating-images');
    const mainImage = document.querySelector('.main-image');
    const imageSrc = 'images/floating-image.png'; // Path to your floating image
    const numImages = 100; // Number of floating images

    // Function to get the center of the main image
    function getMainImageCenter() {
        const mainImageRect = mainImage.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const mainImageCenterX = mainImageRect.left + mainImageRect.width / 2 - containerRect.left;
        const mainImageCenterY = mainImageRect.top + mainImageRect.height / 2 - containerRect.top;
        return { x: mainImageCenterX, y: mainImageCenterY };
    }

    function createFloatingImage() {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.width = '80px'; // Adjust size of floating images
        img.style.height = '80px'; // Adjust size of floating images
        img.style.position = 'absolute';
        img.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
        img.style.opacity = Math.random(); // Random opacity for better visual effect
        img.style.cursor = 'pointer'; // Show a pointer cursor on hover

        // Add hover effect
        img.addEventListener('mouseover', () => {
            img.style.transform += ' scale(1.2)'; // Slightly enlarge on hover
            img.style.opacity = 1; // Ensure full opacity on hover
        });

        img.addEventListener('mouseout', () => {
            img.style.transform = img.style.transform.replace(' scale(1.2)', ''); // Reset scale
            img.style.opacity = Math.random(); // Random opacity on hover out
        });

        // Add click event
        img.addEventListener('click', () => {
            alert('Image clicked!'); // You can replace this with any action you want
        });

        // Add drag-and-drop functionality
        img.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevent default image dragging
            const offsetX = e.clientX - img.getBoundingClientRect().left;
            const offsetY = e.clientY - img.getBoundingClientRect().top;

            function dragMove(e) {
                img.style.left = `${e.clientX - offsetX}px`;
                img.style.top = `${e.clientY - offsetY}px`;
            }

            function dragEnd() {
                document.removeEventListener('mousemove', dragMove);
                document.removeEventListener('mouseup', dragEnd);
            }

            document.addEventListener('mousemove', dragMove);
            document.addEventListener('mouseup', dragEnd);
        });

        container.appendChild(img);
        animateImage(img);
    }

    function animateImage(img) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const { x: centerX, y: centerY } = getMainImageCenter();

        function moveImage() {
            const angle = Math.random() * 2 * Math.PI; // Random angle for circular movement
            const radius = Math.random() * (Math.min(containerWidth, containerHeight) / 4); // Adjust radius as needed

            // Calculate position around the main image
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            img.style.left = `${x}px`;
            img.style.top = `${y}px`;

            const randomRotation = Math.random() * 360;
            const randomDuration = Math.random() * 10 + 5;

            img.style.transition = `transform ${randomDuration}s linear, left ${randomDuration}s linear, top ${randomDuration}s linear`;
            img.style.transform = `translate(${x - img.offsetWidth / 2}px, ${y - img.offsetHeight / 2}px) rotate(${randomRotation}deg)`;

            // Continue moving the image indefinitely
            setTimeout(moveImage, randomDuration * 1000);
        }

        moveImage();
    }

    // Create initial floating images
    for (let i = 0; i < numImages; i++) {
        createFloatingImage();
    }
});
