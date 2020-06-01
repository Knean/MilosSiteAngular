import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PurchaseService } from '../purchase.service';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PurchaseComponent>,
    public purchase: PurchaseService,
    ) { }

  ngOnInit(): void {
  }
  save(amount) {
    this.purchase.purchase(amount)

    this.dialogRef.close();
  }

}
