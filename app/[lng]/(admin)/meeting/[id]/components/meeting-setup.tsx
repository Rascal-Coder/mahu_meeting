'use client';
import { Col } from '@/components/ui/col';
import { Heading } from '@/components/ui/heading'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  // useCallStateHooks,
} from '@stream-io/video-react-sdk';


export const MeetingSetup = ({setSetupCompleted}: {setSetupCompleted: (value: boolean) => void}) => {

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  // const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  // const callStartsAt = useCallStartsAt();
  // const callEndedAt = useCallEndedAt();
  // const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
  // const callHasEnded = !!callEndedAt;

  const call = useCall();
  
  useEffect(() => {
    if (isMicCamToggled) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggled, call]);

  return (
    <>
        <Col className='items-center justify-center h-full gap-8'>
          <Heading title="会议设置"/>
          <VideoPreview/>

          <div className="flex items-center space-x-8">
            <Checkbox checked={isMicCamToggled} onCheckedChange={() => setIsMicCamToggled(!isMicCamToggled)} id="terms" />
            <Label htmlFor="terms" className='text-xl cursor-pointer'>禁用摄像头和麦克风</Label>
            <div className='w-10 h-10'>
              <DeviceSettings/>
            </div>
          </div> 

          <Button variant="default" className='capitalize bg-primary-400 text-white' onClick={ () => {
            call?.join();  setSetupCompleted(true) ;
          }}>加入会议</Button>
                    
        </Col>
    </>
  )
}
