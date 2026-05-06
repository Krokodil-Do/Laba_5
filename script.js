document.addEventListener('DOMContentLoaded', () => {

    const userInfo = navigator.userAgent;
    localStorage.setItem('systemInfo', userInfo);
    
    const footer = document.querySelector('footer');
    if (footer) {
        const infoElement = document.createElement('p');
        infoElement.style.fontSize = '12px';
        infoElement.style.color = '#777'; 
        infoElement.textContent = "Система та браузер: " + localStorage.getItem('systemInfo');
        footer.appendChild(infoElement);
    }


    function fetchComments() {
        const variantNumber = 10; 
        const url = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;

        fetch(url)
            .then(response => response.json())
            .then(comments => {
                const container = document.getElementById('comments-container');
                if (container) {
                    container.innerHTML = ''; 

                    comments.forEach(comment => {
                        const commentBlock = document.createElement('div');
                        commentBlock.style.marginBottom = '15px';
                        commentBlock.style.padding = '10px';
                        commentBlock.style.backgroundColor = '#f9f9f9';
                        commentBlock.style.borderLeft = '3px solid #5C54A4'; 

                        const author = document.createElement('strong');
                        author.textContent = comment.email; 

                        const body = document.createElement('p');
                        body.textContent = comment.body;
                        body.style.margin = '5px 0 0 0';
                        body.style.fontSize = '0.9em';

                        commentBlock.appendChild(author);
                        commentBlock.appendChild(body);
                        container.appendChild(commentBlock);
                    });
                }
            })
            .catch(error => {
                console.error('Помилка при отриманні даних:', error);
                const container = document.getElementById('comments-container');
                if (container) {
                    container.innerHTML = '<p style="color: red;">Не вдалося завантажити відгуки.</p>';
                }
            });
    }
    
    fetchComments(); 

    const modal = document.getElementById('feedback-modal');
    const closeBtn = document.querySelector('.close-btn');

    function showModal() {
        if (modal) {
            modal.style.display = 'block';
        }
    }
 
    setTimeout(showModal, 60000);

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = '☀️ Світла тема';
        } else {
            body.classList.remove('dark-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = '🌙 Темна тема';
        }
    }

    const currentHour = new Date().getHours();
    const isNightTime = currentHour < 7 || currentHour >= 21;
    
    setTheme(isNightTime); 

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyDark = body.classList.contains('dark-theme');
            setTheme(!isCurrentlyDark);
        });
    }

});
