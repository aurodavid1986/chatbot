// 公司列表數據及對應的 chatbot URL
const companies = [
    {
        name: 'Okuma實能釣具_chatbot',
        url: 'https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/02/06/07/20250206073451-QHDFSNPW.json'
    },
    {
        name: '瑞山林台北中和飯店_chatbot',
        url: 'https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/02/10/07/20250210073308-EX59Z6VY.json'
    }
];

// 初始化公司列表
function initializeCompanyList() {
    const companyList = document.getElementById('company-list');
    
    companies.forEach(company => {
        const button = document.createElement('button');
        button.className = 'company-button';
        button.textContent = company.name;
        button.addEventListener('click', () => selectCompany(company));
        companyList.appendChild(button);
    });
}

// 選擇公司的處理函數
function selectCompany(company) {
    console.log('Selected company:', company.name);
    // 更新 iframe 的 src
    const chatbotFrame = document.getElementById('chatbot-frame');
    chatbotFrame.src = company.url;
    
    // 更新按鈕樣式
    const buttons = document.querySelectorAll('.company-button');
    buttons.forEach(button => {
        if (button.textContent === company.name) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

// 當頁面加載完成時初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeCompanyList();
    // 初始化時選中第一個公司
    selectCompany(companies[0]);
});
