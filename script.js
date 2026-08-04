document.addEventListener('DOMContentLoaded', function() {
    // Provjera i prikaz poruke dobrodošlice samo jednom
    if (!sessionStorage.getItem('welcomeShown')) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Dobrodošli u Pekaru SARAJEVO!</h2>
                <p>Danas vas očekuju svježi proizvodi iz naše pekare.</p>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.close');
        closeButton.onclick = function() {
            modal.remove();
        }

        sessionStorage.setItem('welcomeShown', 'true');
    }

    // Dodavanje vremena u footer
    const footer = document.querySelector('.footer p');
    const timeElement = document.createElement('div');
    timeElement.className = 'vrijeme';
    footer.after(timeElement);

    function updateTime() {
        const now = new Date();
        timeElement.textContent = now.toLocaleString('bs-BA');
    }
    updateTime();
    setInterval(updateTime, 1000);

    // Hover efekat za prikaz cijena
    const products = document.querySelectorAll('.product');
    products.forEach((product, index) => {
        const prices = ['2.50', '1.00', '3.00']; // Cijene za različite proizvode
        const overlay = document.createElement('div');
        overlay.className = 'price-overlay';
        overlay.textContent = `${prices[index]} KM`;
        product.style.position = 'relative';
        product.appendChild(overlay);

        product.addEventListener('mouseenter', () => {
            overlay.style.display = 'flex';
        });

        product.addEventListener('mouseleave', () => {
            overlay.style.display = 'none';
        });
    });

    // Validacija kontakt forme
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Molimo popunite sva obavezna polja.');
                return;
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Molimo unesite ispravnu email adresu.');
                return;
            }
            
            alert('Poruka je uspješno poslana! Hvala na vašem komentaru.');
            contactForm.reset();
        });
    }

    // Funkcionalnost za radno vrijeme
    const toggleButton = document.querySelector('[data-target="radnoVrijeme"]');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            const radnoVrijeme = document.getElementById('radnoVrijeme');
            if (radnoVrijeme) {
                radnoVrijeme.classList.toggle('hidden');
                this.textContent = radnoVrijeme.classList.contains('hidden') ? 
                    'Prikaži radno vrijeme' : 
                    'Sakrij radno vrijeme';
            }
        });
    }

    const galleryImage = document.querySelector('.gallery-image');
    if (galleryImage) {
        const mainImage = galleryImage.src;
        const altImage = galleryImage.getAttribute('data-alt-image');
        
        galleryImage.addEventListener('mouseenter', () => {
            galleryImage.src = altImage;
        });
        
        galleryImage.addEventListener('mouseleave', () => {
            galleryImage.src = mainImage;
        });
    }

    // Dinamička lista proizvoda
    const posebnaPonuda = [
        { naziv: 'Burek', cijena: '3.50 KM', opis: 'Tradicionalni bosanski burek' },
        { naziv: 'Sirnica', cijena: '3.00 KM', opis: 'Pita sa sirom' },
        { naziv: 'Krompiruša', cijena: '2.50 KM', opis: 'Pita sa krompirom' },
        { naziv: 'Zeljanica', cijena: '3.00 KM', opis: 'Pita sa špinatom' },
        { naziv: 'Mantije', cijena: '3.50 KM', opis: 'Tradicionalne bosanske mantije' }
    ];

    const specialOffersContainer = document.getElementById('special-offers');
    if (specialOffersContainer) {
        posebnaPonuda.forEach(proizvod => {
            const elementPonude = document.createElement('div');
            elementPonude.className = 'special-offer-item';
            elementPonude.innerHTML = `
                <h4>${proizvod.naziv}</h4>
                <p>${proizvod.opis}</p>
                <p><strong>${proizvod.cijena}</strong></p>
            `;
            specialOffersContainer.appendChild(elementPonude);
        });
    }

});
