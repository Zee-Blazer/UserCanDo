import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

export const sendMeetingInviteRequest = async (
  sendFn: (arg: any) => Promise<any>,
  listingId: string,
  investorId: string,
  payload: { platform: 'google' | 'zoom'; date: string; time: string; link: string; agenda: string }
) => {
  const dt = new Date(`${payload.date}T${payload.time}`);
  const meeting_time = dayjs(dt).format('dddd Do MMMM, YYYY. h:mmA');

  const body = {
    meeting_url: payload.link,
    meeting_time,
    agenda: payload.agenda,
  };
  return await (sendFn as any)({ listing_id: listingId, investor_id: investorId, body }).unwrap();
};

export default sendMeetingInviteRequest;
