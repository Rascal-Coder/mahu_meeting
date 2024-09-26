import { cn } from '@/lib/utils';
import React from 'react'

export const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn('container h-full !w-full !max-w-full', className)}>{children}</div>
  )
}
