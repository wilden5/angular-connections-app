import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './pages/dialog/dialog.component';
import { GroupRoutingModule } from './group-routing.module';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, GroupRoutingModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
})
export class GroupModule {}
