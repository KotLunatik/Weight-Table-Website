document.addEventListener('DOMContentLoaded', loadTable);

        function addEntry() {
            const weightInput = document.getElementById('weightInput');
            const weight = parseFloat(weightInput.value);

            if (isNaN(weight)) {
                alert('Пожалуйста, введите корректный вес.');
                return;
            }

            const date = new Date().toLocaleDateString();
            const table = document.getElementById('weightTable');
            const rows = table.rows;
            const lastWeight = rows.length > 1 ? parseFloat(rows[rows.length - 1].cells[1].innerText) : weight;
            const difference = weight - lastWeight;

            const row = table.insertRow();
            const dateCell = row.insertCell(0);
            const weightCell = row.insertCell(1);
            const differenceCell = row.insertCell(2);

            dateCell.innerText = date;
            weightCell.innerText = weight.toFixed(1);
            differenceCell.innerText = difference.toFixed(1);
            differenceCell.style.color = difference >= 0 ? 'red' : 'green';

            saveTable();
            weightInput.value = '';
        }

        function saveTable() {
            const table = document.getElementById('weightTable');
            let data = "";
            for (let i = 1; i < table.rows.length; i++) {
                const row = table.rows[i];
                data += `${row.cells[0].innerText},${row.cells[1].innerText},${row.cells[2].innerText}\n`;
            }
            localStorage.setItem('weightData', data);
        }

        function loadTable() {
            const data = localStorage.getItem('weightData');
            if (data) {
                const table = document.getElementById('weightTable');
                const rows = data.split('\n');
                rows.forEach(row => {
                    if (row.trim()) {
                        const [date, weight, difference] = row.split(',');
                        const tableRow = table.insertRow();
                        const dateCell = tableRow.insertCell(0);
                        const weightCell = tableRow.insertCell(1);
                        const differenceCell = tableRow.insertCell(2);

                        dateCell.innerText = date;
                        weightCell.innerText = weight;
                        differenceCell.innerText = difference;
                        differenceCell.style.color = parseFloat(difference) >= 0 ? 'red' : 'green';
                    }
                });
            }
        }

        function saveToFile() {
            const data = localStorage.getItem('weightData') || "";
            const blob = new Blob([data], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'weight_data.txt';
            a.click();
            URL.revokeObjectURL(a.href);
        }

        function loadFromFile() {
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const data = event.target.result;
                    localStorage.setItem('weightData', data);
                    location.reload();
                };
                reader.readAsText(file);
            }
        }
