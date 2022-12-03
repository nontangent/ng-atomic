import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'pages-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss']
})
export class CommunityPage implements OnInit {

  protected form = this.fb.group({
    name: [''],
    discordToken: [''],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
