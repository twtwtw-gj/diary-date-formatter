import { useState, useEffect } from 'react';
import './Page.css';
const COPY_ERROR = 'コピーできませんでした';
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

export default function DairyDateFormatter() {
  const now = new Date();
  const formatDate = (daysOffset) => {
    const date = new Date(now);
    date.setDate(date.getDate() + daysOffset);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const weekday = weekdays[date.getDay()];

    return `${month}/${day}（${weekday}）`;
  };

  const [dates, setDates] = useState({
    today: '',
    tomorrow: '',
    dayAfterTomorrow: '',
  });

  useEffect(() => {
    setDates(dates => ({
      ...dates,
      today: formatDate(0),
      tomorrow: formatDate(1),
      dayAfterTomorrow: formatDate(2),
    }));
  }, []);

  const { today, tomorrow, dayAfterTomorrow } = dates;

  const [copyMessage, setCopyMessage] = useState('');

  const copyDate = async (dateText, label) => {
    try {
      await navigator.clipboard.writeText(dateText);
      setCopyMessage(`${label}をコピーしました！`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
      setCopyMessage(COPY_ERROR);
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-cyan-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📅 日記の日付用フォーマット
        </h1>

        <div className="space-y-4 mb-6">
          {/* 今日 */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600 mb-1">今日</div>
                <div className="text-xl font-bold text-gray-800">{today}</div>
              </div>
              <button
                onClick={() => copyDate(today, '今日の日付')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                📋
              </button>
            </div>
          </div>

          {/* 明日 */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600 mb-1">明日</div>
                <div className="text-xl font-bold text-gray-800">{tomorrow}</div>
              </div>
              <button
                onClick={() => copyDate(tomorrow, '明日の日付')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                📋
              </button>
            </div>
          </div>

          {/* 明後日 */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600 mb-1">明後日</div>
                <div className="text-xl font-bold text-gray-800">{dayAfterTomorrow}</div>
              </div>
              <button
                onClick={() => copyDate(dayAfterTomorrow, '明後日の日付')}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                📋
              </button>
            </div>
          </div>
        </div>

        {copyMessage && (
          <div
            className={`mt-4 text-center font-medium animate-bounce ${
              copyMessage === COPY_ERROR
                ? 'text-red-600'
                : 'text-green-600'
            }`}
          >
            {copyMessage}
          </div>
        )}

        {/* GitHub Repository Link */}
        <hr className="my-6 border-t border-gray-300" />
        <div className="github-link-container text-center">
          <a
            href="https://github.com/twtwtw-gj/diary-date-formatter"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link text-blue-600 hover:underline font-semibold"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </div>
  );
}
