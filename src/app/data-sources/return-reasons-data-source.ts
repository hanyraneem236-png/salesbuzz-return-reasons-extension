import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  ControlTypes,
  DataTypes,
  IDataSource
} from '@salesbuzz/public-sdk';

import { ReturnReason } from '../models/return-reason';
import { ReturnReasonsService } from '../services/return-reasons';

type GridReturnReason = ReturnReason & {
  R_WID: number;
  ChangeSet_Status?: string;
};

export class ReturnReasonsDataSource
  extends BehaviorSubject<{ data: GridReturnReason[]; total: number }>
  implements IDataSource {

  Params: {
    Name: string;
    Operator: string;
    value: string;
    DataType: any;
  }[] = [];

  Key = 'id';
  Key2 = '';
  Key3 = '';
  Key4 = '';
  Key5 = '';
  Key6 = '';

  Columns = [
    {
      Name: 'id',
      DataType: DataTypes.NUMERIC,
      controlType: ControlTypes.Number
    },
    {
      Name: 'code',
      DataType: DataTypes.Text,
      Length: 20,
      controlType: ControlTypes.Text
    },
    {
      Name: 'description',
      DataType: DataTypes.Text,
      Length: 200,
      controlType: ControlTypes.Text
    },
    {
      Name: 'descriptionA',
      DataType: DataTypes.Text,
      Length: 200,
      controlType: ControlTypes.Text
    },
    {
      Name: 'isActive',
      DataType: DataTypes.Boolean,
      controlType: ControlTypes.CheckBox
    }
  ];

  Type: any = 'api';
  IsClientSideFilter = true;
  LocalData = true;
  data: GridReturnReason[] = [];
  HasPaging = false;

  state = {
    skip: 0,
    take: 20,
    sort: [] as []
  };

  loading = false;

  APIURL = '';
  POSTAPIURL: string | undefined;
  PUTAPIURL: string | undefined;
  DELETEAPIURL: string | undefined;

  excludeDataFromReq = ['R_WID', 'ChangeSet_Status'];
  excludeTimeFromReq: string[] = [];

  constructor(private readonly service: ReturnReasonsService) {
    const initialData = ReturnReasonsDataSource.toGridRows(service.getAll());

    super({
      data: initialData,
      total: initialData.length
    });

    this.data = initialData;
  }

  read(_filter = ''): void {
    this.refresh();
  }

  add(data: any): Observable<any> {
    this.service.add(this.toReturnReasonWithoutId(data));
    this.refresh();

    return of(data);
  }

  edit(data: any, id: string): Observable<any> {
    const reason = this.toReturnReason(data, Number(id));

    this.service.update(reason);
    this.refresh();

    return of(reason);
  }

  patch(data: any, id: string): Observable<any> {
    return this.edit(data, id);
  }

  delete(id: string): Observable<any> {
    this.service.delete(Number(id));
    this.refresh();

    return of({ id: Number(id) });
  }

  batch(
    createdItems: any[],
    updatedItems: any[],
    deletedItems: any[]
  ): Observable<any> {
    createdItems.forEach(item => {
      this.service.add(this.toReturnReasonWithoutId(item));
    });

    updatedItems.forEach(item => {
      const id = Number(item.id ?? item.R_WID);
      this.service.update(this.toReturnReason(item, id));
    });

    deletedItems.forEach(item => {
      this.service.delete(Number(item.id ?? item.R_WID));
    });

    this.refresh();

    return of({
      createdItems,
      updatedItems,
      deletedItems
    });
  }

  get(_apiUrl: string): Observable<any> {
    return of(this.value);
  }

  formatAPIURLWithFilter(_filter: string): string {
    return this.APIURL;
  }

  formatFilter(filter: string): string {
    return filter;
  }

  private refresh(): void {
    const rows = ReturnReasonsDataSource.toGridRows(this.service.getAll());

    this.data = rows;

    this.next({
      data: rows,
      total: rows.length
    });
  }

  private toReturnReason(data: any, id: number): ReturnReason {
    return {
      id,
      code: String(data.code ?? '').trim(),
      description: String(data.description ?? '').trim(),
      descriptionA: String(data.descriptionA ?? '').trim(),
      isActive: Boolean(data.isActive)
    };
  }

  private toReturnReasonWithoutId(
    data: any
  ): Omit<ReturnReason, 'id'> {
    return {
      code: String(data.code ?? '').trim(),
      description: String(data.description ?? '').trim(),
      descriptionA: String(data.descriptionA ?? '').trim(),
      isActive: Boolean(data.isActive)
    };
  }

  private static toGridRows(
    reasons: ReturnReason[]
  ): GridReturnReason[] {
    return reasons.map(reason => ({
      ...reason,
      R_WID: reason.id,
      ChangeSet_Status: 'NOP'
    }));
  }
}