(function () {
    /*----- ----- ----- ----- -----
	# Funciones
	----- ----- ----- ----- -----*/

    const AlertaBienvenido = () => {
        const checkInicio = document.getElementById('VentanaInicio');
        if (document.body.contains(checkInicio)) {
            Swal.fire({
                title: '¡Bienvenidos!',
                text: 'Waos',
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
                confirmButtonAriaLabel: 'Boton aceptar',
                customClass: {
                    title: 'text-start h5 fw-bold',
                    confirmButton:
                        'btn btn-primary text-white fw-bold rounded-pill px-4 fs-7',
                    actions: 'w-100 justify-content-end px-4',
                    popup: 'rounded-4',
                },
            });
        }
    };

    const Calendario = () => {
        const checkCalendario = document.querySelector('.calendar');
        if (document.body.contains(checkCalendario)) {
            const monthYearElement = document.getElementById('monthYear'),
                datesElement = document.getElementById('dates'),
                eventsContainer = document.getElementById('eventsContainer'),
                prevBtn = document.getElementById('prevBtn'),
                nextBtn = document.getElementById('nextBtn');

            let currentDate = new Date();
            const events = [
                {
                    date: '2024-12-25',
                    title: 'Navidad',
                    description: 'Celebración de la Navidad',
                },
                {
                    date: '2024-12-31',
                    title: 'Fin de Año',
                    description: 'Cena de fin de año con familia',
                },
            ];

            const updateCalendar = () => {
                const currentYear = currentDate.getFullYear(),
                    currentMonth = currentDate.getMonth();

                const firstDay = new Date(currentYear, currentMonth, 1),
                    lastDay = new Date(currentYear, currentMonth + 1, 0),
                    totalDays = lastDay.getDate(),
                    firstDayIndex = firstDay.getDay(),
                    lastDayIndex = lastDay.getDay();

                const monthYearString = currentDate.toLocaleString('default', {
                    month: 'long',
                    year: 'numeric',
                });
                monthYearElement.textContent = monthYearString;

                let datesHTML = '';

                for (let i = firstDayIndex; i > 0; i--) {
                    const prevDate = new Date(
                        currentYear,
                        currentMonth,
                        -i + 1,
                    );
                    datesHTML += `<div class="calendar__date inactive">${prevDate.getDate()}</div>`;
                }

                for (let i = 1; i <= totalDays; i++) {
                    const date = new Date(currentYear, currentMonth, i);
                    const formattedDate = date.toISOString().split('T')[0];
                    const hasEvent = events.some(
                        (event) => event.date === formattedDate,
                    );
                    const activeClass =
                        date.toDateString() === new Date().toDateString()
                            ? 'active'
                            : '';
                    const eventClass = hasEvent ? 'event' : '';
                    datesHTML += `<div class="calendar__date ${activeClass} ${eventClass}" data-date="${formattedDate}">${i}</div>`;
                }

                for (let i = 1; i <= 6 - lastDayIndex; i++) {
                    const nextDate = new Date(currentYear, currentMonth + 1, i);
                    datesHTML += `<div class="calendar__date inactive">${nextDate.getDate()}</div>`;
                }

                datesElement.innerHTML = datesHTML;

                attachDateClickListeners();
            };

            const attachDateClickListeners = () => {
                const dateElements =
                    document.querySelectorAll('.calendar__date');
                dateElements.forEach((dateElement) => {
                    dateElement.addEventListener('click', () => {
                        const selectedDate =
                            dateElement.getAttribute('data-date');
                        showEvents(selectedDate);
                    });
                });
            };

            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const day = String(date.getDate() + 1);
                const month = String(date.getMonth() + 1); // Los meses comienzan desde 0
                const year = String(date.getFullYear()); // Año completo (YYYY)
                return `${day}/${month}/${year}`;
            };

            const showEvents = (date) => {
                const filteredEvents = events.filter(
                    (event) => event.date === date,
                );
                eventsContainer.innerHTML = '';

                if (filteredEvents.length === 0) {
                    eventsContainer.innerHTML =
                        '<p class="m-0 fw-bold">No hay eventos para este día.</p>';
                } else {
                    filteredEvents.forEach((event) => {
                        eventsContainer.innerHTML += `
                        <div class="calendar__event">
                            <p class="calendar__event-date">${formatDate(
                                event.date,
                            )}</p>
                            <p class="calendar__event-title">${event.title}</p>
                            <p class="calendar__event-description">${
                                event.description
                            }</p>
                        </div>`;
                    });
                }
            };

            prevBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendar();
            });

            nextBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendar();
            });

            updateCalendar();
        }
    };

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
                if (window.scrollY > 100) {
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
        const gliderConfig = {
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

        document.querySelectorAll('.carousel__items').forEach((carousel) => {
            const prevButton = carousel.parentElement.querySelector(
                '.carousel__anterior',
            );
            const nextButton = carousel.parentElement.querySelector(
                '.carousel__siguiente',
            );

            new Glider(carousel, {
                ...gliderConfig,
                arrows: {
                    prev: prevButton,
                    next: nextButton,
                },
            });
        });
    };

    const CarouselSVG = () => {
        const checkCarouselSVG = document.querySelector('.carousel-svg');
        if (document.body.contains(checkCarouselSVG)) {
            const images = document.querySelectorAll(
                '.carousel-svg__images img',
            );
            const dotsContainer = document.querySelector('.carousel-svg__dots');
            let currentIndex = 0;
            let autoSlideInterval;

            // Crear puntos de navegación dinámicamente
            dotsContainer.innerHTML = '';
            images.forEach((_, index) => {
                const dot = document.createElement('button');
                if (index === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            });

            const dots = dotsContainer.querySelectorAll('button');

            const updateCarousel = () => {
                images.forEach((img, index) => {
                    img.classList.toggle('active', index === currentIndex);
                });
                dots.forEach((dot) => dot.classList.remove('active'));
                dots[currentIndex].classList.add('active');
            };

            const startAutoSlide = () => {
                autoSlideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateCarousel();
                }, 3000); // Cambia cada 3 segundos
            };

            const stopAutoSlide = () => {
                clearInterval(autoSlideInterval);
            };

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarousel();
                    stopAutoSlide();
                });
            });

            images.forEach((img) => {
                img.addEventListener('click', () => {
                    stopAutoSlide();
                });
            });

            startAutoSlide();
        }
    };

    const PopUpInfo = () => {
        const checkInicio = document.getElementById('VentanaInicio');
        if (document.body.contains(checkInicio)) {
            const btnPastoral = document.getElementById('btnPastoral');
            btnPastoral.addEventListener('click', () => {
                Swal.fire({
                    imageUrl: './src/assets/Logocolegio.png',
                    imageHeight: 100,
                    imageAlt: 'Logo colegio',
                    html: `
                        <p class="fw-bold">Pastoral educativa</p>
                        <a
                            href="#"
                            class="btn btn-primary text-white fw-bold rounded-pill w-100 mb-3"
                            >Club de naciones unidas - Masmum BQTO</a
                        >
                        <a
                            href="#"
                            class="btn btn-primary text-white fw-bold rounded-pill w-100 mb-3"
                            >Club de periodismo y redes sociales</a
                        >
                        <a
                            href="#"
                            class="btn btn-primary text-white fw-bold rounded-pill w-100 mb-3"
                            >Club de ajedrez</a
                        >
                        <a
                            href="#"
                            class="btn btn-primary text-white fw-bold rounded-pill w-100 mb-3"
                            >Club de matematicas</a
                        >
                    `,
                    showCloseButton: true,
                    showConfirmButton: false,
                    customClass: {
                        actions: 'w-100 justify-content-end px-4',
                        popup: 'rounded-4',
                    },
                });
            });
        }
    };

    /*----- ----- ----- ----- -----
	# Declaraciones
	----- ----- ----- ----- -----*/

    window.addEventListener('load', () => {
        // AlertaBienvenido();
        GliderCreator();
        Calendario();
        LightBox();
        BotonScrollTop();
        CarouselSVG();
        MenuEstatico();
        PopUpInfo();
    });
})();
