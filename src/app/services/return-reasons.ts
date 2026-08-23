import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ReturnReason } from '../models/return-reason';

@Injectable({
  providedIn: 'root'
})
export class ReturnReasonsService {
  private readonly storageKey = 'salesbuzz-return-reasons';

  private readonly defaultReasons: ReturnReason[] = [
    {
      id: 1,
      code: 'DAMAGED',
      description: 'Damaged product',
      descriptionA: 'منتج تالف',
      isActive: true
    },
    {
      id: 2,
      code: 'WRONG_ITEM',
      description: 'Wrong item delivered',
      descriptionA: 'تم توصيل منتج خاطئ',
      isActive: true
    },
    {
      id: 3,
      code: 'CUSTOMER_CHANGED_MIND',
      description: 'Customer changed their mind',
      descriptionA: 'العميل غير رأيه',
      isActive: false
    }
  ];

  private readonly reasonsSubject =
    new BehaviorSubject<ReturnReason[]>(this.loadReasons());

  readonly reasons$ = this.reasonsSubject.asObservable();

  getAll(): ReturnReason[] {
    return this.reasonsSubject.value;
  }

  add(reason: Omit<ReturnReason, 'id'>): void {
    const currentReasons = this.getAll();

    const newReason: ReturnReason = {
      ...reason,
      id: this.getNextId(currentReasons)
    };

    this.saveReasons([...currentReasons, newReason]);
  }

  update(reason: ReturnReason): void {
    const updatedReasons = this.getAll().map(currentReason =>
      currentReason.id === reason.id ? { ...reason } : currentReason
    );

    this.saveReasons(updatedReasons);
  }

  delete(id: number): void {
    const remainingReasons = this.getAll().filter(reason => reason.id !== id);
    this.saveReasons(remainingReasons);
  }

  reset(): void {
    this.saveReasons(this.defaultReasons);
  }

  private loadReasons(): ReturnReason[] {
    const storedReasons = localStorage.getItem(this.storageKey);

    if (!storedReasons) {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.defaultReasons)
      );

      return [...this.defaultReasons];
    }

    try {
      return JSON.parse(storedReasons) as ReturnReason[];
    } catch {
      return [...this.defaultReasons];
    }
  }

  private saveReasons(reasons: ReturnReason[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(reasons));
    this.reasonsSubject.next(reasons);
  }

  private getNextId(reasons: ReturnReason[]): number {
    if (reasons.length === 0) {
      return 1;
    }

    return Math.max(...reasons.map(reason => reason.id)) + 1;
  }
}