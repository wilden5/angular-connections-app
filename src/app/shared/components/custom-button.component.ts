import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Output() buttonClickRequested = new EventEmitter<void>();

  @Input() customClass: string | undefined;

  @Input() disabled = false;

  onButtonClick(): void {
    this.buttonClickRequested.emit();
  }
}
