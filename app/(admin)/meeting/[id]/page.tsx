import React from 'react';

interface MeetingPageProps {
  params: {
    id: string;
  };
}

export default function MeetingPage({ params }: MeetingPageProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">会议详情</h1>
      <p>会议 ID: {params.id}</p>
      <p>这里将显示特定会议的详细信息。</p>
    </div>
  );
}
