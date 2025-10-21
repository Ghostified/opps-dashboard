// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
});

function initializeCharts() {
    // Pipeline Value by Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    const categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Advent111', 'Mid used'],
            datasets: [{
                data: [384640, 247000],
                backgroundColor: [
                    '#4361ee',
                    '#4cc9f0'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: $${(value/1000).toFixed(1)}K (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Opportunities by Status Stage Chart
    const stageCtx = document.getElementById('stageChart').getContext('2d');
    const stageChart = new Chart(stageCtx, {
        type: 'bar',
        data: {
            labels: ['Stage 4', 'Stage 3', 'Stage 2', 'Stage 1'],
            datasets: [{
                label: 'Opportunity Count',
                data: [1, 4, 4, 0],
                backgroundColor: '#4361ee',
                borderWidth: 0
            }, {
                label: 'Total Value ($K)',
                data: [81.6, 389.53, 160.5, 0],
                backgroundColor: '#4cc9f0',
                borderWidth: 0,
                type: 'line',
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Opportunity Count'
                    }
                },
                y1: {
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Value ($K)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
    
    // Deal Age Analysis Chart
    const ageCtx = document.getElementById('ageChart').getContext('2d');
    const ageChart = new Chart(ageCtx, {
        type: 'bar',
        data: {
            labels: ['OP715520', 'OP431970', 'OP508700', 'OP658890', 'Others'],
            datasets: [{
                label: 'Deal Age (Days)',
                data: [28, 26, 26, 24, 20],
                backgroundColor: [
                    '#e74c3c',
                    '#e74c3c',
                    '#e74c3c',
                    '#f39c12',
                    '#2ecc71'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Age (Days)'
                    }
                }
            }
        }
    });
    
    // Performance by Assigned User Chart
    const userCtx = document.getElementById('userChart').getContext('2d');
    const userChart = new Chart(userCtx, {
        type: 'bar',
        data: {
            labels: ['User No. 3', 'User No. 2', 'User No. 4'],
            datasets: [{
                label: 'Pipeline Value ($K)',
                data: [389.53, 160.5, 81.6],
                backgroundColor: '#4361ee',
                borderWidth: 0
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Store chart references for potential updates
    window.crmCharts = {
        category: categoryChart,
        stage: stageChart,
        age: ageChart,
        user: userChart
    };
}

function setupEventListeners() {
    // Date range filter functionality
    const dateRangeSelect = document.getElementById('dateRange');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            console.log('Date range changed to:', this.value);
            // In a real application, this would trigger data reload
            // simulateDataRefresh();
        });
    }
    
    // Add click handlers to KPI cards for potential drill-down
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            console.log(`KPI card clicked: ${title}`);
            // In a real app, this could open a detailed view
        });
    });
}

// Function to simulate data refresh (for demonstration)
function simulateDataRefresh() {
    console.log('Simulating data refresh...');
    // This would typically fetch new data from an API
    // and update the charts
}

// Export functions for potential use in browser console
window.CRMAnalytics = {
    refreshData: simulateDataRefresh,
    getCharts: () => window.crmCharts
};