// 公司列表數據及對應的 chatbot URL
const companies = [
    {
        name: 'Ｏ企業案例_bot',
        url: 'https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/02/06/07/20250206073451-QHDFSNPW.json'
    },
    {
        name: '著名飯店案例_bot',
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
        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            // 修改選擇器，檢查是否有對話內容
            const messages = iframeDocument.querySelectorAll('.bpw-chat-bubble');
            
            if (messages.length > 0) {
                // 當有對話內容時，隱藏初始遮罩
                initialMask.style.opacity = '0';
                setTimeout(() => {
                    initialMask.style.display = 'none';
                }, 300);
                observer.disconnect();
            }
        } catch (e) {
            console.log('Unable to access iframe content:', e);
        }
    });

    try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        observer.observe(iframeDocument.body, {
            childList: true,
            subtree: true,
            attributes: true,  // 添加屬性變化監控
            characterData: true  // 添加文本變化監控
        });
    } catch (e) {
        console.log('Unable to setup observer:', e);
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
