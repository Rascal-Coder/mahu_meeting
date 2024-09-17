import React from 'react';

export default function MeetingPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">会议中心</h1>
      <p>这里是会议中心的主页面。您可以在这里查看所有会议或创建新会议。</p>
      <ul className="mt-4">
        <li>
          <a href="/admin/meeting/upcoming" className="text-blue-500 hover:underline">即将举行的会议</a>
        </li>
        <li>
          <a href="/admin/meeting/previous" className="text-blue-500 hover:underline">历史会议</a>
        </li>
        <li>
          <a href="/admin/meeting/recordings" className="text-blue-500 hover:underline">会议录像</a>
        </li>
      </ul>
    </div>
  );
}
