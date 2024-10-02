"use client"
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import React from 'react'
import toast from 'react-hot-toast';

export const PersonnalCard = ({
    startRoom, meetingLink, meetingId, user
}: {
    startRoom: () => void; meetingLink: string, meetingId: string, user: any
}) => {

    const copy = (code: string) => {
        if (code) {
            copyToClipboard(code);
            return;
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                toast("链接已复制");
            })
            .catch(() => {
                toast("错误");
            });
    };

    return (

        <div className='mt-4 flex flex-col gap-8'>
            <div className='flex flex-col gap-8 '>
                <ul className='flex flex-col gap-4 w-[320px] md:w-full overflow-auto'>
                    <li className='flex gap-8'>
                        <span className='text-[#C9DDFF]'>标题:</span>
                        <span className='font-bold text-md capitalize'>{user.username} 的个人房间</span>
                    </li>
                    <li className='flex gap-8'>
                        <span className='text-[#C9DDFF]'>个人ID:</span>
                        <span className=''>{meetingId}</span>
                    </li>

                    <li className='flex gap-8'>
                        <span className='text-[#C9DDFF]'>邀请链接:</span>
                        <span className="text-primary-400 font-bold" title='复制'>{meetingLink}</span>
                        <Copy onClick={() => copy(meetingLink)} className='cursor-pointer' />
                    </li>
                </ul>

                <div className="inline-flex flex-wrap gap-4 text-white mt-12 max-w-xs">
                    <Button onClick={startRoom} variant="default" className="flex-1 capitalize bg-primary-400 hover:bg-white hover:text-black">
                        开始
                    </Button>
                    <Button onClick={() => copy(meetingLink)} variant="secondary"
                        className="flex-1 capitalize px-4 w-fit flex gap-4 hover:bg-white hover:text-black" size="icon">
                        <Copy />
                        <span>复制链接</span>
                    </Button>
                </div>

            </div>

        </div>
    )
}