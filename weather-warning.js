function loadAlarmData() {
    // 从给定的 URL 进行数据加载
    fetch('https://mark-mtr.github.io/proxy-test/data/szAlarm.js').then(response=>response.text()).then(scriptContent=>{
        // 解析脚本内容
        const script = document.getElementById('alarm-script');
        script.textContent = '';
        script.textContent = scriptContent;
        document.head.appendChild(script);

        // 获取显示区域
        const alarmInfoDiv = document.getElementById('alarm-info');
        alarmInfoDiv.innerHTML = '';

        // 访问 SZ121_AlarmInfo 对象
        if (typeof SZ121_AlarmInfo === 'undefined') {
            console.log('深圳气象局的访问可能出现故障。');
            const alarmInfoDiv = document.getElementById('alarm-info');
            const subAlarmDiv = document.createElement('div');
            subAlarmDiv.innerHTML = `<p>深圳气象局的预警访问可能出现故障。</p>`;
            alarmInfoDiv.appendChild(subAlarmDiv);
            return;
        }

        if (!SZ121_AlarmInfo.subAlarm || SZ121_AlarmInfo.subAlarm.length === 0) {
            const subAlarmDiv = document.createElement('div');
            subAlarmDiv.innerHTML = `<p>现在没有生效中的预警。</p>`;
            alarmInfoDiv.appendChild(subAlarmDiv);
            return;
        } else {}

        // 显示子预警信息
        SZ121_AlarmInfo.subAlarm.forEach(alarm=>{
            const subAlarmDiv = document.createElement('div');

            // 根据预警类型选择图标
            let alarmClass = '';
            if (alarm.alarmType === '台风') {
                alarmClass = '1001';
            } else if (alarm.alarmType === '暴雨') {
                alarmClass = '1003';
            } else if (alarm.alarmType === '雷雨大风') {
                alarmClass = '1020';
            } else if (alarm.alarmType === '高温') {
                alarmClass = '1601';
            } else if (alarm.alarmType === '寒冷') {
                alarmClass = '1607';
            } else if (alarm.alarmType === '大雾') {
                alarmClass = '2003';
            } else if (alarm.alarmType === '强季风') {
                alarmClass = '2001';
            } else if (alarm.alarmType === '冰雹') {
                alarmClass = '1015';
            } else if (alarm.alarmType === '灰霾') {
                alarmClass = '502';
            } else if (alarm.alarmType === '森林火险') {
                alarmClass = '1605';
            } else if (alarm.alarmType === '地质灾害') {
                alarmClass = '1037';
            } else if (alarm.alarmType === '雷电') {
                alarmClass = '1014';
            } else if (alarm.alarmType === '道路结冰') {
                alarmClass = '1057';
            } else {
                alarmClass = '9999';
                // 防止出现没有的预警
            }

			let tempColor = '';
			if (alarm.alarmType === '雷电') {
                tempColor = '黄色';
            } else if (alarm.alarmType === '干旱') {
                tempColor = '黄色';
			} else if (alarm.alarmType === '灰霾') {
                tempColor = '黄色';
			}


            // 停课信号
            const conditions = [{
                alarmType: '暴雨',
                alarmColor: '红色'
            }, {
                alarmType: '台风',
                alarmColor: '黄色'
            }, {
                alarmType: '台风',
                alarmColor: '橙色'
            }, {
                alarmType: '台风',
                alarmColor: '红色'
            }, {
                alarmType: '强季风',
                alarmColor: '红色'
            }, ];

            let level = '';
            level = conditions.some(condition=>alarm.alarmType === condition.alarmType && alarm.alarmColor === condition.alarmColor) ? 'tingke' : '';

            subAlarmDiv.innerHTML = `<div class="${tempColor} ${alarm.alarmColor} ${level}" style="margin-bottom: 10px">
                <p><span class="qi-${alarmClass}"></span>&nbsp;${alarm.alarmType}${alarm.alarmColor}预警</p>
                <p class="alarm-date">${alarm.date}</p>
                <p class="alarm-area">发表区域：${alarm.alarmArea}</p>
                </div>`;
            alarmInfoDiv.appendChild(subAlarmDiv);
        }
        );
    }
    ).catch(error=>{
        console.error('加载预警信号数据失败:', error);
        const alarmInfoDiv = document.getElementById('alarm-info');
        const subAlarmDiv = document.createElement('div');
        subAlarmDiv.innerHTML = `<p>加载预警信号数据失败。</p><br>`;
        alarmInfoDiv.appendChild(subAlarmDiv);
    }
    );
}

// 初次加载预警数据
loadAlarmData();

// 刷新预警信息
setInterval(loadAlarmData, 60000);
