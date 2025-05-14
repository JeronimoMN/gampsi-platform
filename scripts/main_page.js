const diagnosticGames = [
    {
        title: 'Trastorno de Ansiedad Generalizada',
        description: 'Evaluación clínica para detectar síntomas de ansiedad excesiva y preocupación crónica, interfiriendo en la vida diaria.',
        cost: 100000,
        duration: '1 Hora',
        buttonText: 'Agendar Test'
    },
    {
        title: 'Bipolaridad',
        description: 'Diagnóstico especializado para identificar episodios maníacos y depresivos, con análisis de patrones de comportamiento.',
        cost: 150000,
        duration: '1:30 Horas',
        buttonText: 'Agendar Test'
    },
    {
        title: 'Depresión',
        description: 'Evaluación psicológica profunda para medir niveles de depresión, incluyendo escalas validadas internacionalmente.',
        cost: 80000,
        duration: '50 Minutos',
        buttonText: 'Agendar Test'
    }
];

// Datos de prueba para el dashboard
const dashboardData = {
    monthlyActivity: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        completed: [15, 22, 18, 25, 30, 15, 35, 40, 38, 45, 40, 55],
        created: [20, 25, 22, 30, 35, 16, 40, 45, 42, 50, 50, 60]
    },
    categories: {
        labels: ['Ansiedad', 'Depresión', 'TDAH', 'Trastorno Bipolar', 'Estrés Postraumático'],
        data: [35, 25, 15, 10, 15],
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    },
    annualProgress: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        data: [10, 20, 30, 40, 50, 40, 65, 70, 75, 80, 85, 90]
    },
    stats: {
        totalUsers: 1243,
        totalActivities: 567,
        completionRate: 82
    }
};

// Función para inicializar gráficos con datos de prueba
function initializeCharts() {
    // Gráfico de Actividad Mensual
    new Chart(document.getElementById('activityChart'), {
        type: 'line',
        data: {
            labels: dashboardData.monthlyActivity.labels,
            datasets: [{
                label: 'Actividades Completadas',
                data: dashboardData.monthlyActivity.completed,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.4
            }, {
                label: 'Actividades Creadas',
                data: dashboardData.monthlyActivity.created,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Distribución por Categorías
    new Chart(document.getElementById('categoryChart'), {
        type: 'doughnut',
        data: {
            labels: dashboardData.categories.labels,
            datasets: [{
                data: dashboardData.categories.data,
                backgroundColor: dashboardData.categories.colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });

    // Gráfico de Progreso Anual
    new Chart(document.getElementById('progressChart'), {
        type: 'line',
        data: {
            labels: dashboardData.annualProgress.labels,
            datasets: [{
                label: 'Progreso Anual',
                data: dashboardData.annualProgress.data,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Actualizar estadísticas
    document.getElementById('totalUsers').textContent = dashboardData.stats.totalUsers;
    document.getElementById('totalActivities').textContent = dashboardData.stats.totalActivities;
    document.getElementById('completionRate').textContent = `${dashboardData.stats.completionRate}%`;
}

// Función para cambiar de vista
async function changeView(view) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    switch(view) {
        case 'dashboard':
            content.innerHTML = `
                <h2>Panel de Control</h2>
                <p>Resumen de tu actividad en la plataforma.</p>
                <div class="dashboard-grid">
                    <div class="chart-container">
                        <h3>Actividad Mensual</h3>
                        <canvas id="activityChart"></canvas>
                    </div>
                    <div class="chart-container">
                        <h3>Distribución por Categorías</h3>
                        <canvas id="categoryChart"></canvas>
                    </div>
                    <div class="chart-container">
                        <h3>Progreso Anual</h3>
                        <canvas id="progressChart"></canvas>
                    </div>
                    <div class="chart-container">
                        <h3>Estadísticas Rápidas</h3>
                        <div class="stats-container">
                            <div class="stat-box">
                                <span class="stat-value" id="totalUsers">0</span>
                                <span class="stat-label">Usuarios</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-value" id="totalActivities">0</span>
                                <span class="stat-label">Actividades</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-value" id="completionRate">0%</span>
                                <span class="stat-label">Tasa de Completado</span>
                            </div>
                        </div>
                    </div>
                </div>`;

            if (typeof Chart === 'undefined') {
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            }

            initializeCharts();
            break;
        case 'videojuegos':
            content.innerHTML = `
        <h2>Solicita el Videojuego que necesitas</h2>
        <div class="cards-container">
          ${diagnosticGames.map(game => `
          <div class="card">
            <h3>${game.title}</h3>
            <p class="description">${game.description}</p>
            <div class="details">
              <span><strong>Costo:</strong> ${game.cost.toLocaleString()}</span><br>
              <span><strong>Duración:</strong> ${game.duration}</span>
            </div>
            <button class="card-button">Solicitar</button>
          </div>
          `).join('')}
        </div>
    `;
            break;
        case 'perfil':
            content.innerHTML = `
        <h2>Perfil Profesional</h2>
        <div class="profile-container">
            <div class="profile-header">
                <img src="../assets/psi.jpg" alt="Foto de Perfil">
                <div class="profile-info">
                    <h3>Psicóloga Laura Gómez</h3>
                    <p class="specialties">Especialista en Ansiedad, Depresión y Terapia Cognitivo-Conductual</p>
                    <p class="contact">📧 laura.gomez@ejemplo.com | 📞 +57 300 123 4567</p>
                </div>
            </div>
            <div class="profile-description">
                <p>
                    Soy una profesional en Psicología con más de 10 años de experiencia en el acompañamiento de personas con trastornos emocionales. Brindo herramientas prácticas desde el enfoque cognitivo-conductual para mejorar la salud mental de mis pacientes.
                </p>
            </div>
            <button class="edit-profile-btn">Editar Perfil</button>
        </div>
    `;
            break;

        case 'list_attendance':
            content.innerHTML = `
             <div class="attended-list-container">
                <h2>Pacientes Atendidos</h2>
                <div class="table-wrapper">
                    <table class="attended-table">
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Videojuegos Jugados</th>
                                <th>Diagnóstico</th>
                                <th>Fecha</th>
                                <th>Completado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>María González</td>
                                <td>Laberinto Mental</td>
                                <td>Ansiedad leve</td>
                                <td>10/05/2025</td>
                                <td><span class="status completed">Completado</span></td>
                                <td><button class="btn-detail">Ver</button></td>
                            </tr>
                            <tr>
                                <td>Carlos Ruiz</td>
                                <td>RompePatrones, FocusRun</td>
                                <td>TDAH moderado</td>
                                <td>08/05/2025</td>
                                <td><span class="status in-progress">En proceso</span></td>
                                <td><button class="btn-detail">Ver</button></td>
                            </tr>
                            <tr>
                                <td>Laura Pérez</td>
                                <td>MindBuilder</td>
                                <td>Sin indicios</td>
                                <td>06/05/2025</td>
                                <td><span class="status not-started">No iniciado</span></td>
                                <td><button class="btn-detail">Ver</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            `
            break;


    }
}

changeView('dashboard');
