"use client";

import GeneralModal from '@/components/admin/user-management/general-modal';
import SpannedBtn, { SpannedBtnConfig } from '@/components/business/home/spanned-btn';
import FormInput from '@/components/General/form/formInput';
import FormTextArea from '@/components/General/form/textArea';
import React, { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSend: (payload: { platform: 'google' | 'zoom'; date: string; time: string; link: string; agenda: string }) => Promise<any>;
}

const ScheduleMeetingModal: React.FC<Props> = ({ open, onClose, onSend }) => {
  const [platform, setPlatform] = useState<'google' | 'zoom'>('google');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [link, setLink] = useState('');
  const [agenda, setAgenda] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  useEffect(() => {
    // reset when opened
    if (open) {
      setPlatform('google');
      setDate('');
      setTime('');
      setLink('');
      setAgenda('');
    }
  }, [open]);

  const handleSend = async () => {
    if (!date || !time || !link || !agenda) return;

    setLoading(true);
    try {
      await onSend({ platform, date, time, link, agenda });
    } finally {
      setLoading(false);
    }
  };

  const sendButtons: SpannedBtnConfig[] = [
    {
      text: loading ? 'Sending...' : 'Send Invite',
      type: 'grass',
      loading,
      inactive: loading || !date || !time || !link || !agenda,
      func: () => {
        void handleSend();
      },
    },
  ];

  return (
    <GeneralModal open={open} onClose={onClose} title="Schedule Meeting" className="w-full p-0">
      <div className="p-2 md:p-4 max-w-2xl mx-auto">
        <h1 className='text-xl font-bold mb-2'>Schedule a meeting</h1>
        <p className="text-sm text-gray-600 mb-4">Choose a platform, pick a date & time (no past dates) and include a meeting link.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={() => setPlatform('google')}
            className={`text-left p-3 rounded-lg border ${platform === 'google' ? 'border-[#33CC33] bg-[#33CC331A] text-[#33CC33]' : 'border-gray-200 bg-white'} cursor-pointer`}
          >
            <div className="font-medium">Google Meet</div>
            <div className="text-xs text-gray-500">Create a Google Meet link for the invite</div>
          </button>

          <button
            type="button"
            onClick={() => setPlatform('zoom')}
            className={`text-left p-3 rounded-lg border ${platform === 'zoom' ? 'border-[#0b69ff] bg-[#0b69ff1a] text-[#0b69ff]' : 'border-gray-200 bg-white'} cursor-pointer`}
          >
            <div className="font-medium">Zoom</div>
            <div className="text-xs text-gray-500">Use a Zoom meeting link for the invite</div>
          </button>
        </div>

        <div className="flex gap-3 items-center mb-4">
          <div className="w-1/2">
            <FormInput label="Date" type="date" value={date} onChange={(e: any) => setDate(e.target.value)} min={minDate as any} containerClassName="w-full" />
          </div>
          <div className="w-1/2">
            <FormInput label="Time" type="time" value={time} onChange={(e: any) => setTime(e.target.value)} containerClassName="w-full" />
          </div>
        </div>

        <FormInput label="Meeting Link" type="text" value={link} onChange={(e: any) => setLink(e.target.value)} placeholder="https://meet.google.com/fix-shdf-spi" containerClassName="w-full mb-4" />

        <FormTextArea label="Agenda" value={agenda} onChange={(e: any) => setAgenda(e.target.value)} placeholder="Add a short agenda for the meeting (optional)" />

        <div className="mt-3.5">
          <SpannedBtn buttons={sendButtons} className="w-full" />
        </div>
      </div>
    </GeneralModal>
  );
};

export default ScheduleMeetingModal;
