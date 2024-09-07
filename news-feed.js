function loadNewsData() {
    fetch('https://www.chinanews.com.cn/rss/scroll-news.xml').then(response=>response.text()).then(str=>new window.DOMParser().parseFromString(str, 'text/xml')).then(data=>{
        // 获取显示区域
        const newsInfoDiv = document.getElementById('news-info-1');
        newsInfoDiv.innerHTML = '';
		
		const items = data.querySelectorAll('item');
        items.forEach(item=>{
			const subNewsDiv = document.createElement('div');
			const title = item.querySelector('title').textContent;
			subNewsDiv.innerHTML = `<p>${title}</p>`;
			subNewsDiv.classList.add('news')
            newsInfoDiv.appendChild(subNewsDiv);
        }
        );
    }
    ).catch(
		console.error('加载新闻数据失败:', error);
        const alarmInfoDiv = document.getElementById('news-info-1');
        const subAlarmDiv = document.createElement('div');
        subAlarmDiv.innerHTML = `<p>加载新闻数据失败。</p><br>`;
        alarmInfoDiv.appendChild(subAlarmDiv);
	);
	fetch('https://www.chinanews.com.cn/rss/importnews.xml').then(response=>response.text()).then(str=>new window.DOMParser().parseFromString(str, 'text/xml')).then(data=>{
        // 获取显示区域
        const newsInfoDiv = document.getElementById('news-info-2');
        newsInfoDiv.innerHTML = '';
		
		const items = data.querySelectorAll('item');
        items.forEach(item=>{
			const subNewsDiv = document.createElement('div');
			const title = item.querySelector('title').textContent;
			subNewsDiv.innerHTML = `<p>${title}</p>`;
			subNewsDiv.classList.add('news')
            newsInfoDiv.appendChild(subNewsDiv);
        }
        );
    }
    ).catch(
		console.error('加载新闻数据失败:', error);
        const alarmInfoDiv = document.getElementById('news-info-2');
        const subAlarmDiv = document.createElement('div');
        subAlarmDiv.innerHTML = `<p>加载新闻数据失败。</p><br>`;
        alarmInfoDiv.appendChild(subAlarmDiv););
}

// 初次加载预警数据
loadNewsData();

// 刷新预警信息
setInterval(loadNewsData, 600000);
