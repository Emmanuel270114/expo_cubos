import Chart from 'chart.js/auto';

// Datos locales
const foodData = [
  { food_name: 'Arroz', region: 'Norte', quarter: '1er Trimestre', amount: 1200 },
  { food_name: 'Arroz', region: 'Norte', quarter: '2do Trimestre', amount: 1300 },
  { food_name: 'Arroz', region: 'Norte', quarter: '3er Trimestre', amount: 1100 },
  { food_name: 'Arroz', region: 'Norte', quarter: '4to Trimestre', amount: 1400 },
  { food_name: 'Arroz', region: 'Sur', quarter: '1er Trimestre', amount: 1000 },
  { food_name: 'Arroz', region: 'Sur', quarter: '2do Trimestre', amount: 1100 },
  { food_name: 'Arroz', region: 'Sur', quarter: '3er Trimestre', amount: 900 },
  { food_name: 'Arroz', region: 'Sur', quarter: '4to Trimestre', amount: 1200 },
  { food_name: 'Frijoles', region: 'Norte', quarter: '1er Trimestre', amount: 800 },
  { food_name: 'Frijoles', region: 'Norte', quarter: '2do Trimestre', amount: 900 },
  { food_name: 'Frijoles', region: 'Norte', quarter: '3er Trimestre', amount: 850 },
  { food_name: 'Frijoles', region: 'Norte', quarter: '4to Trimestre', amount: 950 },
  { food_name: 'Frijoles', region: 'Sur', quarter: '1er Trimestre', amount: 700 },
  { food_name: 'Frijoles', region: 'Sur', quarter: '2do Trimestre', amount: 800 },
  { food_name: 'Frijoles', region: 'Sur', quarter: '3er Trimestre', amount: 750 },
  { food_name: 'Frijoles', region: 'Sur', quarter: '4to Trimestre', amount: 850 },
  { food_name: 'Maíz', region: 'Norte', quarter: '1er Trimestre', amount: 1500 },
  { food_name: 'Maíz', region: 'Norte', quarter: '2do Trimestre', amount: 1600 },
  { food_name: 'Maíz', region: 'Norte', quarter: '3er Trimestre', amount: 1400 },
  { food_name: 'Maíz', region: 'Norte', quarter: '4to Trimestre', amount: 1700 },
  { food_name: 'Maíz', region: 'Sur', quarter: '1er Trimestre', amount: 1300 },
  { food_name: 'Maíz', region: 'Sur', quarter: '2do Trimestre', amount: 1400 },
  { food_name: 'Maíz', region: 'Sur', quarter: '3er Trimestre', amount: 1200 },
  { food_name: 'Maíz', region: 'Sur', quarter: '4to Trimestre', amount: 1500 }
];

// Función para procesar datos en formato de cubo
function processFoodData(data) {
  const dataCube = {};

  data.forEach(item => {
    if (!dataCube[item.food_name]) {
      dataCube[item.food_name] = {};
    }
    if (!dataCube[item.food_name][item.region]) {
      dataCube[item.food_name][item.region] = {};
    }
    dataCube[item.food_name][item.region][item.quarter] = item.amount;
  });

  return dataCube;
}

// Función para calcular totales por alimento
function getTotalsByFood(dataCube) {
  const totals = {};
  for (const food in dataCube) {
    totals[food] = 0;
    for (const region in dataCube[food]) {
      for (const quarter in dataCube[food][region]) {
        totals[food] += dataCube[food][region][quarter];
      }
    }
  }
  return totals;
}

// Función para calcular totales por región
function getTotalsByRegion(dataCube) {
  const totals = {};
  for (const food in dataCube) {
    for (const region in dataCube[food]) {
      if (!totals[region]) totals[region] = 0;
      for (const quarter in dataCube[food][region]) {
        totals[region] += dataCube[food][region][quarter];
      }
    }
  }
  return totals;
}

// Función para calcular totales por trimestre
function getTotalsByQuarter(dataCube) {
  const totals = { '1er Trimestre': 0, '2do Trimestre': 0, '3er Trimestre': 0, '4to Trimestre': 0 };
  for (const food in dataCube) {
    for (const region in dataCube[food]) {
      for (const quarter in dataCube[food][region]) {
        totals[quarter] += dataCube[food][region][quarter];
      }
    }
  }
  return totals;
}

// Crear gráficos
function createChart(ctx, data, title, type = 'bar') {
  return new Chart(ctx, {
    type: type,
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: title,
        data: Object.values(data),
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Inicializar la aplicación
function initApp() {
  const dataCube = processFoodData(foodData);

  // Crear los elementos canvas para los gráficos
  document.getElementById('salesChart').insertAdjacentHTML('afterend', `
    <canvas id="regionChart"></canvas>
    <canvas id="quarterChart"></canvas>
  `);

  // Calcular totales
  const foodTotals = getTotalsByFood(dataCube);
  const regionTotals = getTotalsByRegion(dataCube);
  const quarterTotals = getTotalsByQuarter(dataCube);

  // Crear gráficos
  createChart(document.getElementById('salesChart'), foodTotals, 'Consumo Total por Alimento');
  createChart(document.getElementById('regionChart'), regionTotals, 'Consumo Total por Región');
  createChart(document.getElementById('quarterChart'), quarterTotals, 'Consumo Total por Trimestre');

  // Mostrar análisis
  const analysisDiv = document.getElementById('analysis');
  let analysisHTML = '<h2>Análisis del Consumo de Alimentos:</h2>';

  // Análisis por alimento
  analysisHTML += '<h3>Por Alimento:</h3><ul>';
  for (const food in foodTotals) {
    analysisHTML += `<li>${food}: ${foodTotals[food]} kg consumidos</li>`;
  }
  analysisHTML += '</ul>';

  // Análisis por región
  analysisHTML += '<h3>Por Región:</h3><ul>';
  for (const region in regionTotals) {
    analysisHTML += `<li>${region}: ${regionTotals[region]} kg consumidos</li>`;
  }
  analysisHTML += '</ul>';

  // Análisis por trimestre
  analysisHTML += '<h3>Por Trimestre:</h3><ul>';
  for (const quarter in quarterTotals) {
    analysisHTML += `<li>${quarter}: ${quarterTotals[quarter]} kg consumidos</li>`;
  }
  analysisHTML += '</ul>';

  analysisDiv.innerHTML = analysisHTML;
}

// Iniciar la aplicación
initApp();