// =============================================================================
// businessHours.ts — Business hours from SALON config
// =============================================================================

import { SALON } from './config/salon';

export interface TimeWindow {
  start: string
  end: string
}

export interface DaySchedule {
  isOpen: boolean
  windows: TimeWindow[]
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0=Sunday, 1=Monday, ..., 6=Saturday

// Build BUSINESS_HOURS from SALON config
function buildBusinessHours(): Record<DayOfWeek, DaySchedule> {
  const segSab: DaySchedule = {
    isOpen: true,
    windows: [
      { start: SALON.horarios.segSab.abertura, end: SALON.horarios.segSab.almocoInicio },
      { start: SALON.horarios.segSab.almocoFim, end: SALON.horarios.segSab.fechamento },
    ],
  };

  const domingo: DaySchedule = SALON.horarios.domingo
    ? {
        isOpen: true,
        windows: [{ start: SALON.horarios.domingo.abertura, end: SALON.horarios.domingo.fechamento }],
      }
    : { isOpen: false, windows: [] };

  return {
    0: domingo,
    1: segSab,
    2: segSab,
    3: segSab,
    4: segSab,
    5: segSab,
    6: segSab,
  };
}

export const BUSINESS_HOURS: Record<DayOfWeek, DaySchedule> = buildBusinessHours();

export const DAY_NAMES_PT: Record<DayOfWeek, string> = {
  0: 'Domingo',
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
};

export const DAY_ABBREV_PT: Record<DayOfWeek, string> = {
  0: 'Dom',
  1: 'Seg',
  2: 'Ter',
  3: 'Qua',
  4: 'Qui',
  5: 'Sex',
  6: 'Sáb',
};

export function getDaySchedule(dayOfWeek: DayOfWeek): DaySchedule {
  return BUSINESS_HOURS[dayOfWeek];
}

export function isSalonOpen(dayOfWeek: DayOfWeek): boolean {
  return BUSINESS_HOURS[dayOfWeek].isOpen;
}

export function getDayHoursSummary(dayOfWeek: DayOfWeek): string {
  const schedule = BUSINESS_HOURS[dayOfWeek];
  if (!schedule.isOpen) return 'Fechado';
  return schedule.windows.map((w) => `${w.start}–${w.end}`).join(', ');
}

export function getWeeklyHoursSummary(): string {
  const lines: string[] = [];
  for (let d = 1; d <= 6; d++) {
    const day = d as DayOfWeek;
    lines.push(`${DAY_ABBREV_PT[day]}: ${getDayHoursSummary(day)}`);
  }
  lines.push(`${DAY_ABBREV_PT[0]}: ${getDayHoursSummary(0)}`);
  return lines.join('\n');
}

export function getLunchBreak(): TimeWindow | null {
  return { start: SALON.horarios.segSab.almocoInicio, end: SALON.horarios.segSab.almocoFim };
}

export function isTimeInWindow(time: string, window: TimeWindow): boolean {
  return time >= window.start && time < window.end;
}

export function doesServiceFitInDay(
  dayOfWeek: DayOfWeek,
  serviceStart: string,
  serviceEnd: string,
): boolean {
  const schedule = BUSINESS_HOURS[dayOfWeek];
  if (!schedule.isOpen) return false;
  return schedule.windows.some(
    (window) => serviceStart >= window.start && serviceEnd <= window.end,
  );
}

export function getMaxServiceDuration(dayOfWeek: DayOfWeek, startTime: string): number {
  const schedule = BUSINESS_HOURS[dayOfWeek];
  if (!schedule.isOpen) return 0;
  for (const window of schedule.windows) {
    if (startTime >= window.start && startTime < window.end) {
      const [startH, startM] = startTime.split(':').map(Number);
      const [endH, endM] = window.end.split(':').map(Number);
      return (endH * 60 + endM) - (startH * 60 + startM);
    }
  }
  return 0;
}

export function crossesLunchBreak(
  dayOfWeek: DayOfWeek,
  serviceStart: string,
  serviceEnd: string,
): boolean {
  if (dayOfWeek === 0) return false;
  const lunch = getLunchBreak();
  if (!lunch) return false;
  return serviceStart < lunch.end && serviceEnd > lunch.start;
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function generateValidStartTimes(
  dayOfWeek: DayOfWeek,
  serviceDurationMinutes: number,
  stepMinutes: number = 15,
): string[] {
  const schedule = BUSINESS_HOURS[dayOfWeek];
  if (!schedule.isOpen) return [];
  const validTimes: string[] = [];
  for (const window of schedule.windows) {
    const windowStart = timeToMinutes(window.start);
    const windowEnd = timeToMinutes(window.end);
    for (let t = windowStart; t + serviceDurationMinutes <= windowEnd; t += stepMinutes) {
      validTimes.push(minutesToTime(t));
    }
  }
  return validTimes;
}
