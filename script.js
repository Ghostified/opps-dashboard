// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
});

function initializeCharts() {
    // New Full Width Trend Chart
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    const trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [
                {
                    label: 'Pipeline Value ($K)',
                    data: [450, 520, 480, 610, 580, 630, 590, 680, 720, 631],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Opportunity Count',
                    data: [8, 10, 7, 12, 9, 11, 8, 14, 13, 9],
                    borderColor: '#4cc9f0',
                    backgroundColor: 'rgba(76, 201, 240, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Pipeline Value ($K)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Opportunity Count'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.dataset.label.includes('Value')) {
                                label += '$' + context.parsed.y + 'K';
                            } else {
                                label += context.parsed.y;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
    
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
    
    // Sales Person Performance Chart
    const salesPersonCtx = document.getElementById('salesPersonChart').getContext('2d');
    const salesPersonChart = new Chart(salesPersonCtx, {
        type: 'bar',
        data: {
            labels: ['David Chen', 'Sarah Jones', 'Maria Garcia', 'Tom Wilson'],
            datasets: [{
                label: 'Pipeline Value ($K)',
                data: [389.53, 81.6, 160.5, 0],
                backgroundColor: '#4361ee',
                borderWidth: 0
            }, {
                label: 'Win Rate %',
                data: [35, 45, 28, 0],
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
                        text: 'Pipeline Value ($K)'
                    }
                },
                y1: {
                    position: 'right',
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Win Rate %'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
    
    // Store chart references for potential updates
    window.crmCharts = {
        trend: trendChart,
        category: categoryChart,
        stage: stageChart,
        age: ageChart,
        salesPerson: salesPersonChart
    };
}

function setupEventListeners() {
    // Date range filter functionality
    const dateRangeSelect = document.getElementById('dateRange');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            console.log('Date range changed to:', this.value);
            // In a real application, this would trigger data reload
            simulateDataRefresh();
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
    
    // Example of how we might update charts with new data
    if (window.crmCharts && window.crmCharts.trend) {
        // Simulate new trend data
        const newTrendData = [460, 530, 490, 620, 590, 640, 600, 690, 730, 641];
        window.crmCharts.trend.data.datasets[0].data = newTrendData;
        window.crmCharts.trend.update();
    }
}

// Export functions for potential use in browser console
window.CRMAnalytics = {
    refreshData: simulateDataRefresh,
    getCharts: () => window.crmCharts
};

// KPI Calculation Formulas (for reference)
window.KPIFormulas = {
    totalPipelineValue: "SUM(All opportunity amounts)",
    activeOpportunities: "COUNT(Opportunities with status 1-4)",
    averageDealSize: "SUM(Amounts) / COUNT(Opportunities)",
    averageDealAge: "AVG(Current Date - Creation Date)",
    winRate: "(Won Opportunities / Total Closed) × 100"
};