
import type { Task } from '../types/task.types';

export const mockTasks: Task[] = [
  // --- Ana görev 1: FE Proje Planlama ---
  {
    id: 'main-1',
    title: 'FE Proje Planlama',
    startDate: '2026-02-03',
    endDate: '2026-02-28',
    type: 'main',
  },
  {
    id: 'sub-1-1',
    title: 'Teknoloji Kararı Verilmesi',
    startDate: '2026-02-03',
    endDate: '2026-02-07',
    type: 'sub',
    parentId: 'main-1',
  },
  {
    id: 'sub-1-2',
    title: 'Katmanların Yaratılması',
    startDate: '2026-02-10',
    endDate: '2026-02-14',
    type: 'sub',
    parentId: 'main-1',
  },
  {
    id: 'sub-1-3',
    title: 'Gerekli Paketlerin Kurulması',
    startDate: '2026-02-24',
    endDate: '2026-02-28',
    type: 'sub',
    parentId: 'main-1',
  },
  {
    id: 'sub-1-4',
    title: 'UI Tasarımının Yapılması',
    startDate: '2026-03-01',
    endDate: '2026-03-07',
    type: 'sub',
    parentId: 'main-1',
  },

  // --- Ana görev 2: BE Proje Planlama ---
  {
    id: 'main-2',
    title: 'BE Proje Planlama',
    startDate: '2026-02-17',
    endDate: '2026-03-04',
    type: 'main',
  },
  {
    id: 'sub-2-1',
    title: 'Nuget Yönetimi',
    startDate: '2026-02-17',
    endDate: '2026-03-03',
    type: 'sub',
    parentId: 'main-2',
  },
  {
    id: 'sub-2-2',
    title: 'Open AI',
    startDate: '2026-03-05',
    endDate: '2026-03-10',
    type: 'sub',
    parentId: 'main-2',
  },
  {
    id: 'sub-2-3',
    title: 'Teknoloji Kararı Verilmesi',
    startDate: '2026-03-20',
    endDate: '2026-03-25',
    type: 'sub',
    parentId: 'main-2',
  },
  {
    id: 'sub-2-4',
    title: 'Katman Mimarisi',
    startDate: '2026-03-28',
    endDate: '2026-04-04',
    type: 'sub',
    parentId: 'main-2',
  },

  // --- Ana görev 3: Deploy Süreçleri ---
  {
    id: 'main-3',
    title: 'Deploy Süreçleri',
    startDate: '2026-03-17',
    endDate: '2026-04-30',
    type: 'main',
  },
  {
    id: 'sub-3-1',
    title: 'Docker',
    startDate: '2026-03-17',
    endDate: '2026-03-21',
    type: 'sub',
    parentId: 'main-3',
  },
  {
    id: 'sub-3-2',
    title: 'Devops Config',
    startDate: '2026-03-24',
    endDate: '2026-03-28',
    type: 'sub',
    parentId: 'main-3',
  },
  {
    id: 'sub-3-3',
    title: 'CI/CD Süreçleri',
    startDate: '2026-03-31',
    endDate: '2026-04-30',
    type: 'sub',
    parentId: 'main-3',
  },
];
