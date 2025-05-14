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

let perfil = {
    nombre: "Laura Gómez",
    especialidades: "Especialista en Ansiedad, Depresión y Terapia Cognitivo-Conductual",
    contacto: "📧 laura.gomez@ejemplo.com | +57 300 123 4567",
    descripcion: "Soy una profesional en Psicología con más de 10 años de experiencia en el acompañamiento de personas con trastornos emocionales. Brindo herramientas prácticas desde el enfoque cognitivo-conductual para mejorar la salud mental de mis pacientes."
}

let nav = document.getElementById("nav")
nav.textContent = "Hola, " + perfil.nombre

function mostrarPerfil() {
    document.getElementById("nombrePerfil").textContent = perfil.nombre;
    document.getElementById("especialidadesPerfil").textContent = perfil.especialidades;
    document.getElementById("contactoPerfil").textContent = perfil.contacto;
    document.getElementById("descripcionPerfil").textContent = perfil.descripcion;
}

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
        completionRate: 80
    }
};

function mostrarAlertaPendiente() {
    Swal.fire({
        title: 'Informe no disponible',
        text: 'Todavía se están analizando tus datos',
        icon: 'warning', // success, error, warning, info, question
        confirmButtonText: 'Entendido'
    });
}

function mostrarAlertaNoInicio() {
    Swal.fire({
        title: 'Informe no disponible',
        text: 'El paciente aún no ha realizado ninguna prueba',
        icon: 'error', // success, error, warning, info, question
        confirmButtonText: 'Entendido'
    });
}

function guardarPerfil() {
    Swal.fire({
        title: 'Perfil guardado correctamente',
        icon: 'success', // success, error, warning, info, question
        confirmButtonText: 'Entendido'
    });
}

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

    switch (view) {
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
                <a href="https://marvelapp.com/prototype/7i1gbg8/screen/96054284" target="_blank">
                  <button style="padding: 10px 20px; font-size: 16px; border: none; border-radius: 5px; cursor: pointer;">
                    Solicitar
                  </button>
                </a>
            </div>
          `).join('')}
        </div>
    `;
            break;
        case 'perfil':
            content.innerHTML = `
        <h2>Perfil Profesional</h2>
        <div class="profile-container" id="profileView">
            <div class="profile-header">
                <img src="C:/Universidad/NovenoSemestre/Formacion_empresarial_4/gampsi-platform/assets/psi.jpg" alt="Foto de Perfil">
                <div class="profile-info">
                    <h3 id="nombrePerfil"></h3>
                    <p class="specialties" id="especialidadesPerfil"></p>
                    <p class="contact" id="contactoPerfil"></p>
                </div>
            </div>
            <div class="profile-description">
                <p id="descripcionPerfil"></p>
            </div>
            <button class="edit-profile-btn" onclick="mostrarFormularioEdicion()">Editar Perfil</button>
        </div>

        <div class="profile-container" id="profileForm" style="display:none;">
            <form id="formEditarPerfil">
                <label>Nombre completo:</label><br/>
                <input type="text" name="nombre" value="Laura Gómez" required><br/><br/>
                
                <label>Especialidades:</label><br/>
                <input type="text" name="especialidades" value="Especialista en Ansiedad, Depresión y Terapia Cognitivo-Conductual" required><br/><br/>
                
                <label>Contacto:</label><br/>
                <input type="text" name="contacto" value="laura.gomez@ejemplo.com | +57 300 123 4567" required><br/><br/>
                
                <label>Descripción:</label><br/>
                <textarea name="descripcion" rows="5" required>Soy una profesional en Psicología con más de 10 años de experiencia en el acompañamiento de personas con trastornos emocionales...</textarea><br/><br/>
                
                <button type="submit" class="edit-profile-btn" onclick="guardarPerfil()">Guardar</button>
                <button type="button" class="edit-profile-btn" onclick="cancelarEdicion()">Cancelar</button>
            </form>
        </div>
    `;

            // Agrega el script para manejar el formulario
            setTimeout(() => {
                window.onload = mostrarPerfil();

                window.mostrarFormularioEdicion = function () {
                    document.getElementById('profileView').style.display = 'none';
                    document.getElementById('profileForm').style.display = 'block';
                }

                window.cancelarEdicion = function () {
                    document.getElementById('profileView').style.display = 'block';
                    document.getElementById('profileForm').style.display = 'none';
                }

                const form = document.getElementById('formEditarPerfil');
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    const data = new FormData(form);
                    const nombre = data.get('nombre');
                    const especialidades = data.get('especialidades');
                    const contacto = data.get('contacto');
                    const descripcion = data.get('descripcion');

                    perfil.nombre = nombre
                    perfil.contacto = contacto
                    perfil.descripcion = descripcion
                    perfil.especialidades = especialidades
                    nav.textContent = "Hola, " + nombre
                    window.onload = mostrarPerfil();
                    // Aquí puedes hacer lo que quieras con los datos (como guardarlos en una base o localStorage)

                    // Oculta el formulario y vuelve a mostrar la vista (en un sistema real, deberías volver a renderizar con los nuevos datos)
                    cancelarEdicion();
                });
            }, 100);
            break;


        case 'list_attendance':
            content.innerHTML = `
             <div class="attended-list-container">
                <h2>Pacientes Atendidos</h2>
                <div class="table-wrapper">
                <div class="table-search">
                    <input type="text" id="searchInput" placeholder="Buscar por nombre, videojuego, diagnóstico..." />
                </div>

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
                                <td>Ciudad Diamante</td>
                                <td>Ansiedad leve</td>
                                <td>10/05/2025</td>
                                <td><span class="status completed">Completado</span></td>
                                <td>
                                    <a onclick="window.open('pdf/maria_gonzalez.pdf')" target="_blank" class="btn-report">Ver</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Carlos Ruiz</td>
                                <td>Ciudad Diamante</td>
                                <td>TDAH moderado</td>
                                <td>08/05/2025</td>
                                <td><span class="status in-progress">En proceso</span></td>
                                <td>
                                    <a onclick="mostrarAlertaPendiente()" target="_blank" class="btn-report">Ver</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Laura Pérez</td>
                                <td>Ciudad Diamante</td>
                                <td>Sin indicios</td>
                                <td>06/05/2025</td>
                                <td><span class="status not-started">No iniciado</span></td>
                                <td>
                                    <a onclick="mostrarAlertaNoInicio()" target="_blank" class="btn-report">Ver</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Martin Medina</td>
                                <td>Ciudad Diamante</td>
                                <td>Bipolaridad</td>
                                <td>06/05/2025</td>
                                <td><span class="status completed">Completado</span></td>
                                <td>
                                    <a onclick="window.open('pdf/martin_medina.pdf')" target="_blank" class="btn-report">Ver</a>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
            `
            document.getElementById("searchInput").addEventListener("input", function () {
                const filter = this.value.toLowerCase();
                const rows = document.querySelectorAll(".attended-table tbody tr");

                rows.forEach((row) => {
                    const cells = row.querySelectorAll("td");
                    const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(" ");
                    row.style.display = rowText.includes(filter) ? "" : "none";
                });
            });
            break;


        case 'social':
            content.innerHTML = `
            <div class="progress-container">
                <div class="progress-label">Progreso: <span id="progress-percent">0%</span></div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
            </div>
            <h4 class="title">¡Sigue así, ya casi alcanzas el número de diagnosticos mensuales!</h4>
            <section class="social-section">
                <h2 class="title">Opiniones</h2>
                <div class="carousel-wrapper">
                    <div class="carousel-track" id="infinite-carousel">
                        <!-- Las cards se insertan aquí con JS -->
                    </div>
                </div>
            </section>
            `
            const opinions = [
                { author: "Laura", comment: "Excelente plataforma, intuitiva y eficiente." },
                { author: "Daniel", comment: "Atención al cliente 10/10." },
                { author: "Sofía", comment: "Muy útil para mi día a día." },
                { author: "SmartTech", comment: "Fácil de integrar y mantener." },
                { author: "AgroMarket", comment: "Mejoramos nuestros procesos internos." },
                { author: "Grupo Finanza", comment: "Servicio confiable desde el inicio." }
            ];

            const track = document.getElementById('infinite-carousel');

            function createCard(opinion) {
                const div = document.createElement('div');
                div.className = 'carousel-item';
                div.innerHTML = `<strong>${opinion.author}</strong><p>${opinion.comment}</p>`;
                return div;
            }

            // Duplicar opiniones para efecto loop
            const fullList = [...opinions, ...opinions];
            fullList.forEach(op => track.appendChild(createCard(op)));

            function actualizarProgreso(porcentaje) {
                const fill = document.getElementById("progress-fill");
                const label = document.getElementById("progress-percent");

                porcentaje = Math.min(100, Math.max(0, porcentaje)); // Limita entre 0 y 100
                fill.style.width = `${porcentaje}%`;
                label.textContent = `${porcentaje}%`;
            }

            // Ejemplo de uso (incremento gradual)
            let progreso = 0;
            const interval = setInterval(() => {
                if (progreso <= 80) {
                    actualizarProgreso(progreso);
                    progreso += 10;
                } else {
                    clearInterval(interval);
                }
            }, 500);

            break;

    }
}

changeView('dashboard');



