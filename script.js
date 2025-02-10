// 公司列表數據
const companies = [
    'Okuma寶熊釣具_chatbot',
    '瓏山林台北中和飯店_chatbot'
    
];

// 初始化公司列表
function initializeCompanyList() {
    const companyList = document.getElementById('company-list');
    
    companies.forEach(company => {
        const button = document.createElement('button');
        button.className = 'company-button';
        button.textContent = company;
        button.addEventListener('click', () => selectCompany(company));
        companyList.appendChild(button);
    });
}

// 選擇公司的處理函數
function selectCompany(company) {
    console.log('Selected company:', company);
    // 這裡可以添加選擇公司後的邏輯
}

// 當頁面加載完成時初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeCompanyList();
});
