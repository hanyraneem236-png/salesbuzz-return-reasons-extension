import { Component, inject, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  BIGridComponent,
  BIModulesModule,
  CreateDialog
} from 'bi-modules';
import {
  ControlTypes,
  DataTypes,
  IColumns
} from '@salesbuzz/public-sdk';

import { ReturnReasonsDataSource } from '../../data-sources/return-reasons-data-source';
import { ReturnReasonsService } from '../../services/return-reasons';

@Component({
  selector: 'app-return-reasons',
  standalone: true,
  imports: [
    BIModulesModule
  ],
  providers: [
    {
    provide: 'CreateDialog',
    useFactory: () => {
      const dialog = new CreateDialog();
      return () => dialog;
      }
    }
  ],
  templateUrl: './return-reasons.html',
  styleUrl: './return-reasons.scss'
})
export class ReturnReasons {
  changeSet: any = {
    changesetArr: []
  };
  private readonly returnReasonsService = inject(ReturnReasonsService);

  @ViewChild('returnReasonsGrid')
  grid?: BIGridComponent;

  readonly dataSource =
    new ReturnReasonsDataSource(this.returnReasonsService);

  readonly columns: IColumns[] = [
    {
      Name: 'id',
      DisplayName: 'ID',
      DataType: DataTypes.NUMERIC,
      controlType: ControlTypes.Number,
      IsEditable: false,
      IsFilterable: true,
      IsVisible: true,
      Width: 90
    },
    {
      Name: 'code',
      DisplayName: 'Code',
      DataType: DataTypes.Text,
      controlType: ControlTypes.Text,
      IsEditable: true,
      IsFilterable: true,
      IsVisible: true,
      Width: 160,
      Validators: [
        Validators.required,
        Validators.maxLength(20)
      ]
    },
    {
      Name: 'description',
      DisplayName: 'English Description',
      DataType: DataTypes.Text,
      controlType: ControlTypes.Text,
      IsEditable: true,
      IsFilterable: true,
      IsVisible: true,
      Width: 240,
      Validators: [
        Validators.required,
        Validators.maxLength(200)
      ]
    },
    {
      Name: 'descriptionA',
      DisplayName: 'Arabic Description',
      DataType: DataTypes.Text,
      controlType: ControlTypes.Text,
      IsEditable: true,
      IsFilterable: true,
      IsVisible: true,
      Width: 240,
      Validators: [
        Validators.maxLength(200)
      ]
    },
    {
      Name: 'isActive',
      DisplayName: 'Active',
      DataType: DataTypes.Boolean,
      controlType: ControlTypes.CheckBox,
      IsEditable: true,
      IsFilterable: true,
      IsVisible: true,
      Width: 110,
      DefaultValue: true
    }
  ] as IColumns[];

  add(): void {
    this.grid?.AddRow();
  }

  save(): void {
    this.grid?.Save();
  }

  delete(): void {
    this.grid?.DeleteRow();
  }

  cancel(): void {
    this.grid?.Cancel();
  }

  refresh(): void {
    this.dataSource.read();
  }

  resetDemoData(): void {
    this.returnReasonsService.reset();
    this.dataSource.read();
  }
}