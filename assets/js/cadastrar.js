document.addEventListener('DOMContentLoaded', (event) => {
    function generateId() {
        return 'ship-' + Date.now();
    }

    const form = document.getElementById('registerForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const formData = {
            id: generateId(),
            nome: document.getElementById('nome').value,
            leavingDate: document.getElementById('leaving-date').value,
            arrivingDate: document.getElementById('arriving-date').value,
            oceanTarget: document.getElementById('ocean-target').value,
            crewNumber: parseInt(document.getElementById('crew-number').value),
            function: document.getElementById('function').value.trim()
        };

        let formIsValid = true;

        const nomeInput = document.getElementById('nome');
        const leavingDateInput = document.getElementById('leaving-date');
        const arrivingDateInput = document.getElementById('arriving-date');
        const crewNumberInput = document.getElementById('crew-number');
        const functionInput = document.getElementById('function');

        if (nomeInput.value.trim() === '' || nomeInput.value.includes('.') || nomeInput.value.includes('!') || nomeInput.value.includes('*') || nomeInput.value.includes('$') || nomeInput.value.includes('&')) {
            document.getElementById('nomeError').textContent = `The ship's name cannot be empty. It also cannot contain the characters . ! * $ &`;
            formIsValid = false;
        } else {
            document.getElementById('nomeError').textContent = '';
        }

        if (new Date(leavingDateInput.value) >= new Date(arrivingDateInput.value)) {
            document.getElementById('leavingError').textContent = `The departure date must be before the arrival date.`;
            formIsValid = false;
        } else {
            document.getElementById('leavingError').textContent = '';
        }

        if (formData.oceanTarget === '') {
            document.getElementById('oceanTargetError').textContent = `Select an Ocean target.`;
            formIsValid = false;
        } else {
            document.getElementById('oceanTargetError').textContent = '';
        }

        if (!/^\d+$/.test(crewNumberInput.value) || parseInt(crewNumberInput.value) <= 10) {
            document.getElementById('crewError').textContent = `The crew number must be a numeric value greater than 10.`;
            formIsValid = false;
        } else {
            document.getElementById('crewError').textContent = '';
        }

        if (functionInput.value.trim() === '') {
            document.getElementById('functionError').textContent = `The function cannot be empty.`;
            formIsValid = false;
        } else {
            document.getElementById('functionError').textContent = '';
        }

        if (formIsValid) {
            localStorage.setItem(formData.id, JSON.stringify(formData));

            form.reset();

            alert(`Information successfully registered!`);
        }
    });
});
