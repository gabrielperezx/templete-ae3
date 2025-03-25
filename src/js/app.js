(function () {
    /*----- ----- ----- ----- -----
	# Funciones
	----- ----- ----- ----- -----*/

    const LightBox = () => {
        const checkGaleria = document.getElementById('lightboxImage');
        if (document.body.contains(checkGaleria)) {
            // JavaScript para manejar la navegación en el Lightbox
            const images = document.querySelectorAll('.gallery img');
            const lightboxImage = document.getElementById('lightboxImage');
            let currentIndex = 0;

            // Función para actualizar la imagen del lightbox
            const updateLightboxImage = (index) => {
                lightboxImage.src = images[index].src;
                currentIndex = index;
            };

            // Abre el modal y muestra la imagen seleccionada
            images.forEach((image, index) => {
                image.addEventListener('click', () => {
                    updateLightboxImage(index);
                });
            });

            // Navegación hacia la derecha
            document.getElementById('nextBtn').addEventListener('click', () => {
                if (currentIndex < images.length - 1) {
                    updateLightboxImage(currentIndex + 1);
                } else {
                    updateLightboxImage(0); // Vuelve al inicio si está en la última imagen
                }
            });

            // Navegación hacia la izquierda
            document.getElementById('prevBtn').addEventListener('click', () => {
                if (currentIndex > 0) {
                    updateLightboxImage(currentIndex - 1);
                } else {
                    updateLightboxImage(images.length - 1); // Vuelve a la última imagen si está en la primera
                }
            });
        }
    };

    const MenuEstatico = () => {
        const navbar = document.getElementById('mainNavbar');
        if (document.body.contains(navbar)) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 120) {
                    navbar.classList.remove('visually-hidden');
                } else {
                    navbar.classList.add('visually-hidden');
                }
            });
        }
    };

    const BotonScrollTop = () => {
        const checkBoton = document.querySelector('.btnScrollTop');
        if (document.body.contains(checkBoton)) {
            window.addEventListener('scroll', () => {
                if (
                    document.body.scrollTop > 20 ||
                    document.documentElement.scrollTop > 20
                ) {
                    checkBoton.classList.remove('d-none');
                    checkBoton.classList.add('d-block');
                } else {
                    checkBoton.classList.remove('d-block');
                    checkBoton.classList.add('d-none');
                }
            });

            checkBoton.addEventListener('click', () => {
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            });
        }
    };

    const GliderCreator = () => {
        const gliderConfig3Slides = {
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
            ],
        };

        const gliderConfig1Slides = {
            slidesToShow: 1,
            slidesToScroll: 1,
        };

        document.querySelectorAll('.carousel__items').forEach((carousel) => {
            const prevButton =
                carousel.parentElement.querySelector('.carousel__anterior');
            const nextButton =
                carousel.parentElement.querySelector('.carousel__siguiente');

            new Glider(carousel, {
                ...gliderConfig3Slides,
                arrows: {
                    prev: prevButton,
                    next: nextButton,
                },
            });
        });

        document.querySelectorAll('.carousel__OneSlide').forEach((carousel) => {
            const prevButton =
                carousel.parentElement.querySelector('.carousel__anterior');
            const nextButton =
                carousel.parentElement.querySelector('.carousel__siguiente');

            new Glider(carousel, {
                ...gliderConfig1Slides,
                arrows: {
                    prev: prevButton,
                    next: nextButton,
                },
            });
        });
    };

    /*----- ----- ----- ----- -----
	# Declaraciones
	----- ----- ----- ----- -----*/

    window.addEventListener('load', () => {
        GliderCreator();
        LightBox();
        BotonScrollTop();
        MenuEstatico();
    });
})();
