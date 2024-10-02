import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useUser } from '@clerk/nextjs'

// TODO: 添加自定义邮箱模版
export const EmailTemplate = ({ firstName }: { firstName: string }) => {

  const now = new Date();

  const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('zh-CN', { dateStyle: 'full' })).format(now);


  return (
    <h1>hello</h1>
  );
}
