export const EVENT = {
  name: 'Los XVIII de Monnick',
  birthday: 'Monnick',
  date: new Date('2026-09-19T20:00:00-06:00'),
  endDate: new Date('2026-09-20T02:00:00-06:00'),
  dateDisplay: 'Sábado 19 de Septiembre, 2026',
  timeDisplay: '8:00 PM',
  venue: 'Jardín La Fontana',
  address: 'Av. Reforma 1800, Col. Centro, CDMX',
  addressShort: 'Av. Reforma 1800',
  cp: 'CP 06000',
  mapsUrl: 'https://maps.google.com/?q=Jardin+La+Fontana+Reforma+1800+CDMX',
  wazeUrl: 'https://waze.com/ul?q=Jardin+La+Fontana+Reforma+1800+CDMX&navigate=yes',
  photoAlbum: 'https://photos.app.goo.gl/fiesta18monnick',
  hashtag: '#MonnickXVIII',
  rsvpDeadline: '12 de septiembre',
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
