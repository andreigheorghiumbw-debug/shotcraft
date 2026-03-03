document.querySelectorAll('.file-input').forEach(input => {
    input.addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.onload = function() {
            const parent = e.target.parentElement;
            parent.innerHTML = '<img src="' + reader.result + '" style="width:100%; height:100%; object-fit:cover;">';
        }
        reader.readAsDataURL(e.target.files[0]);
    });
});

document.getElementById('saveBento').addEventListener('click', () => {
    window.print();
});