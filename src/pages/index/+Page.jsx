import { useState, useEffect } from 'react';
import './Page.css';
const COPY_ERROR = 'コピーできませんでした';
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

export default function DairyDateFormatter() {
  const [holidays, setHolidays] = useState({});

  const getHolidayName = (date) => {
    const key = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');
    return holidays[key] ?? null; // 祝日名 or null
  };

  const now = new Date();
  const formatDate = (daysOffset) => {
    const date = new Date(now);
    date.setDate(date.getDate() + daysOffset);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekday = weekdays[date.getDay()];
    const holidayName = getHolidayName(date);

    return holidayName
      ? `${month}/${day}（${weekday}・祝）`
      : `${month}/${day}（${weekday}）`;
  };

  const getDateInfo = (daysOffset) => {
    const date = new Date(now);
    date.setDate(date.getDate() + daysOffset);
    return {
      formatted: formatDate(daysOffset),
      holidayName: getHolidayName(date)
    };
  };

  const [dates, setDates] = useState({
    today: { formatted: '', holidayName: null },
    tomorrow: { formatted: '', holidayName: null },
    dayAfterTomorrow: { formatted: '', holidayName: null },
  });

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/holidays');
      const json = await res.json();
      setHolidays(json);
    };
    load();
  }, []);

  useEffect(() => {
    setDates({
      today: getDateInfo(0),
      tomorrow: getDateInfo(1),
      dayAfterTomorrow: getDateInfo(2),
    });
  }, [holidays]);

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

  const DateCard = ({ label, info, onCopy, onCopyHoliday, colorScheme }) => {
    const { bg, border, btn, btnHover } = colorScheme;
    return (
      <div className={`${bg} p-4 rounded-lg border-l-4 ${border}`}>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="text-sm text-gray-600 mb-1">{label}</div>
            <div className="text-xl font-bold text-gray-800">{info.formatted}</div>
            {info.holidayName && (
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-medium text-violet-700 bg-violet-100 border border-violet-200 rounded-md px-2 py-0.5">
                  {info.holidayName}
                </span>
                <button
                  onClick={onCopyHoliday}
                  className="bg-violet-400 hover:bg-violet-500 text-white px-2 py-1 rounded text-xs transition-colors"
                  title="祝日名をコピー"
                >
                  📋
                </button>
              </div>
            )}
          </div>
          <button
            onClick={onCopy}
            className={`${btn} ${btnHover} text-white px-3 py-2 rounded text-sm transition-colors`}
          >
            📋
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-cyan-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📅 日記の日付用フォーマット
        </h1>

        <div className="space-y-4 mb-6">
          <DateCard
            label="今日"
            info={dates.today}
            onCopy={() => copyDate(dates.today.formatted, '今日の日付')}
            onCopyHoliday={() => copyDate(dates.today.holidayName, '祝日名')}
            colorScheme={{ bg: 'bg-gradient-to-r from-blue-50 to-blue-100', border: 'border-blue-500', btn: 'bg-blue-500', btnHover: 'hover:bg-blue-600' }}
          />
          <DateCard
            label="明日"
            info={dates.tomorrow}
            onCopy={() => copyDate(dates.tomorrow.formatted, '明日の日付')}
            onCopyHoliday={() => copyDate(dates.tomorrow.holidayName, '祝日名')}
            colorScheme={{ bg: 'bg-gradient-to-r from-purple-50 to-purple-100', border: 'border-purple-500', btn: 'bg-purple-500', btnHover: 'hover:bg-purple-600' }}
          />
          <DateCard
            label="明後日"
            info={dates.dayAfterTomorrow}
            onCopy={() => copyDate(dates.dayAfterTomorrow.formatted, '明後日の日付')}
            onCopyHoliday={() => copyDate(dates.dayAfterTomorrow.holidayName, '祝日名')}
            colorScheme={{ bg: 'bg-gradient-to-r from-green-50 to-green-100', border: 'border-green-500', btn: 'bg-green-500', btnHover: 'hover:bg-green-600' }}
          />
        </div>

        {copyMessage && (
          <div className={`mt-4 text-center font-medium animate-bounce ${copyMessage === COPY_ERROR ? 'text-red-600' : 'text-green-600'}`}>
            {copyMessage}
          </div>
        )}

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
