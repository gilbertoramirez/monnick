export const EVENT = {
  name: 'Los XVIII de Monnick',
  birthday: 'Monnick',
  date: new Date('2026-12-04T21:30:00-06:00'),
  endDate: new Date('2026-12-05T03:30:00-06:00'),
  dateDisplay: 'Viernes 4 de Diciembre, 2026',
  timeDisplay: '9:30 PM',
  venue: 'Fuente Portal de las Flores',
  address: 'Fuente Portal de las Flores 72, Lomas de las Palmas, Huixquilucan',
  addressShort: 'Fuente Portal de las Flores 72',
  cp: '',
  mapsUrl: 'https://maps.google.com/?q=Fuente+Portal+de+las+Flores+72',
  wazeUrl: 'https://waze.com/ul?q=Fuente+Portal+de+las+Flores+72&navigate=yes',
  photoAlbum: 'https://photos.app.goo.gl/fiesta18monnick',
  hashtag: '#MonnickXVIII',
  rsvpDeadline: '1 de diciembre',
  phone: '56 1052 5822',
} as const;

export function getGoogleCalendarUrl() {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  return (
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent(EVENT.name) +
    '&dates=' + fmt(EVENT.date) + '/' + fmt(EVENT.endDate) +
    '&location=' + encodeURIComponent(EVENT.venue + ', ' + EVENT.address) +
    '&details=' + encodeURIComponent(
      `Fiesta de 18 años de ${EVENT.birthday}! Dress code: Elegante casual. ${EVENT.hashtag}`
    )
  );
}

export function generateICS() {
  const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
  const fmt = (d: Date) =>
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) + 'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MonnickXVIII//EN',
    'BEGIN:VEVENT',
    'DTSTART:' + fmt(EVENT.date),
    'DTEND:' + fmt(EVENT.endDate),
    'SUMMARY:' + EVENT.name,
    'LOCATION:' + EVENT.venue + '\\, ' + EVENT.address,
    'DESCRIPTION:Fiesta de 18 de Monnick! Dress code: Elegante casual. ' + EVENT.hashtag,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
