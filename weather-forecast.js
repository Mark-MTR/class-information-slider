function loadForecastData() {
    // 从给定的 URL 进行数据加载
    fetch('https://mark-mtr.github.io/proxy-test/data/MESISarea_lg.js').then(response=>response.text()).then(scriptText=>{
        // 解析脚本内容
        const script = document.getElementById('forecast-script');
        script.textContent = '';
        script.textContent = scriptText;
        document.head.appendChild(script);

        // 获取显示区域
        const ForecastInfoDiv = document.getElementById('forecast-info');
        ForecastInfoDiv.innerHTML = '';

        // 访问 WF_lg 对象
        if (typeof WF_lg === 'undefined') {
            console.log('深圳气象局的访问可能出现故障。');
            const ForecastInfoDiv = document.getElementById('Forecast-info');
            const subForecastDiv = document.createElement('div');
            subForecastDiv.innerHTML = `<p>深圳气象局的访问可能出现故障。</p>`;
            ForecastInfoDiv.appendChild(subForecastDiv);
            return;
        }

        // 显示子信息
        WF_lg.hoursweather.slice(0, 12).forEach(hour => {
			const subForecastDiv = document.createElement('div');

            // 根据类型选择图标
            let logo = '';
			let color = '';
			console.log(hour.icon)
            if (hour.icon === '01.png') {
                logo = '100-fill';
				color = 'bright';
			} else if (hour.icon === '02.png') {
                logo = '102-fill';
				color = 'bright';
			} else if (hour.icon === '02_2.png') {
                logo = '101-fill';
				color = 'bright';
			} else if (hour.icon === '03.png') {
                logo = '104-fill';
				color = 'cloud';
			} else if (hour.icon === '04.png') {
                logo = '300-fill';
				color = 'rain';
			} else if (hour.icon === '05.png') {
                logo = '302-fill';
				color = 'rain';
			} else if ((hour.icon === '06.png')||(hour.icon === '08.png')) {
                logo = '306-fill';
				color = 'rain';
			} else if (hour.icon === '07.png') {
			    logo = '305-fill';
				color = 'rain';
            } else if (hour.icon === '09.png') {
			    logo = '307-fill';
				color = 'rain';
			} else if (hour.icon === '10.png') {
			    logo = '308-fill';
				color = 'rain';
			} else if (hour.icon === '11.png') {
			    logo = '150-fill';
				color = 'dark';
			} else if (hour.icon === '12.png') {
			    logo = '152-fill';
				color = 'dark';
			} else if (hour.icon === '12_2.png') {
			    logo = '151-fill';
				color = 'dark';
			} else if (hour.icon === '13.png') {
			    logo = '350-fill';
				color = 'rain';
			} else if (hour.icon === '14.png') {
			    logo = '503-fill';
				color = 'bright';
			} else if (hour.icon === '15.png') {
			    logo = '499-fill';
				color = 'cloud';
			} else if (hour.icon === '16.png') {
			    logo = '1601';
				color = 'red';
			} else if (hour.icon === '17.png') {
			    logo = '1607';
				color = 'blue';
			} else if (hour.icon === '18.png') {
			    logo = '408-fill';
				color = 'cloud';
			} else {
				logo = '999-fill';
				color = 'cloud';
			}

            subForecastDiv.innerHTML = `
			<div class="forecast" style="margin-bottom: 10px">
                <p class="alarm-date">${hour.forecasttime}</p>
				<p class="forecast-main"><span class="${color} qi-${logo}"></span>&nbsp;${hour.report}</p>
				<p class="alarm-date">${hour.maxt}℃&nbsp;${hour.wd}风&nbsp;${hour.wspeed}m/s</p>
				</div>
            </div>
			`;
            ForecastInfoDiv.appendChild(subForecastDiv);
        }
        );
    }
    ).catch(error=>{
        console.error('加载预报数据失败:', error);
        const ForecastInfoDiv = document.getElementById('Forecast-info');
        const subForecastDiv = document.createElement('div');
        subForecastDiv.innerHTML = `<p>加载预报数据失败。</p><br>`;
        ForecastInfoDiv.appendChild(subForecastDiv);
    }
    );
}

// 初次加载预警数据
 loadForecastData();

// 刷新预警信息
setInterval(loadForecastData, 60000);
