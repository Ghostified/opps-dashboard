// Sample data structure based on the provided example
const sampleOpportunityData = [
    {
        "customer_name": "Felicia Barbu",
        "customer_email": "fellydev@gmail.com",
        "customer_phone": "592016",
        "customer_type": "Juridical Person",
        "customer_rating": "",
        "company": "",
        "opportunity_id": "OP 761000",
        "location": "",
        "age": "1128.7", // Assuming this is in hours, needs conversion to days
        "status": "Open", // Example status
        "source": "Webchat",
        "campaign": "",
        "product_details": [
            {
                "product_type": "Product",
                "product_category": "Electronics",
                "product_name": "Laptop Pro"
            },
            {
                "product_type": "Product",
                "product_category": "Accessories",
                "product_name": "Wireless Mouse"
            }
        ],
        "services_details": [
            {
                "service_type": "Service",
                "service_category": "Installation",
                "service_name": "Setup Service"
            }
        ],
        "comments": "",
        "date_created": "2025-01-28 10:00:00", // Example date
        "created_by": "Felicia",
        "assigned_to": "Sarah Jones",
        "Asset_Name": [],
        "opportunity_number": "1757582582319x366241707678761000"
    },
    // Add more sample data points as needed for testing
    {
        "customer_name": "John Doe",
        "customer_email": "john@example.com",
        "customer_phone": "1234567890",
        "customer_type": "Natural Person",
        "customer_rating": "High",
        "company": "ABC Corp",
        "opportunity_id": "OP 761001",
        "location": "Nairobi",
        "age": "48.5", // Hours
        "status": "Closed Won",
        "source": "Referral",
        "campaign": "Q1 Campaign",
        "product_details": [
            {
                "product_type": "Product",
                "product_category": "Software",
                "product_name": "CRM Pro"
            }
        ],
        "services_details": [
            {
                "service_type": "Service",
                "service_category": "Consulting",
                "service_name": "Business Analysis"
            },
            {
                "service_type": "Service",
                "product_category": "Training",
                "service_name": "User Training"
            }
        ],
        "comments": "Priority client",
        "date_created": "2025-01-28 11:00:00", // Within last 24 hours
        "created_by": "Admin",
        "assigned_to": "David Chen",
        "Asset_Name": ["Asset1"],
        "opportunity_number": "1757582582319x366241707678761001"
    },
    {
        "customer_name": "Jane Smith",
        "customer_email": "jane@example.com",
        "customer_phone": "0987654321",
        "customer_type": "Natural Person",
        "customer_rating": "Medium",
        "company": "XYZ Ltd",
        "opportunity_id": "OP 761002",
        "location": "Mombasa",
        "age": "72.0", // Hours
        "status": "Lost",
        "source": "Webchat",
        "campaign": "",
        "product_details": [],
        "services_details": [
            {
                "service_type": "Service",
                "service_category": "Support",
                "service_name": "Premium Support"
            }
        ],
        "comments": "",
        "date_created": "2025-01-28 08:00:00", // Within last 24 hours
        "created_by": "Agent1",
        "assigned_to": "Maria Garcia",
        "Asset_Name": [],
        "opportunity_number": "1757582582319x366241707678761002"
    }
];

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    setupTabNavigation();
    updateOpportunityKPIs(sampleOpportunityData); // Update KPIs with sample data
    populateOpportunitiesTable(sampleOpportunityData); // Populate table with sample data
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
                    initializeOpportunitiesCharts(sampleOpportunityData); // Pass data when re-initializing
                }
            }, 100);
        });
    });
}

function initializeCharts() {
    initializeOpportunitiesCharts(sampleOpportunityData);
    initializeSalesOrdersCharts();
}

function initializeOpportunitiesCharts(data) {
    // --- Trend Chart ---
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx && data) {
        // Placeholder: Aggregate data by date (e.g., monthly count)
        // For demo, using static data
        const trendChart = new Chart(trendCtx.getContext('2d'), {
            type: 'line',
            data: { // Fixed: Added quotes around 'data'
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [ // Fixed: Added quotes around 'datasets'
                    {
                        label: 'Opportunity Count',
                        data: [8, 10, 7, 12, 9, 11, 8, 14, 13, 10, 12, 15], // Placeholder
                        borderColor: '#3498db', // Changed color
                        backgroundColor: 'rgba(52, 152, 219, 0.1)', // Changed color
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                    }
                ]
            },
            options: getTrendChartOptions('Opportunity Count')
        });
    }

    // --- Product Category Chart ---
    const productCategoryCtx = document.getElementById('productCategoryChart');
    if (productCategoryCtx && data) {
        const categoryCounts = {};
        data.forEach(opp => {
            opp.product_details.forEach(prod => {
                const cat = prod.product_category || 'Uncategorized';
                categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
            });
        });
        const labels = Object.keys(categoryCounts);
        const values = Object.values(categoryCounts);

        new Chart(productCategoryCtx.getContext('2d'), {
            type: 'doughnut',
            data: { // Fixed: Added quotes around 'data'
                labels: labels,
                datasets: [{ // Fixed: Added quotes around 'datasets'
                    data: values, // Fixed: Added missing 'data' key
                    backgroundColor: ['#e74c3c', '#f39c12', '#2ecc71', '#9b59b6', '#1abc9c', '#34495e'], // New color scheme
                    borderWidth: 1
                }]
            },
            options: getDoughnutChartOptions('Product Category Distribution')
        });
    }

    // --- Service Category Chart ---
    const serviceCategoryCtx = document.getElementById('serviceCategoryChart');
    if (serviceCategoryCtx && data) {
        const categoryCounts = {};
        data.forEach(opp => {
            opp.services_details.forEach(serv => {
                const cat = serv.service_category || 'Uncategorized';
                categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
            });
        });
        const labels = Object.keys(categoryCounts);
        const values = Object.values(categoryCounts);

        new Chart(serviceCategoryCtx.getContext('2d'), {
            type: 'doughnut',
            data: { // Fixed: Added quotes around 'data'
                labels: labels,
                datasets: [{ // Fixed: Added quotes around 'datasets'
                    data: values, // Fixed: Added missing 'data' key
                    backgroundColor: ['#e67e22', '#95a5a6', '#3498db', '#e74c3c', '#f1c40f', '#27ae60'], // New color scheme
                    borderWidth: 1
                }]
            },
            options: getDoughnutChartOptions('Service Category Distribution')
        });
    }

    // --- Services vs Products Comparison Chart ---
    const svpCtx = document.getElementById('servicesVsProductsChart');
    if (svpCtx && data) {
        const productsCount = data.filter(opp => opp.product_details.length > 0).length;
        const servicesCount = data.filter(opp => opp.services_details.length > 0).length;

        new Chart(svpCtx.getContext('2d'), {
            type: 'bar',
            data: { // Fixed: Added quotes around 'data'
                labels: ['Opportunities with Products', 'Opportunities with Services'],
                datasets: [{ // Fixed: Added quotes around 'datasets'
                    label: 'Count',
                    data: [productsCount, servicesCount], // Fixed: Added missing 'data' key
                    backgroundColor: ['#2ecc71', '#3498db'], // New colors
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Count' }
                    }
                }
            }
        });
    }

    // --- Stage Chart ---
    const stageCtx = document.getElementById('stageChart');
    if (stageCtx && data) {
        const stageCounts = {};
        data.forEach(opp => {
            const stage = opp.status || 'Unknown';
            stageCounts[stage] = (stageCounts[stage] || 0) + 1;
        });
        const labels = Object.keys(stageCounts);
        const values = Object.values(stageCounts);

        new Chart(stageCtx.getContext('2d'), {
            type: 'bar',
            data: { // Fixed: Added quotes around 'data'
                labels: labels,
                datasets: [{ // Fixed: Added quotes around 'datasets'
                    label: 'Opportunity Count',
                    data: values, // Fixed: Added missing 'data' key
                    backgroundColor: '#e74c3c', // New color
                    borderWidth: 0
                }]
            },
            options: getBarChartOptions('Status Stage', 'Opportunity Count')
        });
    }

    // --- Sales Person Chart ---
    const salesPersonCtx = document.getElementById('salesPersonChart');
    if (salesPersonCtx && data) {
        const personCounts = {};
        data.forEach(opp => {
            const person = opp.assigned_to || 'Unassigned';
            personCounts[person] = (personCounts[person] || 0) + 1;
        });
        // Convert object to array of [person, count] pairs and sort by count (descending)
        const sortedPersonEntries = Object.entries(personCounts).sort((a, b) => b[1] - a[1]); // Sort by count (index 1) descending
        const labels = sortedPersonEntries.map(item => item[0]); // Extract sorted labels
        const values = sortedPersonEntries.map(item => item[1]); // Extract sorted values

        new Chart(salesPersonCtx.getContext('2d'), {
            type: 'bar',
            data: { // Fixed: Added quotes around 'data'
                labels: labels,
                datasets: [{ // Fixed: Added quotes around 'datasets'
                    label: 'Opportunity Count',
                    data: values, // Fixed: Added missing 'data' key, Use sorted values
                    backgroundColor: '#9b59b6', // New color
                    borderWidth: 0
                }]
            },
            options: getBarChartOptions('Sales Person', 'Opportunity Count')
        });
    }

    // --- Top Products Chart ---
    const topProductsCtx = document.getElementById('topProductsChart');
    if (topProductsCtx && data) {
        const productCounts = {};
        data.forEach(opp => {
            opp.product_details.forEach(prod => {
                const name = prod.product_name || 'Unnamed Product';
                productCounts[name] = (productCounts[name] || 0) + 1;
            });
        });
        // Sort and get top N
        const sortedProducts = Object.entries(productCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const labels = sortedProducts.map(item => item[0]);
        const values = sortedProducts.map(item => item[1]);

        new Chart(topProductsCtx.getContext('2d'), {
            type: 'bar',
            data: { // Fixed: Added quotes around 'data'
                labels: labels,
                datasets: [{ // Fixed: Added quotes around 'datasets'
                    label: 'Occurrences',
                    data: values, // Fixed: Added missing 'data' key
                    backgroundColor: '#f39c12', // New color
                    borderWidth: 0
                }]
            },
            options: getBarChartOptions('Product Name', 'Occurrences')
        });
    }

    // --- Top Services Chart ---
    const topServicesCtx = document.getElementById('topServicesChart');
    if (topServicesCtx && data) {
        const serviceCounts = {};
        data.forEach(opp => {
            opp.services_details.forEach(serv => {
                const name = serv.service_name || 'Unnamed Service';
                serviceCounts[name] = (serviceCounts[name] || 0) + 1;
            });
        });
        // Sort and get top N
        const sortedServices = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const labels = sortedServices.map(item => item[0]);
        const values = sortedServices.map(item => item[1]);

        new Chart(topServicesCtx.getContext('2d'), {
            type: 'bar',
            data: { // Fixed: Added quotes around 'data'
                labels: labels,
                datasets: [{ // Fixed: Added quotes around 'datasets'
                    label: 'Occurrences',
                    data: values, // Fixed: Added missing 'data' key
                    backgroundColor: '#1abc9c', // New color
                    borderWidth: 0
                }]
            },
            options: getBarChartOptions('Service Name', 'Occurrences')
        });
    }
}

function initializeSalesOrdersCharts() {
    // Existing sales orders charts code...
    const ordersTrendCtx = document.getElementById('ordersTrendChart');
    if (ordersTrendCtx) {
        const ordersTrendChart = new Chart(ordersTrendCtx.getContext('2d'), {
            type: 'line',
            data: { // Fixed: Added quotes around 'data'
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [ // Fixed: Added quotes around 'datasets'
                    {
                        label: 'Order Value ($K)',
                        data: [42, 48, 55, 62, 58, 65, 72, 68, 75, 82], // Fixed: Added missing 'data' key
                        borderColor: '#4361ee',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Order Count',
                        data: [35, 38, 42, 45, 41, 47, 52, 49, 54, 60], // Fixed: Added missing 'data' key
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

    // Add other sales orders charts similarly if needed, or keep them as placeholders
    // ... (other charts for sales orders remain unchanged or as placeholders)
}

// --- KPI Update Function ---
function updateOpportunityKPIs(data) {
    if (!data) return;

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const last24Hours = new Date(now.getTime() - (24 * 60 * 60 * 1000));

    // Total Opportunities Created (YTD) - Uses YTD filter
    const totalYTD = data.filter(opp => new Date(opp.date_created) >= startOfYear).length;
    document.getElementById('totalOppYtd').innerHTML = `Count: <span class="count-total">${totalYTD}</span>, Value: <span class="value-na">N/A</span>`;
    document.getElementById('calcTotalOppYtd').textContent = totalYTD;

    // Active Opportunities (Last 24hrs) - Uses 24hr filter
    const active24Hrs = data.filter(opp => new Date(opp.date_created) >= last24Hours).length;
    document.getElementById('activeOpp24Hrs').innerHTML = `Count: <span class="count-active">${active24Hrs}</span>, Value: <span class="value-na">N/A</span>`;
    document.getElementById('calcActiveOpp24Hrs').textContent = active24Hrs;

    // Closure Rate (Last 24hrs) - Uses 24hr filter
    const total24Hrs = data.filter(opp => new Date(opp.date_created) >= last24Hours).length;
    const closedWon24Hrs = data.filter(opp => (opp.status.toLowerCase().includes('closed') && opp.status.toLowerCase().includes('won')) && new Date(opp.date_created) >= last24Hours).length;
    const closureRate24Hrs = total24Hrs > 0 ? ((closedWon24Hrs / total24Hrs) * 100).toFixed(2) : 0;
    document.getElementById('closureRate24Hrs').textContent = `${closureRate24Hrs}%`;
    document.getElementById('calcClosureRate24Hrs').textContent = closureRate24Hrs;

    // Lost Opportunities (Last 24hrs) - Uses 24hr filter
    const lost24Hrs = data.filter(opp => opp.status.toLowerCase().includes('lost') && new Date(opp.date_created) >= last24Hours).length;
    document.getElementById('lostOpp24Hrs').innerHTML = `Count: <span class="count-lost">${lost24Hrs}</span>, Value: <span class="value-na">N/A</span>`;
    document.getElementById('calcLostOpp24Hrs').textContent = lost24Hrs;

    // Won Opportunities (Last 24hrs) - Uses 24hr filter
    const won24Hrs = closedWon24Hrs; // Reuse the calculation from closure rate
    document.getElementById('wonOpp24Hrs').innerHTML = `Count: <span class="count-won">${won24Hrs}</span>, Value: <span class="value-na">N/A</span>`;
    document.getElementById('calcWonOpp24Hrs').textContent = won24Hrs;

    // Average Opportunity Age (YTD) - Removed as per request
    // Average Deal Size - Removed as per request
}

// --- Table Population Function ---
function populateOpportunitiesTable(data) {
    const tableBody = document.getElementById('opportunitiesTableBody');
    if (!tableBody || !data) return;

    tableBody.innerHTML = ''; // Clear existing rows

    data.slice(0, 5).forEach(opp => { // Show first 5
        const row = document.createElement('tr');

        const ageInDays = (parseFloat(opp.age) / 24).toFixed(1);

        row.innerHTML = `
            <td>${opp.opportunity_id}</td>
            <td>${opp.date_created.split(' ')[0]}</td>
            <td>${opp.customer_name}</td>
            <td>${opp.assigned_to}</td>
            <td><span class="status-badge status-stage-${opp.status.toLowerCase().replace(/\s+/g, '-') || 'unknown'}">${opp.status || 'N/A'}</span></td>
            <td>${ageInDays}</td>
            <td>${opp.product_details.length}</td>
            <td>${opp.services_details.length}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Chart configuration helper functions
function getTrendChartOptions(yAxisLabel, y1AxisLabel = null) {
    const scales = {
        x: { grid: { display: false } },
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: { display: true, text: yAxisLabel },
            grid: { drawOnChartArea: false }
        }
    };
    if (y1AxisLabel) {
        scales.y1 = {
            type: 'linear',
            display: true,
            position: 'right',
            title: { display: true, text: y1AxisLabel },
            grid: { drawOnChartArea: false }
        };
    }

    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: scales,
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

function getDoughnutChartOptions(title) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: !!title,
                text: title
            },
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

function getBarChartOptions(xLabel, yLabel) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: { display: true, text: xLabel }
            },
            y: {
                beginAtZero: true,
                title: { display: true, text: yLabel }
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
            // In a real app, this would trigger a data refetch and update
            // For demo, we just log
        });
    }
    
    if (ordersDateRange) {
        ordersDateRange.addEventListener('change', function() {
            console.log('Sales orders date range changed to:', this.value);
            // In a real app, this would trigger a data refetch and update
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

// Export functions for potential use in browser console
window.CRMAnalytics = {
    refreshData: function() { console.log('Simulating data refresh...'); }, // Placeholder
    switchTab: (tabName) => {
        const button = document.querySelector(`[data-tab="${tabName}"]`);
        if (button) button.click();
    },
    sampleData: sampleOpportunityData // Expose sample data for debugging
};