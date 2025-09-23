import { useState, useEffect } from 'react';

export default function ThreeDaysDateApp() {
  const [dates, setDates] = useState({
    today: '',
    tomorrow: '',
    dayAfterTomorrow: ''
  });
  const [copyMessage, setCopyMessage] = useState('');

  const formatDate = (daysOffset) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const weekday = weekdays[date.getDay()];
    
    return `${month}/${day}（${weekday}）`;
  };

  const copyDate = async (dateText, label) => {
    try {
      await navigator.clipboard.writeText(dateText);
      setCopyMessage(`${label}をコピーしました！`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  useEffect(() => {
    setDates({
      today: formatDate(0),
      tomorrow: formatDate(1),
      dayAfterTomorrow: formatDate(2)
    });
  }, []);

  return (
    <div className="date-formatter-root">
      <div className="date-formatter-container">
        <h1 className="date-formatter-title">
          📅 日記の日付用フォーマット
        </h1>
        <div className="date-formatter-list">
          {/* 今日 */}
          <div className="date-formatter-item today">
            <div className="date-formatter-row">
              <div>
                <div className="date-formatter-label">今日</div>
                <div className="date-formatter-date">{dates.today}</div>
              </div>
              <button
                onClick={() => copyDate(dates.today, '今日の日付')}
                className="date-formatter-btn today"
              >
                📋
              </button>
            </div>
          </div>
          {/* 明日 */}
          <div className="date-formatter-item tomorrow">
            <div className="date-formatter-row">
              <div>
                <div className="date-formatter-label">明日</div>
                <div className="date-formatter-date">{dates.tomorrow}</div>
              </div>
              <button
                onClick={() => copyDate(dates.tomorrow, '明日の日付')}
                className="date-formatter-btn tomorrow"
              >
                📋
              </button>
            </div>
          </div>
          {/* 明後日 */}
          <div className="date-formatter-item dayafter">
            <div className="date-formatter-row">
              <div>
                <div className="date-formatter-label">明後日</div>
                <div className="date-formatter-date">{dates.dayAfterTomorrow}</div>
              </div>
              <button
                onClick={() => copyDate(dates.dayAfterTomorrow, '明後日の日付')}
                className="date-formatter-btn dayafter"
              >
                📋
              </button>
            </div>
          </div>
        </div>
        {copyMessage && (
          <div className="date-formatter-message">
            {copyMessage}
          </div>
        )}
        
        {/* GitHub Repository Link */}
        <div className="github-link-container">
          <a 
            href="https://github.com/twtwtw-gj/diary-date-formatter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </div>
  );
}