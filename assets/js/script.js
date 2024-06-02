document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in'); // Adiciona o fadeIn na página

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('./') || href.startsWith('/')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Atraso correspondente à duração da animação
            }
        });
    });
});
