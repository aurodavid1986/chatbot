// 公司列表數據及對應的 chatbot URL
const companies = [
    {
        name: 'Okuma實能釣具_bot',
        url: 'https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/02/06/07/20250206073451-QHDFSNPW.json'
    },
    {
        name: '瑞山林台北中和飯店_bot',
        url: 'https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/02/10/07/20250210073308-EX59Z6VY.json'
    }
];

// 隱藏 Botpress Logo 的函數
function hideBotpressLogo() {
    const iframe = document.getElementById('chatbot-frame');
    try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const poweredByLink = iframeDocument.querySelector('.bpComposerPoweredBy');
        if (poweredByLink) {
            poweredByLink.style.display = 'none';
        }
    } catch (e) {
        console.log('Unable to access iframe content');
    }
}

function handleInitialMask() {
    const initialMask = document.getElementById('initialMask');
    const iframe = document.getElementById('chatbot-frame');

    // 監控 iframe 內容變化
    const observer = new MutationObserver((mutations) => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const chatContent = iframeDocument.querySelector('.chat-content');
        
        if (chatContent && chatContent.children.length > 0) {
            // 當有聊天內容時，隱藏初始遮罩
            initialMask.style.opacity = '0';
            // 一段時間後移除元素
            setTimeout(() => {
                initialMask.style.display = 'none';
            }, 300);
            observer.disconnect();
        }
    });

    try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        observer.observe(iframeDocument.body, {
            childList: true,
            subtree: true
        });
    } catch (e) {
        console.log('Unable to access iframe content');
    }
}

// 修改 selectCompany 函數
function selectCompany(company) {
    console.log('Selected company:', company.name);
    const chatbotFrame = document.getElementById('chatbot-frame');
    const initialMask = document.getElementById('initialMask');
    
    // 重置遮罩狀態
    initialMask.style.opacity = '1';
    initialMask.style.display = 'block';
    
    chatbotFrame.src = company.url;
    
    // iframe 加載完成後設置監控
    chatbotFrame.onload = function() {
        handleInitialMask();
    };
    
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

// 當頁面加載完成時初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeCompanyList();
    // 初始化時選中第一個公司
    selectCompany(companies[0]);
});
