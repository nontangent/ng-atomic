import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'templates-loading',
  templateUrl: './loading.template.html',
  styleUrls: ['./loading.template.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingTemplate { }
