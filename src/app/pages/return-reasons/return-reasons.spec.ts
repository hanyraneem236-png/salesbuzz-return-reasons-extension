import { Component } from '@angular/core';
import { BIModulesModule } from '@salesbuzz/public-sdk';

@Component({
  selector: 'app-return-reasons',
  standalone: true,
  imports: [
    BIModulesModule
  ],
  templateUrl: './return-reasons.html',
  styleUrl: './return-reasons.scss'
})
export class ReturnReasons {
}