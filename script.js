// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    setupTabNavigation();
});

function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Reinitialize charts when switching tabs (for responsive adjustments)
            setTimeout(() => {
                if (tabId === 'sales-orders') {
                    initializeSalesOrdersCharts();
                } else {
                    initializeOpportunitiesCharts();
                }
            }, 100);
        });
    });
}

function initializeCharts() {
    initializeOpportunitiesCharts();
    initializeSalesOrdersCharts();
}

function initializeOpportunitiesCharts() {
    // Existing opportunities charts code...
    // Trend Chart
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        const trendChart = new Chart(trendCtx.getContext('2d'), {
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
            options: getTrendChartOptions('Pipeline Value ($K)', 'Opportunity Count')
        });
    }

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        const categoryChart = new Chart(categoryCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Advent111', 'Mid used'],
                datasets: [{
                    data: [384640, 247000],
                    backgroundColor: ['#4361ee', '#4cc9f0'],
                    borderWidth: 1
                }]
            },
            options: getDoughnutChartOptions()
        });
    }

    // Stage Chart
    const stageCtx = document.getElementById('stageChart');
    if (stageCtx) {
        const stageChart = new Chart(stageCtx.getContext('2d'), {
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
            options: getStageChartOptions()
        });
    }

    // Age Chart
    const ageCtx = document.getElementById('ageChart');
    if (ageCtx) {
        const ageChart = new Chart(ageCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['OP715520', 'OP431970', 'OP508700', 'OP658890', 'Others'],
                datasets: [{
                    label: 'Deal Age (Days)',
                    data: [28, 26, 26, 24, 20],
                    backgroundColor: ['#e74c3c', '#e74c3c', '#e74c3c', '#f39c12', '#2ecc71'],
                    borderWidth: 0
                }]
            },
            options: getAgeChartOptions()
        });
    }

    // Sales Person Chart
    const salesPersonCtx = document.getElementById('salesPersonChart');
    if (salesPersonCtx) {
        const salesPersonChart = new Chart(salesPersonCtx.getContext('2d'), {
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
            options: getSalesPersonChartOptions()
        });
    }
}

function initializeSalesOrdersCharts() {
    // Sales Orders Trend Chart
    const ordersTrendCtx = document.getElementById('ordersTrendChart');
    if (ordersTrendCtx) {
        const ordersTrendChart = new Chart(ordersTrendCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [
                    {
                        label: 'Order Value ($K)',
                        data: [42, 48, 55, 62, 58, 65, 72, 68, 75, 82],
                        borderColor: '#4361ee',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Order Count',
                        data: [35, 38, 42, 45, 41, 47, 52, 49, 54, 60],
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
            options: getTrendChartOptions('Order Value ($K)', 'Order Count')
        });
    }

    // Orders Status Chart with Legend
    const ordersStatusCtx = document.getElementById('ordersStatusChart');
    if (ordersStatusCtx) {
        const statusData = {
            labels: ['Delivered', 'Shipped', 'Processing', 'Pending', 'Cancelled'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: ['#2ecc71', '#3498db', '#f39c12', '#e74c3c', '#95a5a6'],
                borderWidth: 1
            }]
        };

        const ordersStatusChart = new Chart(ordersStatusCtx.getContext('2d'), {
            type: 'doughnut',
            data: statusData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${context.label}: ${value} orders (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

        // Create custom legend
        createCustomLegend('ordersStatusLegend', statusData);
    }

    // Top Products Chart
    const topProductsCtx = document.getElementById('topProductsChart');
    if (topProductsCtx) {
        const topProductsChart = new Chart(topProductsCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Laptop Pro', 'Tablet Air', 'Phone Max', 'Monitor 4K', 'Keyboard Pro'],
                datasets: [{
                    label: 'Units Sold',
                    data: [245, 189, 156, 132, 98],
                    backgroundColor: '#4361ee',
                    borderWidth: 0
                }, {
                    label: 'Revenue ($K)',
                    data: [84.5, 45.2, 62.8, 39.6, 24.3],
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
                            text: 'Units Sold'
                        }
                    },
                    y1: {
                        position: 'right',
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Revenue ($K)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }

    // Services Performance Chart with Legend
    const servicesCtx = document.getElementById('servicesChart');
    if (servicesCtx) {
        const servicesData = {
            labels: ['Consulting', 'Support', 'Implementation', 'Training', 'Custom Dev'],
            datasets: [{
                data: [45, 30, 15, 8, 2],
                backgroundColor: ['#4361ee', '#4cc9f0', '#2ecc71', '#f39c12', '#e74c3c'],
                borderWidth: 1
            }]
        };

        const servicesChart = new Chart(servicesCtx.getContext('2d'), {
            type: 'doughnut',
            data: servicesData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${context.label}: $${value}K (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

        // Create custom legend
        createCustomLegend('servicesLegend', servicesData, true);
    }

    // Orders Rep Chart
    const ordersRepCtx = document.getElementById('ordersRepChart');
    if (ordersRepCtx) {
        const ordersRepChart = new Chart(ordersRepCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['David Chen', 'Sarah Jones', 'Maria Garcia', 'Tom Wilson'],
                datasets: [{
                    label: 'Orders Closed',
                    data: [28, 22, 18, 12],
                    backgroundColor: '#4361ee',
                    borderWidth: 0
                }, {
                    label: 'Avg Order Value ($K)',
                    data: [7.2, 6.8, 5.9, 4.5],
                    backgroundColor: '#4cc9f0',
                    borderWidth: 0,
                    type: 'line',
                    yAxisID: 'y1'
                }]
            },
            options: getSalesPersonChartOptions()
        });
    }
}

// Create custom legend for charts
function createCustomLegend(legendId, chartData, isCurrency = false) {
    const legendContainer = document.getElementById(legendId);
    if (!legendContainer) return;

    const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
    
    chartData.labels.forEach((label, index) => {
        const value = chartData.datasets[0].data[index];
        const percentage = Math.round((value / total) * 100);
        const color = chartData.datasets[0].backgroundColor[index];
        
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        
        legendItem.innerHTML = `
            <div class="legend-color" style="background-color: ${color};"></div>
            <span class="legend-label">${label}</span>
            <span class="legend-value">${isCurrency ? '$' + value + 'K' : value + ' orders'} (${percentage}%)</span>
        `;
        
        legendContainer.appendChild(legendItem);
    });
}

// Chart configuration helper functions
function getTrendChartOptions(yAxisLabel, y1AxisLabel) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
            x: { grid: { display: false } },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: { display: true, text: yAxisLabel },
                grid: { drawOnChartArea: false }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: { display: true, text: y1AxisLabel },
                grid: { drawOnChartArea: false }
            }
        },
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        if (context.dataset.label.includes('Value') || context.dataset.label.includes('$')) {
                            label += '$' + context.parsed.y + (context.dataset.label.includes('K') ? 'K' : '');
                        } else {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        }
    };
}

function getDoughnutChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const value = context.raw;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${context.label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    };
}

function getStageChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Opportunity Count' }
            },
            y1: {
                position: 'right',
                beginAtZero: true,
                title: { display: true, text: 'Total Value ($K)' },
                grid: { drawOnChartArea: false }
            }
        }
    };
}

function getAgeChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Age (Days)' }
            }
        }
    };
}

function getSalesPersonChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Orders Closed' }
            },
            y1: {
                position: 'right',
                beginAtZero: true,
                title: { display: true, text: 'Avg Order Value ($K)' },
                grid: { drawOnChartArea: false }
            }
        }
    };
}

function setupEventListeners() {
    // Date range filter functionality
    const oppDateRange = document.getElementById('oppDateRange');
    const ordersDateRange = document.getElementById('ordersDateRange');
    
    if (oppDateRange) {
        oppDateRange.addEventListener('change', function() {
            console.log('Opportunities date range changed to:', this.value);
            simulateDataRefresh();
        });
    }
    
    if (ordersDateRange) {
        ordersDateRange.addEventListener('change', function() {
            console.log('Sales orders date range changed to:', this.value);
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
        });
    });
}

function simulateDataRefresh() {
    console.log('Simulating data refresh...');
}

// Export functions for potential use in browser console
window.CRMAnalytics = {
    refreshData: simulateDataRefresh,
    switchTab: (tabName) => {
        const button = document.querySelector(`[data-tab="${tabName}"]`);
        if (button) button.click();
    }
};