document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qrContainer = document.getElementById('qrContainer');
    const qrWrapper = document.getElementById('qrWrapper');

    generateBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (!url) {
            alert('Por favor ingresá un enlace');
            urlInput.focus();
            return;
        }

        qrWrapper.innerHTML = '';
        qrContainer.classList.remove('visible');

        // Forzar reflow para reiniciar animación
        void qrContainer.offsetWidth;

        new QRCode(qrWrapper, {
            text: url,
            width: 256,
            height: 256,
            colorDark: '#444444',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        qrContainer.classList.add('visible');
    });

    downloadBtn.addEventListener('click', () => {
        const canvas = qrWrapper.querySelector('canvas');
        if (!canvas) {
            alert('No se encontró el QR para descargar');
            return;
        }

        const link = document.createElement('a');
        link.download = 'qrcoder.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    urlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
});
