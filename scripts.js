        let selectedColorClass = '';

        // Generate the initial table with input fields
        function createTable() {
            const table = document.getElementById('editableTable');
            for (let i = 0; i < 5; i++) {
                const row = document.createElement('tr');
                for (let j = 0; j < 9; j++) {
                    const cell = document.createElement('td');
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.addEventListener('input', () => {
                        input.value = input.value.slice(0, 4); // Limit to 4 characters
                    });
                    cell.appendChild(input);

                    // Add event listener to apply color when a cell is clicked
                    cell.addEventListener('click', () => {
                        if (selectedColorClass) {
                            cell.className = selectedColorClass;
                        }
                    });

                    row.appendChild(cell);
                }
                table.querySelector('tbody').appendChild(row);
            }
        }

        // Update the table values based on input
        function updateTable() {
            const inputs = document.querySelectorAll('#editableTable input');
            inputs.forEach(input => {
                input.parentElement.textContent = input.value;
            });
        }

        // Set the selected color class
        function selectColor(colorClass) {
            selectedColorClass = colorClass;
        }

        // Save the table as a PNG image
        function saveTableAsImage() {
            const table = document.getElementById('editableTable');
            const rows = table.rows.length;
            const cols = table.rows[0].cells.length;
            const cellWidth = 100;
            const cellHeight = 100;

            const svgWidth = cols * cellWidth;
            const svgHeight = rows * cellHeight;

            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", svgWidth);
            svg.setAttribute("height", svgHeight);

            // Convert table to SVG
            Array.from(document.querySelectorAll('#editableTable tr')).forEach((row, rowIndex) => {
                Array.from(row.children).forEach((cell, colIndex) => {
                    const cellText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    cellText.setAttribute("x", cellWidth * colIndex + cellWidth / 2);
                    cellText.setAttribute("y", cellHeight * rowIndex + cellHeight / 2);
                    cellText.setAttribute("font-size", "20");
                    cellText.setAttribute("text-anchor", "middle");
                    cellText.setAttribute("dominant-baseline", "middle");
                    cellText.textContent = cell.textContent;

                    // Determine background color
                    const isHighlighted = cell.classList.contains('highlight-blue') || cell.classList.contains('highlight-red') || cell.classList.contains('highlight-yellow');
                    const bgColor = isHighlighted ? getComputedStyle(cell).backgroundColor : "white";

                    // Draw background rectangle
                    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    rect.setAttribute("x", cellWidth * colIndex);
                    rect.setAttribute("y", cellHeight * rowIndex);
                    rect.setAttribute("width", cellWidth);
                    rect.setAttribute("height", cellHeight);
                    rect.setAttribute("fill", bgColor);

                    svg.appendChild(rect);
                    svg.appendChild(cellText);
                });
            });

            // Render SVG on Canvas and save as PNG
			const timestamp = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15);
            const canvas = document.getElementById("canvas");
            canvas.width = svgWidth;
            canvas.height = svgHeight;
            const ctx = canvas.getContext("2d");
            const svgData = new XMLSerializer().serializeToString(svg);
            const img = new Image();
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);
            
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                const pngUrl = canvas.toDataURL("image/png");
                const link = document.createElement('a');
                link.href = pngUrl;
                link.download = `table_${timestamp}.png`;
                link.click();
            };

            img.src = url;
        }

        // Initialize the table on load
        createTable();
