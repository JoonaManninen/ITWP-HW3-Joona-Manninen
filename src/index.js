const table = document.createElement("table");
const thead = document.createElement("thead");
const headerRow = document.createElement("tr");

const municipalityHeader = document.createElement("th");
municipalityHeader.textContent = "Municipality";
headerRow.appendChild(municipalityHeader);

const populationHeader = document.createElement("th");
populationHeader.textContent = "Population";
headerRow.appendChild(populationHeader);

const employmentAmountHeader = document.createElement("th");
employmentAmountHeader.textContent = "Employment amount";
headerRow.appendChild(employmentAmountHeader);

const employmentPercentageHeader = document.createElement("th");
employmentPercentageHeader.textContent = "Employment-%";
headerRow.appendChild(employmentPercentageHeader);

thead.appendChild(headerRow);
table.appendChild(thead);

const tbody = document.createElement("tbody");

fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff")
  .then((response) => response.json())
  .then((data) => {
    const municipalities = Object.values(
      data.dataset.dimension.Alue.category.label
    );
    const values = data.dataset.value;

    fetch(
      "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
    )
      .then((response) => response.json())
      .then((data) => {
        const employmentValues = data.dataset.value;

        municipalities.forEach((municipality, index) => {
          const population = values[index];
          const row = document.createElement("tr");
          const employmentAmount = employmentValues[index];
          const employmentPercentage = (
            (employmentAmount / population) *
            100
          ).toFixed(2);

          const municipalityCell = document.createElement("td");
          municipalityCell.textContent = municipality;
          row.appendChild(municipalityCell);

          const populationCell = document.createElement("td");
          populationCell.textContent = population;
          row.appendChild(populationCell);

          const employmentAmountCell = document.createElement("td");
          employmentAmountCell.textContent = employmentAmount;
          row.appendChild(employmentAmountCell);

          const employmentPercentCell = document.createElement("td");
          employmentPercentCell.textContent = employmentPercentage + "%";
          row.appendChild(employmentPercentCell);

          if (employmentPercentage > 45) {
            row.style.backgroundColor = "#abffbd";
          } else if (employmentPercentage < 25) {
            row.style.backgroundColor = "#ff9e9e";
          }

          tbody.appendChild(row);
        });

        table.appendChild(tbody);
        document.body.appendChild(table);
      })
      .catch((error) => {
        console.error("Error fetching employment data:", error);
      });
  })
  .catch((error) => {
    console.error("Error fetching population data:", error);
  });
